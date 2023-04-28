<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Property;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        // return appSmtp();
        return redirect(url('/').'/admin');
        return view('frontend.home');
    }
}
