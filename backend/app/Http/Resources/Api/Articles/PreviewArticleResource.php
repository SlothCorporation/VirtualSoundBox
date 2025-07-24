<?php

namespace App\Http\Resources\Api\Articles;

use Illuminate\Http\Resources\Json\JsonResource;

class PreviewArticleResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'category' => $this->category?->name,
            'tags' => $this->tags->pluck('name'),
            'coverImage' => $this->coverImage ? [
                'id' => $this->coverImage->id,
                'url' => $this->coverImage->url,
            ] : null,
            'thumbnailImage' => $this->thumbnailImage ? [
                'id' => $this->thumbnailImage->id,
                'url' => $this->thumbnailImage->url,
            ] : null,
            'publishAt' => $this->publish_at,
        ];
    }
}
