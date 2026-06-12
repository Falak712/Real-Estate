<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Area::insert([
    ['name' => 'المزة'],
    ['name' => 'المالكي'],
    ['name' => 'أبو رمانة'],
    ['name' => 'كفرسوسة'],
    ['name' => 'ركن الدين'],
    ['name' => 'المهاجرين'],
    ['name' => 'برزة'],
    ['name' => 'جرمانا'],
    ['name' => 'صحنايا'],
    ['name' => 'قدسيا'],
]);
    
    }
}