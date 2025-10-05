<?php

namespace App\Http\Controllers\Api\PostTemplates;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostTemplates\SaveRequest;
use App\Models\PostTemplate;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SaveController extends Controller
{
    public function __invoke(SaveRequest $request): JsonResponse
    {
        $user = Auth::user();

        try {
            $data = $request->input('data');

            $postTemplate = PostTemplate::where('uuid', $data['uuid'])
                ->where('user_uuid', $user->uuid)
                ->first();

            if (!$postTemplate) {
                return response()->json([
                    'message' => 'テンプレートが見つかりません。',
                ], 404);
            }

            $postTemplate->update([
                'name' => $data['name'],
                'type' => $data['type'],
                'content' => $data['content'],
            ]);

            return response()->json([
                'message' => 'テンプレートが保存されました。',
                'template' => $postTemplate,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'テンプレートの保存に失敗しました。',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
