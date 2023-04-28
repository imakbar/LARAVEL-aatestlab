<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SetupSocial extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'order_by',

        'name',
        'slug',

        'meta_tags',
        'meta_description',

        'status',

        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];

    public function getAll(){
        return $this->get();
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
            [
                "label" => "Created At",
                "field" => "created_date",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
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
