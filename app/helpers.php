<?php
use Illuminate\Support\Facades\Crypt;

use App\Http\Controllers\Backend\ACLController;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use App\Models\AppSetting;
use App\Models\SetupSocial;
use App\Models\SetupRole;
use App\Models\SetupCurrency;
use App\Models\Attachment;
use App\Models\Patient;
use App\Models\PatientCase;
use App\Models\PatientCaseDetail;
use App\Models\PatientCaseReceipt;
use App\Models\User;
use App\Models\SetupTemplateVariable;
use App\Models\SubTest;
use Illuminate\Support\Facades\Config;
use Carbon\Carbon;

if (!function_exists('addHours')) {
    function addHours($dateTime, $hours){
        $givenDateTime = Carbon::parse($dateTime);
        $newDateTime = $givenDateTime->addHours($hours);
        return $newDateTime->toDateTimeString();
    }
}

if (!function_exists('encrypt')) {
    function encrypt($str){
        return Crypt::encryptString($str);
    }
}

if (!function_exists('decrypt')) {
    function decrypt($str){
        return Crypt::decryptString($str);
    }
}

if (!function_exists('defaultThumbnailSizes')) {
    function defaultThumbnailSizes(){
        return [
            'csv' => csvFiles(),
            'logo' => logoThumbnailSizes(),
            'profile' => profileThumbnailSizes(),
            'blog' => blogThumbnailSizes(),
        ];
    }
}

if (!function_exists('csvFiles')) {
    function csvFiles(){
        return  [
            "fileName" => 'file',
            "fileMimes" => 'csv',
            "fileSelection" => 'single', //single, multiple
            "fileMax" => 1, //how many files can select at a time
            "fileSize" => 100000, //file size in kb to mb
            "thumbnailSizes" => []
        ];
    }
}

if (!function_exists('profileThumbnailSizes')) {
    function profileThumbnailSizes(){
        return  [
            "fileName" => 'image',
            "fileMimes" => 'jpeg,jpg,png,pdf,svg,gif,zip',
            "fileSelection" => 'single', //single, multiple
            "fileMax" => 1, //how many files can select at a time
            "fileSize" => 100000, //file size in kb to mb
            "thumbnailSizes" => [
                [
                    "name" => 'thumbnail',
                    "size" => [
                        "width" => 150,
                        "height" => 150,
                    ]
                ],
                [
                    "name" => 'profile',
                    "size" => [
                        "width" => 601,
                        "height" => 675,
                    ]
                ],
                [
                    "name" => 'featured',
                    "size" => [
                        "width" => 400,
                        "height" => 475,
                    ]
                ]
            ]
        ];
    }
}

if (!function_exists('logoThumbnailSizes')) {
    function logoThumbnailSizes(){
        return  [
            "fileName" => 'image',
            "fileMimes" => 'jpeg,jpg,png,pdf,svg,gif,zip',
            "fileSelection" => 'single', //single, multiple
            "fileMax" => 1, //how many files can select at a time
            "fileSize" => 100000, //file size in kb to mb
            "thumbnailSizes" => [
                [
                    "name" => 'thumbnail',
                    "size" => [
                        "width" => 150,
                        "height" => 150,
                    ]
                ],
                [
                    "name" => '300x301',
                    "size" => [
                        "width" => 300,
                        "height" => 301,
                    ]
                ],
            ]
        ];
    }
}

if (!function_exists('blogThumbnailSizes')) {
    function blogThumbnailSizes(){
        return [
            [
                "name" => 'thumbnail',
                "size" => [
                    "width" => 150,
                    "height" => 150,
                ]
            ],
            [
                "name" => 'blog',
                "size" => [
                    "width" => 600,
                    "height" => 575,
                ]
            ],
            [
                "name" => 'featured',
                "size" => [
                    "width" => 400,
                    "height" => 375,
                ]
            ]
        ];
    }
}

if (!function_exists('moreThan')) {
    function moreThan($total,$number,$str1,$str2){
        if($total > $number){
            return $total.' '.$str2;
        } else {
            return $total.' '.$str1;
        }
    }
}

if (!function_exists('getRoleBySlug')) {
    function getRoleBySlug($slug){
        $SetupRole = new SetupRole();
        $exist = false;
        $SetupRoleData = '';
        if($SetupRole->checkBySlug($slug) > 0){
            $exist = true;
            $SetupRoleData = $SetupRole->getBySlug($slug);
        }
        return [
            'exist' => $exist,
            'data' => $SetupRoleData,
        ];
    }
}

if (!function_exists('getRolesBySlug')) {
    function getRolesBySlug($slugs){
        $SetupRole = new SetupRole();
        $exist = false;
        $SetupRoleData = [];
        foreach ($slugs as $key => $value) {
            if($SetupRole->checkBySlug($value) > 0){
                $exist = true;
                $SetupRoleData[] = $SetupRole->getBySlug($value)->id;
            } else {
                $exist = false;
            }
        }
        return [
            'exist' => $exist,
            'data' => $SetupRoleData,
        ];
    }
}

if (!function_exists('getPermissionsByCurrentUser')) {
    function getPermissionsByCurrentUser(){
        $ACLController = new ACLController();
        $user = auth()->user();
        return $ACLController->getRoleById($user->role_id);
    }
}

