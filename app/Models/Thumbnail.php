<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thumbnail extends Model
{
    use HasFactory;
    protected $fillable = [
        'media_id',
        'user_id',

        'thumbnail',
        'name',
        'path',
    ];
}
