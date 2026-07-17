<?php
namespace App\Controllers;

use App\Models\ServiceCategory;
use App\Auth\Jwt;

class ServiceCategoryController extends Controller {
    private $model;

    public function __construct() {
        $this->model = new ServiceCategory();
    }

    public function index() {
        $categories = $this->model->all();
        $this->success($categories);
    }

    public function store() {
        Jwt::checkAuth();
        $data = getJsonInput();
        if (empty($data['name']) || empty($data['icon'])) {
            $this->error("Validation failed", 422);
        }
        
        $id = $this->model->create([
            'name' => $data['name'],
            'icon' => $data['icon']
        ]);
        $this->success($this->model->find($id), "Service Category created", 201);
    }

    public function update($id) {
        Jwt::checkAuth();
        $category = $this->model->find($id);
        if (!$category) $this->error("Not found", 404);

        $data = getJsonInput();
        $updateData = [];
        if (isset($data['name'])) $updateData['name'] = $data['name'];
        if (isset($data['icon'])) $updateData['icon'] = $data['icon'];

        if (!empty($updateData)) {
            $this->model->update($id, $updateData);
        }
        $this->success($this->model->find($id));
    }

    public function destroy($id) {
        Jwt::checkAuth();
        $category = $this->model->find($id);
        if (!$category) $this->error("Not found", 404);

        $this->model->delete($id);
        $this->success([], "Service Category deleted");
    }
}
