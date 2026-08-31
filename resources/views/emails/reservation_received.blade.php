<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #FAF6F0;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #8B261E;
        }
        .content {
            padding: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            padding-top: 20px;
            border-top: 1px solid #ddd;
        }
        .highlight {
            font-weight: bold;
            color: #8B261E;
        }
        .table-details {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        .table-details th, .table-details td {
            text-align: left;
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
        .table-details th {
            width: 40%;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="color: #8B261E; margin: 0;">Sanggar Paiketan Swara</h2>
        </div>
        <div class="content">
            <p>Halo <span class="highlight">{{ $reservation->name }}</span>,</p>
            <p>Terima kasih! Kami telah menerima permohonan reservasi Anda. Berikut adalah detail reservasi Anda:</p>
            
            <table class="table-details">
                <tr>
                    <th>Paket Pilihan</th>
                    <td>{{ $reservation->package_type }}</td>
                </tr>
                <tr>
                    <th>Jumlah Peserta</th>
                    <td>{{ $reservation->participants }} Orang</td>
                </tr>
                <tr>
                    <th>Tanggal Kunjungan</th>
                    <td>{{ $reservation->visit_date->format('d F Y') }}</td>
                </tr>
                <tr>
                    <th>Nomor Telepon/WA</th>
                    <td>{{ $reservation->phone }}</td>
                </tr>
            </table>

            <p><strong>Langkah Selanjutnya:</strong></p>
            <p>Saat ini status reservasi Anda adalah <span class="highlight">Menunggu Pembayaran (Pending)</span>. Tim admin kami akan segera menghubungi Anda melalui WhatsApp atau membalas email ini untuk menginformasikan detail metode pembayaran dan total biaya sesuai dengan paket yang dipilih.</p>
            
            <p>Mohon menunggu konfirmasi lebih lanjut dari kami sebelum melakukan pembayaran apa pun.</p>

            <p>Salam hangat,<br>Tim Sanggar Paiketan Swara</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} Sanggar Paiketan Swara. Semua Hak Cipta Dilindungi.</p>
        </div>
    </div>
</body>
</html>
