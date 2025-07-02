<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Articles\StoreArticleRequest;
use App\Models\Article;
use App\Models\ArticleTag;
use App\Models\Tag;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StoreArticleController extends Controller
{
    public function __invoke(StoreArticleRequest $request): JsonResponse
    {
        return DB::transaction(function () use ($request) {
            $category = Category::where('slug', $request->category)->first();

            $article = Article::create([
                'title' => $request->title,
                'slug' => Str::slug($request->title),
                'type' => $request->content_type,
                'body' => $request->body,
                'external_url' => $request->external_url,
                'external_description' => $request->external_description,
                'status' => 'draft',
                'category_id' => $category?->id,
            ]);

            if ($request->has('tags')) {
                foreach ($request->tags as $tagName) {
                    $tag = Tag::firstOrCreate(
                        ['name' => $tagName],
                        ['slug' => Str::slug($tagName)]
                    );

                    ArticleTag::firstOrCreate([
                        'article_id' => $article->id,
                        'tag_id' => $tag->id
                    ]);
                }
            }

            return response()->json([
                'message' => '記事を保存しました。',
                'article_id' => $article->id,
            ]);
        });
    }
}
