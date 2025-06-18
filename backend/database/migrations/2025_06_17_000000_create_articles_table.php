<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->string('slug')->unique();

            $table->enum('type', ['external', 'internal'])->default('external');
            $table->text('body')->nullable(); // 内部記事用
            $table->string('external_url')->nullable(); // 外部リンク用

            $table->enum('status', ['draft', 'pending', 'published', 'private'])->default('draft');
            $table->string('limited_access_token')->nullable(); // 非公開記事用トークン

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
