<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Report;

use App\Models\Like;

use Illuminate\Support\Facades\Log;

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
           
            $blogs = Blog::with('description', 'user.profile', 'category','likes','comments')
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

    public function addComment(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
    
        try {
            $blog = Blog::find($id);
            if (!$blog) {
                return response()->json(['error' => 'Blog not found.'], 404);
            }
    
            $comment = new Comment();
            $comment->content = $request->content;
            $comment->blog_id = $id;
            // $comment->user_id = auth()->id() ?? null;
            $comment->user_id = 1;

            $comment->save();
    
            $comment = Comment::with('user.profile')->find($comment->id);
    
            return response()->json($comment, 201);
        } catch (\Exception $e) {
            \Log::error('Error adding comment:', [
                'blog_id' => $id,
                'error' => $e->getMessage(),
            ]);
    
            return response()->json(['error' => 'Failed to add comment.'], 500);
        }
    }
    
public function reportBlog(Request $request, $id)
{
    $request->validate([
        'user_id' => 'required|integer',
        'reason' => 'required|string|max:500',
    ]);

    try {
        $blog = Blog::find($id);
        if (!$blog) {
            return response()->json(['error' => 'Blog not found.'], 404);
        }

        // Save the report
        $report = new Report();
        $report->blog_id = $id;
        $report->user_id = $request->user_id;
        $report->reason = $request->reason;
        $report->save();

        return response()->json(['message' => 'Report submitted successfully.'], 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to submit report.'], 500);
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
    
    // Function to get likes by blog id
    public function getLikes($id)
    {
        try {
            $likes = Like::with('user.profile')
                ->where('blog_id', $id)
                ->orderBy('created_at', 'desc')
                ->get();
    
            return response()->json($likes);
        } catch (\Exception $e) {
            \Log::error('Error fetching likes:', [
                'blog_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return response()->json(['error' => 'An error occurred while fetching likes.', 'details' => $e->getMessage()], 500);
        }
    }

    public function create(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|exists:categories,id', // Ensure the category exists
            'image' => 'nullable|image|max:2048', // Optional image upload
        ]);
    

    try {
        // Retrieve the authenticated user
        $user = $request->user();

        // Handle the image upload if provided
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('blogs', 'public');
        }
        $imagePath = "http://localhost:8000/storage/" . $imagePath;

        // Create the blog
        $blog = Blog::create([
            'title' => $request->title,
            'content' => $request->content,
            'image' => $imagePath,
            'user_id' => $user->id,
            'category_id' => $request->category,
        ]);

        // Create the blog description
        $blog->description()->create([
            'description' => $request->description,
        ]);

        return response()->json([
            'message' => 'Blog created successfully',
            'blog' => $blog->load('description', 'category', 'user.profile'),
        ], 201);
    } catch (\Exception $e) {
        \Log::error('Error creating blog:', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return response()->json(['error' => 'Failed to create blog.'], 500);
    }
    }
  public function edit(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'required|string',
            'category' => 'required|exists:categories,id', // Ensure the category exists
            'image' => 'nullable|max:2048', // Optional image upload
        ]);
    
        try {
            // Retrieve the authenticated user
            $user = $request->user();
    
            // Find the blog by ID
            $blog = Blog::findOrFail($id);
    
            // Handle the image upload if provided
            $imagePath = null;
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('blogs', 'public');
                $imagePath = "http://localhost:8000/storage/" . $imagePath;
                $blog->image = $imagePath; // Update the image path in the blog
            }
    
            // Update the blog details
            $blog->title = $request->title;
            $blog->content = $request->content;
            $blog->category_id = $request->category;
            $blog->save();
    
            // Update the blog description
            $blog->description()->update([
                'description' => $request->description,
            ]);
    
            return response()->json([
                'message' => 'Blog updated successfully',
                'blog' => $blog->load('description', 'category', 'user.profile'),
            ], 200);
        } catch (\Exception $e) {
            \Log::error('Error updating blog:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
    
            return response()->json(['error' => 'Failed to update blog.'], 500);
        }
    }
}

