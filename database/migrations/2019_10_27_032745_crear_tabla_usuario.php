<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaUsuario extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario', function (Blueprint $table) {
                $table->engine = 'InnoDB';
                $table->increments('idusuario');
                $table->string('nombre', 64);
                $table->string('email', 64);
                $table->string('contrasenia', 16);
                $table->string('foto', 64);
                $table->string('area', 64);
                $table->date('fecha_nacimiento');
    
    
                $table->integer('idformulario')->unsigned();
    
                $table->index(["idformulario"], 'fk_usuario_formulario_idx');
    
                $table->foreign('idformulario', 'fk_usuario_formulario_idx')
                    ->references('idformulario')->on('formulario')
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
        Schema::dropIfExists('usuario');
    }
}
