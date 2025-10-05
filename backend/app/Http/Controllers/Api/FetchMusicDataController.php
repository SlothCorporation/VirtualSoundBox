<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FetchMusicDataRequest;
use App\Models\Musics;
use Illuminate\Http\JsonResponse;

class FetchMusicDataController extends Controller
{
    public function __invoke(FetchMusicDataRequest $request): JsonResponse
    {
        $music = $request->query('music');
        $artist = $request->query('artist');

        $query = Musics::query();

        if ($music) {
            $query->where('name', 'like', "$music%");
        }

        if ($artist) {
            $query->where('artist', 'like', "$artist%");
        }

        $result = $query->get();

        if ($result->isNotEmpty()) {
            return response()->json($result);
        }

        return response()->json(['error' => 'Invalid music or artist'], 400);
    }
}
