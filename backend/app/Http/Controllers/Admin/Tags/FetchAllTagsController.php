<?php

namespace App\Http\Controllers\Admin\Tags;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Tags\IndexTagResource;
use App\Models\Tag;
use Illuminate\Http\Resources\Json\JsonResource;

class FetchAllTagsController extends Controller
{
    public function __invoke(): JsonResource
    {
        $tags = Tag::withCount('articles')->orderBy('name')->get();

        return IndexTagResource::collection($tags);
    }
}
