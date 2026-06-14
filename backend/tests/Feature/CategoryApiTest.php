<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Category;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_all_categories()
    {
        Category::create(['name' => 'Tech', 'slug' => 'tech', 'icon' => 'FaLaptop']);
        Category::create(['name' => 'News', 'slug' => 'news', 'icon' => 'FaNewspaper']);

        $response = $this->getJson('/api/categories');

        $response->assertStatus(200)
                 ->assertJsonCount(2, 'data');
    }

    public function test_can_get_single_category()
    {
        $category = Category::create(['name' => 'Tech', 'slug' => 'tech', 'icon' => 'FaLaptop']);

        $response = $this->getJson("/api/categories/{$category->id}");

        $response->assertStatus(200)
                 ->assertJsonPath('data.id', $category->id);
    }

    public function test_returns_404_if_category_not_found()
    {
        $response = $this->getJson('/api/categories/999');

        $response->assertStatus(404);
    }
}
