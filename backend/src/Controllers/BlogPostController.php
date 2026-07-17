<?php
namespace App\Controllers;

use App\Models\BlogPost;
use App\Auth\Jwt;

class BlogPostController extends Controller {
    private $model;

    public function __construct() {
        $this->model = new BlogPost();
    }

    public function index() {
        $posts = $this->model->all();
        $this->success($posts);
    }

    public function show($id) {
        $post = $this->model->find($id);
        if (!$post) $this->error("Post not found", 404);
        $this->success($post);
    }

    public function getByCategoryId($categoryId) {
        $posts = $this->model->getByCategoryId($categoryId);
        $this->success($posts);
    }

    public function store() {
        Jwt::checkAuth();
        $data = getJsonInput();
        
        // Basic validation
        $required = ['category_id', 'title', 'date', 'read_time', 'excerpt', 'content', 'image_url', 'author_name', 'author_role'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                $this->error("Field {$field} is required", 422);
            }
        }

        $id = $this->model->create([
            'category_id' => $data['category_id'],
            'title' => $data['title'],
            'date' => $data['date'],
            'read_time' => $data['read_time'],
            'excerpt' => $data['excerpt'],
            'content' => $data['content'],
            'image_url' => $data['image_url'],
            'author_name' => $data['author_name'],
            'author_role' => $data['author_role'],
            'author_avatar' => $data['author_avatar'] ?? null
        ]);

        $this->success($this->model->find($id), "Post created", 201);
    }

    public function update($id) {
        Jwt::checkAuth();
        $post = $this->model->find($id);
        if (!$post) $this->error("Not found", 404);

        $data = getJsonInput();
        // Remove empty or unprovided fields
        $updateData = array_intersect_key($data, array_flip([
            'category_id', 'title', 'date', 'read_time', 'excerpt', 
            'content', 'image_url', 'author_name', 'author_role', 'author_avatar'
        ]));

        if (!empty($updateData)) {
            $this->model->update($id, $updateData);
        }
        $this->success($this->model->find($id));
    }

    public function destroy($id) {
        Jwt::checkAuth();
        $post = $this->model->find($id);
        if (!$post) $this->error("Not found", 404);

        $this->model->delete($id);
        $this->success([], "Post deleted");
    }
}
