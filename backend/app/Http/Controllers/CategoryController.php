<?php
namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return $this->success(Category::all());
    }

    public function show(int $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->notFound('Catégorie introuvable');
        }
        return $this->success($category);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|string|max:255',
        ]);

        $category = Category::create($validated);
        return $this->success($category, 'Catégorie créée avec succès', 201);
    }

    public function update(Request $request, int $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->notFound('Catégorie introuvable');
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'icon' => 'sometimes|required|string|max:255',
        ]);

        $category->update($validated);
        return $this->success($category, 'Catégorie mise à jour avec succès');
    }

    public function destroy(int $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return $this->notFound('Catégorie introuvable');
        }

        $category->delete();
        return $this->success(null, 'Catégorie supprimée avec succès');
    }
}
