<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Report;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
      
        if ($request->user()) {
   $blogs = Blog::whereHas('user.followers', function ($query) use ($request) {
                $query->where('follower_id', $request->user()->id);
            })
            ->with('description', 'user.profile', 'category')
            ->orderBy('created_at', 'desc')
            ->get();
        } else {
           
            $blogs = Blog::with('description', 'user.profile', 'category')
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return response()->json($blogs);
    }
    public function checkAuth(Request $request)
    {
        if (auth()->check()) {
            return response()->json([
                'authenticated' => true,
                'user' => auth()->user(), 
            ]);
        }
    
        return response()->json([
            'authenticated' => true,
            'message' => 'User is not authenticated. Please sign in.',
        ], 200);
    }


 
    public function getBlog($id)
    {
        try {
            $blog = Blog::with('user.profile', 'category', 'description')->find($id);
    
            if (!$blog) {
                return response()->json(['error' => 'Blog not found'], 404);
            }
    
            return response()->json($blog);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching the blog.', 'details' => $e->getMessage()], 500);
        }
    }
   

   
    public function getComments($id)
    {
        try {
            $comments = Comment::with('user.profile')
                ->where('blog_id', $id)
                ->orderBy('created_at', 'desc')
                ->get();
    
            return response()->json($comments);
        } catch (\Exception $e) {
         
            \Log::error('Error fetching comments:', [
                'blog_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return response()->json(['error' => 'An error occurred while fetching comments.', 'details' => $e->getMessage()], 500);
        }
    }

    // Function to get reported blogs by id
    public function getReportedBlog($id){
        try{
            $reports = Report::with('user.profile')
                ->where('blog_id', $id)
                ->orderBy('created_at', 'desc')
                ->get();
            return response()->json($reports);
        } catch(\Exception $e){
            \Log::error('Error fetching reported blogs:', [
                'blog_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return response()->json(['error' => 'An error occurred while fetching reported blogs.', 'details' => $e->getMessage()], 500);
        }
    }

    public function getReportedBlogs(Request $request)
    {
        try {
            $reportedBlogs = Report::with('blog.user.profile', 'blog.category')
                ->where('user_id', $request->user()->id)
                ->orderBy('created_at', 'desc')
                ->get();
    
            return response()->json($reportedBlogs);
        } catch (\Exception $e) {
            \Log::error('Error fetching reported blogs:', [
                'user_id' => $request->user()->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return response()->json(['error' => 'An error occurred while fetching reported blogs.', 'details' => $e->getMessage()], 500);
        }
    }
    
    
}

