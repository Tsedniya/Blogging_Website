<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogController;





use Illuminate\Session\Middleware\StartSession;

Route::middleware([StartSession::class])->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/signup', [AuthController::class, 'signup']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/check-session', [AuthController::class, 'checkSession']);

  
    
});

Route::get('/auth/google/redirect', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// Route::get('/index', function () {
//     return response()->json(['message' => 'Hello from Laravel!']);
// });

Route::get('/index', [BlogController::class, 'index']);

Route::get('/auth/check', [BlogController::class, 'checkAuth']);
Route::get('/blogs/{id}', [BlogController::class, 'getBlog']);
Route::get('/blogs/{id}/comments', [BlogController::class, 'getComments']);
Route::post('/blogs/{id}/comments', [BlogController::class, 'addComment']);
Route::post('/blogs/{id}/report', [BlogController::class, 'reportBlog']);