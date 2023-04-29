<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Validator;

use App\Models\PatientCase;
use App\Models\PatientCaseDetail;
use App\Models\MainTest;
use App\Models\PatientCaseReceipt;
use App\Models\SubTest;

class CaseController extends Controller
{

    public function search(Request $request){
        $PaitentCases = new PatientCase();
        if($request->patient_number){
            $PaitentCases = $PaitentCases->where('patient_number','LIKE','%'.$request->patient_number.'%');
        }
        if($request->mobile){
            $PaitentCases = $PaitentCases->where('mobile','LIKE','%'.$request->mobile.'%');
        }
        if($request->name){
            $PaitentCases = $PaitentCases->where('name','LIKE','%'.$request->name.'%');
        }
        return $PaitentCases->orderBy('id','DESC')->with('Gender')->paginate(5);
    }

    public function get(Request $request){
        $PatientCase = new PatientCase();
        $PaitentCases = $PatientCase->leftJoin('patients','patients.id','=','patient_cases.patient_id')->leftJoin('genders','genders.id','=','patients.gender_id')->select(
            'patient_cases.*','patients.name','patients.patient_number','patients.age','patients.mobile','patients.address','genders.title as gender'
        );

        $perPageAction = $request->perPageAction;

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $PaitentCases = $PaitentCases;
        } elseif($status == 'trash'){
            $PaitentCases = $PaitentCases->onlyTrashed();
        } else {
            if(sizeof(caseStatusTypes()) > 0){
                foreach(caseStatusTypes() as $s){
                    if($s['key'] == $status) {
                        $PaitentCases = $PaitentCases->where('status', $s['key']);
                    }
                }
            }
        }

        $orderByAction = checkValueNotEmptyInArray($PatientCase->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field')){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $PaitentCases = $PaitentCases->orderBy($orderBy, $sort);
            // if($orderBy == 'patient_case_details'){
            //     $PaitentCases = $PaitentCases->whereHas('patient_case_details', function ($query) use ($orderBy,$sort) {
            //         $query->orderBy($orderBy, $sort);
            //     });
            // } else {
            //     $PaitentCases = $PaitentCases->orderBy($orderBy, $sort);
            // }
        }

        return [
            'items' => $PaitentCases->with('Patient.Gender','PatientCaseDetails.SubTest')->paginate($perPageAction),
            'statusesCount' => addClassByKeyInArray($PatientCase->statusesCount(),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($PatientCase->tableColumns(),$orderByAction),
        ];
    }

