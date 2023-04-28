<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SetupPermissionsAllow extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_by',
        'permission_id',
        'name',
        'slug',
    ];

    public function Permission(){
        return $this->belongsTo(SetupPermission::class,'permission_id','id');
    }
}
