<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaTutor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tutor', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('idtutor');
            $table->string('informacion_profesional', 64);


            $table->integer('idusuario')->unsigned();

            $table->index(["idusuario"], 'fk_tutor_usuario_idx');

            $table->foreign('idusuario', 'fk_tutor_usuario_idx')
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
        Schema::dropIfExists('tutor');
    }
}
