<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswersOptions extends Model
{
    protected $table ='answers_options';

    protected $fillable = [
        'name','question_id',
    ];

    public function questions()
    {
        return $this->belongsTo('App\Question','question_id');
    }
    /** @use HasFactory<\Database\Factories\AnswersOptionsFactory> */
    // use HasFactory;
}
