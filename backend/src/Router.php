<?php

namespace App;

class Router {
    private $routes = [];

    public function add($method, $path, $handler) {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'handler' => $handler
        ];
    }

    public function dispatch($method, $uri) {
        // Enlever les query parameters
        $uri = parse_url($uri, PHP_URL_PATH);
        
        // Retirer le basePath si l'API n'est pas à la racine du domaine
        $basePath = dirname($_SERVER['SCRIPT_NAME']);
        if (strpos($uri, $basePath) === 0 && $basePath !== '/') {
            $uri = substr($uri, strlen($basePath));
        }
        
        // Supprimer le préfixe /api si le frontend continue de l'envoyer comme sous Laravel
        if (strpos($uri, '/api') === 0) {
            $uri = substr($uri, 4);
        }
        
        if ($uri === '') $uri = '/';

        foreach ($this->routes as $route) {
            // Remplacer les {param} par une regex
            $pattern = preg_replace('/\{([a-zA-Z0-9_]+)\}/', '([a-zA-Z0-9_-]+)', $route['path']);
            $pattern = '@^' . $pattern . '$@D';

            if ($route['method'] === $method && preg_match($pattern, $uri, $matches)) {
                array_shift($matches); // Enlever la correspondance complète
                
                if (is_callable($route['handler'])) {
                    call_user_func_array($route['handler'], $matches);
                    return;
                }

                if (is_array($route['handler'])) {
                    $controllerName = $route['handler'][0];
                    $action = $route['handler'][1];
                    $controller = new $controllerName();
                    call_user_func_array([$controller, $action], $matches);
                    return;
                }
            }
        }

        http_response_code(404);
        echo json_encode(["error" => "Route not found"]);
    }
}