if (!function_exists('regexValidationUrl')) {
    function regexValidationUrl(){
        return '/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/';
    }
}

if (!function_exists('searchForKey')) {
    function searchForKey($key, $array, $default){
        if(sizeof($array) > 0){
            foreach ($array as $val) {
                if (isset($val['key']) && $val['key'] == $key) {
                    return $val;
                }
            }
        }
        return ['value'=>$default];
    }
}

if (!function_exists('getAppSettings')) {
    function getAppSettings($type){
        $exist = false;
        $data = [];
        if(AppSetting::where('type',$type)->count() > 0){
            $data = AppSetting::where('type',$type)->get();
            $exist = true;
        }
        return [
            'data' => $data,
            'exist' => $exist,
        ];
    }
}

if (!function_exists('appSettings')) {
    function appSettings(){
        return [
            'general' => appSettingGeneral(),
            'twilio' => appSettingTwilio(),
            // 'smtp' => appSettingSmtp(),
            'captcha' => appSettingCaptcha(),
            'logos' => appSettingLogos(),
            'socials' => appSettingSocials(),
            'twilio' => appSettingTwilio(),
        ];
    }
}

if (!function_exists('appSettingGeneral')) {
    function appSettingGeneral(){
        $data = [];
        if(getAppSettings('general')['exist']){
            $data = getAppSettings('general')['data'];
        }
        // return searchForKey('app_title',$data,'Laravel');
        return [
            'app_name'          => searchForKey('app_name',$data,'Laravel')['value'],
            'app_title'         => searchForKey('app_title',$data,'Laravel Application')['value'],
            'app_url'           => searchForKey('app_url',$data,'http://localhost:8000')['value'],
            'app_email'         => searchForKey('app_email',$data,'admin@admin.com')['value'],
            'app_phone'         => searchForKey('app_phone',$data,'(123) 456 7890')['value'],
            'app_mobile'        => searchForKey('app_mobile',$data,'(123) 888 6666')['value'],
            'app_office_timing' => searchForKey('app_office_timing',$data,'Mon - Fri, 9AM to 7PM')['value'],
            'app_address'       => searchForKey('app_address',$data,'Abc address Lahore')['value'],
            'app_copyright'     => searchForKey('app_copyright',$data,'&copy; Copyright 2022 All Rights Reserved')['value'],
        ];
    }
}

if (!function_exists('appSettingTwilio')) {
    function appSettingTwilio(){
        $data = [];
        if(getAppSettings('twilio')['exist']){
            $data = getAppSettings('twilio')['data'];
        }
        return [
            'twilio_sid'        => searchForKey('twilio_sid',$data,'')['value'],
            'twilio_token'      => searchForKey('twilio_token',$data,'')['value'],
            'twilio_from'       => searchForKey('twilio_from',$data,'')['value'],
        ];
    }
}

if (!function_exists('appSettingSmtp')) {
    function appSettingSmtp(){
        $data = [];
        if(getAppSettings('smtp')['exist']){
            $data = getAppSettings('smtp')['data'];
        }
        return [
            'smtp_type'                 => searchForKey('smtp_type',$data,'')['value'],

            'simple_smtp_driver'        => searchForKey('simple_smtp_driver',$data,'')['value'],
            'simple_smtp_host'          => searchForKey('simple_smtp_host',$data,'')['value'],
            'simple_smtp_port'          => searchForKey('simple_smtp_port',$data,'')['value'],
            'simple_smtp_user_name'     => searchForKey('simple_smtp_user_name',$data,'')['value'],
            'simple_smtp_password'      => searchForKey('simple_smtp_password',$data,'')['value'],
            'simple_smtp_encryption'    => searchForKey('simple_smtp_encryption',$data,'')['value'],
            'simple_smtp_from_email'    => searchForKey('simple_smtp_from_email',$data,'')['value'],
            'simple_smtp_from_name'     => searchForKey('simple_smtp_from_name',$data,'')['value'],
            
            'aws_ses_smtp_driver'       => searchForKey('aws_ses_smtp_driver',$data,'')['value'],
            'aws_ses_smtp_host'         => searchForKey('aws_ses_smtp_host',$data,'')['value'],
            'aws_ses_smtp_port'         => searchForKey('aws_ses_smtp_port',$data,'')['value'],
            'aws_ses_smtp_user_name'    => searchForKey('aws_ses_smtp_user_name',$data,'')['value'],
            'aws_ses_smtp_password'     => searchForKey('aws_ses_smtp_password',$data,'')['value'],
            'aws_ses_smtp_encryption'   => searchForKey('aws_ses_smtp_encryption',$data,'')['value'],
            'aws_ses_smtp_from_email'   => searchForKey('aws_ses_smtp_from_email',$data,'')['value'],
            'aws_ses_smtp_from_name'    => searchForKey('aws_ses_smtp_from_name',$data,'')['value'],
        ];
    }
}

if (!function_exists('appSettingCaptcha')) {
    function appSettingCaptcha(){
        $data = [];
        if(getAppSettings('captcha')['exist']){
            $data = getAppSettings('captcha')['data'];
        }
        // return searchForKey('app_title',$data,'Laravel');
        return [
            'site_key'      => searchForKey('site_key',$data,'')['value'],
            'secret_key'    => searchForKey('secret_key',$data,'')['value'],
        ];
    }
}

