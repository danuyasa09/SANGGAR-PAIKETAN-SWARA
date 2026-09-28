<!DOCTYPE html>
<html lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sanggar Paiketan Swara | Gamelan & Tari Bali</title>

        <!-- Favicon -->
        <link rel="icon" type="image/png" href="/favicon.png">
        <link rel="shortcut icon" href="/favicon.ico">

        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">

        <!-- Inisialisasi Prefensi Bahasa Default (ID) -->
        <script>
            try {
                const userLang = localStorage.getItem('user_language');
                if (!userLang || userLang === 'id') {
                    localStorage.setItem('user_language', 'id');
                    // Bersihkan cookie googtrans agar tidak auto translate ke Inggris
                    const hostname = window.location.hostname;
                    const expirePast = '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    document.cookie = `googtrans${expirePast}`;
                    document.cookie = `googtrans${expirePast} domain=${hostname};`;
                    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
                        document.cookie = `googtrans${expirePast} domain=.${hostname};`;
                    }
                    document.cookie = 'googtrans=/id/id; path=/;';
                }
            } catch (e) {}
        </script>

        <!-- React DOM Protection for Google Translate -->
        <script>
            if (typeof Node === 'function' && Node.prototype) {
                const originalRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child) {
                    if (child.parentNode !== this) {
                        return child;
                    }
                    return originalRemoveChild.apply(this, arguments);
                };

                const originalInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, referenceNode) {
                    if (referenceNode && referenceNode.parentNode !== this) {
                        return newNode;
                    }
                    return originalInsertBefore.apply(this, arguments);
                };
            }
        </script>

        <!-- Styles / Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    </head>
    <body class="bg-[#FAF6F0] text-[#261E14] antialiased selection:bg-[#C99B53] selection:text-white">
        <!-- Hidden Google Translate Element -->
        <div id="google_translate_element" style="display:none"></div>
        <div id="app"></div>

        <!-- Google Translate Script Loader -->
        <script type="text/javascript">
            function googleTranslateElementInit() {
                if (window.location.pathname.startsWith('/admin')) {
                    return; // Jangan aktifkan translator di halaman admin
                }
                new google.translate.TranslateElement({
                    pageLanguage: 'id',
                    includedLanguages: 'id,en',
                    autoDisplay: false
                }, 'google_translate_element');
            }
        </script>
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
    </body>
</html>
