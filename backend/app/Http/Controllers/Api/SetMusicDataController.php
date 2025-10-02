<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SetMusicDataRequest;
use App\Models\Musics;
use Illuminate\Http\JsonResponse;

class SetMusicDataController extends Controller
{
    public function __invoke(SetMusicDataRequest $request): JsonResponse
    {
        try {
            $data = $request->input('data');

            foreach ($data as $item) {
                Musics::firstOrCreate(
                    ['name' => $item['music'], 'artist' => $item['artist']]
                );
            }

            return response()->json(['message' => 'Music data has been set']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
