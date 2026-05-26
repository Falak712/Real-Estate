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
{
    Schema::create('punishments', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->string('reason');
        $table->integer('length_of_punishment')->nullable();
        $table->integer('number_of_times')->default(1);
        $table->boolean('is_permanent')->default(false);
        $table->timestamp('start_date')->nullable();
        $table->timestamp('end_date')->nullable();
        $table->timestamps();
    });
}
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('punishments');
    }
};
