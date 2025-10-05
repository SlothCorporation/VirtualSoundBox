<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FetchMusicDataRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'music' => 'string|nullable',
            'artist' => 'string|nullable',
        ];
    }
}
