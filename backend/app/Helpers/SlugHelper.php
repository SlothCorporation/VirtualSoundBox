<?php

namespace App\Helpers;

class SlugHelper
{
    public static function generateJapaneseSlug(string $name): string
    {
        return preg_replace('/\s+/u', '_', trim($name));
    }
}
