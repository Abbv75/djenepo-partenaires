<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;
    protected $fillable = [
        'category_id', 'title', 'date', 'read_time', 
        'excerpt', 'content', 'image_url', 'author_name', 
        'author_role', 'author_avatar'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
