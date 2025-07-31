<?php

namespace App\Http\Resources\GraphQL;

use Illuminate\Pagination\LengthAwarePaginator;

class GraphQLPaginatorResource
{
    /**
     * データとページネーション情報をGraphQL形式に整形する
     *
     * @param  LengthAwarePaginator $paginator
     * @param  string $resourceClass  JsonResourceのクラス名
     * @return array
     */
    public static function format(LengthAwarePaginator $paginator, string $resourceClass): array
    {
        return [
            'data' => $resourceClass::collection($paginator->items())->resolve(),
            'paginatorInfo' => [
                'count' => $paginator->count(),
                'currentPage' => $paginator->currentPage(),
                'firstItem' => $paginator->firstItem(),
                'hasMorePages' => $paginator->hasMorePages(),
                'lastItem' => $paginator->lastItem(),
                'lastPage' => $paginator->lastPage(),
                'perPage' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ];
    }
}
