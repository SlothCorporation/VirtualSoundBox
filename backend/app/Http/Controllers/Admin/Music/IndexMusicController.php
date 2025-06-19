<?php

namespace App\Http\Controllers\Admin\Music;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Music\IndexMusicRequest;
use Illuminate\Http\JsonResponse;
use App\Models\Musics;

class IndexMusicController extends Controller
{
    public function __invoke(IndexMusicRequest $request): JsonResponse
    {
        $keyword = $request->input('keyword');
        $perPage = $request->input('per_page');

        $query = Musics::query();

        if ($keyword) {
            $query->where(function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%")->orWhere('artist', 'like', "%{$keyword}%");
            });
        }

        $query
            ->orderBy('artist', 'ASC')
            ->orderBy('name', 'ASC');

        $music = $query->latest()->paginate($perPage);
        return response()->json($music);
    }
}
