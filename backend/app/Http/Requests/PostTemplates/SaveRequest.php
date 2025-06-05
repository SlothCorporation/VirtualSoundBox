<?php

namespace App\Http\Requests\PostTemplates;

use Illuminate\Foundation\Http\FormRequest;

class SaveRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'data.uuid' => 'required|uuid',
            'data.name' => 'required|string|max:255',
            'data.type' => 'required|string|in:music,list',
            'data.content' => 'required|string',
        ];
    }
}
