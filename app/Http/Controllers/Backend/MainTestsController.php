<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
use App\Models\MainTest;

class MainTestsController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }

    public function get(Request $request){
        $MainTest = new MainTest();
        $MainTests = $MainTest;

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $MainTests = $MainTests;
        } elseif($status == 'trash'){
            $MainTests = $MainTests->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $MainTests = $MainTests->where('status', $s['key']);
                    }
                }
            }
        }

        if(isset($request->search['test_code'])){
            $test_code = $request->search['test_code'];
            $MainTests = $MainTests->where("test_code", "LIKE", "%$test_code%");
        }
        if(isset($request->search['test_short_name'])){
            $test_short_name = $request->search['test_short_name'];
            $MainTests = $MainTests->where("test_short_name", "LIKE", "%$test_short_name%");
        }
        if(isset($request->search['test_name'])){
            $test_name = $request->search['test_name'];
            $MainTests = $MainTests->where("test_name", "LIKE", "%$test_name%");
        }

        $orderByAction = checkValueNotEmptyInArray($MainTest->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field') && $request->orderByAction){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $MainTests = $MainTests->orderBy($orderBy, $sort);
        } else {
            $MainTests = $MainTests->orderBy('order_by', 'asc');
        }
        
        return [
            'items' => $MainTests->with('SubTests')->get(),
            'statusesCount' => addClassByKeyInArray($MainTest->statusesCount(),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($MainTest->tableColumns(),$orderByAction),
        ];
    }

    public function edit(Request $request){
        $MainTest = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('main_tests',$request->recordId)){
                $MainTest = MainTest::find($request->recordId);
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        return [
            'itemData' => $MainTest,
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        // return $bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $MainTest = MainTest::find($value);
                if($bulkAction == 'trash'){
                    $MainTest->status = $bulkAction;
                    $MainTest->save();
                    $MainTest->delete();
                } elseif($bulkAction == 'restore'){
                    MainTest::withTrashed()->find($value)->restore();
                    $restoredItem = MainTest::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    MainTest::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $MainTest->status = $bulkAction;
                    $MainTest->save();
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
            'test_code'         => __('labels.main_tests.fields.test_code'),
            'test_short_name'   => __('labels.main_tests.fields.test_short_name'),
            'test_name'         => __('labels.main_tests.fields.test_name'),
            "status"            => "status",
        ];

        $rules = [
            'test_code'         => 'required|max:10|unique_with:main_tests,test_code',
            'test_short_name'   => 'required|max:100',
            'test_name'         => 'required|max:200|unique_with:main_tests,test_name',
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
                'errors' => $Validator->errors(),
            ]);
        } 
        else 
        {
            $MainTest = MainTest::create($request->all());
            $MainTest->order_by = $MainTest->id;
            $MainTest->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record created successfully',
            ]);
        }
    }

    public function update(Request $request){
        // $getUser = Auth::user();

        $MainTest = MainTest::findOrFail($request->id);

        $request->request->add([
            'updated_by' 	=> 1,
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
            'slug' 	        => slug($request->test_name, '_'),
        ]);

        $attributeNames = [
            'test_code'         => __('labels.main_tests.fields.test_code'),
            'test_short_name'   => __('labels.main_tests.fields.test_short_name'),
            'test_name'         => __('labels.main_tests.fields.test_name'),
        ];

        $rules = [
            'test_code'         => 'required|max:10|unique_with:main_tests,test_code,'.$request->id,
            'test_short_name'   => 'required|max:100',
            'test_name'         => 'required|max:200|unique_with:main_tests,test_name,'.$request->id,
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
            $MainTest->update($request->all());
            // $MainTest->order_by = $MainTest->id;
            // $MainTest->update();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function updateOrderBy(Request $request)
    {
        foreach (MainTest::all() as $item) {
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

    public function getAllActiveTests(){
        return MainTest::where('status',1)->orderBy('order_by','ASC')->with('ActiveSubTests.ActiveSubTestDetails')->get();
    }
}