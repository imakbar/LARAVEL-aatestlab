<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\ReportingTime;

class ReportingTimingsController extends Controller
{
    public function get(){
        return ReportingTime::where('status','active')->orderBy('order_by','ASC')->get();
    }
}
