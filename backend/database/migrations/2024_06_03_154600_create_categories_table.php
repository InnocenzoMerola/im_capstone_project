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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name_it');
            $table->string('name_en')->nullable();
            $table->string('name_fr')->nullable();
            $table->string('name_sp')->nullable();
            $table->foreignId('parent_id')->nullable()->constrained('categories')->cascadeOnDelete();
            // $table->foreignId('stop_id')->constrained();
            // $table->foreignId('category_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
