<?php

namespace App\Http\Requests\Admin\Articles;

use Illuminate\Foundation\Http\FormRequest;

class UploadArticleImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->admin_flg ?? false;
    }

    public function rules(): array
    {
        return [
            'image' => 'required|file|image|max:5120', // 5MB
            'type' => 'required|in:thumbnail,cover,body',
        ];
    }
}
