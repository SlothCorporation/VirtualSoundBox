<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Articles\IndexArticleRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Article;

class IndexArticleController extends Controller
{
    public function __invoke(IndexArticleRequest $request): JsonResponse
    {
        $perPage = $request->input('per_page');

        $query = Article::query();

        $query->orderBy('updated_at', 'DESC');

        $article = $query->latest()->paginate($perPage);
        return response()->json($article);
    }
}
