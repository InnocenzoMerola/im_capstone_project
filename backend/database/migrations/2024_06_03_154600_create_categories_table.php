<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        #TODO Migration e sistemare
        // Schema::create('categories', function (Blueprint $table) {
        //     $table->id();
        //     $table->string('name');
        //     $table->unsignedBigInteger('parent_id')->nullable();
        //     $table->foreignId('parent_id')->references('id')->on('categories')->constrained()->onDelete('cascade');
        //     $table->foreignId('stop_id')->constrained();
        //     $table->foreignId('category_id')->constrained();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
