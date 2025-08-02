<?php

namespace App\GraphQL\Queries;

use App\Http\Resources\GraphQL\ArticleResource;
use App\Http\Resources\GraphQL\GraphQLPaginatorResource;
use App\Models\Article;

class ArticleQuery
{
    public function paginatedArticles($_, array $args): array
    {
        $filter = $args['filter'] ?? [];

        $query = Article::with(['tags', 'category', 'coverImage', 'thumbnailImage'])
            ->whereNotNull('publish_at')
            ->orderBy('publish_at', 'desc');

        if (isset($filter['category'])) {
            $query->whereHas('category', function ($q) use ($filter) {
                $q->where('slug', $filter['category']);
            });
        }

        if (isset($filter['tag'])) {
            $query->whereHas('tags', function ($q) use ($filter) {
                $q->where('slug', $filter['tag']);
            });
        }

        if (isset($filter['keyword'])) {
            $query->where(function ($q) use ($filter) {
                $q->where('title', 'like', "%{$filter['keyword']}%")
                    ->orWhere('body', 'like', "%{$filter['keyword']}%")
                    ->orWhereHas('tags', fn ($t) => $t->where('name', 'like', "%{$filter['keyword']}%"))
                    ->orWhereHas('category', fn ($c) => $c->where('name', 'like', "%{$filter['keyword']}%"));
            });
        }

        $articles = $query->paginate($args['perPage'] ?? 10);
        return GraphQLPaginatorResource::format($articles, ArticleResource::class);
    }
}
