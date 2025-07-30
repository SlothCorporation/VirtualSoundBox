<?php

namespace App\Http\Requests\Api\Articles;

use Illuminate\Foundation\Http\FormRequest;

class IndexArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => 'nullable|integer|min:1',
            'tag' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'keyword' => 'nullable|string|max:255',
        ];
    }
}
