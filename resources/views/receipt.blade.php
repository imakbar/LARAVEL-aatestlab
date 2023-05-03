<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Resume</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

</head>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500&display=swap');
</style>

<body style="margin: 0; padding:0;">
    <div style="margin: 0 auto;display: block;font-family: 'Roboto', sans-serif;">
        <table class="table table-bordered" width="100%" cellpadding="12" cellspacing="0" style="color:#555;font-size:12px;">
            <tr>
                <td class="p-0">
                    <table cellspacing="0" border="0" width="100%" cellpadding="0">
                        <tr>
                            <td>
                                <table cellspacing="0" border="1" width="100%" cellpadding="10">
                                    <tr>
                                        <td width="50">
                                            <!-- <img src="{{appSettingLogos()['logo_light']->path}}"> -->
                                            <img width="100" src="{{$logo}}">
                                        </td>
                                        <td>
                                            <table cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <th style="text-align: left; font-size:20px;">{{appSettingGeneral()['app_name']}}</th>
                                                </tr>
                                                <tr>
                                                    <th style="text-align: left; font-size:15px;">{{appSettingGeneral()['app_title']}}</th>
                                                </tr>
                                                <tr>
                                                    <td>{{appSettingGeneral()['app_address']}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Telephone: {{appSettingGeneral()['app_phone']}}, Mobile: {{appSettingGeneral()['app_mobile']}}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email: {{appSettingGeneral()['app_email']}}, Website: {{appSettingGeneral()['app_url']}}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr class="bg-primary">
                            <td>
                                <table cellspacing="0" border="1" width="100%" style="border-top:none;">
                                    <tr>
                                        <th style="text-align: left;" width="110">Patient Number</th>
                                        <td>
                                            <span v-if="patient">
                                                {{$patient->patient_number}}
                                            </span>
                                        </td>
                                        <th style="text-align: left;" width="110">Case Number</th>
                                        <td>
                                            <span v-if="record">
                                                {{$patientCase->case_number}}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellspacing="0" border="1" width="100%" style="border-top:none;border-bottom:none;">
                                    <tr>
                                        <th style="text-align: left;" width="110">Date/Time</th>
                                        <td>{{$caseMaxDate}}</td>
                                        <th style="text-align: left;" width="110">Lab Number</th>
                                        <td>0000</td>
                                    </tr>
                                    <tr>
                                        <th style="text-align:left;">Patient</th>
                                        <td>
                                            <span v-if="patient">
                                                {{$patient->name}}
                                            </span>
                                        </td>
                                        <th style="text-align:left;">Gender</th>
                                        <td>
                                            @if($patient->gender)
                                                {{$patient->gender->title}}
                                            @else
                                                N/A
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="text-align:left;">Ref By</th>
                                        <td>
                                            @if($patientCase->reffer)
                                                {{$patientCase->reffer->name}}
                                            @else
                                                N/A
                                            @endif
                                        </td>
                                        <th style="text-align:left;">Specimen</th>
                                        <td>
                                            @if($patientCase->SampleLocation)
                                                {{$patientCase->SampleLocation->title}}
                                            @else
                                                N/A
                                            @endif
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style="text-align:left;">Address</th>
                                        <td>
                                            <span v-if="patient">
                                                {{$patient->address}}
                                            </span>
                                        </td>
                                        <th style="text-align:left;">Phone</th>
                                        <td>
                                            <span v-if="patient">
                                                {{$patient->mobile}}
                                            </span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellspacing="0" border="1" width="100%" style="border-bottom:none;">
                                    <thead>
                                        <tr>
                                            <th style="text-align: left;" width="20">S.#</th>
                                            <th style="text-align:left;">Tests</th>
                                            <th width="100" style="text-align:center;">Report Date</th>
                                            <th width="60" style="text-align:right;">Charges</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($caseTestsReceipt as $key => $item)
                                        <tr>
                                            <td>{{$key+1}}</td>
                                            <td>
                                                @if($item->mainTest)
                                                    {{$item->mainTest->test_name}}
                                                @endif
                                            </td>
                                            <td style="text-align:center;">
                                                <span v-if="item.maintest_id">
                                                    {{$item->report_given_date}}
                                                </span>
                                            </td>
                                            <td style="text-align:right;">
                                                {{$item->total}}
                                            </td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <table cellspacing="0" border="1" width="100%">
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td width="150">
                                            <table cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <th style="text-align:left;">Subtotal</th>
                                                    <td style="text-align:right;">{{$subTotal}}</td>
                                                </tr>
                                                <tr v-if="record.discounted != 0">
                                                    <th style="text-align:left;">Discount</th>
                                                    <td style="text-align:right;">{{$discountedAmount}}</td>
                                                </tr>
                                                <tr>
                                                    <th style="text-align:left;">Net Total</th>
                                                    <td style="text-align:right;">{{$netTotal}}</td>
                                                </tr>
                                                <tr>
                                                    <th style="text-align:left;">Paid</th>
                                                    <td style="text-align:right;">{{$paid}}</td>
                                                </tr>
                                                <tr>
                                                    <th style="text-align:left;">Due Amount</th>
                                                    <td style="text-align:right;">{{$dueAmount}}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>