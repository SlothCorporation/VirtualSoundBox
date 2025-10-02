<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostTemplate extends Model
{
    protected $primaryKey = 'uuid';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'uuid',
        'user_uuid',
        'name',
        'type',
        'content',
    ];
}
