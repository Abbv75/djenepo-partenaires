<?php

namespace App\Http\Controllers;

use App\Models\ServiceCategory;
use Illuminate\Http\Request;

class ServiceCategoryController extends Controller
{
    public function index()
    {
        $categories = ServiceCategory::orderBy('id', 'asc')->get();
        return $this->success($categories);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:service_categories,name|max:255',
            'icon' => 'required|string|max:255',
        ]);

        $category = ServiceCategory::create($validated);
        return $this->success($category, 'Catégorie de service créée avec succès', 201);
    }

    public function update(Request $request, int $id)
    {
        $category = ServiceCategory::find($id);
        if (!$category) {
            return $this->notFound('Catégorie de service introuvable');
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:service_categories,name,' . $id,
            'icon' => 'sometimes|required|string|max:255',
        ]);

        $category->update($validated);
        return $this->success($category, 'Catégorie de service mise à jour avec succès');
    }

    public function destroy(int $id)
    {
        $category = ServiceCategory::find($id);
        if (!$category) {
            return $this->notFound('Catégorie de service introuvable');
        }

        $category->delete();
        return $this->success(null, 'Catégorie de service supprimée avec succès');
    }
}
