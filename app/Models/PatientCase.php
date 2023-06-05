<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PatientCase extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'patient_id',

        'case_number',
        'reffer_id',
        'samplelocation_id',

        'discount_type',
        'discount',

        'status',

        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];

    public function Patient(){
        return $this->belongsTo(Patient::class,'patient_id','id');
    }

    public function Reffer(){
        return $this->belongsTo(Reffer::class,'reffer_id','id');
    }

    public function SampleLocation(){
        return $this->belongsTo(SampleLocation::class,'samplelocation_id','id');
    }

    public function PatientCaseDetails(){
        return $this->hasMany(PatientCaseDetail::class,'patientcase_id','id')->orderBy('order_by','ASC');
    }

    public function MaxId(){
        return $this->max('id');
    }

    public function PatientCaseReceipts(){
        return $this->hasMany(PatientCaseReceipt::class,'patientcase_id','id')->orderBy('id','DESC');
    }

    public function Details()
    {
        return $this->hasMany(PatientCaseDetail::class, 'patientcase_id', 'id');
    }


    

    public function checkById($id){
        return $this->where('id',$id)->count();
    }

    public function getById($id){
        return $this->where('id',$id)->first();
    }

    public function total(){
        return $this->get()->count();
    }

    public function statusesCount(){
        $statuses = [];
        array_push($statuses, statusTypeAll()[0]);
        if(sizeof(caseStatusTypes()) > 0){
            foreach(caseStatusTypes() as $k => $s){
                array_push($statuses, $s);
            }
        }
        array_push($statuses, statusTypeTrash()[0]);

        foreach($statuses as $k => $s){
            if($s['key'] == 'all'){
                $statuses[$k]['count'] = $this->count();
            } elseif($s['key'] == 'trash'){
                $statuses[$k]['count'] = $this->onlyTrashed()->count();
            } else {
                $statuses[$k]['count'] = $this->where('status', $s['key'])->count();
            }
        }

        return $statuses;
    }

    public function tableColumns(){
        return [
            [
                "label" => "id",
                "field" => "id",
                "sorting" => false,
                "width" => "10px",
                "class" => "selectionTh",
                "sort" => "desc",
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
                "label" => "Patient",
                "field" => "name",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
            // [
            //     "label" => "Tests",
            //     "field" => "patient_case_details",
            //     "sorting" => false,
            //     "width" => "auto",
            //     "class" => "text-left",
            //     "sort" => "",
            // ],
            [
                "label" => "Created At",
                "field" => "created_date",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-center dateTh",
                "sort" => "",
            ],
            [
                "label" => "Status",
                "field" => "status",
                "sorting" => true,
                "width" => "10px",
                "class" => "statusTh",
                "sort" => "",
            ],
            [
                "label" => "Action",
                "field" => "action",
                "sorting" => false,
                "width" => "10px",
                "class" => "actionTh",
                "sort" => "",
            ]
        ];
    }
}
