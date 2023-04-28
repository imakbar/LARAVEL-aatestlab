<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Artisan;

use App\Models\User;
use App\Models\Profile;
use App\Models\Social;
use App\Models\Attachment;

use App\Models\Media;
use App\Models\Thumbnail;

class MigrateController extends Controller
{
    public function truncate(){
        // TRUNCATE TABLE properties;
        Social::truncate();

        Media::truncate();
        Thumbnail::truncate();
        Attachment::truncate();

        User::whereNotIn('id',[1])->delete();
        Profile::whereNotIn('user_id',[1])->delete();

        return response()->json([
            'status' => 'success',
            'truncated' => [
                'Social',

                'Media',
                'Thumbnail',
                'Attachment',
            ],
            'deleted' => [
                'User except id 1',
                'Profile except user_id 1',
            ]
        ]);
    }
    
    public function truncateMedia(){

        Media::truncate();
        Thumbnail::truncate();
        Attachment::truncate();

        return response()->json([
            'status' => 'success',
            'truncated' => [
                'Media',
                'Thumbnail',
                'Attachment',
            ],
        ]);
    }

    public function artisanCommand($type = null){
        $message = '';
        if($type == 'key-generate'){
            Artisan::call('key:generate');
            $message = 'Configuration key:generate successfully!';
        }
        if($type == 'cache-clear'){
            Artisan::call('cache:clear');
            $message = 'Configuration cache:clear successfully!';
        }
        if($type == 'view-clear'){
            Artisan::call('view:clear');
            $message = 'Configuration view:clear successfully!';
        }
        if($type == 'route-clear'){
            Artisan::call('route:clear');
            $message = 'Configuration route:clear successfully!';
        }
        if($type == 'config-clear'){
            Artisan::call('config:clear');
            $message = 'Configuration config:clear successfully!';
        }
        if($type == 'config-cache'){
            Artisan::call('config:cache');
            $message = 'Configuration config:cache successfully!';
        }
        if($type == 'storage-link'){
            Artisan::call('storage:link');
            $message = 'Configuration storage:link successfully!';
        }
        if($type == 'migrate'){
            Artisan::call('migrate');
            $message = 'Configuration migrate successfully!';
        }
        if($type == 'schedule-run'){
            Artisan::call('schedule:run');
            $message = 'Scheduling schedule:run successfully!';
        }
        if($type == 'list'){
            $data = Artisan::call('list');
            $message = $data;
        }
        if($type == 'minutes-update'){
            Artisan::call('minutes:update');
            $message = 'Scheduling minutes:update successfully!';
        }
        if($type == 'hourly-update'){
            Artisan::call('hourly:update');
            $message = 'Scheduling hourly:update successfully!';
        }
        return response()->json([
            'message' => $message!=''?$message:'command not found!'
        ]);
    }

    public function scheduleHourlyUpdate($type = null){
        Artisan::call('hourly:update');
    }

    public function scheduler($type = null){
        Artisan::call('schedule:run');
    }
}
