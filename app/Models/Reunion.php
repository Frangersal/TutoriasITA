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

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function pupil()
    {
        return $this->belongsTo(Pupil::class);
    }
    /** @use HasFactory<\Database\Factories\ReunionFactory> */
    // use HasFactory;
}
