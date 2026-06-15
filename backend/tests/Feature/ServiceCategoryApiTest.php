<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\ServiceCategory;
use App\Models\User;

class ServiceCategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_all_service_categories()
    {
        ServiceCategory::create(['name' => 'Strategy', 'icon' => 'FiLayers']);
        ServiceCategory::create(['name' => 'Evaluation', 'icon' => 'FiTrendingUp']);

        $response = $this->getJson('/api/service-categories');

        $response->assertStatus(200)
                 ->assertJsonCount(2, 'data');
    }

    public function test_authenticated_user_can_create_service_category()
    {
        $user = User::factory()->create();
        \Laravel\Sanctum\Sanctum::actingAs($user);

        $response = $this->postJson('/api/service-categories', [
            'name' => 'Strategy',
            'icon' => 'FiLayers',
        ]);

        $response->assertStatus(201)
                 ->assertJsonPath('data.name', 'Strategy');
    }

    public function test_guest_cannot_create_service_category()
    {
        $response = $this->postJson('/api/service-categories', [
            'name' => 'Strategy',
            'icon' => 'FiLayers',
        ]);

        $response->assertStatus(401);
    }
}
