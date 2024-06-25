<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    // Register
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'fname' => $request->fname,
            'lname' => $request->lname,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json(['message' => 'User registered successfully', 'user' => $user], 201);
    }

    // Login 
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');
        $email = $request->input('email');

        // Check for too many login attempts
        $attempts = Cache::get('login_attempts_' . $email, 0);
        if ($attempts >= 2) {
            return response()->json(['message' => 'Too many login attempts. Please try again later.'], 429);
        }

        if (!$token = JWTAuth::attempt($credentials)) {
            // Increment the login attempts
            Cache::put('login_attempts_' . $email, $attempts + 1, now()->addMinutes(30)); // Set a TTL of 30 minutes

            return response()->json(['message' => 'Invalid email or password'], 401);
        }

        // Reset login attempts on successful login
        Cache::forget('login_attempts_' . $email);

        $user = auth()->user();

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    // Logout
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User logged out successfully'], 200);
    }
}
