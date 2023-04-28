<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reffer extends Model
{
    use HasFactory;
    use SoftDeletes;
    protected $fillable = [
        'name',
        'mobile',
        'address',
        'clinic',

        'status',

        'created_by',
        'created_date',
        'created_time',
        'updated_by',
        'updated_date',
        'updated_time',
    ];
}
