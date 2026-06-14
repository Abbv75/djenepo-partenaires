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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blog_posts',
            'excerpt' => 'required|string',
            'content' => 'required|string',
            'author_name' => 'required|string|max:255',
            'read_time' => 'required|string|max:50',
            'image_url' => 'required|string',
            'date' => 'required|date',
        ]);

        $blog = BlogPost::create($validated);
        return $this->success($blog->load('category'), 'Article créé avec succès', 201);
    }

    public function update(Request $request, int $id)
    {
        $blog = BlogPost::find($id);
        if (!$blog) {
            return $this->notFound('Article introuvable');
        }

        $validated = $request->validate([
            'category_id' => 'sometimes|required|exists:categories,id',
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:blog_posts,slug,' . $id,
            'excerpt' => 'sometimes|required|string',
            'content' => 'sometimes|required|string',
            'author_name' => 'sometimes|required|string|max:255',
            'read_time' => 'sometimes|required|string|max:50',
            'image_url' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
        ]);

        $blog->update($validated);
        return $this->success($blog->load('category'), 'Article mis à jour avec succès');
    }

    public function destroy(int $id)
    {
        $blog = BlogPost::find($id);
        if (!$blog) {
            return $this->notFound('Article introuvable');
        }

        $blog->delete();
        return $this->success(null, 'Article supprimé avec succès');
    }
}
