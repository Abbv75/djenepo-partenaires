<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::firstOrCreate(['slug' => 'actualité'], ['name' => 'Actualité']);
        Category::firstOrCreate(['slug' => 'projet-simandou'], ['name' => 'Projet Simandou']);
        Category::firstOrCreate(['slug' => 'intelligence-artificielle'], ['name' => 'Intelligence Artificielle']);
        Category::firstOrCreate(['slug' => 'projet-resi-2p'], ['name' => 'Projet RESI-2P']);
        Category::firstOrCreate(['slug' => 'méthodologie'], ['name' => 'Méthodologie']);
        Category::firstOrCreate(['slug' => 'projet-procar'], ['name' => 'Projet ProCaR']);
        Category::firstOrCreate(['slug' => 'astuces-and-outils'], ['name' => 'Astuces & Outils']);
    }
}
