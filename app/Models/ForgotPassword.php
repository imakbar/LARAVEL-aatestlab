<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForgotPassword extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'email',
        'token',
        'created_at',
    ];

    public function checkByUserIdAndToken($userId,$token){
        return $this->where('user_id',$userId)->where('token',$token)->count();
    }

    public function getByUserIdAndToken($userId,$token){
        return $this->where('user_id',$userId)->where('token',$token)->first();
    }
}
