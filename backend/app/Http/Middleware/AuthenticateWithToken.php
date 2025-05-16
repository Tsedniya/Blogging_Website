<?php
namespace App\Http\Middleware;

use Closure;
use App\Models\ApiToken;

class AuthenticateWithToken
{
    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $hashedToken = hash('sha256', $token);

        $apiToken = ApiToken::where('token', $hashedToken)->first();

        if (!$apiToken) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Attach the authenticated user to the request
        $request->merge(['user' => $apiToken->user]);

        return $next($request);
    }
}