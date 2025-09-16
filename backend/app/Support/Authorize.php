<?php

namespace App\Support;

use Illuminate\Support\Facades\Auth;
use GraphQL\Error\Error;
use Illuminate\Support\Facades\Log;

class Authorize
{
    public static function authorizeAdmin(): void
    {
        $user = Auth::user();
        if (!$user || !$user->admin_flg) {
            throw new Error('Unauthorized', 'UNAUTHORIZED');
        }
    }
}
