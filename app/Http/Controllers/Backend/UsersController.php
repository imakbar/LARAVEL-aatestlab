<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Mail;
use Validator;
use Hash;
use Auth;

use App\Models\User;
use App\Models\Profile;
use App\Models\Attachment;
use App\Models\Social;
use App\Models\SetupRole;
use ACL;

use App\Mail\MailCreateUser;

class UsersController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }
    
    public function get($userRoleType, Request $request){
        $Role = new SetupRole();
        $user = new User();

        $roleId = '';
        if($userRoleType == 'super-admin' || $userRoleType == 'super-admins'){
            $roleId = $Role->getBySlug('super_admin')['id'];
        }
        if($userRoleType == 'employee' || $userRoleType == 'employees'){
            $roleId = $Role->getBySlug('employee')['id'];
        }
        if($userRoleType == 'normal-user' || $userRoleType == 'normal-users'){
            $roleId = $Role->getBySlug('normal_user')['id'];
        }

        $users = $user->where('role_id',$roleId)->join('profiles','profiles.user_id','=','users.id')->select('users.*','profiles.first_name','profiles.last_name');
        $perPageAction = $request->perPageAction;

        if($request->get('status')){
            $status = $request->get('status');
        } else {
            $status = '';
        }
            
        if($status == 'all'){
            $users = $users;
        } elseif($status == 'trash'){
            $users = $users->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $users = $users->where('status', $s['key']);
                    }
                }
            }
        }

        $orderByAction = checkValueNotEmptyInArray($user->tableColumns());
        $orderByAction = $request->orderByAction?$request->orderByAction:$orderByAction;
        if(keyExists($orderByAction,'field')){
            $orderBy = $orderByAction['field'];
            $sort = $orderByAction['sort'];
            $users = $users->orderBy($orderBy, $sort);
        }

        return [
            'items' => $users->with('Role','Profile.Avatar.Thumbnails')->paginate($perPageAction),
            'statusesCount' => addClassByKeyInArray($user->statusesCount($roleId),$status,'active'),
            'bulkOptions' => bulkOptions($status,true,'edit'),
            'perPageOptions' => perPageOptions(),
            'tableColumns' => updateArray($user->tableColumns(),$orderByAction),
            'roleId' => $roleId,
        ];
    }

    public function edit(Request $request){
        $User = '';
        $status = '';

        if($request->actionMode == 'edit'){
            if(dataExistById('users',$request->recordId)){
                $User = User::where('id',$request->recordId)->with('Profile.Avatar.Thumbnails')->first();
            }
        }

        if(isset($request->activeStatus)){
            $status = $request->activeStatus;
        }

        return [
            'itemData' => $User,
            'bulkOptions' => bulkOptions($status,false,$request->actionMode),
        ];
    }

    public function bulkAction(Request $request){
        $bulkAction = $request->bulkAction;
        $selectedItems = $request->selectedItems;
        foreach ($selectedItems as $key => $value) {
            if($value){
                $user = User::find($value);
                if($bulkAction == 'trash'){
                    $user->status = $bulkAction;
                    $user->save();
                    $user->delete();
                } elseif($bulkAction == 'restore'){
                    User::withTrashed()->find($value)->restore();
                    $restoredItem = User::find($value);
                    $restoredItem->status = 'draft';
                    $restoredItem->save();
                } elseif($bulkAction == 'delete'){
                    User::onlyTrashed()->find($value)->forceDelete();
                } else {
                    $user->status = $bulkAction;
                    $user->save();
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
            'created_by' 	=> getUserId(),
            'created_date' 	=> date('Y-m-d'),
            'created_time' 	=> date('H:i:s'),
            'updated_by' 	=> getUserId(),
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
        ]);

        $attributeNames = [
            "first_name" => "first name",
            "last_name" => "last name",
            "email" => "email",
            // "password" => "password",
            // "confirm_password" => "confirm password",
            "role_id" => "role",
            "status" => "status",
        ];

        $rules = [
            "first_name" => "required|min:1|max:100",
            "last_name" => "required|min:1|max:100",
            "email" => "required|min:1|max:100|unique_with:users",
            // "password" => "required|min:8",
            // "confirm_password" => "required|min:8|same:password",
            "role_id" => "required",
            "status" => "required",
        ];

        if($request->password){
            $rules["password"] = "required|min:8";
            $rules["confirm_password"] = "required|min:8|same:password";
        }

        $messages = [
            'name.unique_with' => 'The name has already been taken.',
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
            $auto = false;
            $autoGeneratedPassword = '';
            if($request->password){
                $request->request->add([
                    // 'user_type' => 'normal',
                    'password' => Hash::make($request->password),
                ]);
            } else {
                $auto = true;
                $autoGeneratedPassword = uniqid();
                $request->request->add([
                    'password' => Hash::make($autoGeneratedPassword),
                ]);
            }
            $User = User::create($request->all());

            $Profile = new Profile();
            $Profile->user_id = $User->id;
            $Profile->first_name = $request->first_name;
            $Profile->middle_name = $request->middle_name;
            $Profile->last_name = $request->last_name;
            $Profile->phone_number = $request->phone_number;
            $Profile->mobile_number = $request->mobile_number;
            $Profile->created_by = getUserId();
            $Profile->created_date = date('Y-m-d');
            $Profile->created_time = date('H:i:s');
            $Profile->updated_by = getUserId();
            $Profile->updated_date = date('Y-m-d');
            $Profile->updated_time = date('H:i:s');
            $Profile->save();

            if(is_array($request->attachments) && sizeof($request->attachments) > 0){
                Attachment::where('model','Profile')->where('model_id',$Profile->id)->delete();
                foreach ($request->attachments as $key => $value) {
                    $Attachment = new Attachment();
                    $Attachment->user_id = $User->id;

                    $Attachment->model = "Profile";
                    $Attachment->model_id = $Profile->id;
                    
                    $Attachment->media_id = $value['id'];
                    $Attachment->name = $value['name'];
                    $Attachment->path = $value['path'];
                    $Attachment->extension = $value['extension'];
                    $Attachment->size = $value['size'];
                    $Attachment->mime = $value['mime'];
                    $Attachment->save();
                }
            } else {
                if($request->avatar){
                    $Attachment = new Attachment();
                    $Attachment->user_id = $User->id;

                    $Attachment->model = "Profile";
                    $Attachment->model_id = $Profile->id;
                    
                    $Attachment->media_id = isset($request->avatar['media_id'])?$request->avatar['media_id']:$request->avatar['id'];
                    $Attachment->name = $request->avatar['name'];
                    $Attachment->path = $request->avatar['path'];
                    $Attachment->extension = $request->avatar['extension'];
                    $Attachment->size = $request->avatar['size'];
                    $Attachment->mime = $request->avatar['mime'];
                    Attachment::where('model','Profile')->where('model_id',$Profile->id)->delete();
                    $Attachment->save();
                }
            }

            if($auto == true){
                Mail::to($User->email)->send(new MailCreateUser($User,$autoGeneratedPassword));
            }

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Record created successfully',
                'auto' => $auto,
            ]);
        }
    }

    public function update(Request $request){
        $User = User::findOrFail($request->id);

        $request->request->add([
            'updated_by' 	=> getUserId(),
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
        ]);

        $attributeNames = [
            "first_name" => "first name",
            "last_name" => "last name",
            "email" => "email",
            "password" => "password",
            "confirm_password" => "confirm password",
            "role_id" => "role",
            "status" => "status",
        ];

        $rules = [
            "first_name" => "required|min:1|max:100",
            "last_name" => "required|min:1|max:100",
            "email" => "required|min:1|max:100|unique_with:users,".$request->id,
            "role_id" => "required",
            "status" => "required",
        ];

        $messages = [
            'email.unique_with' => 'The name has already been taken.',
        ];

        if($request->password){
            $rules["password"] = "required|min:8";
            $rules["confirm_password"] = "required|min:8|same:password";
        }

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
            if($request->password){
                $request->request->add([
                    // 'user_type' => 'normal',
                    'password' => Hash::make($request->password),
                ]);
            }
            $User->update($request->all());

            if(Profile::where('user_id',$User->id)->count() > 0){
                $Profile = Profile::where('user_id',$User->id)->first();
                $Profile->first_name = $request->first_name;
                $Profile->middle_name = $request->middle_name;
                $Profile->last_name = $request->last_name;
                $Profile->phone_number = $request->phone_number;
                $Profile->mobile_number = $request->mobile_number;
                $Profile->updated_by = getUserId();
                $Profile->updated_date = date('Y-m-d');
                $Profile->updated_time = date('H:i:s');
                $Profile->save();
            } else {
                $Profile = new Profile();
                $Profile->user_id = $User->id;
                $Profile->first_name = $request->first_name;
                $Profile->middle_name = $request->middle_name;
                $Profile->last_name = $request->last_name;
                $Profile->phone_number = $request->phone_number;
                $Profile->mobile_number = $request->mobile_number;
                $Profile->created_by = getUserId();
                $Profile->created_date = date('Y-m-d');
                $Profile->created_time = date('H:i:s');
                $Profile->updated_by = getUserId();
                $Profile->updated_date = date('Y-m-d');
                $Profile->updated_time = date('H:i:s');
                $Profile->save();
            }

            if(is_array($request->attachments) && sizeof($request->attachments) > 0){
                Attachment::where('model','Profile')->where('model_id',$Profile->id)->delete();
                foreach ($request->attachments as $key => $value) {
                    $Attachment = new Attachment();
                    $Attachment->user_id = $User->id;

                    $Attachment->model = "Profile";
                    $Attachment->model_id = $Profile->id;
                    
                    $Attachment->media_id = $value['id'];
                    $Attachment->name = $value['name'];
                    $Attachment->path = $value['path'];
                    $Attachment->extension = $value['extension'];
                    $Attachment->size = $value['size'];
                    $Attachment->mime = $value['mime'];
                    $Attachment->save();
                }
            } else {
                if($request->avatar){
                    $Attachment = new Attachment();
                    $Attachment->user_id = $User->id;

                    $Attachment->model = "Profile";
                    $Attachment->model_id = $Profile->id;
                    
                    $Attachment->media_id = isset($request->avatar['media_id'])?$request->avatar['media_id']:$request->avatar['id'];
                    $Attachment->name = $request->avatar['name'];
                    $Attachment->path = $request->avatar['path'];
                    $Attachment->extension = $request->avatar['extension'];
                    $Attachment->size = $request->avatar['size'];
                    $Attachment->mime = $request->avatar['mime'];
                    Attachment::where('model','Profile')->where('model_id',$Profile->id)->delete();
                    $Attachment->save();
                }
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function updatePassword(Request $request){

        $User = User::findOrFail($request->id);

        $request->request->add([
            'updated_by' 	=> getUserId(),
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
        ]);

        $attributeNames = [
            "password" => "password",
            "confirm_password" => "confirm password",
        ];

        $rules = [
            "password" => "required|min:8",
            "confirm_password" => "required|min:8|same:password",
        ];

        $messages = [
            // 'name.unique_with' => 'The name has already been taken.',
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
            $request->request->add([
                // 'user_type' => 'normal',
                'password' => Hash::make($request->password),
            ]);
            $User->update($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Record updated successfully',
            ]);
        }
    }

    public function getProfile(){
        return User::where('id',auth()->user()->id)->with('Profile','Profile.Avatar.Thumbnails','Socials.Social')->first();
    }

    public function updateProfile(Request $request){
        $User = User::findOrFail(auth()->user()->id);

        $request->request->add([
            'updated_by' 	=> $User->id,
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
        ]);

        $attributeNames = [
            "first_name" => "First Name",
            "last_name" => "Last Name",
            "email" => "email",
            "phone_number" => "Phone Number",
            "mobile_number" => "Mobile Number",
        ];

        $rules = [
            "first_name" => "required|min:1|max:100",
            "last_name" => "required|min:1|max:100",
            "email" => "required|min:1|max:100|email|unique_with:users,".$request->id,
            "phone_number" => "required|min:1|max:100",
            "mobile_number" => "required|min:1|max:100",
            // "status" => "required",
        ];

        $messages = [
            'email.unique_with' => 'The email has already been taken.',
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
            $User->email = $request->email;
            $User->update();
            
            if(Profile::where('user_id',$User->id)->count() > 0){
                $Profile = Profile::where('user_id',$User->id)->first();
                $Profile->first_name = $request->first_name;
                $Profile->middle_name = $request->middle_name;
                $Profile->last_name = $request->last_name;
                $Profile->phone_number = $request->phone_number;
                $Profile->mobile_number = $request->mobile_number;
                $Profile->address = $request->address;
                $Profile->about_me = $request->about_me;
                $Profile->created_by = $User->id;
                $Profile->created_date = date('Y-m-d');
                $Profile->created_time = date('H:i:s');
                $Profile->updated_by = $User->id;
                $Profile->updated_date = date('Y-m-d');
                $Profile->updated_time = date('H:i:s');
                $Profile->update();
            } else {
                $Profile = new Profile();
                $Profile->user_id = $User->id;
                $Profile->first_name = $request->first_name;
                $Profile->middle_name = $request->middle_name;
                $Profile->last_name = $request->last_name;
                $Profile->phone_number = $request->phone_number;
                $Profile->mobile_number = $request->mobile_number;
                $Profile->address = $request->address;
                $Profile->about_me = $request->about_me;
                $Profile->created_by = $User->id;
                $Profile->created_date = date('Y-m-d');
                $Profile->created_time = date('H:i:s');
                $Profile->updated_by = $User->id;
                $Profile->updated_date = date('Y-m-d');
                $Profile->updated_time = date('H:i:s');
                $Profile->save();
            }

            if(is_array($request->attachments) && sizeof($request->attachments) > 0){
                Attachment::where('model','Profile')->where('model_id',$Profile->id)->delete();
                foreach ($request->attachments as $key => $value) {
                    $Attachment = new Attachment();
                    $Attachment->user_id = $User->id;

                    $Attachment->model = "Profile";
                    $Attachment->model_id = $Profile->id;
                    
                    $Attachment->media_id = $value['id'];
                    $Attachment->name = $value['name'];
                    $Attachment->path = $value['path'];
                    $Attachment->extension = $value['extension'];
                    $Attachment->size = $value['size'];
                    $Attachment->mime = $value['mime'];
                    $Attachment->save();
                }
            } else {
                if($request->avatar){
                    $Attachment = new Attachment();
                    $Attachment->user_id = $User->id;

                    $Attachment->model = "Profile";
                    $Attachment->model_id = $Profile->id;
                    
                    $Attachment->media_id = isset($request->avatar['media_id'])?$request->avatar['media_id']:$request->avatar['id'];
                    $Attachment->name = $request->avatar['name'];
                    $Attachment->path = $request->avatar['path'];
                    $Attachment->extension = $request->avatar['extension'];
                    $Attachment->size = $request->avatar['size'];
                    $Attachment->mime = $request->avatar['mime'];
                    Attachment::where('model','Profile')->where('model_id',$Profile->id)->delete();
                    $Attachment->save();
                }
            }

            return response()->json([
                'status' => 'success',
                'success'   => true,
                'message' => 'Profile updated successfully',
            ]);
        }
    }

    public function updateProfilePassword(Request $request){
        $User = User::findOrFail(auth()->user()->id);

        $request->request->add([
            'updated_by' 	=> $User->id,
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
        ]);

        $attributeNames = [
            "old_password" => "Current Password",
            "new_password" => "New password",
            "confirm_new_password" => "Confirm New password",
        ];

        $rules = [
            "old_password" => "required|min:1|max:100",
            "new_password" => [
                "required","min:8",
                Password::min(8)
                ->mixedCase()
                ->numbers()
                ->symbols()
                ->uncompromised()
            ],
            "confirm_new_password" => "required|min:8|same:new_password",
        ];

        $messages = [
            // 'email.unique_with' => 'The email has already been taken.',
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
            if (!Hash::check($request->old_password , $User->password )) {
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'errors' => ['old_password' => ['Old Password does not matched']],
                ]);
            }

            if (Hash::check($request->new_password , $User->password)) {
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'errors' => ['new_password' => ['New Password can not be the old password!']],
                ]);
            }

            $newPassword = Hash::make($request->new_password);
            $User->password = $newPassword;
            $User->update();

            return response()->json([
                'status' => 'success',
                'success'   => true,
                'message' => 'Password updated successfully',
            ]);
        }
    }

    public function updateProfileSocials(Request $request){

        $User = User::findOrFail(auth()->user()->id);

        if(sizeof($request->socials) > 0){
            foreach ($request->socials as $key => $s) {
                if(isset($s['url'])){
                    $request->request->add([
                        $s['slug'] => $s['url']
                    ]);
                }
            }
        }

        $request->request->add([
            'created_by' 	=> getUserId(),
            'created_date' 	=> date('Y-m-d'),
            'created_time' 	=> date('H:i:s'),
            'updated_by' 	=> getUserId(),
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
        ]);

        $attributeNames = [
            // "confirm_new_password" => "Confirm New password",
        ];

        $rules = [
            // "old_password" => "required|min:1|max:100",
        ];

        if(sizeof($request->socials) > 0){
            foreach ($request->socials as $key => $s) {
                $rules[$s['slug']] = 'required|max:255|regex:'.regexValidationUrl();
            }
        }

        $messages = [
            // 'email.unique_with' => 'The email has already been taken.',
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
            if(sizeof($request->socials) > 0){
                Social::where('user_id',$request->id)->delete();
                foreach ($request->socials as $key => $s) {
                    $social = new Social();
                    $social->user_id = $request->id;
                    $social->social_id = $s['id']?$s['id']:'';
                    $social->url = isset($s['url'])?$s['url']:'';

                    $social->created_by = $request->created_by;
                    $social->created_date = $request->created_date;
                    $social->created_time = $request->created_time;
                    $social->updated_by = $request->updated_by;
                    $social->updated_date = $request->updated_date;
                    $social->updated_time = $request->updated_time;
                    $social->save();
                }
            }

            return response()->json([
                'status' => 'success',
                'success'   => true,
                'message' => 'Password updated successfully',
            ]);
        }
    }

    public function getUserPermissions(){
        $acl = new ACL();
        return $acl->getUserPermissions();
    }

    // public function profileTypes(){
    //     return [
    //         'types' => getProfileTypes('active'),
    //     ];
    // }

    public function getUsers(Request $request){
        $Role = new SetupRole();
        $Users = new User();

        $status = $request->get('status')?$request->get('status'):'all';
        $sort = $request->get('sort')?$request->get('sort'):'asc';
        $column = $request->get('column')?$request->get('column'):'id';
        $limit = $request->get('limit')?$request->get('limit'):0;
            
        if($status == 'all'){
            $Users = $Users;
        } elseif($status == 'trash'){
            $Users = $Users->onlyTrashed();
        } else {
            if(sizeof(statusTypes()) > 0){
                foreach(statusTypes() as $s){
                    if($s['key'] == $status) {
                        $Users = $Users->where('status', $s['key']);
                    }
                }
            }
        }

        $Users = $Users->orderBy($column, $sort);

        if($Role->checkBySlug('normal_user')){
            $Role = $Role->getBySlug('normal_user');
            $Users = $Users->where('role_id',$Role->id);
        }

        if($limit > 0){
            return $Users->with('Profile')->limit($limit)->get();
        } else {
            return $Users->with('Profile')->get();
        }
    }
}
