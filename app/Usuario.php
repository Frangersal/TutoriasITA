<?php

namespace tutorias;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuario extends Model
{
    //
    use Notifiable;

    public function roles(){
        //Relacion recibe un modelo
        return  $this->belongsTuMany('tutorias/Role');
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre', 'email', 'contrasenia', 'foto', 'fecha_nacimiento' ,
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'contrasenia', 'remember_token',
    ];
}
