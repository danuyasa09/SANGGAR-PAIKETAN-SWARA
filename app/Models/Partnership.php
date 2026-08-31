<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Partnership extends Model
{
    protected $fillable = [
        'name',
        'institution',
        'email',
        'phone',
        'partnership_type',
        'notes',
        'status',
    ];
}
