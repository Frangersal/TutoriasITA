<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormUser extends Model
{
    protected $table = 'form_users';

    protected $fillable = [
        'form_id',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function form()
    {
        return $this->belongsTo(Form::class);
    }
}
