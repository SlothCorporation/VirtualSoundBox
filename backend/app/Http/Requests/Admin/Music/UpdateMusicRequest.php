<?php

namespace App\Http\Requests\Admin\Music;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMusicRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['string', 'required'],
            'artist' => ['string', 'required'],
        ];
    }
}
