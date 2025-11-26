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

    public function forms()
    {
        return $this->belongsTo('App\Form','form_id');
    }

    public function answers()
    {
        return $this->hasMany('App\Answer');
    }

    public function answer_option()
    {
        return $this->hasMany('App\Option');
    }

    public function answer_type()
    {
        return $this->belongsTo('App\AnswersTypes','answer_type_id');
    }

    /** @use HasFactory<\Database\Factories\QuestionFactory> */
    // use HasFactory;
}
