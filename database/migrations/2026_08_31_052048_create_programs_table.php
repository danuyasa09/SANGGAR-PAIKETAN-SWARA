<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('code')->default('');          // "Paket A", "Paket B", dll
            $table->string('title');
            $table->text('description');
            $table->json('activities')->nullable();       // ["Aktivitas 1", "Aktivitas 2", ...]
            $table->string('duration')->default('');      // "60 - 90 menit"
            $table->string('capacity')->default('');      // "10 - 30 peserta"
            $table->string('thumbnail_url')->nullable();
            $table->string('price')->nullable();          // "Rp150.000"
            $table->string('btn_label')->default('Pesan Sekarang');
            $table->boolean('is_custom_btn')->default(false);
            $table->unsignedSmallInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
