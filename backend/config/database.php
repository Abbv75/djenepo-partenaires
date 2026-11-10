<?php

// Chargeur automatique de variables d'environnement natif (zéro dépendance externe)
(function() {
    $envFile = __DIR__ . '/../.env';
    if (!file_exists($envFile)) {
        return;
    }
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $key = trim($parts[0]);
            $val = trim($parts[1]);
            // Retirer les guillemets simples ou doubles encadrants
            if (
                (str_starts_with($val, '"') && str_ends_with($val, '"')) ||
                (str_starts_with($val, "'") && str_ends_with($val, "'"))
            ) {
                $val = substr($val, 1, -1);
            }
            $_ENV[$key] = $val;
            putenv("{$key}={$val}");
        }
    }
})();

function getDatabaseEnv(string $key, string $default = ''): string {
    if (array_key_exists($key, $_ENV)) {
        return (string) $_ENV[$key];
    }
    $val = getenv($key);
    if ($val !== false) {
        return (string) $val;
    }
    return $default;
}

// Configuration de la base de données
// Utilise les variables de backend/.env si présent, avec fallback de sécurité vers les paramètres OVH
define('DB_HOST', getDatabaseEnv('DB_HOST', 'localhost'));
define('DB_PORT', getDatabaseEnv('DB_PORT', '3306'));
define('DB_NAME', getDatabaseEnv('DB_NAME', 'c0dje3205')); 
define('DB_USER', getDatabaseEnv('DB_USER', 'c0dje3205')); 
define('DB_PASS', getDatabaseEnv('DB_PASS', '!!U!Mydbla-CO')); 
define('JWT_SECRET', getDatabaseEnv('JWT_SECRET', 'super_secret_key_change_me'));

class Database {
    private static $instance = null;

    public static function getConnection() {
        if (self::$instance === null) {
            try {
                $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
                self::$instance = new PDO($dsn, DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["error" => "Database connection failed"]);
                exit;
            }
        }
        return self::$instance;
    }
}
