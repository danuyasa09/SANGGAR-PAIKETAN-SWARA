<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'tag',
        'title',
        'cover_url',
        'read_time',
        'author_name',
        'author_role',
        'author_avatar_url',
        'content',
        'views',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'content'       => 'array',
        'is_published'  => 'boolean',
        'published_at'  => 'datetime',
    ];
}
