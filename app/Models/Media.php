<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'path',
        'extension',
        'size',
        'mime',
        
        'user_id',
        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];

    public function Thumbnails(){
        return $this->hasMany(Thumbnail::class,'media_id','id');
    }
}
