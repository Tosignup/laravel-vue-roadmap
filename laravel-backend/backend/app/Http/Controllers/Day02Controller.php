<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Day02Controller extends Controller
{
    public function index()
    {
        $users = ['Alice', 'Bow', 'Carl'];
        return view('day02', ['users' => $users]);
    }
}
