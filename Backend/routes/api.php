<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\UserController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/addBlog', [BlogController::class, 'Add']);

Route::get('/logout', [UserController::class, 'logout']);

Route::get('/getBlog', [BlogController::class, 'GetBlogs']);
Route::get('/getBlog/{id}', [BlogController::class, 'GetSingleBlog']);
Route::get('/getPublishedBlog', [BlogController::class, 'GetPublishedBlog']);

Route::put('/editBlog/{id}', [BlogController::class, 'EditBlog']);
Route::delete('/deleteBlog/{id}', [BlogController::class, 'DeleteBlog']);
