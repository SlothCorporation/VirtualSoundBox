<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FetchYoutubeDataController;
use App\Http\Controllers\Api\FetchMusicDataController;
use App\Http\Controllers\Api\SetMusicDataController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/youtube', FetchYoutubeDataController::class);
Route::get('/music', FetchMusicDataController::class);
Route::post('/music', SetMusicDataController::class);
