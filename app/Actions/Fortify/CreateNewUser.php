<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'control_number' => ['required', 'string', 'size:8', 'regex:/^[0-9]+$/', Rule::unique('users', 'control_number')],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'major_id' => ['required', 'integer', 'exists:majors,id'],
            'password' => $this->passwordRules(),
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'control_number' => $input['control_number'],
            'major_id' => $input['major_id'],
            'email' => $input['email'],
            'password' => $input['password'],
            'role_id' => 3, // Asignar el rol 3 (student) por defecto? Si no, se ignorará
        ]);
    }
}
