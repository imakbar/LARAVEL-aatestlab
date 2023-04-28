<?php

namespace App\Http\Controllers\Backend\Setup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
use App\Models\SetupPermissionsAllow;

class SetupPermissionsAllowsController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }
    
    public function get(Request $request){
        return [
            'items' => SetupPermissionsAllow::where('permission_id',$request->permission_id)->orderBy('order_by','ASC')->get()
        ];
    }

    public function edit(Request $request){
        $SetupPermissionsAllow = '';

        if(dataExistById('setup_permissions_allows',$request->id)){
            $SetupPermissionsAllow = SetupPermissionsAllow::find($request->id);
        }

        return [
            'itemData' => $SetupPermissionsAllow,
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        // return $bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $permissionsAllow = SetupPermissionsAllow::find($value);
                if($bulkAction == 'trash'){
                    $permissionsAllow->status = $bulkAction;
                    $permissionsAllow->save();
                    $permissionsAllow->delete();
                } elseif($bulkAction == 'restore'){
                    SetupPermissionsAllow::withTrashed()->find($value)->restore();
                    $restoredItem = SetupPermissionsAllow::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    // SetupPermissionsAllow::onlyTrashed()->find($value)->forceDelete();
                    SetupPermissionsAllow::find($value)->forceDelete();
                } else {
                    $permissionsAllow->status = $bulkAction;
                    $permissionsAllow->save();
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
            'slug' 	        => slug($request->name, '_'),
        ]);

        $attributeNames = [
            "name" => "name",
            "status" => "status",
        ];

        $rules = [
            "name" => "required|min:1|max:100|unique_with:setup_permissions_allows,name,permission_id",
            // "status" => "required",
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
            $SetupPermissionsAllow = SetupPermissionsAllow::create($request->all());
            $SetupPermissionsAllow->order_by = $SetupPermissionsAllow->id;
            $SetupPermissionsAllow->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record created successfully',
            ]);
        }
    }

    public function update(Request $request){
        // $getUser = Auth::user();

        $SetupPermissionsAllow = SetupPermissionsAllow::findOrFail($request->id);

        $request->request->add([
            'slug' 	        => slug($request->name, '_'),
        ]);

        $attributeNames = [
            "name" => "Name",
        ];

        $rules = [
            'name' => 'required|max:100|unique_with:setup_permissions_allows,name,permission_id,'.$request->id,
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
            $SetupPermissionsAllow->update($request->all());
            // $SetupPermissionsAllow->order_by = $SetupPermissionsAllow->id;
            // $SetupPermissionsAllow->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function updateOrderBy(Request $request)
    {
        // return $request->all();
        foreach (SetupPermissionsAllow::all() as $item) {
            $ID = $item->id;
            // return $ID;
            foreach($request->all() as $req){
                if($req['id'] == $ID){
                    $item->update(['order_by' => $req['order_by']]);
                }
            }
        }

        return response()->json([
            'status' => 'success',
            'success' => true,
            'message' => 'Order updated successfully',
        ]);
    }
}
