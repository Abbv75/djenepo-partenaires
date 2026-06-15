<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\ServiceCategory;
use App\Models\Service;
use App\Models\User;

class ServiceApiTest extends TestCase
{
    use RefreshDatabase;

    private function createCategory()
    {
        return ServiceCategory::create(['name' => 'Strategy', 'icon' => 'FiLayers']);
    }

    public function test_can_list_all_services()
    {
        $cat = $this->createCategory();

        Service::create([
            'service_category_id' => $cat->id,
            'slug' => 'planning',
            'title' => 'Strategic Planning',
            'tagline' => 'Start right',
            'desc' => 'Detailed description here',
            'features' => ['Feature A', 'Feature B'],
            'icon' => 'FiCompass',
        ]);

        $response = $this->getJson('/api/services');

        $response->assertStatus(200)
                 ->assertJsonCount(1, 'data');
    }

    public function test_authenticated_user_can_create_service()
    {
        $user = User::factory()->create();
        \Laravel\Sanctum\Sanctum::actingAs($user);

        $cat = $this->createCategory();

        $response = $this->postJson('/api/services', [
            'service_category_id' => $cat->id,
            'slug' => 'planning',
            'title' => 'Strategic Planning',
            'tagline' => 'Start right',
            'desc' => 'Detailed description here',
            'features' => ['Feature A', 'Feature B'],
            'icon' => 'FiCompass',
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.title', 'Strategic Planning');
    }

    public function test_guest_cannot_create_service()
    {
        $cat = $this->createCategory();

        $response = $this->postJson('/api/services', [
            'service_category_id' => $cat->id,
            'slug' => 'planning',
            'title' => 'Strategic Planning',
            'tagline' => 'Start right',
            'desc' => 'Detailed description here',
            'features' => ['Feature A', 'Feature B'],
            'icon' => 'FiCompass',
        ]);

        $response->assertStatus(401);
    }
}
