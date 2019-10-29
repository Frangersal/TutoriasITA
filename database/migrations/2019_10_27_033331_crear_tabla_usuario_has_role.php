<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaUsuarioHasRole extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuario_has_role', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('idusuario_has_role');


            $table->integer('idusuario')->unsigned();
            $table->integer('idrole')->unsigned();

            $table->index(["idusuario"], 'fk_usuario_has_role_usuario_idx');
            $table->index(["idrole"], 'fk_usuario_has_role_role_idx');

            $table->foreign('idusuario', 'fk_usuario_has_role_usuario_idx')
                ->references('idusuario')->on('usuario')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('idrole', 'fk_usuario_has_role_role_idx')
                ->references('idrole')->on('role')
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
        Schema::dropIfExists('usuario_has_role');
    }
}