    public function edit(Request $request){
        $PatientCase = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('patient_cases',$request->case_id)){
                $PatientCase = PatientCase::where('id',$request->case_id)->with('Patient','Reffer','SampleLocation','PatientCaseDetails.MainTest','PatientCaseDetails.SubTest')->first();
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        // return getPatientCaseTestsForReceipt($PatientCase->id);
        // return getReceiptDetails($PatientCase->id)['subTotal'];
        return [
            'itemData' => getReceiptDetails($PatientCase->id)['patientCase'],
            'patient' => getReceiptDetails($PatientCase->id)['patient'],
            'caseTests' => getReceiptDetails($PatientCase->id)['caseTests'],
            'caseTestsReceipt' => getReceiptDetails($PatientCase->id)['caseTestsReceipt'],
            'caseMaxDate' => getReceiptDetails($PatientCase->id)['caseMaxDate'],
            'discount' => getReceiptDetails($PatientCase->id)['discount'],
            'discountType' => getReceiptDetails($PatientCase->id)['discountType'],
            // 'totalPaid' => getPatientCaseReceipts($PatientCase->id)['totalPaid'],
            'paidHistory' => getPatientCaseReceipts($PatientCase->id)['paidHistory'],
            'subTotal' => getReceiptDetails($PatientCase->id)['subTotal'],
            'discount' => getReceiptDetails($PatientCase->id)['discount'],
            'discountedAmount' => getReceiptDetails($PatientCase->id)['discountedAmount'],
            'netTotal' => getReceiptDetails($PatientCase->id)['netTotal'],
            'paid' => getPatientCaseReceipts($PatientCase->id)['totalPaid'],
            'dueAmount' => getReceiptDetails($PatientCase->id)['dueAmount'],
            'paymentHistory' => getPaymentHistory($PatientCase->id)['payments'],
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $PatientCase = PatientCase::find($value);
                if($bulkAction == 'trash'){
                    $PatientCase->status = $bulkAction;
                    $PatientCase->save();
                    $PatientCase->delete();
                } elseif($bulkAction == 'restore'){
                    PatientCase::withTrashed()->find($value)->restore();
                    $restoredItem = PatientCase::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    PatientCase::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $PatientCase->status = $bulkAction;
                    $PatientCase->save();
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

    public function save(Request $request)
    {
        DB::beginTransaction();
        $getUser = Auth::user();
        date_default_timezone_set('Asia/Karachi');

        $record = $request->record;
        
        // $tests = $request->record['tests'];
        // $tests = []; //$request->selected_tests;
        // foreach ($request->tests as $key => $value) {
        //     foreach ($value['sub_tests'] as $i => $data) {
        //         $tests[] = $data;
        //     }
        // }

        $request->request->add([
            'created_by' 	    => $getUser->id,
            'created_date' 	    => date('Y-m-d'),
            'created_time' 	    => date('H:i:s'),
            'updated_by' 	    => $getUser->id,
            'updated_date' 	    => date('Y-m-d'),
            'updated_time' 	    => date('H:i:s'),
            'status'            => 'pending',
        ]);
        
        if(isset($record['patient_id'])){
            $request->request->add([
                'patient_id'    => $record['patient_id'],
            ]);
        }

        $attributeNames = [
            'reffer_id'         => 'reffer',
            'samplelocation_id' => 'sample location',
            'status'            => 'status',
        ];

        $rules = [
            // 'reffer_id'         => 'required',
            'samplelocation_id' => 'required'
        ];

        $messages = [];

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
            if(sizeof($request->tests) == 0){
                // return response()->json([
                //     'success' => false,
                //     'errors' => ['tests' => ['kindly select test']],
                // ]);
                return response()->json([
                    'status' => 'warning',
                    'success' => false,
                    'message' => 'Kindly select test',
                ],500);
            }

            try {
                $PatientCase = PatientCase::create($request->all());
                $PatientCase->case_number = date('dmy').'-'.serialNumber($PatientCase->id);
                $PatientCase->update();
    
                if(sizeof($request->tests) > 0){
                    foreach ($request->tests as $key => $test) {
                        $SubTest = new SubTest();
                        $SubTest = SubTest::findOrFail($test['subtest_id']);
                        $PatientCaseDetail = new PatientCaseDetail();
                        $PatientCaseDetail->order_by = $SubTest?$SubTest->order_by:0;
                        $PatientCaseDetail->patient_id = $PatientCase->patient_id;
                        $PatientCaseDetail->patientcase_id = $PatientCase->id;
                        $PatientCaseDetail->maintest_id = $test['maintest_id'];
                        $PatientCaseDetail->subtest_id = $test['subtest_id'];
        
                        // if(isset($SubTest['reporting_time'])){
                            $PatientCaseDetail->reporting_time = $SubTest['reporting_time'];
                        // }
        
                        // $reportGivenDate = addHours(date('Y-m-d H:i:s'), $test['reporting_time']);
                        // $PatientCaseDetail->report_given_date = $reportGivenDate;
                        $reportGivenDate = addHours(date('Y-m-d H:i:s'), $SubTest['reporting_time']);
                        $PatientCaseDetail->report_given_date = $reportGivenDate;
        
                        $PatientCaseDetail->created_by = $getUser->id;
                        $PatientCaseDetail->created_date = date('Y-m-d');
                        $PatientCaseDetail->created_time = date('H:i:s');
                        $PatientCaseDetail->updated_by = $getUser->id;
                        $PatientCaseDetail->updated_date = date('Y-m-d');
                        $PatientCaseDetail->updated_time = date('H:i:s');
                        $PatientCaseDetail->save();
                    }
                }

                DB::commit();
                return response()->json([
                    'status' => 'success',
                    'success' => true,
                    'message' => 'Record created successfully',
                    'case' => $PatientCase,
                ]);
            } catch (\Throwable $e) {
                DB::rollBack();
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'message' => json_encode($e->getMessage()),
                ],500);
            }

        }
    }

