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
        Schema::create('favorities_real_estates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('favorites_id')->constrained('favorities')->onDelete('cascade');
            $table->foreignId('realestste_id')->constrained('real_estates')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorities_real_estates');
    }
};
