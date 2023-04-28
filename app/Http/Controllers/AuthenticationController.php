<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Controllers\Backend\ACLController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Validator;

use App\Models\User;
use App\Models\Profile;
use App\Models\ForgotPassword;

use App\Mail\MailForgotPassword;
use App\Mail\MailResetPassword;

class AuthenticationController extends Controller
{
    public function __construct()
    {
        date_default_timezone_set(dateDefaultTimezoneSet());
    }

    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['login','register']]);
    // }

    public function isLoggedIn(){
        if (auth()->check()) {
            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => 'logged in'
            ]);
        } else {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'not logged in'
            ]);
        }
    }

    public function me(){
        $User = new User();
        return response()->json($User->UserById(auth()->user()->id));
        return response()->json([
            'status' => 'success',
            'userInfo' => Auth::user(),
        ]);
    }

    public function login(Request $request){
        // $request->validate([
        //     'email' => 'required|string|email',
        //     'password' => 'required|string',
        // ]);

        $getUser = new User();

        $attributeNames = [
            "email" => "Email",
        ];

        $rules = [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ];

        $messages = [
            // 'name.unique_with' => 'The name has already been taken.',
        ];

        $Validator = Validator::make($request->all(), $rules, $messages);
        $Validator->setAttributeNames($attributeNames);

        $exist = User::where('email',$request->email)->count();
        if($exist == 0){
            return response()->json([
                'status' => 'error',
                'message' => 'Email does not exist',
            ], 401);
        }

        if ($Validator->fails()) {
            return response()->json([
                'status' => 'error',
                'success' => false,
                'message' => 'Missing fields',
                'errors' => $Validator->errors(),
            ], 401);
        } 
        else 
        {
            $credentials = $request->only('email', 'password');

            $token = Auth::attempt($credentials);
            if (!$token) {
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'message' => 'Invalid credentials',
                    'errors' => ['invalid' => ['Unauthorized user']],
                ], 401);
            }

            $getUser = $getUser->UserById(auth()->user()->id);
            $getUser->api_token = $token;
            return response()->json([
                'status' => 'success',
                'success' => true,
                'userInfo' => $getUser,
                'api_token' => $token
            ]);
        }

    }

    public function register(Request $request){
        // $getUser = new User();
        // $request->validate([
        //     'first_name' => 'required|string|max:255',
        //     'email' => 'required|string|email|max:255|unique:users',
        //     'password' => 'required|string|min:6',
        // ]);

        // $user = User::create([
        //     'first_name' => $request->first_name,
        //     'email' => $request->email,
        //     'password' => Hash::make($request->password),
        // ]);

        // $token = Auth::login($user);
        // return response()->json([
        //     'status' => 'success',
        //     'message' => 'User registerd successfully',
        //     'userInfo' => $getUser->UserById($user->id),
        //     'api_token' => $token
        // ]);

        $getUser = new User();
        
        $request->request->add([
            'created_by' 	=> getUserId(),
            'created_date' 	=> date('Y-m-d'),
            'created_time' 	=> date('H:i:s'),
            'updated_by' 	=> getUserId(),
            'updated_date' 	=> date('Y-m-d'),
            'updated_time' 	=> date('H:i:s'),
        ]);

        $attributeNames = [
            "first_name" => "Name",
            "email" => "email",
            "password" => "password",
            "confirm_password" => "confirm password",
        ];

        $rules = [
            "first_name" => "required|min:1|max:100",
            "email" => "required|min:1|max:100|unique_with:users,email",
            "password" => "required|min:8",
            "confirm_password" => "required|min:8|same:password",
        ];

        $messages = [
            'email.unique_with' => 'The email has already been taken.',
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
            if(getRoleBySlug('user')['exist'] == false){
                return response()->json([
                    'status' => 'error',
                    'success' => false,
                    'message' => 'Something is wrong contact to service provider',
                ]);
            }

            $request->request->add([
                // 'user_type' => 'normal',
                'password' => Hash::make($request->password),
                'role_id' => getRoleBySlug('user')['data']['id'],
            ]);
            
            $User = User::create($request->all());

            $User->created_by = $User->id;
            $User->updated_by = $User->id;
            $User->update();

            $Profile = new Profile();
            $Profile->user_id = $User->id;
            $Profile->first_name = $request->first_name;
            $Profile->last_name = $request->last_name;
            $Profile->phone_number = $request->phone_number;
            $Profile->mobile_number = $request->mobile_number;
            $Profile->about_me = $request->about_me;
            $Profile->created_by = $User->id;
            $Profile->created_date = date('Y-m-d');
            $Profile->created_time = date('H:i:s');
            $Profile->updated_by = $User->id;
            $Profile->updated_date = date('Y-m-d');
            $Profile->updated_time = date('H:i:s');
            $Profile->save();

            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'User registerd successfully',
            ]);
        }
    }

    public function logout(){
        auth()->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh(){
        $user = new User();
        return response()->json([
            'status' => 'success',
            'userInfo' => $user->UserById(auth()->user()->id),
            'api_token' => Auth::refresh()
        ]);
    }

    // public function verifyToken(Request $request){
    //     $user = auth()->user();
    //     $getUser = new User();
    //     if($user){
    //         $user->api_token = $request->api_token;
    //     }
    //     if (auth()->check()) {
    //         return response()->json([
    //             'success' => true,
    //             'status' => 'success',
    //             'message' => 'logged in',
    //             'userInfo' => $getUser->UserById($user->id),
    //             'api_token' => $request->api_token
    //         ]);
    //     } else {
    //         return response()->json([
    //             'success' => false,
    //             'status' => 'error',
    //             'message' => 'not logged in',
    //             'userInfo' => $user,
    //             'api_token' => ''
    //         ]);
    //     }
    // }

    public function verifyToken(Request $request){
        if(!auth()->check()){
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'not logged in',
                'authCheck' => false,
            ]);
        }
        $ACLController = new ACLController();
        $user = auth()->user();
        $getUser = new User();
        $getUser = $getUser->UserById($user->id);
        if($user){
            $getUser->api_token = $request->api_token;
        }
        if (auth()->check()) {
            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => 'logged in',
                'userInfo' => $getUser,
                'api_token' => $request->api_token,
                'permissions' => $ACLController->getRoleById($user->role_id),
                'default_thumbnail_sizes' => defaultThumbnailSizes(),
                'authCheck' => true,
            ]);
        } else {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'not logged in',
                'userInfo' => $user,
                'api_token' => '',
                'permissions' => $ACLController->getRoleById($user->role_id),
                'default_thumbnail_sizes' => defaultThumbnailSizes(),
                'authCheck' => false,
            ]);
        }
    }

    public function forgotPassword(Request $request){
        $User = new User();

        $attributeNames = [
            "email" => "Email",
        ];

        $rules = [
            'email' => 'required|string|email|max:200',
        ];

        $messages = [
            // 'name.unique_with' => 'The name has already been taken.',
        ];

        $Validator = Validator::make($request->all(), $rules, $messages);
        $Validator->setAttributeNames($attributeNames);

        if($User->checkByEmail($request->email) == 0){
            return response()->json([
                'status' => 'error',
                'success' => false,
                'message' => 'Email does not exist',
            ], 401);
        }

        if ($Validator->fails()) {
            return response()->json([
                'status' => 'error',
                'success' => false,
                'message' => 'Missing fields',
                'errors' => $Validator->errors(),
            ], 401);
        } 
        else 
        {
            $User = $User->getByEmail($request->email);
            $ForgotPassword = new ForgotPassword();
            $ForgotPassword->user_id     = $User->id;
            $ForgotPassword->email       = $User->email;
            $ForgotPassword->token       = str_replace('/', '', Hash::make(uniqid()));
            $ForgotPassword->created_at  = date('Y-m-d');
            $ForgotPassword->updated_at  = date('Y-m-d');
            $ForgotPassword->save();
            // return $ForgotPassword;
            
            Mail::to($request->email)->send(new MailForgotPassword($User,$ForgotPassword));
            return response()->json([
                'status' => 'success',
                'success' => true,
                'message' => 'Reset link sent successfully',
            ]);
        }

    }

    public function resetPassword(Request $request){
        $User = new User();
        $ForgotPassword = new ForgotPassword();

        $attributeNames = [
            'password'          => 'Password',
            'confirm_password'  => 'Confirm Password',
        ];

        $rules = [
            'password'          => 'required|min:6',
            'confirm_password'  => 'required|same:password',
        ];

        $messages = [
            // 'name.unique_with' => 'The name has already been taken.',
        ];

        $Validator = Validator::make($request->all(), $rules, $messages);
        $Validator->setAttributeNames($attributeNames);

        if($ForgotPassword->checkByUserIdAndToken($request->userId,$request->token) == 0){
            return response()->json([
                'status' => 'error',
                'success' => false,
                'message' => 'Token does not exist',
            ], 401);
        }

        if ($Validator->fails()) {
            return response()->json([
                'status' => 'error',
                'success' => false,
                'message' => 'Missing fields',
                'errors' => $Validator->errors(),
            ], 401);
        } 
        else 
        {
            $UserExist = $User->checkById($request->userId);
            if($UserExist > 0){
                $User = $User->getById($request->userId);
                
                $ForgotPassword = $ForgotPassword->getByUserIdAndToken($request->userId,$request->token);
                $ForgotPassword->delete();

                $User->password = Hash::make($request->password);
                $User->update();
                
                Mail::to($User->email)->send(new MailResetPassword($User));

                return response()->json([
                    'status' => 'success',
                    'success' => true,
                    'message' => 'Password reset successfully',
                ]);

            }
        }

    }
}
