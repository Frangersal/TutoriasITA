<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaUsuarios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
                $table->engine = 'InnoDB';
                
                $table->increments('idusuario');
                $table->string('nombre', 64);
                $table->string('email', 64);
                $table->string('contrasenia', 16);
                $table->string('foto', 64);
                $table->date('fecha_nacimiento');
    
    
                $table->integer('idformulario')->unsigned();
    
                $table->index(["idformulario"], 'fk_usuarios_formularios_idx');
    
                $table->foreign('idformulario', 'fk_usuarios_formularios_idx')
                    ->references('idformulario')->on('formularios')
                    ->onDelete('no action')
                    ->onUpdate('no action');
    
    
                $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
