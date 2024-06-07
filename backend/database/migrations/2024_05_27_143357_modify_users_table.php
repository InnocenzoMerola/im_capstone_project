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
        Schema::table('users', function(Blueprint $table){
            $table->string('profile_img')->nullable();
            $table->string('role', 20)->default('user');
            $table->string('surname', 50)->nullable();
            $table->string('phone', 20)->nullable();
            $table->tinyInteger('age')->unsigned()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function(Blueprint $table){
            $table->dropColumn('profile_img');
            $table->dropColumn('role');
            $table->dropColumn('surname');
            $table->dropColumn('phone');
            $table->dropColumn('age');
        });
    }
};
