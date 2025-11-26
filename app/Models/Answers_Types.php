<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answers_Types extends Model
{
    protected $table ='answers_types';

    protected $fillable = [
        'name','description',
    ];

    public function questions()
    {
        return $this->hasMany('App\Question');
    }
    // use HasFactory;
}
