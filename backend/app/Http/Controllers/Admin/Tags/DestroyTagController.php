<?php

namespace App\Http\Controllers\Admin\Tags;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Tag;

class DestroyTagController extends Controller
{
    public function __invoke($id): JsonResponse
    {
        $tag = Tag::findOrFail($id);
        $tag->articles()->detach();
        $tag->delete();

        return response()->json(['message' => 'タグを削除しました']);
    }
}
