<?php
namespace App\Controllers;

use App\Models\Service;
use App\Auth\Jwt;

class ServiceController extends Controller {
    private $model;

    public function __construct() {
        $this->model = new Service();
    }

    public function index() {
        $services = $this->model->all();
        $this->success($services);
    }

    public function store() {
        Jwt::checkAuth();
        $data = getJsonInput();
        
        $required = ['service_category_id', 'slug', 'title', 'tagline', 'desc', 'features', 'icon'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                $this->error("Field {$field} is required", 422);
            }
        }

        // Handle JSON array for features
        $features = is_array($data['features']) ? json_encode($data['features']) : $data['features'];

        $id = $this->model->create([
            'service_category_id' => $data['service_category_id'],
            'slug' => $data['slug'],
            'title' => $data['title'],
            'tagline' => $data['tagline'],
            'desc' => $data['desc'],
            'features' => $features,
            'icon' => $data['icon']
        ]);

        $this->success($this->model->find($id), "Service created", 201);
    }

    public function update($id) {
        Jwt::checkAuth();
        $service = $this->model->find($id);
        if (!$service) $this->error("Not found", 404);

        $data = getJsonInput();
        $updateData = array_intersect_key($data, array_flip([
            'service_category_id', 'slug', 'title', 'tagline', 'desc', 'features', 'icon'
        ]));

        if (isset($updateData['features']) && is_array($updateData['features'])) {
            $updateData['features'] = json_encode($updateData['features']);
        }

        if (!empty($updateData)) {
            $this->model->update($id, $updateData);
        }
        $this->success($this->model->find($id));
    }

    public function destroy($id) {
        Jwt::checkAuth();
        $service = $this->model->find($id);
        if (!$service) $this->error("Not found", 404);

        $this->model->delete($id);
        $this->success([], "Service deleted");
    }
}
