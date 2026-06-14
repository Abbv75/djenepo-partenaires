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
}
