<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $table ='answers';

    protected $fillable = [
        'name','question_id','user_id',
    ];

    public function users()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    public function questions()
    {
        return $this->belongsTo('App\Question', 'question_id');
    }
    /** @use HasFactory<\Database\Factories\AnswerFactory> */
    // use HasFactory;
}
