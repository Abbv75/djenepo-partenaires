<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); // Pour les requêtes cross-origin si besoin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/database.php';

use App\Router;
use App\Controllers\AuthController;
use App\Controllers\CategoryController;
use App\Controllers\BlogPostController;
use App\Controllers\ServiceCategoryController;
use App\Controllers\ServiceController;

// Fonction utilitaire pour lire le JSON de la requête
function getJsonInput() {
    return json_decode(file_get_contents('php://input'), true) ?? [];
}

$router = new Router();

// Routes d'authentification
$router->add('POST', '/login', [AuthController::class, 'login']);
$router->add('POST', '/logout', [AuthController::class, 'logout']);
$router->add('GET', '/user', [AuthController::class, 'user']);

// Routes publiques
$router->add('GET', '/categories', [CategoryController::class, 'index']);
$router->add('GET', '/categories/{id}', [CategoryController::class, 'show']);
$router->add('GET', '/categories/{categoryId}/blogs', [BlogPostController::class, 'getByCategoryId']);

$router->add('GET', '/blogs', [BlogPostController::class, 'index']);
$router->add('GET', '/blogs/{id}', [BlogPostController::class, 'show']);

$router->add('GET', '/services', [ServiceController::class, 'index']);
$router->add('GET', '/service-categories', [ServiceCategoryController::class, 'index']);

// Routes d'administration (protégées)
$router->add('POST', '/categories', [CategoryController::class, 'store']);
$router->add('PUT', '/categories/{id}', [CategoryController::class, 'update']);
$router->add('DELETE', '/categories/{id}', [CategoryController::class, 'destroy']);

$router->add('POST', '/blogs', [BlogPostController::class, 'store']);
$router->add('PUT', '/blogs/{id}', [BlogPostController::class, 'update']);
$router->add('DELETE', '/blogs/{id}', [BlogPostController::class, 'destroy']);

$router->add('POST', '/services', [ServiceController::class, 'store']);
$router->add('PUT', '/services/{id}', [ServiceController::class, 'update']);
$router->add('DELETE', '/services/{id}', [ServiceController::class, 'destroy']);

$router->add('POST', '/service-categories', [ServiceCategoryController::class, 'store']);
$router->add('PUT', '/service-categories/{id}', [ServiceCategoryController::class, 'update']);
$router->add('DELETE', '/service-categories/{id}', [ServiceCategoryController::class, 'destroy']);

// Exécution du routeur
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
