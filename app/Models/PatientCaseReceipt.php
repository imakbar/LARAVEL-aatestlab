<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PatientCaseReceipt extends Model
{
    use HasFactory;
    protected $fillable = [
        'patient_id',
        'patientcase_id',
        'paid',

        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];

    public function checkById($id){
        return $this->where('id',$id)->count();
    }

    public function getById($id){
        return $this->where('id',$id)->first();
    }

    public function deleteById($id){
        return $this->where('id',$id)->delete();
    }

    public function createdBy(){
        return $this->belongsTo(User::class,'created_by','id');
    }

    public function tableColumns(){
        return [
            [
                "label" => "Patient",
                "field" => "name",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
            [
                "label" => "Case#",
                "field" => "case_number",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
            [
                "label" => "Paid",
                "field" => "paid",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
            [
                "label" => "Created At",
                "field" => "created_at",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-center dateTh",
                "sort" => "desc",
            ],
            [
                "label" => "Created By",
                "field" => "name",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
            // [
            //     "label" => "Action",
            //     "field" => "action",
            //     "sorting" => false,
            //     "width" => "10px",
            //     "class" => "actionTh",
            //     "sort" => "",
            // ]
        ];
    }
}
