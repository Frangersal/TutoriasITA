<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaReuniones extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reuniones', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('idreunion');
            $table->string('observacion', 64);
            $table->date('fecha_reunion');

            $table->integer('idtutor')->unsigned();
            $table->integer('idusuario')->unsigned();

            $table->index(["idtutor"], 'fk_reuniones_tutors_idx');
            $table->index(["idusuario"], 'fk_reuniones_usuarios_idx');

            $table->foreign('idtutor', 'fk_reuniones_tutors_idx')
                ->references('idtutor')->on('tutors')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('idusuario', 'fk_reuniones_usuarios_idx')
                ->references('idusuario')->on('usuarios')
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
        Schema::dropIfExists('reuniones');
    }
}
