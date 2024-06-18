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
        Schema::create('itineraries', function (Blueprint $table) {
            $table->id();
            $table->string('name_it', 200);
            $table->string('name_en', 200)->nullable();
            $table->string('name_fr', 200)->nullable();
            $table->string('name_sp', 200)->nullable();
            $table->string('name_na', 200)->nullable();
            $table->text('description_it');
            $table->text('description_en')->nullable();
            $table->text('description_fr')->nullable();
            $table->text('description_sp')->nullable();
            $table->text('description_na')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itineraries');
    }
};
