<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Gender;

class GendersController extends Controller
{
    public function get(){
        return Gender::where('status','active')->orderBy('order_by','ASC')->get();
    }
}
