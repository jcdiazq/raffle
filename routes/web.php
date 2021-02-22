<?php

use App\Http\Controllers\NumberSelectionController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\SenderRegisterdMailable;

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

Route::get('/', function () {
    //return view('welcome');
    return redirect('https://asistenciasolidaria.000webhostapp.com/raffle.htm');
});

Route::get('showall', [NumberSelectionController::class, 'showAll']);
