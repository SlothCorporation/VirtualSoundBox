<?php

namespace App\GraphQL\Mutations;

use App\Models\Musics;

class MusicMutation
{
    public function ensureMusicExists($_, array $args)
    {
        Musics::firstOrCreate([
            'name' => $args['music'],
            'artist' => $args['artist'],
        ]);

        return null;
    }
}
