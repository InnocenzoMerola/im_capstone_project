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
        Schema::create('stops', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('location', 200);
            $table->string('image')->nullable();
            $table->string('description_it', 400)->nullable();
            $table->string('description_en', 400)->nullable();
            $table->string('description_fr', 400)->nullable();
            $table->string('description_na', 400)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stops');
    }
};
