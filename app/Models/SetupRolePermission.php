<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SetupRolePermission extends Model
{
    use HasFactory;
    protected $fillable = [
        'role_id',
        'permission_id',
        'permissionsallow_id',
    ];

    public function Role(){
        return $this->belongsTo(SetupRole::class,'role_id','id');
    }

    public function Permission(){
        return $this->belongsTo(SetupPermission::class,'permission_id','id');
    }

    public function PermissionAllow(){
        return $this->belongsTo(SetupPermissionsAllow::class,'permissionsallow_id','id');
    }
}
