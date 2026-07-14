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
    Schema::create('real_estates', function (Blueprint $table) {
            $table->id();
            $table->decimal('price',8,2);
            $table->string('description',255)->nullable();
            $table->double('size');
            $table->integer('bedrooms')->nullable();
            $table->integer('bathrooms')->nullable();
            $table->enum('direction', ['north','south','east','west','northeast','northwest','southeast','southwest','north-east-west','north-east-south','north-west-south','east-west-south','east-west-north','east-south-west']);
            $table->string('address',255);
            $table->double('point_of_length');
            $table->double('point_of_width');
            $table->enum('type_real_estate',['apartment','house','land','office','villa']);
            $table->enum('status_real_estate',['available','booked','sold']);
            $table->enum('contract_type',['rent','sale']);
           $table->string('identity_image')->nullable();
           $table->string('ownership_document')->nullable();
            $table->enum('order_status',['pending','approved','rejected'])->default('pending');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('area_id')->constrained('areas')->onDelete('cascade'); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('real_estates');
    }
};
