<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'reg_date_time',
        'reg_date',
        'reg_time',

        'patient_number',
        'name',
        'age',
        'gender_id',
        'mobile',
        'address',
        'reffer_id',

        'status',

        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];

    public function Gender(){
        return $this->belongsTo(Gender::class,'gender_id','id');
    }

    public function Reffer(){
        return $this->belongsTo(Reffer::class,'reffer_id','id');
    }

    public function PatientTests(){
        return $this->hasMany(PatientTest::class,'patient_id','id')->orderBy('order_by','ASC');
    }

    public function GetByMobile($mobile){
        return $this->where('mobile',$mobile);
    }

    // public function GetById($id){
    //     return $this->where('id',$id);
    // }


    

    public function checkById($id){
        return $this->where('id',$id)->count();
    }

    public function getById($id){
        return $this->where('id',$id)->with('Gender')->first();
    }

    public function total(){
        return $this->get()->count();
    }

    public function statusesCount(){
        $statuses = [];
        array_push($statuses, statusTypeAll()[0]);
        if(sizeof(statusTypes()) > 0){
            foreach(statusTypes() as $k => $s){
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
                "label" => "Name",
                "field" => "name",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
            // [
            //     "label" => "Number",
            //     "field" => "patient_number",
            //     "sorting" => true,
            //     "width" => "auto",
            //     "class" => "text-left",
            //     "sort" => "",
            // ],
            [
                "label" => "Gender",
                "field" => "gender_id",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
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
