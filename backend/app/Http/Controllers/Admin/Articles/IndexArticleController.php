<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Articles\IndexArticleRequest;
use App\Http\Resources\Admin\Articles\IndexArticleResource;
use App\Models\Article;

class IndexArticleController extends Controller
{
    public function __invoke(IndexArticleRequest $request)
    {
        $perPage = $request->input('per_page', 20);

        $articles = Article::query()
            ->with(['tags', 'category']) // ← 必要であれば eager load
            ->orderBy('updated_at', 'desc')
            ->paginate($perPage);

        return IndexArticleResource::collection($articles);
    }
}
