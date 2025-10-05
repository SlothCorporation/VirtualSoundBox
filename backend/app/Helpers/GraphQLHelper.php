<?php

namespace App\Helpers;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class GraphQLHelper
{
    public static function toGraphQLPaginated(LengthAwarePaginator $paginator): array
    {
        return [
            'data' => array_map(
                fn ($item) => CaseConvertHelper::camelizeArrayRecursive($item->toArray()),
                $paginator->items()
            ),
            'paginatorInfo' => [
                'currentPage' => $paginator->currentPage(),
                'lastPage' => $paginator->lastPage(),
                'perPage' => $paginator->perPage(),
                'total' => $paginator->total(),
            ],
        ];
    }

    public static function toGraphQLObject($item)
    {
        if ($item instanceof Collection) {
            return $item->map(fn ($i) => CaseConvertHelper::camelizeArrayRecursive($i->toArray()))->all();
        }

        if (is_array($item)) {
            return CaseConvertHelper::camelizeArrayRecursive($item);
        }

        return CaseConvertHelper::camelizeArrayRecursive($item->toArray());
    }
}
