<?php

namespace App\Http\Controllers\Api\Accounts;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class FetchUserProfileController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        return response()->json([
            'uuid' => $user->uuid,
            'name' => $user->name,
            'email' => $user->email,
            'plan' => $user->plan,
            'admin_flg' => $user->admin_flg,
        ]);
    }
}
