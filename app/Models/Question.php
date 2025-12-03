<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table ='questions';

    protected $fillable = [
        'form_id','name','answer_type_id',//'option',
    ];

    public function form()
    {
        return $this->belongsTo(Form::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function options()
    {
        return $this->hasMany(AnswersOptions::class);
    }

    public function answer_type()
    {
        return $this->belongsTo(Answers_Types::class, 'answer_type_id');
    }

    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    // use HasFactory;
}
