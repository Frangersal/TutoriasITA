<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaTutors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tutors', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('idtutor');
            $table->string('informacion_profesional', 64);


            $table->integer('idusuario')->unsigned();

            $table->index(["idusuario"], 'fk_tutors_usuarios_idx');

            $table->foreign('idusuario', 'fk_tutors_usuarios_idx')
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
        Schema::dropIfExists('tutors');
    }
}
