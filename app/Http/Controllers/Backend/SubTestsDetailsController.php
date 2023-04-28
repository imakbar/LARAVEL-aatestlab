<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
use App\Models\MainTest;
use App\Models\SubTest;
use App\Models\SubTestDetail;

class SubTestsDetailsController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }

    public function get(Request $request){
        $SubTestDetail = new SubTestDetail();
        $subtest_id = $request->subtest_id;
        $SubTestDetails = $SubTestDetail->where('subtest_id',$subtest_id);

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $SubTestDetails = $SubTestDetails;
        } elseif($status == 'trash'){
            $SubTestDetails = $SubTestDetails->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $SubTestDetails = $SubTestDetails->where('status', $s['key']);
                    }
                }
            }
        }

        $orderByAction = checkValueNotEmptyInArray($SubTestDetail->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field') && $request->orderByAction){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $SubTestDetails = $SubTestDetails->orderBy($orderBy, $sort);
        } else {
            $SubTestDetails = $SubTestDetails->orderBy('order_by', 'asc');
        }
        
        return [
            'items' => $SubTestDetails->with('Gender','HumanLifespan')->get(),
            'statusesCount' => addClassByKeyInArray($SubTestDetail->statusesCount($subtest_id),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($SubTestDetail->tableColumns(),$orderByAction),
        ];
    }

    public function edit(Request $request){
        $SubTestDetail = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('sub_tests',$request->recordId)){
                $SubTestDetail = SubTestDetail::find($request->recordId);
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        return [
            'itemData' => $SubTestDetail,
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        // return $bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $SubTestDetail = SubTestDetail::find($value);
                if($bulkAction == 'trash'){
                    $SubTestDetail->status = $bulkAction;
                    $SubTestDetail->save();
                    $SubTestDetail->delete();
                } elseif($bulkAction == 'restore'){
                    SubTestDetail::withTrashed()->find($value)->restore();
                    $restoredItem = SubTestDetail::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    SubTestDetail::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $SubTestDetail->status = $bulkAction;
                    $SubTestDetail->save();
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
            'slug' 	        => slug($request->test_name, '_'),
        ]);

        $attributeNames = [
            'gender_id'         => "gender",
            'humanlifespan_id'  => "human lifespan",
            "normal_value"      => "normal value",
        ];

        $rules = [
            'humanlifespan_id'  => 'unique_with:sub_test_details,maintest_id,subtest_id,gender_id,humanlifespan_id',
            'normal_value'      => 'required',
        ];

        $messages = [
            'humanlifespan_id.unique_with' => 'The detail already exist.',
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
            $SubTestDetail = SubTestDetail::create($request->all());
            $SubTestDetail->order_by = $SubTestDetail->id;
            $SubTestDetail->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record created successfully',
            ]);
        }
    }

    public function update(Request $request){
        // $getUser = Auth::user();

        $SubTestDetail = SubTestDetail::findOrFail($request->id);

        $request->request->add([
            'updated_by' 	=> 1,
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
            'slug' 	        => slug($request->test_name, '_'),
        ]);

        $attributeNames = [
            'gender_id'         => "gender",
            'humanlifespan_id'  => "human lifespan",
            "normal_value"      => "normal value",
        ];

        $rules = [
            'humanlifespan_id'  => 'unique_with:sub_test_details,maintest_id,subtest_id,gender_id,humanlifespan_id,'.$request->id,
            'normal_value'      => 'required',
        ];

        $messages = [
            'humanlifespan_id.unique_with' => 'The detail already exist.',
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
            $SubTestDetail->update($request->all());
            // $SubTestDetail->order_by = $SubTestDetail->id;
            // $SubTestDetail->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function updateOrderBy(Request $request)
    {
        foreach (SubTestDetail::all() as $item) {
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
