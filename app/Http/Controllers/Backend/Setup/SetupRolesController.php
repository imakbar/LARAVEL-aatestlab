<?php

namespace App\Http\Controllers\Backend\Setup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
use App\Models\SetupRole;
use App\Models\SetupPermission;
use App\Models\SetupPermissionsAllow;
use App\Models\SetupRolePermission;

class SetupRolesController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }
    
    public function getPermissions(){
        $permission = new SetupPermission();
        return $permission->with('PermissionsAllows.Permission')->get();
    }

    public function get(Request $request){
        $role = new SetupRole();
        $roles = $role;

        // return $request->perPageAction;
        $perPageAction = $request->perPageAction;

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $roles = $roles;
        } elseif($status == 'trash'){
            $roles = $roles->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $roles = $roles->where('status', $s['key']);
                    }
                }
            }
        }

        $orderByAction = checkValueNotEmptyInArray($role->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field')){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $roles = $roles->orderBy($orderBy, $sort);
        }
        
        return [
            'items' => $roles->with('Users.Profile.Avatar.Thumbnails')->paginate($perPageAction),
            // 'totalItems' => $roles->count(),
            'statusesCount' => addClassByKeyInArray($role->statusesCount(),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($role->tableColumns(),$orderByAction),
        ];
    }

    public function edit(Request $request){
        $SetupRole = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('setup_roles',$request->recordId)){
                $SetupRole = SetupRole::find($request->recordId);
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        return [
            'itemData' => $SetupRole,
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
            'role_permissions' => $this->rolePermissions($request->recordId),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        // return $bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $role = SetupRole::find($value);
                if($bulkAction == 'trash'){
                    $role->status = $bulkAction;
                    $role->save();
                    $role->delete();
                } elseif($bulkAction == 'restore'){
                    SetupRole::withTrashed()->find($value)->restore();
                    $restoredItem = SetupRole::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    SetupRole::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $role->status = $bulkAction;
                    $role->save();
                }
            }
        }
        $checkLength = '';
        if(sizeof($selectedItems) > 1){
            $checkLength = 'Records';
        } else {
            $checkLength = 'Record';
        }
        return response()->json([
            'status' => 'success',
            'success' => true,
            'message' => $checkLength.' '.$bulkAction.' successfully',
        ]);
    }

    public function save(Request $request){
        // $getUser = Auth::user();

        $request->request->add([
            'name' => $request->record['name'],
            'status' => $request->record['status'],
            'role_permissions' => $request->role_permissions,
        ]);

        $request->request->add([
            'created_by' 	=> 1,
            'created_date' 	=> date('Y-m-d'),
            'created_time' 	=> date('H:i:s'),
            'updated_by' 	=> 1,
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
            'slug' 	        => slug($request->name, '_'),
        ]);

        $attributeNames = [
            "name" => "name",
            "status" => "status",
        ];

        $rules = [
            "name" => "required|min:1|max:100|unique_with:setup_roles,name",
            "status" => "required",
        ];

        $messages = [
            'name.unique_with' => 'The name has already been taken.',
        ];

        $Validator = Validator::make($request->all(), $rules, $messages);
        $Validator->setAttributeNames($attributeNames);

        if ($Validator->fails()) {
            return response()->json([
                'status' => 'error',
                'success' => false,
                'errors' => $Validator->errors(),
            ]);
        } 
        else 
        {
            $SetupRole = SetupRole::create($request->all());
            // $SetupRole->order_by = $SetupRole->id;
            // $SetupRole->update();

            if($request->role_permissions && sizeof($request->role_permissions) > 0){
                $this->saveRolePermissions("save",$SetupRole->id,$request->role_permissions);
            }

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Permissions saved successfully',
            ]);
        }
    }

    public function update(Request $request){
        // $getUser = Auth::user();
        // return $request->record;

        $request->request->add([
            'id' => $request->record['id'],
            'name' => $request->record['name'],
            'status' => $request->record['status'],
            'role_permissions' => $request['role_permissions'],
        ]);

        $SetupRole = SetupRole::findOrFail($request->id);

        $request->request->add([
            'updated_by' 	=> 1,
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
            'slug' 	        => slug($request->name, '_'),
        ]);

        $attributeNames = [
            "name" => "Name",
        ];

        $rules = [
            'name' => 'required|max:100|unique_with:setup_roles,'.$request->id,
        ];

        $messages = [
            'name.unique_with' => 'The name has already been taken.',
        ];

        $Validator = Validator::make($request->all(), $rules, $messages);
        $Validator->setAttributeNames($attributeNames);

        if ($Validator->fails()) {
            return response()->json([
                'status' => 'error',
                'success' => false,
                'message' => 'fix errors',
                'errors' => $Validator->errors(),
            ]);
        } 
        else 
        {
            $SetupRole->update($request->all());
            // $SetupRole->order_by = $SetupRole->id;
            // $SetupRole->update();
            if($request->role_permissions && sizeof($request->role_permissions) > 0){
                $this->saveRolePermissions("update",$SetupRole->id,$request->role_permissions);
            }

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function saveRolePermissions($requestType,$roleId,$permissionsRoles){
        if(sizeof($permissionsRoles) > 0){
            if($requestType == 'update'){
                SetupRolePermission::where('role_id',$roleId)->delete();
            }
            foreach ($permissionsRoles as $key => $item) {
                $RolePermission = new SetupRolePermission();
                $RolePermission->role_id = $roleId;
                $RolePermission->permission_id = $item['permission_id'];
                $RolePermission->permissionsallow_id = $item['id'];
                $RolePermission->save();
            }
        }
        return true;
    }

    public function rolePermissions($roleId) {
        $RolePermissions = SetupRolePermission::where('role_id',$roleId)->get();
        $newRolePermissions = [];
        foreach ($RolePermissions as $key => $item) {
            $newRolePermissions[] = SetupPermissionsAllow::where('id',$item->permissionsallow_id)->with('Permission')->first();
        }
        return $newRolePermissions;
    }

    public function getRoles(Request $request){
        $role = new SetupRole();
        $roles = $role;

        $status = $request->get('status')?$request->get('status'):'all';
        $sort = $request->get('sort')?$request->get('sort'):'asc';
        $column = $request->get('column')?$request->get('column'):'id';
            
        if($status == 'all'){
            $roles = $roles;
        } elseif($status == 'trash'){
            $roles = $roles->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $roles = $roles->where('status', $s['key']);
                    }
                }
            }
        }

        $roles = $roles->orderBy($column, $sort);

        return $roles->get();
    }
}
