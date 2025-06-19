<?php

namespace App\Http\Controllers\Admin\Music;

use App\Http\Controllers\Controller;
use App\Models\Musics;
use Illuminate\Http\JsonResponse;

class DeleteMusicController extends Controller
{
    public function __invoke($id): JsonResponse
    {
        try {
            $music = Musics::where('id', $id)->first();

            if (!$music) {
                return response()->json([
                    'message' => '楽曲が見つかりません。',
                ], 404);
            }

            $music->delete();
            return response()->json(['message' => '楽曲を削除しました']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => '楽曲の削除に失敗しました。',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
