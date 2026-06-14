<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('date');
            $table->string('read_time');
            $table->text('excerpt');
            $table->longText('content');
            $table->string('image_url')->nullable();
            $table->string('author_name')->default('DJENEPO PARTNERS');
            $table->string('author_role')->default('Cabinet Conseil');
            $table->string('author_avatar')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('blog_posts');
    }
};
