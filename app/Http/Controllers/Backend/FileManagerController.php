<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Image;
use File;
use Storage;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\Media;
use App\Models\Attachment;
use App\Models\Thumbnail;

class FileManagerController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }
    
    public function add(Request $request){

        // if(!directoryExist("uploadz")) {
        //     makeDirectory("uploadz");
        // }

        $request->request->add([
            'user_id' 	    => getUserId(),
            'created_by' 	=> getUserId(),
            'created_date' 	=> currentDate(),
            'created_time' 	=> currentTime(),
            'updated_by' 	=> getUserId(),
            'updated_date' 	=> currentDate(),
            'updated_time' 	=> currentTime(),
        ]);

        $files = json_decode($request['files'],true);
        $mediaMeta = json_decode($request['mediaMeta'],true);
        $requestFiles = $request[$mediaMeta['fileName']];

        $fileSizes = sizeof($files) > 1?'s*':'';

        $fileName = $mediaMeta['fileName'].$fileSizes;
        $fileMimes = $mediaMeta['fileMimes'];
        $fileSelection = $mediaMeta['fileSelection'];
        $fileMax = $mediaMeta['fileMax'];
        $fileSize = $mediaMeta['fileSize']?$mediaMeta['fileSize']:maxFileSize();
        $thumbnailSizes = $mediaMeta['thumbnailSizes']?$mediaMeta['thumbnailSizes']:thumbnailSizes();

        $attributeNames = [
            $fileName => ucfirst($fileName),
        ];

        $rules = [
            // $fileName => 'required|mimes:'.$fileMimes.'|max:'.$fileSize,
        ];
        
        foreach($files as $f){
            $rules[$f['key']] = 'required|mimes:'.$fileMimes.'|max:'.$fileSize;
        }
        
        $messages = [];
        
        foreach($files as $f){
            $messages[$f['key'].'.mimes'] = 'The '.$f['name'].' must be a file of type: '.$fileMimes;
            $messages[$f['key'].'.max'] = 'The '.$f['name'].' size must be less then: '.$fileSize;
        }


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
            // return $request->all();
            foreach($files as $fData){
                // return $request->file($fData['key']);

                if($request->hasFile($fData['key'])) {
                    $Media = new Media;

                    $fileRequested = $request->file($fData['key']);

                    $getRealPath = $fileRequested->getRealPath();
                    $getClientOriginalName = $fileRequested->getClientOriginalName();
                    $getClientOriginalExtension = $fileRequested->getClientOriginalExtension();
                    $getSize = $fileRequested->getSize();
                    $getMimeType = $fileRequested->getMimeType();
                    $getOriginalName = slug(pathinfo($getClientOriginalName, PATHINFO_FILENAME),'-');

                    $file_name = time().'-'.$getOriginalName.'.'.$getClientOriginalExtension;
                    // $file_path = $fileRequested->storeAs($storageDirectory, $file_name, 'public');

                    $Media->name            = time().'-'.$getOriginalName;
                    $Media->path            = storagePath() . $file_name;
                    $Media->extension       = $getClientOriginalExtension;
                    $Media->size            = $getSize;
                    $Media->mime            = $getMimeType;
                    $Media->user_id 	    = $request->user_id;
                    $Media->created_by 	    = $request->created_by;
                    $Media->created_date 	= $request->created_date;
                    $Media->created_time 	= $request->created_time;
                    $Media->updated_by 	    = $request->updated_by;
                    $Media->updated_date 	= $request->updated_date;
                    $Media->updated_time 	= $request->updated_time;
                    $Media->save();

                    if(
                        $getClientOriginalExtension === 'jpg' ||
                        $getClientOriginalExtension === 'jpeg' ||
                        $getClientOriginalExtension === 'png'
                    ){
                        $this->generateThumbnails($fileRequested,$thumbnailSizes,$Media);
                    }

                    $fileRequested->move(public_path(storagePath()), $file_name);
                }
            }
            $lengthOfFiles = sizeof($files) > 1?'s':'';
            return response()->json([
                'status' => 'success',
                'success'   => true,
                'message'   => 'File'.$lengthOfFiles.' uploaded',
            ]);

        }
    }

    public function generateThumbnails($file,$sizes,$media){
        if(sizeof($sizes) > 0){
            foreach ($sizes as $size) {
                $name = $media->name.'-'.$size['name'].'.'.$media->extension;
                $fullPath = storagePath() . $name;
                $width = $size['size']['width'];
                $height = $size['size']['height'];

                Image::make($file)
                    ->fit($width, $height, 
                        function($constraint){
                            $constraint->aspectRatio();
                        })
                    ->resizeCanvas($width, $height)
                    ->save(public_path($fullPath));
                
                $Thumbnail = new Thumbnail();
                $Thumbnail->media_id = $media->id;
                $Thumbnail->user_id = $media->user_id;
                $Thumbnail->thumbnail = $size['name'];
                $Thumbnail->name = $name;
                $Thumbnail->path = $fullPath;
                $Thumbnail->save();
            }
        }
    }
   
    public function get(Request $request){
        $user = auth()->user();
        $perPageAction = 27;

        $media = new Media();

        if($request->search && $request->search['name']){
            $media = $media->where('name', 'like', '%' . $request->search['name'] . '%');
        }

        return $media->where('user_id',$user->id)->with('Thumbnails')->orderBy('id','DESC')->paginate($perPageAction);
    }

}