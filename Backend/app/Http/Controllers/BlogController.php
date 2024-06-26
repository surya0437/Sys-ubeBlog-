<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class BlogController extends Controller
{
    public function Add(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blogs',
            'description' => 'required|string',
            'blogImage' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        if ($request->hasFile('blogImage')) {
            $file = $request->file('blogImage');
            $filename = rand(100000, 999999) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('BlogImage'), $filename);

            $blog = Blog::create([
                'title' => $request->title,
                'slug' => $request->slug,
                'description' => $request->description,
                'blogImage' => $filename,
                'status' => $request->status == "true" ? true : false,
            ]);
            return response()->json(['message' => 'Blog created successfully', 'blog' => $blog], 201);
        } else {
            return response()->json(['message' => 'Image not found'], 401);
        }
    }

    public function EditBlog(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blogs,slug,' . $blog->id,
            'description' => 'required|string',
            'status' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $blog->title = $request->title;
        $blog->slug = $request->slug;
        $blog->description = $request->description;
        $blog->status = $request->status;

        $blog->save();

        return response()->json(['message' => 'Blog updated successfully', 'blog' => $blog], 200);
    }


    public function GetBlogs()
    {
        $blogs = Blog::all()->map(function ($blog) {
            $blog->blogImage = url('BlogImage/' . $blog->blogImage);
            return $blog;
        });

        return response()->json($blogs, 200);
    }

    public function GetPublishedBlog()
    {
        $blogs = Blog::where('status', true)->get()->map(function ($blog) {
            $blog->blogImage = url('BlogImage/' . $blog->blogImage);
            return $blog;
        });

        return response()->json($blogs, 200);
    }

    public function GetSingleBlog($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        $blog->blogImage = url('BlogImage/' . $blog->blogImage);

        return response()->json($blog, 200);
    }

    public function DeleteBlog($id)
    {
        $blog = Blog::find($id);

        if (!$blog) {
            return response()->json(['message' => 'Blog not found'], 404);
        }

        if ($blog->blogImage) {
            $imagePath = public_path('BlogImage/' . $blog->blogImage);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $blog->delete();

        return response()->json(['message' => 'Blog deleted successfully'], 200);
    }
}
