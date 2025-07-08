<?php

namespace App\Http\Controllers\Admin\Tags;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tags\IndexTagRequest;
use App\Http\Resources\Admin\Tags\IndexTagResource;
use App\Models\Tag;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexTagController extends Controller
{
    public function __invoke(IndexTagRequest $request): JsonResource
    {
        $tags = Tag::withCount('articles')
            ->when($request->keyword, function ($query, $keyword) {
                $query->where('name', 'like', "%{$keyword}%");
            })
            ->orderBy('name')
            ->paginate($request->input('per_page', 20));

        return IndexTagResource::collection($tags);
    }
}
