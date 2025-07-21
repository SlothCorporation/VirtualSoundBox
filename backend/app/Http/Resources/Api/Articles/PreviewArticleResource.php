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
            'publishAt' => $this->publish_at,
        ];
    }
}
