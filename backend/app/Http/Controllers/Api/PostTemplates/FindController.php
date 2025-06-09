<?php

namespace App\Http\Controllers\Api\PostTemplates;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\PostTemplate;

class FindController extends Controller
{
    public function __invoke(string $id): JsonResponse
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => '認証されていません。'], 401);
        }

        $postTemplate = PostTemplate::where('uuid', $id)
            ->where('user_uuid', $user->uuid)
            ->first();

        if (!$postTemplate) {
            return response()->json(['message' => 'テンプレートが見つかりません。'], 404);
        }

        return response()->json($postTemplate);
    }
}
