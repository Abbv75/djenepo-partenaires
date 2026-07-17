<?php
namespace App\Models;

use PDO;

class BlogPost extends Model {
    protected $table = 'blog_posts';

    public function getByCategoryId($categoryId) {
        $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE category_id = :category_id");
        $stmt->execute(['category_id' => $categoryId]);
        return $stmt->fetchAll();
    }
}
