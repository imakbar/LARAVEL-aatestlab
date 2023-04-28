<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class SubTestDetail extends Model
{
    use HasFactory;
    use SoftDeletes;
    
    protected $fillable = [
        'order_by',

        'maintest_id',
        'subtest_id',
        'gender_id',
        'humanlifespan_id',
        'normal_value',

        'status',

        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];

    public function Gender()
    {
        return $this->belongsTo(Gender::class, 'gender_id', 'id');
    }

    public function HumanLifespan()
    {
        return $this->belongsTo(HumanLifespan::class, 'humanlifespan_id', 'id');
    }

    public function getAll(){
        return $this->get();
    }

    public function checkBySlug($slug){
        return $this->where('slug',$slug)->count();
    }

    public function getBySlug($slug){
        return $this->where('slug',$slug)->first();
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

    public function statusesCount($subtestId){
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
                $statuses[$k]['count'] = $this->where('subtest_id',$subtestId)->count();
            } elseif($s['key'] == 'trash'){
                $statuses[$k]['count'] = $this->where('subtest_id',$subtestId)->onlyTrashed()->count();
            } else {
                $statuses[$k]['count'] = $this->where('subtest_id',$subtestId)->where('status', $s['key'])->count();
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
                "label" => "Gender",
                "field" => "gender_id",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
            [
                "label" => "Human Lifespan",
                "field" => "humanlifespan_id",
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

    public function getAllByStatus($status){
        return $this->where('status',$status);
    }
}
