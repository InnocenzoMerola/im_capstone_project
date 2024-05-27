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
        Schema::create('guides', function (Blueprint $table) {
            $table->id();
            $table->string('name_it', 100)->nullable();
            $table->string('name_en', 100)->nullable();
            $table->string('name_fr', 100)->nullable();
            $table->string('name_na', 100)->nullable();
            $table->dateTime('date');
            $table->mediumInteger('price')->unsigned();
            $table->string('mobility', 50);
            $table->string('duration');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guides');
    }
};
