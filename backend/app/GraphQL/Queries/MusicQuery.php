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

    public function paginatedMusics($_, array $args): ?array
    {
        $musics = Musics::query()
            ->when($args['keyword'], function ($query) use ($args) {
                $keyword = $args['keyword'];
                $query->where(
                    fn ($q) =>
                    $q->where('name', 'like', "%{$keyword}%")
                      ->orWhere('artist', 'like', "%{$keyword}%")
                );
            })
            ->when(!empty($args['verifyStatus']), function ($query) use ($args) {
                $query->whereIn('verify_status', $args['verifyStatus']);
            })
            ->orderBy('artist', 'ASC')
            ->orderBy('name', 'ASC')
            ->latest()
            ->paginate($args['perPage']);

        return GraphQLHelper::toGraphQLPaginated($musics);
    }
}
