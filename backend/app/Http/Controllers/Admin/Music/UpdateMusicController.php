<?php

namespace App\Http\Controllers\Admin\Music;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Music\UpdateMusicRequest;
use App\Models\Musics;
use Illuminate\Http\JsonResponse;

class UpdateMusicController extends Controller
{
    public function __invoke(UpdateMusicRequest $request, $id): JsonResponse
    {
        try {
            $music = Musics::where('id', $id)->first();

            if (!$music) {
                return response()->json([
                    'message' => '楽曲が見つかりません。',
                ], 404);
            }

            $music->update([
                'name' => $request->input('name'),
                'artist' => $request->input('artist'),
            ]);

            return response()->json(['message' => '楽曲を更新しました']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => '楽曲の更新に失敗しました。',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
