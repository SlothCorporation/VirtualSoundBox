<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $table = 'articles';

    protected $fillable = [
        'title',
        'slug',
        'type',
        'body',
        'external_url',
        'external_description',
        'status',
        'category_id',
    ];

    protected $appends = ['excerpt'];

    public function getExcerptAttribute(): ?string
    {
        if (!$this->body){
            return null;
        }

        $plain = strip_tags($this->body);
        return mb_strimwidth($plain, 0, 100, '...');
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ArticleImage::class);
    }

    public function coverImage()
    {
        return $this->hasOne(ArticleImage::class)->where('type', 'cover');
    }

    public function thumbnailImage()
    {
        return $this->hasOne(ArticleImage::class)->where('type', 'thumbnail');
    }
}
