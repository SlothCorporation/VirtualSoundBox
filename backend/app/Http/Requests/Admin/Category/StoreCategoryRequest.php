<?php

namespace App\Http\Requests\Admin\Category;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->admin_flg ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'slug' => 'required|string',
        ];
    }
}
