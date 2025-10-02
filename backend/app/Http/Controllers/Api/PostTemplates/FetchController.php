<?php

namespace App\Http\Controllers\Api\PostTemplates;

use App\Http\Controllers\Controller;
use App\Models\PostTemplate;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class FetchController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $postTemplates = PostTemplate::where('user_uuid', $user->uuid)->get();

        return response()->json($postTemplates);
    }
}
