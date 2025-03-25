<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FetchYoutubeDataRequest;
use Illuminate\Http\JsonResponse;
use Google_Client;
use Google_Service_YouTube;

class FetchYoutubeDataController extends Controller
{
    public function __invoke(FetchYoutubeDataRequest $request): JsonResponse
    {
        $url = $request->query('url');
        preg_match('/(?:v=|\/live\/)([^&\/?]+)/', $url, $matches);
        $videoId = $matches[1] ?? null;

        $client = new Google_Client();
        $client->setDeveloperKey(config('env.youtube_api_key'));

        $youtube = new Google_Service_YouTube($client);
        try {
            $live = $youtube->videos->listVideos('snippet, liveStreamingDetails', ['id' => $videoId]);
            return response()->json($live['items'][0]['snippet']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid video URL', $e->getMessage()], 400);
        }
    }
}
