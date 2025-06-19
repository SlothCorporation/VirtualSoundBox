<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\JsonResponse;

class ShowArticleController extends Controller
{
    public function __invoke($id): JsonResponse
    {
        $article = Article::with('id', $id)->first();
        return response()->json($article);
    }
}
