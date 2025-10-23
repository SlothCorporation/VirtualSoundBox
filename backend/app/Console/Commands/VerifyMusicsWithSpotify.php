<?php

namespace App\Console\Commands;

use App\Models\Musics;
use App\Services\SpotifyService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class VerifyMusicsWithSpotify extends Command
{
    protected $signature = 'musics:verify-spotify';
    protected $description = 'Spotifyの情報と突き合わせて音楽データを検証する';

    public function handle()
    {
        $limitPerRun = 50;
        $musics = Musics::where('verify_status', 'unverified')
            ->orderBy('created_at', 'asc')
            ->limit($limitPerRun)
            ->get();

        foreach ($musics as $music) {
            try {
                $result = SpotifyService::searchTrack($music->name, $music->artist);

                if ($result) {
                    $music->update([
                        'verify_status' => 'auto_verified',
                        'spotify_track_id' => $result['id'],
                        'verified_at' => now(),
                    ]);
                } else {
                    $music->update(['verify_status' => 'auto_failed']);
                }

                usleep(300000);
            } catch (\Exception $e) {
                Log::error("Error verifying music ID {$music->id} with Spotify: " . $e->getMessage());
                $music->update(['verify_status' => 'auto_failed']);
            }
        }

        $this->info('Spotify verification process completed.');
    }
}
