<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
          'fullname'=>'Admin',
          'email'=>'admin@gmail.com',
          'password'=>Hash::make('12345678'),
          'userType'=>'admin',
          'phone_number'=>'0999999999',


        ]);
    }
}
