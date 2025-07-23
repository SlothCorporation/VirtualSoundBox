<?php

namespace App\Http\Resources\Admin\Articles;

use Illuminate\Http\Resources\Json\JsonResource;

class UploadArticleImageResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'url' => $this->url,
            'original_name' => $this->original_name,
            'type' => $this->type,
        ];
    }
}
