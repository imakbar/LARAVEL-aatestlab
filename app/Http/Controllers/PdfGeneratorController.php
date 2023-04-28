<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use PDF;

class PdfGeneratorController extends Controller
{
    public function index() 
    {
        $data = [
            'imagePath'    => public_path('img/profile.png'),
            'name'         => 'John Doe',
            'address'      => 'USA',
            'mobileNumber' => '000000000',
            'email'        => 'john.doe@email.com'
        ];
        $pdf = PDF::loadView('resume', $data);
        return $pdf->stream('resume.pdf');
    }
    
    public function receipt($patientCaseId){
        // return appSettingLogos()['logo_light'];
        $data = [
            // 'logo' => public_path(appSettingLogos()['logo_light']->path),
            'logo'    => public_path('logo.png'),
            'patientCase' => getReceiptDetails($patientCaseId)['patientCase'],
            'patient' => getReceiptDetails($patientCaseId)['patient'],
            'caseTests' => getReceiptDetails($patientCaseId)['caseTests'],
            'caseTestsReceipt' => getReceiptDetails($patientCaseId)['caseTestsReceipt'],
            'caseMaxDate' => getReceiptDetails($patientCaseId)['caseMaxDate'],
            'discount' => getReceiptDetails($patientCaseId)['discount'],
            'discountType' => getReceiptDetails($patientCaseId)['discountType'],
            // 'totalPaid' => getPatientCaseReceipts($patientCaseId)['totalPaid'],
            'paidHistory' => getPatientCaseReceipts($patientCaseId)['paidHistory'],
            'subTotal' => number_format(getReceiptDetails($patientCaseId)['subTotal'],2,'.',','),
            'discount' => number_format(getReceiptDetails($patientCaseId)['discount'],2,'.',','),
            'discountedAmount' => number_format(getReceiptDetails($patientCaseId)['discountedAmount'],2,'.',','),
            'netTotal' => number_format(getReceiptDetails($patientCaseId)['netTotal'],2,'.',','),
            'paid' => number_format(getPatientCaseReceipts($patientCaseId)['totalPaid'],2,'.',','),
            'dueAmount' => number_format(getReceiptDetails($patientCaseId)['dueAmount'],2,'.',','),
            'paymentHistory' => getPaymentHistory($patientCaseId)['payments'],
        ];
        // return $data;
        // return view('receipt')->with(compact('data'));
        $pdf = PDF::loadView('receipt', $data);
        return $pdf->stream('receipt.pdf');
    }
}
