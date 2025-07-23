<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\JsonResponse;

class CreateEmptyArticleController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $article = Article::create(['title' => '新しい記事']);

        return response()->json([
            'message' => '空の記事を作成しました。',
            'article_id' => $article->id,
        ]);
    }
}
