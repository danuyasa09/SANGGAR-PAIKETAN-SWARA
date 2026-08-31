<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'visit_date',
        'participants',
        'package_type',
        'notes',
        'status',
    ];

    protected $casts = [
        'visit_date' => 'date',
    ];
}
