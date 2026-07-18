<?php

// Configuration de la base de données
// À adapter avec les vraies valeurs du `.env` de Laravel (ou utiliser dotenv si on l'installe)
define('DB_HOST', 'localhost'); // localhost est le plus commun pour les db distantes sur même hébergement, ou 127.0.0.1
define('DB_PORT', '3306');
define('DB_NAME', 'c0dje3205'); 
define('DB_USER', 'c0dje3205'); 
define('DB_PASS', '!!U!Mydbla-CO'); 
define('JWT_SECRET', 'super_secret_key_change_me'); // À changer en production

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
