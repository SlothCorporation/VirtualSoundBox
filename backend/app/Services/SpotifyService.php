<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class SpotifyService
{
    protected static ?string $token = null;

    protected static function getAccessToken(): string
    {
        if (static::$token) {
            return static::$token;
        }

        $responce = Http::asForm()
        ->withBasicAuth(env('SPOTIFY_CLIENT_ID'), env('SPOTIFY_CLIENT_SECRET'))
        ->post('https://accounts.spotify.com/api/token', [
            'grant_type' => 'client_credentials',
        ]);

        return static::$token = $responce->json('access_token');
    }

    public static function searchTrack(string $name, string $artist): ?array
    {
        $token = static::getAccessToken();
        $query = urlencode("track:{$name} artist:{$artist}");

        $response = Http::withToken($token)
            ->get("https://api.spotify.com/v1/search?q={$query}&type=track&limit=1");
        $track = data_get($response->json(), 'tracks.items.0');

        if (!$track) {
            return null;
        }
        $isMatch =
            mb_strtolower($track['name']) === mb_strtolower($name) &&
            collect($track['artists'])->pluck('name')->contains(
                fn ($a) => mb_strtolower($a) === mb_strtolower($artist)
            );

        return $isMatch ? $track : null;
    }
}
