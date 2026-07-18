<?php
require_once __DIR__ . '/common.php';

$controller = new \App\Controllers\ServiceCategoryController();
$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($method === 'GET') {
    $controller->index();
} elseif ($method === 'POST') {
    $controller->store();
} elseif ($method === 'PUT') {
    if ($id) {
        $controller->update($id);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'ID required']);
    }
} elseif ($method === 'DELETE') {
    if ($id) {
        $controller->destroy($id);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'ID required']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
