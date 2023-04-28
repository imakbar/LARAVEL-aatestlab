<?php

namespace App\Http\Controllers\Backend\Setup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
use App\Models\SetupSocial;

class SetupSocialsController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }
    
    public function get(Request $request){
        $setupSocial = new SetupSocial();
        $setupSocials = $setupSocial;

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $setupSocials = $setupSocials;
        } elseif($status == 'trash'){
            $setupSocials = $setupSocials->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $setupSocials = $setupSocials->where('status', $s['key']);
                    }
                }
            }
        }

        // $orderByAction = checkValueNotEmptyInArray($setupSocial->tableColumns());
        // if($request->orderByAction){
        //     $orderByAction = $request->orderByAction;
        //     if(keyExists($orderByAction,'field')){
        //         $orderBy = $orderByAction['field'];
        //         $sort = $orderByAction['sort'];
        //         $setupSocials = $setupSocials->orderBy($orderBy, $sort);
        //     }
        // } else {
        //     $setupSocials = $setupSocials->orderBy('order_by', 'ASC');
        // }

        $orderByAction = checkValueNotEmptyInArray($setupSocial->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field')){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $setupSocials = $setupSocials->orderBy($orderBy, $sort);
        }
        
        return [
            'items' => $setupSocials->get(),
            'statusesCount' => addClassByKeyInArray($setupSocial->statusesCount(),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($setupSocial->tableColumns(),$orderByAction),
        ];
    }

    public function edit(Request $request){
        $SetupSocial = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('setup_socials',$request->recordId)){
                $SetupSocial = SetupSocial::find($request->recordId);
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        return [
            'itemData' => $SetupSocial,
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        // return $bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $setupSocial = SetupSocial::find($value);
                if($bulkAction == 'trash'){
                    $setupSocial->status = $bulkAction;
                    $setupSocial->save();
                    $setupSocial->delete();
                } elseif($bulkAction == 'restore'){
                    SetupSocial::withTrashed()->find($value)->restore();
                    $restoredItem = SetupSocial::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    SetupSocial::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $setupSocial->status = $bulkAction;
                    $setupSocial->save();
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
            "name" => "required|min:1|max:100|unique_with:setup_socials,name",
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
            $SetupSocial = SetupSocial::create($request->all());
            // $SetupSocial->order_by = $SetupSocial->id;
            // $SetupSocial->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record created successfully',
            ]);
        }
    }

    public function update(Request $request){
        // $getUser = Auth::user();

        $SetupSocial = SetupSocial::findOrFail($request->id);

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
            'name' => 'required|max:100|unique_with:setup_socials,'.$request->id,
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
            $SetupSocial->update($request->all());
            // $SetupSocial->order_by = $SetupSocial->id;
            // $SetupSocial->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function getSocials(Request $request){
        $setupSocial = new SetupSocial();
        $setupSocials = $setupSocial;

        $status = $request->get('status')?$request->get('status'):'all';
        $sort = $request->get('sort')?$request->get('sort'):'asc';
        $column = $request->get('column')?$request->get('column'):'id';
            
        if($status == 'all'){
            $setupSocials = $setupSocials;
        } elseif($status == 'trash'){
            $setupSocials = $setupSocials->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $setupSocials = $setupSocials->where('status', $s['key']);
                    }
                }
            }
        }

        $setupSocials = $setupSocials->orderBy($column, $sort);

        return $setupSocials->get();
    }

    public function updateOrderBy(Request $request)
    {
        foreach (SetupSocial::all() as $item) {
            $ID = $item->id;
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