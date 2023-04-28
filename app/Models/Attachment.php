<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        
        'model',
        'model_id',
        
        'media_id',
        'name',
        'path',
        'extension',
        'size',
        'mime',
    ];

    public function checkById($model,$modelId){
        return $this->where('model',$model)->where('model_id',$modelId)->count();
    }

    public function getById($model,$modelId){
        return $this->where('model',$model)->where('model_id',$modelId)->with('Media.Thumbnails')->first();
    }

    public function Media(){
        return $this->belongsTo(Media::class,'media_id','id');
    }

    public function Thumbnails(){
        return $this->hasMany(Thumbnail::class,'media_id','media_id');
    }
}
