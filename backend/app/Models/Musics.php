<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Musics extends Model
{
    use HasFactory;

    protected $table = 'musics';

    protected $fillable = [
        'name',
        'artist',
        'verify_status',
        'spotify_track_id',
        'verified_at',
    ];
}
