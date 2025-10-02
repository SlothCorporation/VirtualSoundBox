<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->enum('status', ['draft', 'published', 'scheduled', 'unpublished'])
                ->default('draft')
                ->after('limited_access_token');
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->enum('status', ['draft', 'pending', 'published', 'private'])
                ->default('draft')
                ->after('limited_access_token');
        });
    }
};
