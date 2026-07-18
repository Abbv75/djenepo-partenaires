<?php
require_once __DIR__ . '/common.php';

$controller = new \App\Controllers\AuthController();
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $controller->logout();
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
