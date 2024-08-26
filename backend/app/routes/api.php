<?php


use App\Http\Controllers\HealthCheckController;
use App\Http\Controllers\ContactMailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

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


Route::apiResource('likes', LikeController::class);
Route::apiResource('posts', PostController::class);

Route::get('health', [HealthCheckController::class, 'index']);

Route::post('contact', [ContactMailController::class, 'contact']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::group(['middleware' => 'api'], function () {
  Route::get('posts', [PostController::class, 'index']);
  Route::post('posts', [PostController::class, 'store']);
});


Route::get('user', [UserController::class, 'index']);
Route::post('user', [UserController::class, 'store']);
Route::put('user', [UserController::class, 'update']);

Route::post('likes', [LikeController::class, 'store']);
Route::post('/likes/{id}', [LikeController::class, 'destroy']);