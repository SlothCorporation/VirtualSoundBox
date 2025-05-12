<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FetchYoutubeDataController;
use App\Http\Controllers\Api\FetchMusicDataController;
use App\Http\Controllers\Api\SetMusicDataController;
use App\Http\Controllers\Api\Accounts\RegisterController;
use App\Http\Controllers\Api\Accounts\LoginController;
use App\Http\Controllers\Api\Accounts\LogoutController;
use App\Http\Controllers\Api\Accounts\FetchUserProfileController;

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
Route::get('/youtube', FetchYoutubeDataController::class);
Route::get('/music', FetchMusicDataController::class);
Route::post('/music', SetMusicDataController::class);

Route::middleware('api')->group(function() {
    Route::post('/register', RegisterController::class);
    Route::post('/login', LoginController::class);
    Route::post('/logout', LogoutController::class);
    Route::get('/me', FetchUserProfileController::class);
});
