<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Articles\UploadArticleImageRequest;
use App\Http\Resources\Admin\Articles\UploadArticleImageResource;
use App\Models\Article;
use App\Models\ArticleImage;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadArticleImageController extends Controller
{
    public function __invoke(UploadArticleImageRequest $request, int $id): JsonResource
    {
        $article = Article::findOrFail($id);

        $file = $request->file('image');
        $type = $request->input('type');

        $path = "articles/{$article->id}/{$type}";
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $storedPath = $file->storeAs($path, $filename, 's3');
        $url = Storage::disk('s3')->url($storedPath);

        $image = ArticleImage::create([
            'article_id' => $article->id,
            'type' => $type,
            'url' => $url,
            'path' => $storedPath,
            'original_name' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
        ]);

        return new UploadArticleImageResource($image);
    }
}
