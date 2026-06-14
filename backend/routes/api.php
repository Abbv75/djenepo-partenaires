<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BlogPostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/categories/{categoryId}/blogs', [BlogPostController::class, 'getByCategoryId']);

Route::get('/blogs', [BlogPostController::class, 'index']);
Route::get('/blogs/{id}', [BlogPostController::class, 'show']);
