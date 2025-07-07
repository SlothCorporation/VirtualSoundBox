<?php

namespace App\Http\Controllers\Admin\Category;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class DestroyCategoryController
{
    public function __invoke($id): JsonResponse
    {
        $category = Category::withCount('articles')->findOrFail($id);

        if ($category->articles_count > 0) {
            return response()->json([
                'message' => 'このカテゴリには記事が紐づいているため削除できません。',
            ], Response::HTTP_CONFLICT);
        }

        $category->delete();
        return response()->json(['message' => 'カテゴリーを削除しました']);
    }
}
