<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
   
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
    
        // Query the database for the user using email and password
        $user = User::join('profiles', 'users.profile_id', '=', 'profiles.id')
            ->join('roles', 'users.role_id', '=', 'roles.id')
            ->where('profiles.email', $request->email)
            ->select('users.*', 'profiles.name as profile_name', 'profiles.email', 'roles.name as role_name')
            ->first();
        
        if (!$user) {
            return response()->json(['message' => 'User not found. Please sign up first.'], 404);
        }
    
        // Verify the password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials. Please try again.'], 401);
        }
    
        // Log in the user
        Auth::loginUsingId($user->id);
        // $request->session()->regenerate();
    
        $token = $user->createToken('auth-token')->plainTextToken;
        // Return the user data including role
        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->profile_name,
                'email' => $user->email,
                'role' => $user->role_name,
            ],
        ], 200);
    }
    public function me(Request $request)

    {
        $user = User::with(['profile', 'role'])
            ->where('id', $request->user()->id)
            ->first();
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        return response()->json([
            'id' => $user->id,
            'name' => $user->profile->name,
            'email' => $user->profile->email,
            'profile_image' => $user->profile->profile_image,
            'role' => $user->role->name,
            'is_admin' => $user->role->name === 'Admin',
        ], 200);
    }
 
    public function signup(Request $request)
    {
        $request->validate([
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);
    
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
    
    
        $user->profile()->create([
            'name' => $request->fullname,
            'email' => $request->email,
        ]);
    
        Auth::login($user);
    
        return response()->json([
            'message' => 'Sign-up successful',
            'user' => $user->load('profile'),
        ], 200);
    }

    
    public function redirectToGoogle()
    {
       
        return Socialite::driver('google')->redirect();
    }
    
    public function handleGoogleCallback()
    {
        try {
            // Retrieve the user's information from Google
            $googleUser = Socialite::driver('google')->stateless()->user();
    
            // Check if the user already exists in the database
            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()], // Match by email
                [
                    'name' => $googleUser->getName(), // Use the name from Google
                    'password' => Hash::make(uniqid()), // Generate a random password
                ]
            );
    
            if ($user->wasRecentlyCreated) {
                $user->profile()->create([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                ]);
            }
    
            // Log the user in
            Auth::login($user);
    
            // Return a success response with the user's data
            return response()->json([
                'message' => 'Login successful',
                'user' => Auth::user()->load('profile'), // Include profile data
            ], 200);
        } catch (\Exception $e) {
            // Handle any errors during the process
            return response()->json([
                'message' => 'Authentication failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logout successful'], 200);
    }

  
    public function checkSession(Request $request)
    {
        if (Auth::check()) {
            return response()->json([
                'authenticated' => true,
                'user' => Auth::user(),
            ], 200);
        }

        return response()->json(['authenticated' => false], 401);
    }
}