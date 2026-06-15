<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'tagline',
        'desc',
        'features',
        'icon',
    ];

    protected $casts = [
        'features' => 'array',
    ];
}
