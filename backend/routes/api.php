<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FetchYoutubeDataController;
use App\Http\Controllers\Api\FetchMusicDataController;
use App\Http\Controllers\Api\SetMusicDataController;
use App\Http\Controllers\Api\Accounts\RegisterController;
use App\Http\Controllers\Api\Accounts\LoginController;
use App\Http\Controllers\Api\Accounts\LogoutController;
use App\Http\Controllers\Api\Accounts\FetchUserProfileController;
use App\Http\Controllers\Api\Accounts\FetchUserController;
use App\Http\Controllers\Api\Accounts\FetchUsersController;
use App\Http\Controllers\Api\Accounts\UpdateUserController;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// =============================
// 🔹 パブリックAPIルート（認証不要）
// =============================
Route::get('/youtube', FetchYoutubeDataController::class);
Route::get('/music', FetchMusicDataController::class);
Route::post('/music', SetMusicDataController::class);

Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    $user = User::findOrFail($id);

    if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        return response()->json(['message' => '無効な確認リンクです。'], 403);
    }

    if (! $user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
        event(new Verified($user));
    }

    return redirect()->to(config('app.frontend_url') . '/email/verify');
})->middleware('signed')->name('verification.verify');

// =============================
// 🔹 APIミドルウェアグループ
// =============================
Route::middleware('api')->group(function () {

    // ✅ 認証不要エリア
    Route::post('/register', RegisterController::class);
    Route::post('/login', LoginController::class);

    // ✅ 認証が必要なエリア
    Route::middleware('auth:sanctum')->group(function () {

        Route::post('/logout', LogoutController::class);

        // ✅ メール認証が必要なエリア
        Route::middleware('verified')->group(function () {
            Route::get('/me', FetchUserProfileController::class);
        });

        Route::get('/post-template', \App\Http\Controllers\Api\PostTemplates\FetchController::class);
        Route::get('/post-template/{id}', \App\Http\Controllers\Api\PostTemplates\FindController::class);
        Route::post('/post-template/create', \App\Http\Controllers\Api\PostTemplates\CreateController::class);
        Route::post('/post-template/save', \App\Http\Controllers\Api\PostTemplates\SaveController::class);
    });


    // =============================
    // 🔹 管理者APIルート
    // =============================
    Route::middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::get('/admin/users', FetchUsersController::class);
        Route::get('/admin/users/{id}', FetchUserController::class);
        Route::put('/admin/users/{id}', UpdateUserController::class);
        Route::get('/admin/music', \App\Http\Controllers\Admin\Music\IndexMusicController::class);
        Route::put('/admin/music/{id}', \App\Http\Controllers\Admin\Music\UpdateMusicController::class);
        Route::delete('/admin/music/{id}', \App\Http\Controllers\Admin\Music\DeleteMusicController::class);
    });
});
