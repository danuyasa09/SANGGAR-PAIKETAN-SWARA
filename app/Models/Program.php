<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'code',
        'title',
        'description',
        'activities',
        'duration',
        'capacity',
        'thumbnail_url',
        'price',
        'btn_label',
        'is_custom_btn',
        'order',
        'is_active',
    ];

    protected $casts = [
        'activities'    => 'array',
        'is_active'     => 'boolean',
        'is_custom_btn' => 'boolean',
    ];
}
