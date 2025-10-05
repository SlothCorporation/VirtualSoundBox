<?php

namespace App\GraphQL\Mutations;

use App\Models\Article;

class ArticleMutation
{
    public function likeArticle($_, array $args)
    {
        $article = Article::findOrFail($args['articleId']);
        $article->increment('like_count');

        return true;
    }
}
