<?php

namespace App\Http\Resources\Admin\Articles;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowArticleResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id'                   => $this->id,
            'title'                => $this->title,
            'contentType'          => $this->type,
            'externalUrl'          => $this->external_url,
            'externalDescription'  => $this->external_description,
            'body'                 => $this->body,
            'tags'                 => $this->tags->pluck('name'),
            'category'             => $this->category?->slug,
            'status'               => $this->status,
            'publishAt'            => $this->publish_at,

        ];
    }
}
