<?php

namespace App\Http\Controllers\Admin\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\Category\IndexCategoryResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\JsonResource;

class IndexCategoryController extends Controller
{
    public function __invoke(): JsonResource
    {
        $category = Category::withCount('articles')->get();

        return IndexCategoryResource::collection($category);
    }
}
