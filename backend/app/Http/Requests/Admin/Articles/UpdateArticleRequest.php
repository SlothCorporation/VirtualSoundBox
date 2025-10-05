<?php

namespace App\Http\Requests\Admin\Articles;

use Illuminate\Foundation\Http\FormRequest;

class UpdateArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->admin_flg ?? false;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content_type' => 'required|in:article,external',
            'external_url' => 'nullable|url|required_if:contentType,external',
            'external_description' => 'nullable|string|required_if:contentType,external',
            'body' => 'nullable|string|required_if:contentType,article',
            'tags' => 'array|distinct',
            'tags.*' => 'string',
            'category' => 'nullable|exists:categories,slug',
        ];
    }
}
