<?php
// filepath: backend/app/Http/Controllers/BlogController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'List of blogs']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Blog created successfully']);
    }
}