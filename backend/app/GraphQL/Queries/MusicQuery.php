<?php

namespace App\GraphQL\Queries;

use App\Helpers\GraphQLHelper;
use App\Models\Musics;

class MusicQuery
{
    public function musics($_, array $args): ?array
    {
        $musics = Musics::query()
            ->when(isset($args['music']), fn ($q) => $q->where('name', 'like', "{$args['music']}%"))
            ->when(isset($args['artist']), fn ($q) => $q->where('artist', 'like', "{$args['artist']}%"))
            ->get();

        return GraphQLHelper::toGraphQLObject($musics);
    }
}
