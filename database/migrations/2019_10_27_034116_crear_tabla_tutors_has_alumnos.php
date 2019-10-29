<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaTutorsHasAlumnos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tutors_has_alumnos', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('idtutors_has_alumnos');


            $table->integer('idtutor')->unsigned();
            $table->integer('idusuario')->unsigned();
            $table->integer('idllenado')->unsigned();

            $table->index(["idtutor"], 'fk_tutors_has_alumnos_tutors_idx');
            $table->index(["idusuario"], 'fk_tutors_has_alumnos_usuarios_idx');
            $table->index(["idllenado"], 'fk_tutors_has_alumnos_llenados_idx');

            $table->foreign('idtutor', 'fk_tutors_has_alumnos_tutors_idx')
                ->references('idtutor')->on('tutors')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('idusuario', 'fk_tutors_has_alumnos_usuarios_idx')
                ->references('idusuario')->on('usuarios')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('idllenado', 'fk_tutors_has_alumnos_llenados_idx')
                ->references('idllenado')->on('llenados')
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
        Schema::dropIfExists('tutors_has_alumnos');
    }
}
