<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Report;
use App\Models\Blog;

class DashboardController extends Controller
{
    public function getStats()
    {
        $totalUsers = User::count();
        $totalReports = Report::count();
        $totalBlogs = Blog::count();

        return response()->json([
            'totalUsers' => $totalUsers,
            'totalReports' => $totalReports,
            'totalBlogs' => $totalBlogs,
        ]);
    }
    public function getAllUsers()
    {
        $users = User::join('profiles', 'users.id', '=', 'profiles.id')
            ->select('users.id', 'profiles.name', 'profiles.email', 'users.created_at')
            ->get();
    
        return response()->json($users);
    }
}