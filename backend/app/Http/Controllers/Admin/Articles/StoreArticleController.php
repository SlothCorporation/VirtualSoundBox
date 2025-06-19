<?php

namespace App\Http\Controllers\Admin\Articles;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class StoreArticleController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json();
    }
}
