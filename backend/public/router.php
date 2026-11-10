<?php
// Routeur pour le serveur de développement PHP local (ex: php -S localhost:8000 -t backend/public backend/public/router.php)

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Si le fichier existe physiquement, le servir directement
if ($uri !== '/' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Nettoyer d'éventuels préfixes si le serveur est lancé à la racine
if (strpos($uri, '/backend/public') === 0) {
    $uri = substr($uri, 15);
}
if (strpos($uri, '/api') === 0) {
    $uri = substr($uri, 4);
}
if ($uri === '') {
    $uri = '/';
}

// Routes d'authentification
if ($uri === '/login' || $uri === '/login/') {
    require __DIR__ . '/login.php';
} elseif ($uri === '/logout' || $uri === '/logout/') {
    require __DIR__ . '/logout.php';
} elseif ($uri === '/user' || $uri === '/user/') {
    require __DIR__ . '/user.php';

// Routes Catégories
} elseif (preg_match('#^/categories/([0-9]+)/blogs/?$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    $_GET['action'] = 'blogs';
    require __DIR__ . '/categories.php';
} elseif (preg_match('#^/categories/([0-9]+)/?$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    require __DIR__ . '/categories.php';
} elseif ($uri === '/categories' || $uri === '/categories/') {
    require __DIR__ . '/categories.php';

// Routes Blogs
} elseif (preg_match('#^/blogs/([0-9]+)/?$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    require __DIR__ . '/blogs.php';
} elseif ($uri === '/blogs' || $uri === '/blogs/') {
    require __DIR__ . '/blogs.php';

// Routes Services
} elseif (preg_match('#^/services/([0-9]+)/?$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    require __DIR__ . '/services.php';
} elseif ($uri === '/services' || $uri === '/services/') {
    require __DIR__ . '/services.php';

// Routes Catégories de Services
} elseif (preg_match('#^/service-categories/([0-9]+)/?$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    require __DIR__ . '/service-categories.php';
} elseif ($uri === '/service-categories' || $uri === '/service-categories/') {
    require __DIR__ . '/service-categories.php';

// 404
} else {
    header('Content-Type: application/json; charset=utf-8');
    http_response_code(404);
    echo json_encode(['error' => 'Route not found: ' . $uri]);
}
