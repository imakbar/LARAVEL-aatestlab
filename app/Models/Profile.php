<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'first_name',
        'middle_name',
        'last_name',
        'phone_number',
        'mobile_number',
        'address',
        'about_me',

        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];

    public function checkByUrl($url){
        return $this->where('url',$url)->count();
    }

    public function getByUrl($url){
        return $this->where('url',$url)->first();
    }

    public function User(){
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function Avatar(){
        return $this->belongsTo(Attachment::class,'id','model_id')->where('model','Profile');
    }

    public function checkById($id){
        return $this->where('id',$id)->count();
    }

    public function getById($id){
        return $this->where('id',$id)->first();
    }

    public function checkByUserId($id){
        return $this->where('user_id',$id)->count();
    }

    public function getByUserId($id){
        return $this->where('user_id',$id)->first();
    }

    // public function Attachments(){
    //     return $this->hasMany(Attachment::class,'model_id','id')->where('model','Profile');
    // }
}
