<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('type');
        });

        Schema::table('articles', function (Blueprint $table) {
           $table->enum('type', ['article', 'external'])->default('article')->after('slug');
           $table->text('external_description')->nullable()->after('external_url');
        });
    }

    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('external_description');
            $table->dropColumn('type');
        });

        Schema::table('articles', function (Blueprint $table) {
            $table->enum('type', ['internal', 'external'])->default('internal')->after('slug');
        });
    }
};
