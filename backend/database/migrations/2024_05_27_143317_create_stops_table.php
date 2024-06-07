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
            $table->string('phone')->nullable();
            $table->string('url', 800)->nullable();
            $table->text('description_it')->nullable();
            $table->text('description_en')->nullable();
            $table->text('description_fr')->nullable();
            $table->text('description_na')->nullable();
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
