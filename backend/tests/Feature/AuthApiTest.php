<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_with_correct_credentials()
    {
        $user = User::factory()->create([
            'email' => 'admin@djenepo.com',
            'password' => Hash::make('password')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@djenepo.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data' => [
                         'token',
                         'user' => ['id', 'name', 'email']
                     ]
                 ]);
    }

    public function test_user_cannot_login_with_incorrect_credentials()
    {
        $user = User::factory()->create([
            'email' => 'admin@djenepo.com',
            'password' => Hash::make('password')
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'admin@djenepo.com',
            'password' => 'wrong-password',
        ]);

        $response->assertStatus(401);
    }

    public function test_authenticated_user_can_get_profile()
    {
        $user = User::factory()->create();

        \Laravel\Sanctum\Sanctum::actingAs($user);
        $response = $this->getJson('/api/user');

        $response->assertStatus(200)
                 ->assertJsonPath('data.email', $user->email);
    }

    public function test_authenticated_user_can_logout()
    {
        $user = User::factory()->create();

        \Laravel\Sanctum\Sanctum::actingAs($user);
        $response = $this->postJson('/api/logout');

        $response->assertStatus(200)
                 ->assertJsonPath('message', 'Déconnecté avec succès');
    }
}
