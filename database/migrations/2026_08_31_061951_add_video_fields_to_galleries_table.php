<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('galleries', function (Blueprint $table) {
            // 'photo' or 'video'
            $table->string('type')->default('photo')->after('category');
            // For video: YouTube URL or embed URL
            $table->string('video_url')->nullable()->after('type');
            // Views count for videos
            $table->string('views')->nullable()->after('video_url');
        });
    }

    public function down(): void
    {
        Schema::table('galleries', function (Blueprint $table) {
            $table->dropColumn(['type', 'video_url', 'views']);
        });
    }
};
