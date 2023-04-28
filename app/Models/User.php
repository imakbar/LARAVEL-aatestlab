<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role_id',
        'email',
        'password',
        'status', // active, inactive

        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
    * Get the identifier that will be stored in the subject claim of the JWT.
    *
    * @return mixed
    */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
        * Return a key value array, containing any custom claims to be added to the JWT.
        *
        * @return array
        */
    public function getJWTCustomClaims()
    {
        return [];
    }
    
    public function getAll(){
        return $this->get();
    }

    public function checkByEmail($email){
        return $this->where('email',$email)->count();
    }

    public function getByEmail($email){
        return $this->where('email',$email)->first();
    }

    public function checkById($id){
        return $this->where('id',$id)->count();
    }

    public function getById($id){
        return $this->where('id',$id)->first();
    }

    public function total(){
        return $this->get()->count();
    }

    public function statusesCount($roleId){
        $statuses = [];
        array_push($statuses, statusTypeAll()[0]);
        if(sizeof(statusTypes()) > 0){
            foreach(statusTypes() as $k => $s){
                array_push($statuses, $s);
            }
        }
        array_push($statuses, statusTypeTrash()[0]);

        foreach($statuses as $k => $s){
            if($s['key'] == 'all'){
                $statuses[$k]['count'] = $this->where('role_id',$roleId)->count();
            } elseif($s['key'] == 'trash'){
                $statuses[$k]['count'] = $this->where('role_id',$roleId)->onlyTrashed()->count();
            } else {
                $statuses[$k]['count'] = $this->where('role_id',$roleId)->where('status', $s['key'])->count();
            }
        }

        return $statuses;
    }

    public function tableColumns(){
        return [
            [
                "label" => "id",
                "field" => "id",
                "sorting" => false,
                "width" => "10px",
                "class" => "selectionTh",
                "sort" => "desc",
            ],
            [
                "label" => "Name",
                "field" => "first_name",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
            [
                "label" => "Role",
                "field" => "role_id",
                "sorting" => true,
                "width" => "auto",
                "class" => "text-left",
                "sort" => "",
            ],
            [
                "label" => "Status",
                "field" => "status",
                "sorting" => true,
                "width" => "10px",
                "class" => "statusTh",
                "sort" => "",
            ],
            [
                "label" => "Action",
                "field" => "action",
                "sorting" => false,
                "width" => "10px",
                "class" => "actionTh",
                "sort" => "",
            ]
        ];
    }

    public function Role(){
        return $this->belongsTo(SetupRole::class,'role_id','id');
    }

    public function Profile(){
        return $this->belongsTo(Profile::class,'id','user_id');
    }

    public function SenderProfile(){
        return $this->belongsTo(Profile::class,'id','user_id')
            ->select('id','user_id','first_name','last_name','middle_name');
    }

    public function UserById($userId){
        $SetupRole = new SetupRole();
        $Attachment = new Attachment();
        $userInfo = '';

        if(Profile::where('user_id',$userId)->count() > 0){
            $userInfo = $this->where('id',$userId)->with('Profile')->first();
        } else {
            $userInfo = $this->where('id',$userId)->first();
        }

        if($userInfo->Profile){
            if($Attachment->checkById('Profile',$userInfo->Profile->id) != 0){
                $userInfo->attachment = [
                    'avatar' => $Attachment->getById('Profile',$userInfo->Profile->id)
                ];
            }
        }
        
        if($SetupRole->checkById($userInfo->role_id) != 0){
            $userInfo->role = [
                'name' => $SetupRole->getById($userInfo->role_id)->name,
                'slug' => $SetupRole->getById($userInfo->role_id)->slug
            ];
        }
        return $userInfo;
    }

    public function Socials(){
        return $this->hasMany(Social::class,'user_id','id');
    }

    public function getUsersByRoleIds($roleIds){
        if(sizeof($roleIds) == 0){
            return [];
        }
        return $this->whereIn('role_id',$roleIds)->get();
    }

    public function getUsersByUserIds($userIds){
        if(sizeof($userIds) == 0){
            return [];
        }
        return $this->whereIn('id',$userIds)->get();
    }
}
