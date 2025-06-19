<?php

namespace App\Http\Requests\Admin\Music;

use Illuminate\Foundation\Http\FormRequest;

class IndexMusicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'page' => ['sometimes', 'integer', 'min:1'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:100'],
            'keyword' => ['nullable', 'string', 'max:255']
        ];
    }
}
