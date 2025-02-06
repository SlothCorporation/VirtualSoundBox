<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SetMusicDataRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'data' => 'required|array',
            'data.*.music' => 'required|string',
            'data.*.artist' => 'required|string',
        ];
    }
}
