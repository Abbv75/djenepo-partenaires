<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceCategoryController;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Admin CRUD Categories
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
    
    // Admin CRUD Blogs
    Route::post('/blogs', [BlogPostController::class, 'store']);
    Route::put('/blogs/{id}', [BlogPostController::class, 'update']);
    Route::delete('/blogs/{id}', [BlogPostController::class, 'destroy']);

    // Admin CRUD Services
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Admin CRUD Service Categories
    Route::post('/service-categories', [ServiceCategoryController::class, 'store']);
    Route::put('/service-categories/{id}', [ServiceCategoryController::class, 'update']);
    Route::delete('/service-categories/{id}', [ServiceCategoryController::class, 'destroy']);
});


Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/categories/{categoryId}/blogs', [BlogPostController::class, 'getByCategoryId']);

Route::get('/blogs', [BlogPostController::class, 'index']);
Route::get('/blogs/{id}', [BlogPostController::class, 'show']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/service-categories', [ServiceCategoryController::class, 'index']);