if (!function_exists('appSettingLogos')) {
    function appSettingLogos(){
        $data = [];
        if(getAppSettings('logos')['exist']){
            $data = getAppSettings('logos')['data'];
        }
        // return searchForKey('app_title',$data,'Laravel');
        $light = searchForKey('logo_light',$data,['path'=>'/storage/logo-light.png'])['value'];
        $dark = searchForKey('logo_dark',$data,['path'=>'/storage/logo-dark.png'])['value'];
        $favIcon = searchForKey('fav_icon',$data,['path'=>'/storage/fav-icon.png'])['value'];
        return [
            'logo_light'   => isArray($light)?$light:json_decode($light),
            'logo_dark'    => isArray($dark)?$dark:json_decode($dark),
            'fav_icon'    => isArray($favIcon)?$favIcon:json_decode($favIcon),
        ];
    }
}

if (!function_exists('appSettingSocials')) {
    function appSettingSocials(){
        $data = [];
        if(getAppSettings('socials')['exist']){
            $data = getAppSettings('socials')['data'];
        }
        // return searchForKey('app_title',$data,'Laravel');
        $SetupSocials = SetupSocial::where('status','active')->get();
        $socials = [];
        foreach ($SetupSocials as $item) {
            // $socials[$item['slug']] = $item['slug'];
            $socials[$item['slug']] = searchForKey($item['slug'],$data,'')['value'];
        }
        return $socials;
    }
}

if (!function_exists('appTwilio')) {
    function appTwilio(){
        $SMTP = appSettingTwilio();
        Config::set('twilio.twilio_sid',    decrypt($SMTP['twilio_sid']));
        Config::set('twilio.twilio_token',  decrypt($SMTP['twilio_token']));
        Config::set('twilio.twilio_from',   $SMTP['twilio_from']);
    }
}

if (!function_exists('appSmtp')) {
    function appSmtp(){
        $SMTP = appSettingSmtp();
        if(isset($SMTP['smtp_type']) && $SMTP['smtp_type'] == 'simple_smtp'){
            if(isset($SMTP['simple_smtp_encryption'])){
                if($SMTP['simple_smtp_encryption'] == '' || $SMTP['simple_smtp_encryption'] == 'null'){
                    $encryption = null;
                } else {
                    $encryption = $SMTP['simple_smtp_encryption'];
                }
                Config::set('mail.mailers.smtp.host',           $SMTP['simple_smtp_host']);
                Config::set('mail.mailers.smtp.mailer',         $SMTP['simple_smtp_driver']);
                Config::set('mail.mailers.smtp.host',           $SMTP['simple_smtp_host']);
                Config::set('mail.mailers.smtp.port',           $SMTP['simple_smtp_port']);
                Config::set('mail.mailers.smtp.username',       $SMTP['simple_smtp_user_name']);
                Config::set('mail.mailers.smtp.password',       decrypt($SMTP['simple_smtp_password']));
                Config::set('mail.mailers.smtp.encryption',     $encryption);
                Config::set('mail.mailers.smtp.from', array(
                    'address'   => $SMTP['simple_smtp_from_email'], 
                    'name'      => $SMTP['simple_smtp_from_name']
                ));
            }
        } else {
            if(isset($SMTP['aws_ses_smtp_encryption'])){
                if($SMTP['aws_ses_smtp_encryption'] == '' || $SMTP['aws_ses_smtp_encryption'] == 'null'){
                    $encryption = null;
                } else {
                    $encryption = $SMTP['aws_ses_smtp_encryption'];
                }
                Config::set('mail.mailers.smtp.host',           $SMTP['aws_ses_smtp_host']);
                Config::set('mail.mailers.smtp.driver',         $SMTP['aws_ses_smtp_driver']);
                Config::set('mail.mailers.smtp.host',           $SMTP['aws_ses_smtp_host']);
                Config::set('mail.mailers.smtp.port',           $SMTP['aws_ses_smtp_port']);
                Config::set('mail.mailers.smtp.username',       $SMTP['aws_ses_smtp_user_name']);
                Config::set('mail.mailers.smtp.password',       decrypt($SMTP['aws_ses_smtp_password']));
                Config::set('mail.mailers.smtp.encryption',     $encryption);
                Config::set('mail.mailers.smtp.from', array(
                    'address'   => $SMTP['aws_ses_smtp_from_email'], 
                    'name'      => $SMTP['aws_ses_smtp_from_name']
                ));
                // Config::set('mail.mailers.smtp.sendmail',       '/usr/sbin/sendmail -bs');
                Config::set('mail.mailers.smtp.pretend',        false);
                Config::set('mail.mailers.smtp.stream', [
                    'ssl' => [
                        'allow_self_signed' => true,
                        'verify_peer' => false,
                        'verify_peer_name' => false,
                    ],
                ]);
            }
        }
    }
}

if(!function_exists('isArray')){
    function isArray($str){
        return is_array($str);
    }
}

if(!function_exists('isJson')){
    function isJson($str){
        json_decode($str);
       return json_last_error() === JSON_ERROR_NONE;
    }
}

if(!function_exists('findInArray')){
    function findInArray($array,$str1,$str2){
        $object = [];
        foreach ($array as $key => $val) {
            // return $val[$str1];
            if ($val[$str1] == $str2) {
                return $val;
            }
        }
        return $object;
    }
}

