<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Articles\ShowArticleResource;
use App\Models\Article;

class ShowArticleController extends Controller
{
    public function __invoke($id)
    {
        $article = Article::with(['tags', 'category', 'coverImage', 'thumbnailImage'])->findOrFail($id);

        return new ShowArticleResource($article);
    }
}
