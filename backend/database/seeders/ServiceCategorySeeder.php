<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServiceCategory;

class ServiceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'id' => 1,
                'name' => 'Conseil & Stratégie',
                'icon' => 'FiLayers',
            ],
            [
                'id' => 2,
                'name' => 'Suivi & Recherche',
                'icon' => 'FiTrendingUp',
            ],
            [
                'id' => 3,
                'name' => 'Formations',
                'icon' => 'FiUsers',
            ],
        ];

        foreach ($categories as $category) {
            ServiceCategory::updateOrCreate(
                ['id' => $category['id']],
                $category
            );
        }
    }
}