// if(!function_exists('findInArray')){
//     function findInArray($array,$str1,$str2){
//         $object = [];
//         foreach ($array as $key => $val) {
//             // return $val->{$str1};
//             if ($val->{$str1} == $str2) {
//                 return $val;
//             }
//         }
//         return $object;
//     }
// }

if(!function_exists('checkInArray')){
    function checkInArray($Persons,$msg){
        // $from = $msg['from'];
        // $to = $msg['to'];
        $from = $msg->from;
        $to = $msg->to;
        foreach ($Persons as $key => $val) {
            if(
                $val['cell_phone'] == $from ||
                $val['cell_phone'] == $to
            ){
                return true;
            }
        }
    }
}

// if(!function_exists('checkInMessageArray')){
//     function checkInMessageArray($Messages,$msg){
//         $from = $msg['from'];
//         $to = $msg['to'];
//         // $from = $msg->from;
//         // $to = $msg->to;
//         foreach ($Messages as $key => $val) {
//             if(
//                 (
//                     $val['from'] == $from ||
//                     $val['to'] == $to
//                 )
//                 ||
//                 (
//                     $val['from'] == $from ||
//                     $val['from'] == $to
//                 )
//             ){
//                 return true;
//             }
//         }
//     }
// }

if(!function_exists('existInArray')){
    function existInArray($array,$str1,$str2){
        foreach ($array as $key => $val) {
            if ($val->{$str1} == $str2) {
                return true;
            }
        }
        return false;
    }
}

if(!function_exists('existInArrayObject')){
    function existInArrayObject($array,$str1,$str2){
        foreach ($array as $key => $val) {
            // return $val[$str1] == $str2;
            if ($val[$str1] == $str2) {
                return true;
            }
        }
        return false;
    }
}

if (!function_exists('getUserId')) {
    function getUserId(){
        return auth()->check()?auth()->user()->id:null;
    }
}

if (!function_exists('getUser')) {
    function getUser(){
        return auth()->check()?auth()->user():null;
    }
}

if (!function_exists('currentDate')) {
    function currentDate(){
        return date('Y-m-d');
    }
}

if (!function_exists('currentTime')) {
    function currentTime(){
        return date('H:i:s');
    }
}

if (!function_exists('dateDefaultTimezoneSet')) {
    function dateDefaultTimezoneSet(){
        // return 'Asia/Karachi';
        // return 'America/New_York';
        return 'America/Los_Angeles';
        // return 'UTC';
    }
}

if(!function_exists('utcToLocal')){
    function utcToLocal($dateTime,$timeZone){
        // $dateTime = '2022-12-29 08:43:00'; 
		// $timeZone = 'America/New_York'; 
		return \Carbon\Carbon::parse($dateTime)->setTimezone($timeZone)->toDateTimeString();
    }
}

if (!function_exists('app_name')) {
    function app_name(){
        return config('app.name');
    }
}

if (!function_exists('caseStatusTypes')) {
    function caseStatusTypes(){
        return [
            [
                'label'=>'Pending',
                'key'=>'pending',
                'count' => 0,
                'icon' => 'eye',
            ],
            [
                'label'=>'Completed',
                'key'=>'completed',
                'count' => 0,
                'icon' => 'eye',
            ],
            [
                'label'=>'Active',
                'key'=>'active',
                'count' => 0,
                'icon' => 'eye',
            ],
            [
                'label'=>'Inactive',
                'key'=>'inactive',
                'count' => 0,
                'icon' => 'eye-off',
            ],
            [
                'label'=>'Draft',
                'key'=>'draft',
                'count' => 0,
                'icon' => 'edit-3',
            ],
            // 'active',
            // 'inactive',
            // 'draft',
        ];
    }
}

if (!function_exists('statusTypes')) {
    function statusTypes(){
        return [
            [
                'label'=>'Active',
                'key'=>'active',
                'count' => 0,
                'icon' => 'eye',
            ],
            [
                'label'=>'Inactive',
                'key'=>'inactive',
                'count' => 0,
                'icon' => 'eye-off',
            ],
            [
                'label'=>'Draft',
                'key'=>'draft',
                'count' => 0,
                'icon' => 'edit-3',
            ],
            // 'active',
            // 'inactive',
            // 'draft',
        ];
    }
}

if (!function_exists('statusTypeAll')) {
    function statusTypeAll(){
        return [
            [
                'label'=>'All',
                'key'=>'all',
                'count' => 0,
                'icon' => 'list',
            ],
        ];
    }
}

if (!function_exists('statusTypeTrash')) {
    function statusTypeTrash(){
        return [
            [
                'label'=>'Trash',
                'key'=>'trash',
                'count' => 0,
                'icon' => 'trash',
            ],
        ];
    }
}

if (!function_exists('addClassByKeyInArray')) {
    function addClassByKeyInArray($arrayData,$value,$class){
        foreach ($arrayData as $key => $val) {
            if($val['key'] == $value){
                $arrayData[$key]['class'] = $class;
            } else {
                $arrayData[$key]['class'] = '';
            }
        }
        return $arrayData;
    }
}

