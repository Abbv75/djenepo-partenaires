<?php
namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    public function index()
    {
        $blogs = BlogPost::with('category')->orderBy('id', 'asc')->get();
        return $this->success($blogs);
    }

    public function getByCategoryId(int $categoryId)
    {
        $blogs = BlogPost::with('category')
            ->where('category_id', $categoryId)
            ->orderBy('id', 'asc')
            ->get();
            
        return $this->success($blogs);
    }

    public function show(int $id)
    {
        $blog = BlogPost::with('category')->find($id);
        if (!$blog) {
            return $this->notFound('Article introuvable');
        }
        return $this->success($blog);
    }
}
