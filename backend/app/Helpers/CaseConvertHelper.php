<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class CaseConvertHelper
{
    public static function camelizeArrayRecursive(array $array): array
    {
        $results = [];
        foreach ($array as $key => $value) {
            $newKey = Str::camel($key);
            if (is_array($value)) {
                $results[$newKey] = self::camelizeArrayRecursive($value);
            } else {
                $results[$newKey] = $value;
            }
        }
        return $results;
    }
}
