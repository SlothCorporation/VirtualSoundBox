<?php

namespace App\Http\Resources\GraphQL;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->type,
            'body' => $this->body,
            'externalUrl' => $this->external_url,
            'externalDescription' => $this->external_description,
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
                'slug' => $this->category?->slug,
            ],
            'tags' => $this->tags->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name,
                    'slug' => $tag->slug,
                ];
            }),
            'corverImage' => $this->coverImage?->url,
            'thumbnailImage' => $this->thumbnailImage?->url,
            'publishedAt' => $this->publish_at,
        ];
    }
}
