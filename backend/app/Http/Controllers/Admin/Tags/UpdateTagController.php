<?php

namespace App\Http\Controllers\Admin\Tags;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tags\UpdateTagRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Tag;
use Illuminate\Support\Str;

class UpdateTagController extends Controller
{
    public function __invoke(UpdateTagRequest $request, $id): JsonResponse
    {
        $tag = Tag::findOrFail($id);
        $tag->name = $request->name;
        $tag->slug = Str::slug($request->name);
        $tag->save();

        return response()->json(['message' => 'タグを更新しました']);
    }
}
