<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->string('origin')->nullable()->after('email');
            $table->string('visit_time')->nullable()->after('visit_date');
            $table->string('age_group')->nullable()->after('participants');
            $table->string('language')->nullable()->after('package_type');
        });
    }

    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn(['origin', 'visit_time', 'age_group', 'language']);
        });
    }
};
