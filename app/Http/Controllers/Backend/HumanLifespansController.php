<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\HumanLifespan;

class HumanLifespansController extends Controller
{
    public function get(){
        return HumanLifespan::where('status',1)->orderBy('order_by','ASC')->get();
    }
}