    public function update(Request $request){
        DB::beginTransaction();
        $getUser = Auth::user();
        $PatientCase = PatientCase::findOrFail($request->id);

        $request->request->add([
            'updated_by' 	    => getUserId(),
            'updated_date' 	    => date('Y-m-d'),
            'updated_time' 	    => date('H:i:s'),
            'reg_date_time' 	=> date('Y-m-d H:i:s'),
            'reg_date' 	        => date('Y-m-d'),
            'reg_time' 	        => date('H:i:s'),
        ]);

        $attributeNames = [
            'reffer_id'         => 'reffer',
            'samplelocation_id' => 'sample location',
            'status'            => 'status',
        ];

        $rules = [
            // 'reffer_id'         => 'required',
            'samplelocation_id' => 'required'
        ];

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
            if(sizeof($request->tests) == 0){
                return response()->json([
                    'success' => false,
                    'errors' => ['tests' => ['kindly select test']],
                ]);
            }

            try {
                $PatientCase->update($request->all());
    
                if(sizeof($request->tests) > 0){
                    PatientCaseDetail::where('patientcase_id',$PatientCase->id)->delete();
                    foreach ($request->tests as $key => $test) {
                        $SubTest = new SubTest();
                        $SubTest = SubTest::findOrFail($test['subtest_id']);
                        $PatientCaseDetail = new PatientCaseDetail();
                        $PatientCaseDetail->order_by = $SubTest?$SubTest->order_by:0;
                        $PatientCaseDetail->patient_id = $PatientCase->patient_id;
                        $PatientCaseDetail->patientcase_id = $PatientCase->id;
                        $PatientCaseDetail->maintest_id = $test['maintest_id'];
                        $PatientCaseDetail->subtest_id = $test['subtest_id'];
        
                        // if(isset($SubTest['reporting_time'])){
                            $PatientCaseDetail->reporting_time = $SubTest['reporting_time'];
                        // }
        
                        // $reportGivenDate = addHours(date('Y-m-d H:i:s'), $test['reporting_time']);
                        // $PatientCaseDetail->report_given_date = $reportGivenDate;

                        // $reportGivenDate = addHours(date('Y-m-d H:i:s'), $SubTest['reporting_time']);
                        // $PatientCaseDetail->report_given_date = $reportGivenDate;
        
                        $PatientCaseDetail->created_by = $getUser->id;
                        $PatientCaseDetail->created_date = date('Y-m-d');
                        $PatientCaseDetail->created_time = date('H:i:s');
                        $PatientCaseDetail->updated_by = $getUser->id;
                        $PatientCaseDetail->updated_date = date('Y-m-d');
                        $PatientCaseDetail->updated_time = date('H:i:s');
                        $PatientCaseDetail->save();
                    }
                }

                DB::commit();
                return response()->json([
                    'status' => 'success',
                    'success' => true,
                    'message' => 'Record updated successfully',
                    'case' => $PatientCase,
                ]);
            } catch (\Throwable $e) {
                DB::rollBack();
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'message' => json_encode($e->getMessage()),
                ],500);
            }
            
        }
    }    

    public function payment(Request $request){
        // return $request->all();
        $getUser = Auth::user();
        date_default_timezone_set('Europe/London');

        $request->request->add([
            "pay" => (float)$request->pay
        ]);
        // return $request->all();

        $attributeNames = [
            'pay'         => 'Paid',
        ];

        $rules = [
            // 'pay'   => 'required|numeric|min:0|lt:net_total',
            'pay'   => 'required|numeric|min:0',
        ];

        $messages = [
            'pay.lt' => 'The Paid must be less than Net Total.!',
        ];

        // return $request->netTotal;
        // if($request->pay > $request->netTotal){
        //     return response()->json([
        //         'success' => false,
        //         'errors' => ["pay"=>[0=>"Pay can not greater then net total"]],
        //     ]);
        // }

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
            $PatientCase = PatientCase::findOrFail($request->patientcase_id);

            $PatientCase->discount = $request->discount;
            $PatientCase->discount_type = $request->discountType;
            $PatientCase->update();
            
            $PatientCaseDetails = PatientCaseDetail::where('patientcase_id',$PatientCase->id)->with('SubTest')->get()->toArray();
            
            $totalPayable = 0;
            foreach($PatientCaseDetails as $item){
                $totalPayable += $item['sub_test']['test_rate'];
            }
            
            // return $totalPayable;
            // return $PatientCase->PatientCaseReceipts->sum('paid');
            
            $PaidAmount = $PatientCase->PatientCaseReceipts->sum('paid');
            
            if($request->discountType == '%'){
                // $discounted = $PaidAmount/100*$PatientCase->discount;
                $net_total = $totalPayable - ($totalPayable/100*$PatientCase->discount);
            }
            if($request->discountType == 'rs'){
                // $discounted = $PatientCase->discount;
                $net_total = $totalPayable - $PatientCase->discount;
            }

            if($totalPayable < ($PaidAmount + $request->pay)){
                return response()->json([
                    'success' => false,
                    'errors' => ["pay"=>["The Paid must be less than Net Total.."]],
                ]);
            }

            if(sizeof($PatientCase->PatientCaseReceipts) != 0 && $request->pay == 0){
                return response()->json([
                    'success' => false,
                    'errors' => ["pay"=>["The Paid amount must be greather than 0"]],
                ]);
            }
            // return $net_total;
            if($net_total >= ($PaidAmount + $request->pay)){
                $PatientCase->discount_type = $request->discountType;
                $PatientCase->discount = $request->discount;
                $PatientCase->update();
    
                $PatientCaseReceipt = new PatientCaseReceipt();
                $PatientCaseReceipt->patient_id = $PatientCase->patient_id;
                $PatientCaseReceipt->patientcase_id = $request->patientcase_id;
                $PatientCaseReceipt->paid = $request->pay;
    
                $PatientCaseReceipt->created_by = $getUser->id;
                $PatientCaseReceipt->created_date = date('Y-m-d');
                $PatientCaseReceipt->created_time = date('H:i:s');
                $PatientCaseReceipt->save();
                
                return response()->json([
                    'success' => true,
                    'type' => 'success',
                    'message' => 'Paid successfully',
                    'pay' => round($request->pay,2),
                ]);

            } else {

                return response()->json([
                    'success' => true,
                    'type' => 'warning',
                    'message' => 'Patient already been paid for this case',
                ]);

            }

        }
    }

    public function paymentDelete($id){
        $PCR = new PatientCaseReceipt();
        $patientCaseReceiptId = $id;
        $pCRData = $PCR->getById($patientCaseReceiptId);
        if($PCR->checkById($patientCaseReceiptId) == 0){
            return response()->json([
                'success' => false,
                'type' => 'error',
                'message' => 'Record does not exist',
            ]);
        }
        $PCR->deleteById($patientCaseReceiptId);

        if(PatientCaseReceipt::where('patientcase_id',$pCRData->patientcase_id)->count() == 0){
            $PatientCase = PatientCase::where('id',$pCRData->patientcase_id)->first();
            $PatientCase->discount_type = null;
            $PatientCase->discount = 0;
            $PatientCase->update();
        }

        return response()->json([
            'success' => true,
            'type' => 'success',
            'message' => 'Record deleted successfully',
        ]);
    }

}
