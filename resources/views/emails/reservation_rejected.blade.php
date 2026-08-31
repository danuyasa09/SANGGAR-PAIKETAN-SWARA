<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #FAF6F0; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #8B261E; }
        .content { padding: 20px 0; }
        .footer { text-align: center; font-size: 12px; color: #777; padding-top: 20px; border-top: 1px solid #ddd; }
        .highlight { font-weight: bold; color: #8B261E; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="color: #8B261E; margin: 0;">Sanggar Paiketan Swara</h2>
        </div>
        <div class="content">
            <p>Halo <span class="highlight">{{ $reservation->name }}</span>,</p>
            <p>Terima kasih atas ketertarikan Anda untuk berkunjung ke Sanggar Paiketan Swara pada tanggal <strong>{{ $reservation->visit_date->format('d F Y') }}</strong>.</p>
            
            <p>Mohon maaf, saat ini kami <span class="highlight" style="color: red;">belum dapat menerima</span> reservasi Anda pada tanggal atau paket yang dipilih (Status: Ditolak). Hal ini biasanya dikarenakan jadwal yang sudah penuh atau alasan operasional lainnya.</p>
            
            <p>Jika Anda memiliki pertanyaan atau ingin merencanakan ulang kunjungan pada tanggal lain, jangan ragu untuk membalas email ini atau menghubungi kami via WhatsApp.</p>

            <p>Terima kasih atas pengertiannya.</p>

            <p>Salam hangat,<br>Tim Sanggar Paiketan Swara</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Sanggar Paiketan Swara. Semua Hak Cipta Dilindungi.</p>
        </div>
    </div>
</body>
</html>
