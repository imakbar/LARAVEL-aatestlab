<?php

namespace App\Http\Controllers\Backend\Setup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
use App\Models\SetupPermission;

class SetupPermissionsController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }
    
    public function get(Request $request){
        $permission = new SetupPermission();
        $permissions = $permission;

        // return $request->perPageAction;
        $perPageAction = $request->perPageAction;

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $permissions = $permissions;
        } elseif($status == 'trash'){
            $permissions = $permissions->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $permissions = $permissions->where('status', $s['key']);
                    }
                }
            }
        }

        $orderByAction = checkValueNotEmptyInArray($permission->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field')){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $permissions = $permissions->orderBy($orderBy, $sort);
        }

        // return $permission->statusesCount();
        // return addClassByKeyInArray($permission->statusesCount(),$status,'active');
        // $tableColumns = [
        //     [
        //         "label" => "id",
        //         "field" => "id",
        //         "sorting" => false,
        //         "width" => "10px",
        //         "class" => "selectionTh",
        //         "sort" => "",
        //     ],
        //     [
        //         "label" => "Name",
        //         "field" => "name",
        //         "sorting" => true,
        //         "width" => "auto",
        //         "class" => "text-center",
        //         "sort" => "asc",
        //     ],
        //     [
        //         "label" => "Status",
        //         "field" => "status",
        //         "sorting" => true,
        //         "width" => "10px",
        //         "class" => "statusTh",
        //         "sort" => "",
        //     ],
        //     [
        //         "label" => "Action",
        //         "field" => "action",
        //         "sorting" => false,
        //         "width" => "10px",
        //         "class" => "actionTh",
        //         "sort" => "",
        //     ]
        // ];
        // return $permission->total();
        
        return [
            'items' => $permissions->with('PermissionsAllows','RolePermissions.Role')->paginate($perPageAction),
            // 'totalItems' => $permissions->count(),
            'statusesCount' => addClassByKeyInArray($permission->statusesCount(),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($permission->tableColumns(),$orderByAction),
        ];
    }

    public function edit(Request $request){
        $SetupPermission = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('setup_permissions',$request->recordId)){
                $SetupPermission = SetupPermission::find($request->recordId);
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        return [
            'itemData' => $SetupPermission,
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        // return $bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $permission = SetupPermission::find($value);
                if($bulkAction == 'trash'){
                    $permission->status = $bulkAction;
                    $permission->save();
                    $permission->delete();
                } elseif($bulkAction == 'restore'){
                    SetupPermission::withTrashed()->find($value)->restore();
                    $restoredItem = SetupPermission::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    SetupPermission::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $permission->status = $bulkAction;
                    $permission->save();
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
            "name" => "required|min:1|max:100|unique_with:setup_permissions,name",
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
            $SetupPermission = SetupPermission::create($request->all());
            // $SetupPermission->order_by = $SetupPermission->id;
            // $SetupPermission->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record created successfully',
            ]);
        }
    }

    public function update(Request $request){
        // $getUser = Auth::user();

        $SetupPermission = SetupPermission::findOrFail($request->id);

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
            'name' => 'required|max:100|unique_with:setup_permissions,'.$request->id,
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
            $SetupPermission->update($request->all());
            // $SetupPermission->order_by = $SetupPermission->id;
            // $SetupPermission->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function getPermissions(Request $request){
        $permission = new SetupPermission();
        $permissions = $permission;

        $status = $request->get('status')?$request->get('status'):'all';
        $sort = $request->get('sort')?$request->get('sort'):'asc';
        $column = $request->get('column')?$request->get('column'):'id';
            
        if($status == 'all'){
            $permissions = $permissions;
        } elseif($status == 'trash'){
            $permissions = $permissions->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $permissions = $permissions->where('status', $s['key']);
                    }
                }
            }
        }

        $permissions = $permissions->orderBy($column, $sort);

        return $permissions->get();
    }
}
