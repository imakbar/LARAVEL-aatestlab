<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SampleLocation;

class SampleLocationController extends Controller
{
    public function get(){
        return SampleLocation::where('status','active')->orderBy('order_by','ASC')->get();
    }
}
