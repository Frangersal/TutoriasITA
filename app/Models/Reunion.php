<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    protected $table ='reunions';

    protected $fillable = [
        'date_time','description','tutor_id','pupil_id',
    ];

    public function tutors()
    {
        return $this->belongsTo('App\Tutor', 'tutor_id');
    }

    public function pupils()
    {
        return $this->belongsTo('App\Pupil', 'pupil_id');
    }
    /** @use HasFactory<\Database\Factories\ReunionFactory> */
    // use HasFactory;
}
