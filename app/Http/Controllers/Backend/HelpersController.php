<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HelpersController extends Controller
{
    public function helpers(){
        return [
            'mediaIcons' => mediaIcons()
        ];
    }
    
    public function appSettings(){
        return [
            'general' => appSettingGeneral(),
            'captcha' => appSettingCaptcha(),
            'logos' => appSettingLogos(),
            'socials' => appSettingSocials(),
            'twilio_number' => appSettingTwilio()['twilio_from'],
        ];
    }
}
