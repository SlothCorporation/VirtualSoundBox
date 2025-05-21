<?php

namespace App\Http\Controllers\Api\Accounts;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class FetchUserController extends Controller
{
    public function __invoke($id): JsonResponse
    {
        $user = User::where('uuid', $id)->firstOrFail();

        return response()->json([
            'uuid' => $user->uuid,
            'name' => $user->name,
            'email' => $user->email,
            'plan' => $user->plan,
            'admin_flg' => $user->admin_flg,
        ]);
    }

}
