<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('tag')->default('BERITA');
            $table->string('title');
            $table->string('cover_url')->nullable();
            $table->string('read_time')->default('3 menit baca');
            $table->string('author_name')->default('Tim Sanggar Paiketan');
            $table->string('author_role')->default('Penulis & Pengelola Konten');
            $table->string('author_avatar_url')->nullable();
            $table->json('content')->nullable();   // array of { type, text, author? }
            $table->unsignedBigInteger('views')->default(0);
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