if (!function_exists('bulkOptions')) {
    function bulkOptions($index = null,$exclude_or_include = true,$actionMode = null){
        $arr = [];
        if($index == 'trash' && $actionMode == 'edit'){
            $arr = [
                [
                    'label'=>'Restore',
                    'key'=>'restore',
                    'count' => 0,
                    'icon' => 'refresh-ccw',
                ],
                [
                    'label'=>'Delete',
                    'key'=>'delete',
                    'count' => 0,
                    'icon' => 'delete',
                ],
                // 'restore',
                // 'delete',
            ];
        } else {
            $arr = [
                [
                    'label'=>'Active',
                    'key'=>'active',
                    'count' => 0,
                    'icon' => 'eye',
                ],
                [
                    'label'=>'Inactive',
                    'key'=>'inactive',
                    'count' => 0,
                    'icon' => 'eye-off',
                ],
                [
                    'label'=>'Draft',
                    'key'=>'draft',
                    'count' => 0,
                    'icon' => 'edit-3',
                ],
            ];
            array_push($arr, statusTypeTrash()[0]);
        }
        
        if($exclude_or_include){
            $newArr = [];
            foreach ($arr as $value){
                if($value['key'] != $index){
                    // $newArr[] = [
                    //     'label' => ucfirst($value),
                    //     'key' => $value,
                    // ];
                    $newArr[] = $value;
                }
            }
    
            return $newArr;
        } else {
            return $arr;
        }
    }
}

if (!function_exists('bulkOptionsOnAdd')) {
    function bulkOptionsOnAdd($index = null){
        $arr = [
            [
                'label'=>'Active',
                'key'=>'active',
                'count' => 0,
                'icon' => 'eye',
            ],
            [
                'label'=>'Inactive',
                'key'=>'inactive',
                'count' => 0,
                'icon' => 'eye-off',
            ],
            [
                'label'=>'Draft',
                'key'=>'draft',
                'count' => 0,
                'icon' => 'edit-3',
            ],
        ];
        
        $newArr = [];
        foreach ($arr as $value){
            if($value != $index){
                // $newArr[] = [
                //     'label' => ucfirst($value),
                //     'key' => $value,
                // ];
                $newArr[] = $value;
            }
        }

        return $newArr;
    }
}

if (!function_exists('dataExistById')) {
    function dataExistById($modalName, $id){
        return DB::table($modalName)
        ->where('id', $id)
        ->count();
    }
}

if(!function_exists('strReplace')){
    function strReplace($str1,$str2,$str){
        return Str::replace($str1,$str2,$str);
    }
}

if(!function_exists('ucfirst')){
    function ucfirst($str){
        return Str::ucfirst($str);
    }
}

if(!function_exists('strContains')){
    function strContains(string $str, string|array $contains){
        return Str::contains($str, $contains);
    }
}

if(!function_exists('slug')){
    function slug($str,$replaceWith){
        return Str::slug($str,$replaceWith);
    }
}

if(!function_exists('keyExists')){
    function keyExists($array,$key){
        return Arr::exists($array, $key);
    }
}

if(!function_exists('arraySort')){
    function arraySort($list,$sortBy,$orderBy){
        $keys = array_column($list, $sortBy);
        if($orderBy == 'desc'){
            array_multisort($keys, SORT_DESC, $list); // Desc sort
        }
        array_multisort($keys, SORT_ASC, $list); // Asc sort
        return $list;
    }
}

if(!function_exists('dateCreatedCompareAsc')){
    function dateCreatedCompareAsc($element1, $element2) {
        $datetime1 = $element1['date_created'];
        $datetime2 = $element2['date_created'];
        return $datetime1 > $datetime2;
    }
}

if(!function_exists('msgDateCompareDesc')){
    function msgDateCompareDesc($element1, $element2) {
        $datetime1 = strtotime($element1['message_created_at']);
        $datetime2 = strtotime($element2['message_created_at']);
        return $datetime2 - $datetime1;
    }
}

if(!function_exists('msgDateCompareAsc')){
    function msgDateCompareAsc($element1, $element2) {
        $datetime1 = strtotime($element1['message_created_at']);
        $datetime2 = strtotime($element2['message_created_at']);
        return $datetime1 - $datetime2;
    }
}

if(!function_exists('perPageOptions')){
    function perPageOptions(){
        return [
            2,
            10,
            25,
            50,
            100,
        ];
    }
}

if(!function_exists('checkValueNotEmptyInArray')){
    function checkValueNotEmptyInArray($arr){
        foreach ($arr as $key => $item) {
            if($item['sort'] != ''){
                return $item;
            }
        }
    }
}

if(!function_exists('updateArray')){
    function updateArray($arr1,$arr2){
        $finalData = [];
        foreach ($arr1 as $k1 => $a1) {
            if($a1['field'] == $arr2['field']){
                $finalData[$k1] = $arr2;
            } else {
                $finalData[$k1] = $a1;
            }
        }
        return $finalData;
    }
}

if(!function_exists('mediaIcon')){
    function mediaIcon($iconName){
        foreach (mediaIcons() as $key => $item) {
            if($key == $iconName){
                return $item;
            } else {
                return 'No Icon Found!';
            };
        }
    }
}

