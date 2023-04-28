<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('is-logged-in', 'AuthenticationController@isLoggedIn');
// Route::post('/auth/login', 'AuthenticationController@login')->name('login');
// Route::post('/auth/logout', 'AuthenticationController@logout')->name('logout');
Route::post('me', 'AuthenticationController@me');


Route::get('/app-settings','Backend\HelpersController@appSettings');
Route::post('login', 'AuthenticationController@login');
Route::post('register', 'AuthenticationController@register');
Route::post('forgot-password', 'AuthenticationController@forgotPassword');
Route::post('reset-password', 'AuthenticationController@resetPassword');
Route::post('verify-token', 'AuthenticationController@verifyToken');
Route::group(['middleware' => ['auth:api']], function(){
    Route::post('logout', 'AuthenticationController@logout');
    Route::post('refresh', 'AuthenticationController@refresh');
});

//===============================
// Routes Backend
//===============================
Route::group(['middleware' => ['web','isLoggedIn']], function(){
    // Route::get('/test', 'AuthenticationController@test');
    Route::prefix('admin')->group(__DIR__ . '/backend.php');
});
