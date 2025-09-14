<?php

namespace App\GraphQL\Queries;

use App\Helpers\GraphQLHelper;
use App\Models\Article;

class ArticleQuery
{
    public function paginatedArticles($_, array $args): ?array
    {
        $filter = $args['filter'] ?? [];

        $query = Article::with(['tags', 'category', 'coverImage', 'thumbnailImage'])
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc');

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

        $articles = $query->paginate($args['perPage'] ?? 10, ['*'], 'page', $args['page'] ?? 1);
        return GraphQLHelper::toGraphQLPaginated($articles);
    }

    public function article($_, array $args): ?array
    {
        $article = Article::with(['tags', 'category', 'coverImage', 'thumbnailImage'])
            ->where('id', $args['id'])
            ->whereNotNull('published_at')
            ->first();
        return GraphQLHelper::toGraphQLObject($article);
    }

    public function previewArticle($_, array $args): ?array
    {
        $article = Article::with(['tags', 'category', 'coverImage', 'thumbnailImage'])
            ->where('limited_access_token', $args['token'])
            ->first();

        // published_atに現在時刻を文字列でセットして、プレビュー可能にする
        $article->published_at = now()->toDateTimeString();
        return GraphQLHelper::toGraphQLObject($article);
    }
}
