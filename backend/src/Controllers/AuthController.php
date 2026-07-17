<?php
namespace App\Controllers;

use App\Models\User;
use App\Auth\Jwt;

class AuthController extends Controller {
    private $userModel;

    public function __construct() {
        $this->userModel = new User();
    }

    public function login() {
        $data = getJsonInput();
        if (empty($data['email']) || empty($data['password'])) {
            $this->error("Email and password are required", 400);
        }

        $user = $this->userModel->findByEmail($data['email']);
        
        // Use password_verify since Laravel's Hash::make uses bcrypt/argon2
        if (!$user || !password_verify($data['password'], $user['password'])) {
            $this->error("Invalid credentials", 401);
        }

        $token = Jwt::encode([
            'user_id' => $user['id'],
            'email' => $user['email']
        ], JWT_SECRET);

        $this->success([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ],
            'token' => $token
        ], "Login successful");
    }

    public function logout() {
        // En JWT (stateless), le logout se fait surtout côté client en supprimant le token.
        // On retourne juste un succès.
        $this->success([], "Logged out successfully");
    }

    public function user() {
        $payload = Jwt::checkAuth();
        $user = $this->userModel->find($payload['user_id']);
        if (!$user) {
            $this->error("User not found", 404);
        }
        
        $this->success([
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email']
        ]);
    }
}
