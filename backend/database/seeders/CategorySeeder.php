<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::firstOrCreate(['name' => 'Actualité'], ['icon' => 'FiGlobe']);
        Category::firstOrCreate(['name' => 'Projet Simandou'], ['icon' => 'FiActivity']);
        Category::firstOrCreate(['name' => 'Intelligence Artificielle'], ['icon' => 'FiCpu']);
        Category::firstOrCreate(['name' => 'Projet RESI-2P'], ['icon' => 'FiShield']);
        Category::firstOrCreate(['name' => 'Méthodologie'], ['icon' => 'FiList']);
        Category::firstOrCreate(['name' => 'Projet ProCaR'], ['icon' => 'FiTrendingUp']);
        Category::firstOrCreate(['name' => 'Astuces & Outils'], ['icon' => 'FiSettings']);
    }
}
