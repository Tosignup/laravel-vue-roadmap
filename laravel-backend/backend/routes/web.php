<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Day01Controller;

Route::get('/', function () {
    return view('welcome');
});

// Day 1: Basic routes, view passing
Route::get('/day01', function () {
    return view('day01', ['name' => 'John Doe']);
});
// Route::view('/day01', 'day01', ['name' => 'John Doe']);
// Route::get('/controller/day01', [Day01Controller::class, 'index']);
