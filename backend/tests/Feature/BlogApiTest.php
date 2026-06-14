<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Category;
use App\Models\BlogPost;

class BlogApiTest extends TestCase
{
    use RefreshDatabase;

    private function createPost($categoryId)
    {
        return BlogPost::create([
            'category_id' => $categoryId,
            'title' => 'Test Post',
            'excerpt' => 'Excerpt',
            'content' => 'Content',
            'author_name' => 'Author',
            'read_time' => '5 min read',
            'date' => now()->toDateString(),
            'image_url' => 'test.jpg'
        ]);
    }

    public function test_can_list_all_blogs()
    {
        $category = Category::create(['name' => 'Tech', 'icon' => 'FaLaptop']);
        $this->createPost($category->id);
        $this->createPost($category->id);

        $response = $this->getJson('/api/blogs');

        $response->assertStatus(200)
                 ->assertJsonCount(2, 'data');
    }

    public function test_can_filter_blogs_by_category()
    {
        $category1 = Category::create(['name' => 'Tech', 'icon' => 'FaLaptop']);
        $category2 = Category::create(['name' => 'News', 'icon' => 'FaNewspaper']);
        
        $this->createPost($category1->id);
        $this->createPost($category1->id);
        $this->createPost($category2->id);

        $response = $this->getJson("/api/categories/{$category1->id}/blogs");

        $response->assertStatus(200)
                 ->assertJsonCount(2, 'data');
    }

    public function test_can_get_single_blog()
    {
        $category = Category::create(['name' => 'Tech', 'icon' => 'FaLaptop']);
        $post = $this->createPost($category->id);

        $response = $this->getJson("/api/blogs/{$post->id}");

        $response->assertStatus(200)
                 ->assertJsonPath('data.id', $post->id);
    }

    public function test_returns_404_if_blog_not_found()
    {
        $response = $this->getJson('/api/blogs/999');

        $response->assertStatus(404);
    }
}