if(!function_exists('mediaIcons')){
    function mediaIcons(){
        return [
            [
                'type' => 'ai',
                'icon' => url('/').'/backend/app-assets/images/icons/svg/ai.svg'
            ],
            [
                'type' => 'eps',
                'icon' => url('/').'/backend/app-assets/images/icons/svg/eps.svg'
            ],
            [
                'type' => 'doc',
                'icon' => url('/').'/backend/app-assets/images/icons/svg/doc.svg'
            ],
            [
                'type' => 'svg',
                'icon' => url('/').'/backend/app-assets/images/icons/svg/svg.svg'
            ],
            [
                'type' => 'zip',
                'icon' => url('/').'/backend/app-assets/images/icons/svg/zip.svg'
            ],
            [
                'type' => 'png',
                'icon' => url('/').'/backend/app-assets/images/icons/svg/png.svg'
            ],
            [
                'type' => 'jpg',
                'icon' => url('/').'/backend/app-assets/images/icons/svg/jpg.svg'
            ],
        ];
    }
}

if(!function_exists('directoryExist')){
    function directoryExist($folderName){
        return File::exists(public_path().storagePath().$folderName);
    }
}

if(!function_exists('makeDirectory')){
    function makeDirectory($folderName){
        $created = File::makeDirectory(public_path().storagePath().$folderName);
        if($created){
            return true;
        }
    }
}

if(!function_exists('storagePath')){
    function storagePath(){
        return '/storage/';
    }
}

if(!function_exists('maxFileSize')){
    function maxFileSize(){
        return 1000000;
    }
}

if(!function_exists('thumbnailSizes')){
    function thumbnailSizes(){
        return [
            [
                "name" => 'thumbnail',
                "size" => [
                    "width" => 150,
                    "height" => 150,
                ]
            ],
            [
                "name" => '300x300',
                "size" => [
                    "width" => 300,
                    "height" => 300,
                ]
            ],
            [
                "name" => '1024x1024',
                "size" => [
                    "width" => 1024,
                    "height" => 1024,
                ]
            ]
        ];
    }
}

if(!function_exists('mimeTypes')){
    function mimeTypes(){
        return [
            [
                'extension' => '.css',
                'description' => 'Cascading Style Sheets (CSS)',
                'type' => 'text/css',
            ],
            [
                'extension' => '.csv',
                'description' => 'Comma-separated values (CSV)',
                'type' => 'text/csv',
            ],
            [
                'extension' => '.doc',
                'description' => 'Microsoft Word',
                'type' => 'application/msword',
            ],
            [
                'extension' => '.docx',
                'description' => 'Microsoft Word (OpenXML)',
                'type' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ],
            [
                'extension' => '.gif',
                'description' => 'Graphics Interchange Format (GIF)',
                'type' => 'image/gif',
            ],
            [
                'extension' => '.htm',
                'description' => 'HyperText Markup Language (HTML)',
                'type' => 'text/html',
            ],
            [
                'extension' => '.html',
                'description' => 'HyperText Markup Language (HTML)',
                'type' => 'text/html',
            ],
            [
                'extension' => '.jpeg',
                'description' => 'JPEG images',
                'type' => 'image/jpeg',
            ],
            [
                'extension' => '.jpg',
                'description' => 'JPEG images',
                'type' => 'image/jpeg',
            ],
            [
                'extension' => '.png',
                'description' => 'Portable Network Graphics',
                'type' => 'image/png',
            ],
            [
                'extension' => '.pdf',
                'description' => 'Adobe Portable Document Format (PDF)',
                'type' => 'application/pdf',
            ],
            [
                'extension' => '.svg',
                'description' => 'Scalable Vector Graphics (SVG)',
                'type' => 'image/svg+xml',
            ],
            [
                'extension' => '.txt',
                'description' => 'Text, (generally ASCII or ISO 8859-n)',
                'type' => 'text/plain',
            ],
            [
                'extension' => '.xls',
                'description' => 'Microsoft Excel',
                'type' => 'application/vnd.ms-excel',
            ],
            [
                'extension' => '.zip',
                'description' => 'ZIP archive',
                'type' => 'application/zip',
            ],
        ];
    }
}

if(!function_exists('totalChatMessages')){
    function totalChatMessages(){
        return 50;
    }
}

if(!function_exists('validatePhoneNumber')){
    function validatePhoneNumber($mobile){
        return preg_match('/^[0-9]{10}+$/', $mobile);
    }
}

if(!function_exists('phoneNumberMasking')){
    function phoneNumberMasking($phone){
        $ac = substr($phone, 0, 3);
        $prefix = substr($phone, 3, 3);
        $suffix = substr($phone, 6);

        return "({$ac}) {$prefix}-{$suffix}";
    }
}

if(!function_exists('phoneNumberFormat')){
    function phoneNumberFormat($phone){
        $ph = substr($phone, -10);
        return $ph;
    }
}

if(!function_exists('takeAllVariables')){
    function takeAllVariables($str){
        $SetupTemplateVariable = new SetupTemplateVariable();
        $SetupTemplateVariables = $SetupTemplateVariable->all();
        // return $SetupTemplateVariables;
        $data = [];
        foreach ($SetupTemplateVariables as $xKey => $var) {
            if(strpos($str,'{'.$var->slug.'}')){
                $data[] = $var->person_field;
            }
        }
        return $data;
    }
}

