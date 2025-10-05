<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->uuid('uuid')->unique()->after('id');
            $table->enum('plan', ['free', 'premium'])->default('free')->after('email');
            $table->boolean('admin_flg')->default(false)->after('plan');
        });

        // 既存ユーザーにUUIDを振る（null制約を避けるため）
        DB::table('users')->get()->each(function ($user) {
            DB::table('users')
                ->where('id', $user->id)
                ->update(['uuid' => \Illuminate\Support\Str::uuid()]);
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['uuid', 'plan', 'admin_flg', 'last_login_at']);
        });
    }
};
