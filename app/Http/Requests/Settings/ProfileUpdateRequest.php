<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'control_number' => ['required', 'string', 'size:8', 'regex:/^[0-9]+$/', Rule::unique(User::class, 'control_number')->ignore($this->user()->id)],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'picture' => ['nullable', 'image', 'max:5120'],
            'major_id' => ['required', 'integer', 'exists:majors,id'],
        ];
    }
}
