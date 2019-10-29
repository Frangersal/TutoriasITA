<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaReunion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reunion', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('idreunion');
            $table->string('observacion', 64);
            $table->date('fecha_reunion');

            $table->integer('idtutor')->unsigned();
            $table->integer('idusuario')->unsigned();

            $table->index(["idtutor"], 'fk_reunion_tutor_idx');
            $table->index(["idusuario"], 'fk_reunion_usuario_idx');

            $table->foreign('idtutor', 'fk_reunion_tutor_idx')
                ->references('idtutor')->on('tutor')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('idusuario', 'fk_reunion_usuario_idx')
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
        Schema::dropIfExists('reunion');
    }
}
