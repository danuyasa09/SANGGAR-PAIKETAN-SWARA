<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestMail extends Command
{
    protected $signature = 'mail:test {email? : Alamat email tujuan}';
    protected $description = 'Kirim email test untuk memverifikasi konfigurasi SMTP Hostinger';

    public function handle()
    {
        $to = $this->argument('email') ?? 'info@sanggarpaiketanswara.com';

        $this->info("Mengirim email test ke: {$to}");
        $this->info('Host SMTP  : ' . config('mail.mailers.smtp.host'));
        $this->info('Port       : ' . config('mail.mailers.smtp.port'));
        $this->info('Username   : ' . config('mail.mailers.smtp.username'));
        $this->info('Encryption : ' . config('mail.mailers.smtp.encryption'));

        try {
            Mail::raw(
                "Halo!\n\nIni adalah email test dari Sanggar Paiketan Swara.\nKonfigurasi SMTP Hostinger berhasil terhubung!\n\nSalam,\nSistem Sanggar Paiketan Swara",
                function ($message) use ($to) {
                    $message->to($to)
                            ->subject('Test Email SMTP Hostinger - Sanggar Paiketan Swara');
                }
            );
            $this->info('Email berhasil dikirim!');
        } catch (\Exception $e) {
            $this->error('Gagal mengirim email: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
}
