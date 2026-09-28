/**
 * Media Compressor Utility
 * Kompresi dan optimasi gambar otomatis di sisi klien (browser)
 * sebelum dikirim ke backend server.
 */

export const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Kompres file gambar menggunakan Canvas API
 * @param {File} file - Berkas gambar asli dari input
 * @param {Object} options - Opsi kompresi
 * @param {number} options.maxWidth - Batas lebar maksimum (default: 1920)
 * @param {number} options.maxHeight - Batas tinggi maksimum (default: 1920)
 * @param {number} options.quality - Kualitas kompresi 0.1 - 1.0 (default: 0.82)
 * @param {string} options.outputType - Format output ('image/webp' atau 'image/jpeg')
 * @returns {Promise<{file: File, originalSize: number, compressedSize: number, savedPercent: number, previewUrl: string}>}
 */
export const compressImage = async (file, options = {}) => {
    if (!file || !file.type.startsWith('image/')) {
        return {
            file,
            originalSize: file ? file.size : 0,
            compressedSize: file ? file.size : 0,
            savedPercent: 0,
            previewUrl: file ? URL.createObjectURL(file) : ''
        };
    }

    // Hindari mengompres SVG atau GIF animasi agar animasi tidak hilang
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
        return {
            file,
            originalSize: file.size,
            compressedSize: file.size,
            savedPercent: 0,
            previewUrl: URL.createObjectURL(file)
        };
    }

    const {
        maxWidth = 1920,
        maxHeight = 1920,
        quality = 0.82,
        outputType = 'image/webp'
    } = options;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Hitung resolusi baru dengan mempertahankan rasio aspek
                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    // Fallback jika konteks canvas gagal
                    resolve({
                        file,
                        originalSize: file.size,
                        compressedSize: file.size,
                        savedPercent: 0,
                        previewUrl: URL.createObjectURL(file)
                    });
                    return;
                }

                // Render gambar ke canvas dengan kualitas interpolasi tinggi
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, width, height);

                // Tentukan MIME type output (gunakan WebP jika didukung, fallback ke JPEG)
                const targetMime = outputType;

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            resolve({
                                file,
                                originalSize: file.size,
                                compressedSize: file.size,
                                savedPercent: 0,
                                previewUrl: URL.createObjectURL(file)
                            });
                            return;
                        }

                        // Buat nama file baru sesuai format kompresi
                        let extension = 'webp';
                        if (targetMime === 'image/jpeg') extension = 'jpg';
                        else if (targetMime === 'image/png') extension = 'png';

                        const baseName = file.name.replace(/\.[^/.]+$/, '');
                        const newFileName = `${baseName}.${extension}`;

                        // Jika hasil kompresi malah lebih besar dari file asli, pertahankan file asli
                        let finalBlob = blob;
                        let finalName = newFileName;
                        let finalType = targetMime;

                        if (blob.size >= file.size && file.size > 0) {
                            finalBlob = file;
                            finalName = file.name;
                            finalType = file.type;
                        }

                        const compressedFile = new File([finalBlob], finalName, {
                            type: finalType,
                            lastModified: Date.now()
                        });

                        const savedBytes = Math.max(0, file.size - compressedFile.size);
                        const savedPercent = file.size > 0 
                            ? Math.round((savedBytes / file.size) * 100) 
                            : 0;

                        resolve({
                            file: compressedFile,
                            originalSize: file.size,
                            compressedSize: compressedFile.size,
                            savedPercent,
                            previewUrl: URL.createObjectURL(compressedFile)
                        });
                    },
                    targetMime,
                    quality
                );
            };

            img.onerror = () => {
                // Fallback jika pemuatan gambar gagal
                resolve({
                    file,
                    originalSize: file.size,
                    compressedSize: file.size,
                    savedPercent: 0,
                    previewUrl: URL.createObjectURL(file)
                });
            };
        };

        reader.onerror = () => {
            reject(new Error('Gagal membaca file gambar'));
        };
    });
};
