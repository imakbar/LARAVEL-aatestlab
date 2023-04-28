<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientCaseDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_by',
        
        'patient_id',
        'patientcase_id',
        'maintest_id',
        'subtest_id',

        'reporting_time',
        'result_value',
        'report_given_date',

        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];

    public function MainTest(){
        return $this->belongsTo(MainTest::class,'maintest_id','id');
    }

    public function SubTest(){
        return $this->belongsTo(SubTest::class,'subtest_id','id');
    }
}