if(!function_exists('getAllBracketsData')){
    function getAllBracketsData($str){
        // $text = '[This] is a [test] string, [eat] my [shorts].';
        // preg_match_all("/\[[^\]]*\]/", $str, $matches);
        preg_match_all("/{(.*?)}/", $str, $matches);
        return $matches[0];
    }
}

if(!function_exists('isArrayMatched')){
    function isArrayMatched($templateArray,$headerArray){

        $getData = [];
        
        $STVs = SetupTemplateVariable::whereIn('person_field',$headerArray)->pluck('slug');

        foreach ($STVs as $key => $item) {
            if(!in_array('{'.$item.'}', $templateArray)){
                $getData[] = $item;
            } 
        }
        
        // return [
        //     'headerArray' => $headerArray,
        //     'templateArray' => $templateArray,
        //     'STVs' => $STVs,
        //     'getData' => $getData,
        // ];

        // return $templateArrayData;
        return $getData;
        // return true;

    }
}

// if(!function_exists('isArrayMatched')){
//     function isArrayMatched($templateArray,$headerArray){
//         // $SetupTemplateVariable = new SetupTemplateVariable();
//         // $fileHeaderData = [];
//         // foreach ($headerArray as $key => $value) {
//         //     $fileHeaderData[] = '{'.$value.'}';
//         // }
//         // return $fileHeaderData;
//         // foreach ($templateArray as $key => $item) {
//         //     $replaceStr = str_replace("{","",$item);
//         //     $replaceStr = str_replace("}","",$replaceStr);
//         //     // return $replaceStr;
//         //     if($SetupTemplateVariable->checkBySlug($replaceStr)){
//         //         $strData = $SetupTemplateVariable->getBySlug($replaceStr);
//         //         // return $strData;
//         //         if(in_array($strData['person_field'], $fileHeaderData)){
//         //             return true; 
//         //         }
//         //     }
//         // }
//         // return false;

//         // $SetupTemplateVariable = new SetupTemplateVariable();
//         // foreach ($templateArray as $key => $item) {
//         //     $replaceStr = str_replace("{","",$item);
//         //     $replaceStr = str_replace("}","",$replaceStr);
//         //     if($SetupTemplateVariable->checkBySlug($replaceStr)){
//         //         $strData = $SetupTemplateVariable->getBySlug($replaceStr);
//         //         // return $strData;
//         //         if(!in_array($strData['person_field'], $headerArray)){
//         //             return false; 
//         //         }
//         //     }
//         // }
//         // return true;

//         $SetupTemplateVariable = new SetupTemplateVariable();
//         $getData = [];
//         $templateArrayData = [];
//         foreach ($templateArray as $key => $value) {
//             $replaceStr = str_replace("{","",$value);
//             $replaceStr = str_replace("}","",$replaceStr);
//             $templateArrayData[] = $replaceStr;
//         }
//         $setupVariablesArray = $SetupTemplateVariable->getAllPersonFieldsBySlug($templateArrayData);
        
//         // return [
//         //     'headerArray' => $headerArray,
//         //     'templateArrayData' => $templateArrayData,
//         //     'templateVariables' => $SetupTemplateVariable->getAllPersonFieldsBySlug($templateArrayData),
//         // ];

//         // return $headerArray;
//         // return $templateArrayData;
        
//         // foreach ($headerArray as $key => $item) {
//         //     // return $item;
//         //     // $replaceStr = str_replace("{","",$item);
//         //     // $replaceStr = str_replace("}","",$replaceStr);
//         //     // return $SetupTemplateVariable->checkBySlug($replaceStr);
//         //     // if($SetupTemplateVariable->checkByPersonField($item) > 0){
//         //     //     $strData = $SetupTemplateVariable->getByPersonField($item);
//         //         // return $strData['slug'];
//         //         // return $templateArrayData;
//         //         // return in_array($strData['slug'], $templateArrayData)?'true1':'false1';
//         //         if(!in_array($item, $setupVariablesArray)){
//         //             // return 'false1';
//         //             $getData[] = 'false';
//         //             // $getData = 'false';
//         //         } 
//         //         // else {
//         //         //     // return 'false1';
//         //         //     $getData[] = 'false';
//         //         // }
//         //     // } else {
//         //     //     // return 'false else';
//         //     //     $getData[] = 'false';
//         //     // }
//         // }

//         foreach ($headerArray as $key => $item) {
//             if(!in_array($item, $setupVariablesArray)){
//                 $getData[] = $item;
//             } 
//         }

//         // return $templateArrayData;
//         return $getData;
//         // return true;

//     }
// }

if(!function_exists('removeFromArray')){
    function removeFromArray($array,$value){
        if(sizeof($array) > 0){
            foreach ($array as $key => $item) {
                if($value == $item){
                    unset($array[$key]);
                }
            }
        }
        return $array;
    }
}

if (!function_exists('serialNumber')) {
    function serialNumber($number)
    {
        return str_pad($number, 5, '0', STR_PAD_LEFT);
    }
}

if (!function_exists('getPatient')) {
    function getPatient($patientId)
    {
        $Patient = new Patient();
        if($Patient->checkById($patientId) > 0){
            return $Patient->getById($patientId);
        }
        return false;
    }
}

