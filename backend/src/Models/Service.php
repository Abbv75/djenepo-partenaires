<?php
namespace App\Models;

use PDO;

class Service extends Model {
    protected $table = 'services';

    public function all() {
        // Pour simuler 'with("serviceCategory")' de Laravel, on peut faire un JOIN
        $sql = "SELECT s.*, sc.name as category_name, sc.icon as category_icon 
                FROM {$this->table} s 
                LEFT JOIN service_categories sc ON s.service_category_id = sc.id 
                ORDER BY s.id ASC";
        $stmt = $this->db->query($sql);
        $results = $stmt->fetchAll();

        // Le champ features était un array casté en JSON dans Laravel
        foreach ($results as &$row) {
            if (isset($row['features']) && is_string($row['features'])) {
                $decoded = json_decode($row['features'], true);
                $row['features'] = $decoded ?: [];
            }
        }
        return $results;
    }

    public function find($id) {
        $result = parent::find($id);
        if ($result && isset($result['features']) && is_string($result['features'])) {
            $decoded = json_decode($result['features'], true);
            $result['features'] = $decoded ?: [];
        }
        return $result;
    }
}
