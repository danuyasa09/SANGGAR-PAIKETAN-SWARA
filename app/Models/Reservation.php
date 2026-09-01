<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'origin',
        'visit_date',
        'visit_time',
        'participants',
        'age_group',
        'package_type',
        'language',
        'notes',
        'status',
    ];

    protected $casts = [
        'visit_date' => 'date',
    ];
}
