<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('musics', function (Blueprint $table) {
            // Spotify 校正ステータス
            $table->enum('verify_status', [
                'unverified',     // 未確認
                'auto_verified',  // 自動校正済み
                'auto_failed',    // 自動校正失敗
                'manual_verified', // 管理者確認済み
            ])->default('unverified')->index();

            // Spotify Track ID
            $table->string('spotify_track_id')->nullable();

            // 校正日時
            $table->timestamp('verified_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('musics', function (Blueprint $table) {
            $table->dropColumn(['verify_status', 'spotify_track_id', 'verified_at']);
        });
    }
};
