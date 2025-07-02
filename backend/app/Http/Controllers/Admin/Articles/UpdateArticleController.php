<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Articles\UpdateArticleRequest;
use App\Models\Article;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class UpdateArticleController extends Controller
{
    public function __invoke(UpdateArticleRequest $request, $id): JsonResponse
    {
        try {
            DB::transaction(function () use ($request, $id) {
                $article = Article::findOrFail($id);

                $article->title = $request->title;
                $article->type = $request->content_type;
                $article->body = $request->body;
                $article->external_url = $request->external_url;
                $article->external_description = $request->external_description;

                // カテゴリーの設定（1:1）
                if ($request->filled('category')) {
                    $category = Category::where('slug', $request->category)->first();
                    if ($category) {
                        $article->category()->associate($category);
                    }
                } else {
                    $article->category()->dissociate();
                }

                $article->save();

                // タグの処理（多対多）
                $tagIds = collect($request->tags)->map(function ($tagName) {
                    return Tag::firstOrCreate(
                        ['name' => $tagName],
                        ['slug' => Str::slug($tagName)]
                    )->id;
                });
                $article->tags()->sync($tagIds);
            });

            return response()->json(['message' => '記事を更新しました。']);
        } catch (\Throwable $e) {
            Log::error('記事更新時にエラーが発生しました', [
                'userId' => auth()->id(),
                'exception' => $e,
            ]);

            return response()->json([
                'message' => '記事の更新に失敗しました。',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
