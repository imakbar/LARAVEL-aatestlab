<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
use App\Models\MainTest;
use App\Models\SubTest;

class SubTestsController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }

    public function get(Request $request){
        $SubTest = new SubTest();
        $maintest_id = $request->maintest_id;
        $SubTests = $SubTest->where('maintest_id',$maintest_id);

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $SubTests = $SubTests;
        } elseif($status == 'trash'){
            $SubTests = $SubTests->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $SubTests = $SubTests->where('status', $s['key']);
                    }
                }
            }
        }

        if(isset($request->search['test_code'])){
            $test_code = $request->search['test_code'];
            $SubTests = $SubTests->where("test_code", "LIKE", "%$test_code%");
        }
        if(isset($request->search['test_name'])){
            $test_name = $request->search['test_name'];
            $SubTests = $SubTests->where("test_name", "LIKE", "%$test_name%");
        }
        if(isset($request->search['test_rate'])){
            $test_rate = $request->search['test_rate'];
            $SubTests = $SubTests->where("test_rate", "LIKE", "%$test_rate%");
        }
        if(isset($request->search['reporting_time'])){
            $reporting_time = $request->search['reporting_time'];
            $SubTests = $SubTests->where("reporting_time", "LIKE", "%$reporting_time%");
        }

        $orderByAction = checkValueNotEmptyInArray($SubTest->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field') && $request->orderByAction){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $SubTests = $SubTests->orderBy($orderBy, $sort);
        } else {
            $SubTests = $SubTests->orderBy('order_by', 'asc');
        }
        
        return [
            'items' => $SubTests->with('SubTestDetails','SubTestDetails.Gender','SubTestDetails.HumanLifespan')->get(),
            'statusesCount' => addClassByKeyInArray($SubTest->statusesCount($maintest_id),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($SubTest->tableColumns(),$orderByAction),
        ];
    }

    public function edit(Request $request){
        $SubTest = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('sub_tests',$request->recordId)){
                $SubTest = SubTest::find($request->recordId);
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        return [
            'itemData' => $SubTest,
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        // return $bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $SubTest = SubTest::find($value);
                if($bulkAction == 'trash'){
                    $SubTest->status = $bulkAction;
                    $SubTest->save();
                    $SubTest->delete();
                } elseif($bulkAction == 'restore'){
                    SubTest::withTrashed()->find($value)->restore();
                    $restoredItem = SubTest::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    SubTest::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $SubTest->status = $bulkAction;
                    $SubTest->save();
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
            'test_code'         => "test code",
            'test_name'         => "test name",
            'test_rate'         => "test rate",
            "status"            => "status",
        ];

        $rules = [
            'test_code' => 'required|max:10|unique_with:sub_tests,maintest_id,test_code,test_name',
            'test_name' => 'required|max:200|unique_with:sub_tests,maintest_id,test_code,test_name',
            'test_rate' => 'required|numeric|min:10|max:50000',
        ];

        $messages = [
            'test_code.unique_with' => 'The test code already exist.',
            'test_name.unique_with' => 'The test name already exist.',
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
            $SubTest = SubTest::create($request->all());
            $SubTest->order_by = $SubTest->id;
            $SubTest->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record created successfully',
            ]);
        }
    }

    public function update(Request $request){
        // $getUser = Auth::user();

        $SubTest = SubTest::findOrFail($request->id);

        $request->request->add([
            'updated_by' 	=> 1,
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
            'slug' 	        => slug($request->test_name, '_'),
        ]);

        $attributeNames = [
            'test_code'         => "test code",
            'test_name'         => "test name",
            'test_rate'         => "test rate",
            "status"            => "status",
        ];

        $rules = [
            'test_code' => 'required|max:10|unique_with:sub_tests,maintest_id,test_code,test_name,'.$request->id,
            'test_name' => 'required|max:200|unique_with:sub_tests,maintest_id,test_code,test_name,'.$request->id,
            'test_rate' => 'required|numeric|min:10|max:50000',
            "status"            => "required",
        ];

        $messages = [
            'test_code.unique_with' => 'The test code already exist.',
            'test_name.unique_with' => 'The test name already exist.',
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
            $SubTest->update($request->all());
            // $SubTest->order_by = $SubTest->id;
            // $SubTest->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function updateOrderBy(Request $request)
    {
        foreach (SubTest::all() as $item) {
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