if (!function_exists('getPatientCaseTests')) {
    function getPatientCaseTests($patientCaseId)
    {
        $Details = [];
        $PCD = PatientCaseDetail::where('patientcase_id',$patientCaseId);
        if($PCD->count() > 0){
            $Details = $PCD->get();
        }
        return $Details;
    }
}

if (!function_exists('getSubTest')) {
    function getSubTest($subtestId)
    {
        $Data = [];
        $ST = SubTest::where('id',$subtestId);
        if($ST->count() > 0){
            $Data = $ST->first();
        }
        return $Data;
    }
}

if (!function_exists('getPatientCaseTestsForReceipt')) {
    function getPatientCaseTestsForReceipt($patientCaseId)
    {
        $PCD = PatientCaseDetail::where('patientcase_id',$patientCaseId)->with('MainTest','SubTest')->groupBy('maintest_id');
        $tests = [];
        $total = 0;
        if($PCD->count() > 0){
            $MainTests = $PCD->get();
            foreach ($MainTests as $key => $m) {
                $mData = $m;
                // return $m->MainTest->package_price;
                $details = PatientCaseDetail::where('patientcase_id',$patientCaseId)->where('maintest_id',$m['maintest_id']);

                if($details->count() > 0){
                    $subtestIds = $details->pluck('subtest_id');
                    if($m->MainTest->package_price != 0 && SubTest::whereIn('id',$subtestIds)->count() == SubTest::where('maintest_id',$m['maintest_id'])->count()){
                        $total += $m->MainTest->package_price;
                    } else {
                        $total += SubTest::whereIn('id',$subtestIds)->sum('test_rate');
                    }
                    $subtestSum = SubTest::whereIn('id',$subtestIds)->sum('test_rate');
                    
                    $mData['total'] = $m->MainTest->package_price != 0 && SubTest::whereIn('id',$subtestIds)->count() == SubTest::where('maintest_id',$m['maintest_id'])->count()?$m->MainTest->package_price:$subtestSum;

                    $tests[] = $mData;
                    // foreach ($details->get() as $key => $item) {
                    //     return getSubTest($item['subtest_id']);
                    // }
                }
                
            }
        }
        return [
            'tests' => PatientCaseDetail::where('patientcase_id',$patientCaseId)->with('MainTest','SubTest')->get(),
            'testsReceipt' => $tests,
            'testsTotal' => $total,
        ];
    }
}

if (!function_exists('getCaseMaxDate')) {
    function getCaseMaxDate($patientCaseId)
    {
        $Date = '';
        $Date = PatientCaseDetail::where('patientcase_id',$patientCaseId)->max('report_given_date');
        return $Date;
    }
}

if (!function_exists('getReceiptDetails')) {
    function getReceiptDetails($patientCaseId)
    {
        $Date = '';
        $PatientCase = [];
        $PatientCase = PatientCase::where('id',$patientCaseId);
        if($PatientCase->count() > 0){
            $PatientCase = $PatientCase->with('Patient','Reffer','SampleLocation')->first();
        }
        // return $PatientCase;
        $caseTests = getPatientCaseTestsForReceipt($PatientCase->id)['tests'];
        $caseTestsReceipt = getPatientCaseTestsForReceipt($PatientCase->id)['testsReceipt'];
        $testsTotal = getPatientCaseTestsForReceipt($PatientCase->id)['testsTotal'];

        $discountType = $PatientCase->discount_type;
        $subTotal = $testsTotal;
        $discount = $PatientCase->discount;
        $discountedAmount = $PatientCase->discount;
        $netTotal = 0;
        $paid = 0;
        $dueAmount = 0;

        if($discountType == '%'){
            $netTotal = $subTotal - $subTotal/100*$discount;
            $discountedAmount = $subTotal/100*$discount;
        }
        if($discountType == 'rs'){
            $netTotal = $subTotal - $discount;
        }

        $paid = getPatientCaseReceipts($PatientCase->id)['totalPaid'];
        $dueAmount = $netTotal - $paid;
        
        return [
            'patientCase' => $PatientCase,
            'patient' => getPatient($PatientCase->patient_id),
            'caseTests' => $caseTests,
            'caseTestsReceipt' => $caseTestsReceipt,
            'caseMaxDate' => getCaseMaxDate($PatientCase->id),
            'discountType' => $discountType,
            'subTotal' => round($subTotal,2),
            'discount' => $discount,
            'discountedAmount' => $discountedAmount,
            'netTotal' => round($netTotal,2),
            'paid' => round($paid,2),
            'dueAmount' => round($dueAmount,2),
        ];
    }
}

if (!function_exists('getPaymentHistory')) {
    function getPaymentHistory($patientCaseId)
    {
        $payments = PatientCaseReceipt::where('patientcase_id',$patientCaseId)->with('createdBy.Profile')->orderBy('id','desc');
        
        return [
            'payments' => $payments->get(),
        ];
    }
}

if (!function_exists('getPatientCaseReceipts')) {
    function getPatientCaseReceipts($patientCaseId)
    {
        $TotalPaid = 0;
        $PCRs = PatientCaseReceipt::where('patientcase_id',$patientCaseId);
        if($PCRs->count() > 0){
            $TotalPaid = $PCRs->sum('paid');
        }
        return [
            'paidHistory' => $PCRs->get(),
            'totalPaid' => $TotalPaid,
        ];
    }
}