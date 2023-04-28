<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Schema;
use App\Models\AppSetting;

class SettingsController extends Controller
{
    public function getSettings(){
        $appSettings = [];
        if (Schema::hasTable('app_settings')) {
            foreach (AppSetting::all() as $setting) {
                // \Illuminate\Support\Facades\Config::set($setting->key, $setting->value);
                $appSettings[$setting->key] = $setting->value;
            }
        }
        return [
            // 'app_settings' => $appSettings,
            'app_settings_general' => appSettingGeneral(),
            'app_settings_twilio' => appSettingTwilio(),
            'app_settings_smtp' => appSettingSmtp(),
            'app_settings_captcha' => appSettingCaptcha(),
            'app_settings_logos' => appSettingLogos(),
            'app_settings_socials' => appSettingSocials(),
        ];
    }

    public function update(Request $request){

        // return $request->general;

        foreach ($request->data as $key => $value) {
            $config = AppSetting::firstOrCreate([
                'key' => $key,
                'type' => $request->type
            ]);

            $xValue = '';
            if($key == 'twilio_sid' || $key == 'twilio_token' || $key == 'simple_smtp_password'){
                $xValue = encrypt($value);
            } else {
                $xValue = $value;
            }

            $config->value = $xValue;
            $config->save();
        }

        // if(sizeof($request->all()) > 0){
        //     foreach ($request->all() as $key => $item) {
        //         // return $item;
        //         if(isset($item['save']) && $item['save'] == 'single'){
        //             foreach ($item['fields'] as $fieldKey => $field) {
        //                 // return $field;
        //                 $config = AppSetting::firstOrCreate(['key' => $fieldKey]);
        //                 $config->value = isset($field['value'])?$field['value']:'';
        //                 $config->save();
        //             }
        //         } else {
        //             foreach ($item['fields'] as $fieldKey => $field) {
        //                 $config = AppSetting::firstOrCreate(['key' => $fieldKey]);
        //                 $config->value = isset($field['value'])?json_encode($field['value']):'';
        //                 $config->save();
        //             }
        //         }
        //     }
        // }

        return response()->json([
            'status' => 'success',
            'success' => true,
            'message' => 'Settings updated successfully',
        ]);
    }

    public function getAppSettings(){
        return appSettings();
    }
}
