<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

use App\Models\PatientCase;
use App\Models\PatientCaseReceipt;

class PaymentsController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }

    public function get(Request $request){
        $PatientCaseReceipt = new PatientCaseReceipt();
        $PatientCase = new PatientCase();
        $PCRs = $PatientCaseReceipt
        ->leftJoin('patient_cases','patient_cases.id','=','patient_case_receipts.patientcase_id')
        ->leftJoin('patients','patients.id','=','patient_cases.patient_id')
        ->leftJoin('genders','genders.id','=','patients.gender_id')
        ->select(
            'patient_case_receipts.*',
            
            'patient_cases.patient_id',
            'patient_cases.case_number',
            'patient_cases.reffer_id',
            'patient_cases.samplelocation_id',
            'patient_cases.discount_type',
            'patient_cases.discount',

            'patients.name',
            'patients.patient_number',
            'patients.age',
            'patients.mobile',
            'patients.address',

            'patients.gender_id',
            
            'genders.title as gender'
        );

        $perPageAction = $request->perPageAction;

        // Search
        if(isset($request->search['patient_number'])){
            $patient_number = $request->search['patient_number'];
            $PCRs = $PCRs->where("patients.patient_number", "LIKE", "%$patient_number%");
        }
        if(isset($request->search['name'])){
            $name = $request->search['name'];
            $PCRs = $PCRs->where("patients.name", "LIKE", "%$name%");
        }
        if(isset($request->search['mobile'])){
            $mobile = $request->search['mobile'];
            $PCRs = $PCRs->where("patients.mobile", "LIKE", "%$mobile%");
        }
        if(isset($request->search['gender_id'])){
            $gender_id = $request->search['gender_id'];
            $PCRs = $PCRs->where("patients.gender_id", $gender_id);
        }
        if(isset($request->search['reffer_id'])){
            $reffer_id = $request->search['reffer_id'];
            $PCRs = $PCRs->where("patient_cases.reffer_id", $reffer_id);
        }
        if(isset($request->search['address'])){
            $address = $request->search['address'];
            $PCRs = $PCRs->where("patients.address", "LIKE", "%$address%");
        }

        $orderByAction = checkValueNotEmptyInArray($PatientCaseReceipt->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field')){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $PCRs = $PCRs->orderBy($orderBy, $sort);
        }

        // $orderByAction = checkValueNotEmptyInArray($PatientCaseReceipt->tableColumns());
        // $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        // if(keyExists($orderByAction,'field') && $request->orderByAction){
        //     $orderBy = $orderByAction['field'];
        //     $sort = $orderByAction['sort'];
        //     $PCRs = $PCRs->orderBy($orderBy, $sort);
        // } else {
        //     $PCRs = $PCRs->orderBy('created_at', 'desc');
        // }

        return [
            'items' => $PCRs->with('createdBy.Profile')->paginate($perPageAction),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($PatientCaseReceipt->tableColumns(),$orderByAction),
        ];
    }

}