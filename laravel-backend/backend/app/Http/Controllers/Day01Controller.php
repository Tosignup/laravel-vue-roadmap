<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Day01Controller extends Controller
{
    public function index()
    {
        return view('day01');
        //if returning view with data
        // return view('day01', ['name' => 'John Doe']);
    }
}
