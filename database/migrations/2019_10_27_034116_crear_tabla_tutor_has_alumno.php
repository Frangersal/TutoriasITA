<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaTutorHasAlumno extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tutor_has_alumno', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('idtutor_has_alumno');


            $table->integer('idtutor')->unsigned();
            $table->integer('idusuario')->unsigned();
            $table->integer('idllenado')->unsigned();

            $table->index(["idtutor"], 'fk_tutor_has_alumno_tutor_idx');
            $table->index(["idusuario"], 'fk_tutor_has_alumno_usuario_idx');
            $table->index(["idllenado"], 'fk_tutor_has_alumnoa_llenado_idx');

            $table->foreign('idtutor', 'fk_tutor_has_alumno_tutor_idx')
                ->references('idtutor')->on('tutor')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('idusuario', 'fk_tutor_has_alumno_usuario_idx')
                ->references('idusuario')->on('usuario')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('idllenado', 'fk_tutor_has_alumno_llenado_idx')
                ->references('idllenado')->on('llenado')
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
        Schema::dropIfExists('tutor_has_alumno');
    }
}
