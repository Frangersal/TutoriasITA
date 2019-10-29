<?php

namespace tutorias;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //
        
    public function user(){
        //Relacion recibe un modelo
        return  $this->belongsToMany('tutorias/Usuario');
    }
}
