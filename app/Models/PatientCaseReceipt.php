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
}
