<?php

namespace App\Http\Controllers\Api\Articles;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Articles\IndexArticleRequest;
use App\Http\Resources\Api\Articles\IndexArticleResourece;
use App\Models\Article;

class IndexArticleController extends Controller
{
    public function __invoke(IndexArticleRequest $request)
    {
        $query = Article::with(['tags', 'category', 'thumbnailImage'])
            ->whereNotNull('publish_at')
            ->orderBy('publish_at', 'desc');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('tag')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('slug', $request->tag);
            });
        }

        if ($request->filled('keyword')) {
            $keyword = $request->keyword;
            $query->where(function ($q) use ($keyword) {
                $q->where('title', 'like', "%{$keyword}%")
                    ->orWhere('body', 'like', "%{$keyword}%")
                    ->orWhereHas('tags', fn ($t) => $t->where('name', 'like', "%{$keyword}%"))
                    ->orWhereHas('category', fn ($c) => $c->where('name', 'like', "%{$keyword}%"));
            });
        }

        $articles = $query->paginate(20);

        return IndexArticleResourece::Collection($articles);
    }
}
