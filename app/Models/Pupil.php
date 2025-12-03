<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pupil extends Model
{
    protected $table ='pupils';

    protected $fillable = [
        'coment','tutor_id','user_id',
    ];

    public function tutor()
    {
        return $this->belongsTo(Tutor::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function reunions()
    {
        return $this->hasMany(Reunion::class);
    }
    /** @use HasFactory<\Database\Factories\PupilFactory> */
    // use HasFactory;
}
