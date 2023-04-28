<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

//===============================
// Routes Front-end
//===============================
Route::group(['middleware' => ['web']], function(){
    Route::prefix('/')->group(__DIR__ . '/frontend.php');
});
Route::get('/app-config','Backend\SettingsController@getAppSettings');
Route::get('/configuration/{type?}', 'Backend\MigrateController@artisanCommand');

//===============================
// Routes Back-end
//===============================
Route::get('/admin/{any?}', function () {
    return view('app');
})->where('any', '.*');