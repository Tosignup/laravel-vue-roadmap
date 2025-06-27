<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Day03Controller;

Route::get('/', function () {
    return view('welcome');
});

//Day 2: Blade loops and conditionals
Route::view('/day03', 'day03');
Route::post('/day03', [Day03Controller::class, 'store']);
