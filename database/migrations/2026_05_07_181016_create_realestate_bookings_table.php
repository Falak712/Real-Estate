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
        Schema::create('realestate_bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rental_bookings_id')->constrained('rental_bookings')->onDelete('cascade');
            $table->foreignId('real_estates_id')->constrained('real_estates')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rental_bookings');
    }
};
