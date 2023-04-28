<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Auth;
use Validator;
use Illuminate\Support\Str;
use ACL;

use App\Models\Patient;
use App\Models\MainTest;
// use App\Models\PatientTest;
use App\Models\SubTest;

class PatientsController extends Controller
{
    // public function index(){
    //     return view('backend.patients');
    // }

    public function search(Request $request){
        $Patients = new Patient();
        if($request->patient_number){
            $Patients = $Patients->where('patient_number','LIKE','%'.$request->patient_number.'%');
        }
        if($request->mobile){
            $Patients = $Patients->where('mobile','LIKE','%'.$request->mobile.'%');
        }
        if($request->name){
            $Patients = $Patients->where('name','LIKE','%'.$request->name.'%');
        }
        return $Patients->orderBy('id','DESC')->with('Gender')->paginate(5);
    }

    public function get(Request $request){
        $Patient = new Patient();
        $Patients = $Patient;

        $perPageAction = $request->perPageAction;

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $Patients = $Patients;
        } elseif($status == 'trash'){
            $Patients = $Patients->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $Patients = $Patients->where('status', $s['key']);
                    }
                }
            }
        }

        $orderByAction = checkValueNotEmptyInArray($Patient->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field')){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $Patients = $Patients->orderBy($orderBy, $sort);
        }

        return [
            'items' => $Patients->with('Gender')->paginate($perPageAction),
            'statusesCount' => addClassByKeyInArray($Patient->statusesCount(),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($Patient->tableColumns(),$orderByAction),
        ];
    }

    public function edit(Request $request){
        $Patient = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('patients',$request->recordId)){
                $Patient = Patient::where('id',$request->recordId)->with('Gender','Reffer')->first();
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        return [
            'itemData' => $Patient,
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $Patient = Patient::find($value);
                if($bulkAction == 'trash'){
                    $Patient->status = $bulkAction;
                    $Patient->save();
                    $Patient->delete();
                } elseif($bulkAction == 'restore'){
                    Patient::withTrashed()->find($value)->restore();
                    $restoredItem = Patient::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    Patient::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $Patient->status = $bulkAction;
                    $Patient->save();
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
            'message' => $checkLength.' '.$bulkAction.' successfully',
        ]);
    }

    public function save(Request $request){
        $request->request->add([
            'created_by' 	    => getUserId(),
            'created_date' 	    => date('Y-m-d'),
            'created_time' 	    => date('H:i:s'),
            'updated_by' 	    => getUserId(),
            'updated_date' 	    => date('Y-m-d'),
            'updated_time' 	    => date('H:i:s'),
            'reg_date_time' 	=> date('Y-m-d H:i:s'),
            'reg_date' 	        => date('Y-m-d'),
            'reg_time' 	        => date('H:i:s'),
        ]);

        $attributeNames = [
            'name'              => 'name',
            'age'               => 'age',
            'gender_id'         => 'gender_id',
            'mobile'            => 'mobile',
            'address'           => 'address',
            'reffer_id'         => 'reffer_id',
            'status'            => 'status',
        ];

        $rules = [
            // "email" => "required|min:1|max:100|unique_with:patients",
            'name'              => 'required|min:2|max:150',
            'age'               => 'required|numeric|min:1|max:200',
            'gender_id'         => 'required',
            'mobile'            => 'required|max:20',
            // 'address'           => 'required|max:200',
            // 'reffer_id'         => 'required',
            // 'status'            => 'required',
            // 'samplelocation_id' => 'required'
        ];

        if($request->address != ''){
            $rules['address'] = 'max:200';
        }

        $messages = [
        ];

        $Validator = Validator::make($request->all(), $rules, $messages);
        $Validator->setAttributeNames($attributeNames);

        if ($Validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $Validator->errors(),
            ]);
        } 
        else 
        {
            $P = new Patient();

            if($P->GetByMobile($request->mobile)->count() > 0){
                $Patient = $P->GetByMobile($request->mobile)->first();
                $Patient->update($request->all());
            } else {
                $Patient = $P->create($request->all());
                $Patient->patient_number = $Patient->id.'-100';
                $Patient->update();
            }

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record created successfully',
            ]);
        }
    }

    public function update(Request $request){
        $Patient = Patient::findOrFail($request->id);

        $request->request->add([
            'updated_by' 	    => getUserId(),
            'updated_date' 	    => date('Y-m-d'),
            'updated_time' 	    => date('H:i:s'),
            'reg_date_time' 	=> date('Y-m-d H:i:s'),
            'reg_date' 	        => date('Y-m-d'),
            'reg_time' 	        => date('H:i:s'),
        ]);

        $attributeNames = [
            'name'              => 'name',
            'age'               => 'age',
            'gender_id'         => 'gender_id',
            'mobile'            => 'mobile',
            'address'           => 'address',
            'reffer_id'         => 'reffer_id',
            'status'            => 'status',
        ];

        $rules = [
            // "email" => "required|min:1|max:100|unique_with:patients",
            'name'              => 'required|min:2|max:150',
            'age'               => 'required|numeric|min:1|max:200',
            'gender_id'         => 'required',
            'mobile'            => 'required|max:20',
            // 'address'           => 'required|max:200',
            'reffer_id'         => 'required',
            // 'status'            => 'required',
            // 'samplelocation_id' => 'required'
        ];

        if($request->address != ''){
            $rules['address'] = 'max:200';
        }

        $messages = [
        ];

        $Validator = Validator::make($request->all(), $rules, $messages);
        $Validator->setAttributeNames($attributeNames);

        if ($Validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'fix errors',
                'errors' => $Validator->errors(),
            ]);
        } 
        else 
        {
            $Patient->update($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Record updated successfully',
            ]);
        }
    }

    // public function getPatients(Request $request){
    //     $Patients = new Patient();

    //     $status = $request->get('status')?$request->get('status'):'all';
    //     $sort = $request->get('sort')?$request->get('sort'):'asc';
    //     $column = $request->get('column')?$request->get('column'):'id';
    //     $limit = $request->get('limit')?$request->get('limit'):0;
            
    //     if($status == 'all'){
    //         $Patients = $Patients;
    //     } elseif($status == 'trash'){
    //         $Patients = $Patients->onlyTrashed();
    //     } else {
    //         if(sizeof(statusTypes()) > 0){
    //             foreach(statusTypes() as $s){
    //                 if($s['key'] == $status) {
    //                     $Patients = $Patients->where('status', $s['key']);
    //                 }
    //             }
    //         }
    //     }

    //     $Patients = $Patients->orderBy($column, $sort);

    //     return $Patients->with('Profile')->get();
    // }

    public function checkPatient(Request $request){
        $Patient = new Patient();

        $PatientExist = $Patient->checkById($request->patient_id);

        return [
            'exist' => $PatientExist> 0? true:false,
        ];
    }
}