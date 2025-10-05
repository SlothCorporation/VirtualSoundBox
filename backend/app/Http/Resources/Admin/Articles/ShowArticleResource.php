<?php

namespace App\Http\Resources\Admin\Articles;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowArticleResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'contentType' => $this->type,
            'externalUrl' => $this->external_url,
            'externalDescription' => $this->external_description,
            'previewToken' => $this->limited_access_token,
            'body' => $this->body,
            'tags' => $this->tags->pluck('name'),
            'category' => $this->category?->slug,
            'coverImage' => $this->coverImage ? [
                'id' => $this->coverImage->id,
                'url' => $this->coverImage->url,
            ] : null,
            'thumbnailImage' => $this->thumbnailImage ? [
                'id' => $this->thumbnailImage->id,
                'url' => $this->thumbnailImage->url,
            ] : null,
            'status' => $this->status,
            'publishAt' => $this->published_at,
        ];
    }
}
