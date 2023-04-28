<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Reffer;

class ReffersController extends Controller
{
    public function get(){
        return Reffer::where('status','active')->get();
    }
}
