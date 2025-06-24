<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Day02Controller;

Route::get('/', function () {
    return view('welcome');
});

//Day 2: Blade loops and conditionals
Route::get('/day02', [Day02Controller::class, 'index']);
