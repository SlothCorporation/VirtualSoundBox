<?php

namespace App\Http\Controllers\Api\Accounts;

use App\Http\Controllers\Controller;
use App\Http\Requests\Accounts\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UpdateUserController extends Controller
{
    public function __invoke(UpdateUserRequest $request, $id): JsonResponse
    {
        $user = User::where('uuid', $id)->firstOrFail();

        $user->update($request->only([
            'plan',
            'admin_flg',
        ]));

        return response()->json([
            'message' => 'ユーザー情報が更新されました。',
        ]);
    }
}
