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
        .box { background-color: #fff; padding: 15px; border-radius: 6px; border: 1px solid #e0e0e0; margin: 15px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="color: #8B261E; margin: 0;">Sanggar Paiketan Swara</h2>
        </div>
        <div class="content">
            <p>Halo <span class="highlight">{{ $reservation->name }}</span>,</p>
            <p>Kabar baik! Reservasi Anda untuk <strong>{{ $reservation->package_type }}</strong> ({{ $reservation->participants }} Orang) pada tanggal <strong>{{ $reservation->visit_date->format('d F Y') }}</strong> telah <span class="highlight" style="color: green;">Dikonfirmasi</span>.</p>
            
            <p>Untuk menyelesaikan reservasi Anda, silakan lakukan pembayaran melalui salah satu metode berikut:</p>
            
            <div class="box">
                <h3 style="margin-top: 0;">Metode Pembayaran (Demo)</h3>
                <p><strong>BCA:</strong> 1234567890 a.n Sanggar Paiketan Swara</p>
                <p><strong>BRI:</strong> 0987654321 a.n Sanggar Paiketan Swara</p>
                <p><strong>QRIS:</strong> <em>(Demo Scan QRIS)</em></p>
            </div>

            <p>Setelah melakukan pembayaran, mohon balas email ini atau hubungi WhatsApp kami dengan melampirkan bukti transfer agar kami dapat mencatat pembayaran Anda.</p>

            <p>Terima kasih dan kami tidak sabar menyambut kedatangan Anda!</p>

            <p>Salam hangat,<br>Tim Sanggar Paiketan Swara</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Sanggar Paiketan Swara. Semua Hak Cipta Dilindungi.</p>
        </div>
    </div>
</body>
</html>
