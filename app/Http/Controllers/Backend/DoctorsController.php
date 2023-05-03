<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
use App\Models\Reffer;

class DoctorsController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }

    public function get(Request $request){
        $Reffer = new Reffer();
        $Reffers = $Reffer;

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $Reffers = $Reffers;
        } elseif($status == 'trash'){
            $Reffers = $Reffers->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $Reffers = $Reffers->where('status', $s['key']);
                    }
                }
            }
        }

        if(isset($request->search['name'])){
            $name = $request->search['name'];
            $Reffers = $Reffers->where("name", "LIKE", "%$name%");
        }
        if(isset($request->search['mobile'])){
            $mobile = $request->search['mobile'];
            $Reffers = $Reffers->where("mobile", "LIKE", "%$mobile%");
        }
        if(isset($request->search['clinic'])){
            $clinic = $request->search['clinic'];
            $Reffers = $Reffers->where("clinic", "LIKE", "%$clinic%");
        }

        $orderByAction = checkValueNotEmptyInArray($Reffer->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field') && $request->orderByAction){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $Reffers = $Reffers->orderBy($orderBy, $sort);
        } else {
            $Reffers = $Reffers->orderBy('order_by', 'asc');
        }
        
        return [
            'items' => $Reffers->get(),
            'statusesCount' => addClassByKeyInArray($Reffer->statusesCount(),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($Reffer->tableColumns(),$orderByAction),
        ];
    }

    public function edit(Request $request){
        $Reffer = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('reffers',$request->recordId)){
                $Reffer = Reffer::find($request->recordId);
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        return [
            'itemData' => $Reffer,
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        // return $bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $Reffer = Reffer::find($value);
                if($bulkAction == 'trash'){
                    $Reffer->status = $bulkAction;
                    $Reffer->save();
                    $Reffer->delete();
                } elseif($bulkAction == 'restore'){
                    Reffer::withTrashed()->find($value)->restore();
                    $restoredItem = Reffer::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    Reffer::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $Reffer->status = $bulkAction;
                    $Reffer->save();
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
            'name'         => __('labels.reffers.fields.name'),
            'mobile'   => __('labels.reffers.fields.mobile'),
            'clinic'         => __('labels.reffers.fields.clinic'),
            "status"            => "status",
        ];

        $rules = [
            'name'          => 'required|max:200|unique_with:reffers,name',
            'mobile'        => 'required|max:20',
            'clinic'        => 'required|max:200',
            "status"        => "required",
        ];

        $messages = [
            'name.unique_with' => 'The name already exist.',
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
            $Reffer = Reffer::create($request->all());
            $Reffer->order_by = $Reffer->id;
            $Reffer->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record created successfully',
            ]);
        }
    }

    public function update(Request $request){
        // $getUser = Auth::user();

        $Reffer = Reffer::findOrFail($request->id);

        $request->request->add([
            'updated_by' 	=> 1,
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
            'slug' 	        => slug($request->name, '_'),
        ]);

        $attributeNames = [
            'name'         => __('labels.reffers.fields.name'),
            'mobile'   => __('labels.reffers.fields.mobile'),
            'clinic'         => __('labels.reffers.fields.clinic'),
        ];

        $rules = [
            'name'          => 'required|max:200|unique_with:reffers,name,'.$request->id,
            'mobile'        => 'required|max:20',
            'clinic'        => 'required|max:200',
            "status"        => "required",
        ];

        $messages = [
            'name.unique_with' => 'The name already exist.',
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
            $Reffer->update($request->all());
            // $Reffer->order_by = $Reffer->id;
            // $Reffer->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function updateOrderBy(Request $request)
    {
        foreach (Reffer::all() as $item) {
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

    // public function getAllActiveTests(){
    //     return Reffer::where('status',1)->orderBy('order_by','ASC')->with('ActiveSubTests.ActiveSubTestDetails')->get();
    // }
}