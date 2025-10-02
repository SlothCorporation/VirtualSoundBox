<?php

namespace App\Http\Controllers\Api\Accounts;

use App\Http\Controllers\Controller;
use App\Http\Requests\Accounts\RegisterRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class RegisterController extends Controller
{
    public function __invoke(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $user->sendEmailVerificationNotification();

        return response()->json([
           'message' => 'ユーザー登録が完了しました。確認メールをご確認ください。',
        ]);
    }
}
