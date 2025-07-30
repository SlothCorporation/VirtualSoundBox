<?php

namespace App\Http\Resources\Api\Articles;

use Illuminate\Http\Resources\Json\JsonResource;

class IndexArticleResourece extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category?->name,
            'tags' => $this->tags->pluck('name'),
            'thumbnailImage' => $this->thumbnailImage ? [
                'id' => $this->thumbnailImage->id,
                'url' => $this->thumbnailImage->url,
            ] : null,
            'publishAt' => $this->publish_at,
        ];
    }
}
