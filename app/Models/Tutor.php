<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor extends Model
{    
    protected $table ='tutors';

    protected $fillable = [
        'description','user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function reunions()
    {
        return $this->hasMany(Reunion::class);
    }
    /** @use HasFactory<\Database\Factories\TutorFactory> */
    // use HasFactory;
}
