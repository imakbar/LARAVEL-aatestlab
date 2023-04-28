<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SetupRolePermission;

class ACLController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }
    
    public function getUserPermissions(){
        $user = auth()->user();
        // return $user->role_id;
        return $this->getRoleById($user->role_id);
    }
    
    public function getRoleById($roleId){
        $permissionsData = [];
        $permissions = SetupRolePermission::where('role_id',$roleId)->with('Role','Permission','PermissionAllow')->get();
        // return $permissions;
        if(sizeof($permissions) > 0){
            foreach ($permissions as $p) {
                if(isset($p['role']) && $p['role']['status'] == 'active'){
                    if(isset($p['permission']) && $p['permission']['status'] == 'active'){
                        $permissionsData[] = [
                            'role' => $p->Role?$p->Role->slug:'',
                            'permission' => $p->Permission?$p->Permission->slug:'',
                            'permissions_allow' => $p->PermissionAllow?$p->PermissionAllow->slug:'',
                        ];
                    }
                }
            }
        }
        return $permissionsData;
    }
}
