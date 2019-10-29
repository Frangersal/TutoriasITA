<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaLlenado extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('llenado', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('idllenado');
            $table->string('respuesta', 64);


            $table->integer('idformulario')->unsigned();
            $table->integer('idusuario')->unsigned();

            $table->index(["idformulario"], 'fk_llenado_formulario_idx');
            $table->index(["idusuario"], 'fk_llenado_usuarioe_idx');

            $table->foreign('idformulario', 'fk_llenado_formulario_idx')
                ->references('idformulario')->on('formulario')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('idusuario', 'fk_llenado_usuario_idx')
                ->references('idusuario')->on('usuario')
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
        Schema::dropIfExists('llenado');
    }
}
