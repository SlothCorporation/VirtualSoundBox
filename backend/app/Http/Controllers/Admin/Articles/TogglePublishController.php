<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class TogglePublishController extends Controller
{
    public function __invoke(int $id): JsonResponse
    {
        try {
            $article = Article::findOrFail($id);
            $now = Carbon::now();

            switch ($article->status) {
                case 'published':
                    // 公開中 → 非公開に
                    $article->status = 'unpublished';
                    $article->publish_at = null;
                    break;

                case 'unpublished':
                case 'draft':
                    // 非公開 or 下書き → 今すぐ公開
                    $article->status = 'published';
                    $article->publish_at = $now;
                    break;

                case 'scheduled':
                    if ($article->publish_at && $article->publish_at->lte($now)) {
                        // 公開予定が今を過ぎていれば公開に切り替え
                        $article->status = 'published';
                    }
                    // 未来ならステータス維持（スキップ）
                    break;
            }

            $article->save();

            return response()->json([
                'message' => '公開状態を切り替えました。',
                'status' => $article->status,
                'publish_at' => $article->publish_at,
            ]);
        } catch (\Throwable $e) {
            Log::error('記事の公開状態切り替えでエラー', [
                'userId' => auth()->id(),
                'articleId' => $id,
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => '公開状態の切り替えに失敗しました。',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
