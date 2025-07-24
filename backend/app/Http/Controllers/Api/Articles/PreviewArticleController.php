<?php

namespace App\Http\Controllers\Api\Articles;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\Articles\PreviewArticleResource;
use App\Models\Article;
use Illuminate\Http\Resources\Json\JsonResource;

class PreviewArticleController extends Controller
{
    public function __invoke(string $token): JsonResource
    {
        $article = Article::with(['category', 'tags', 'coverImage', 'thumbnailImage'])
            ->where('limited_access_token', $token)
            ->firstOrFail();

        return new PreviewArticleResource($article);
    }
}
