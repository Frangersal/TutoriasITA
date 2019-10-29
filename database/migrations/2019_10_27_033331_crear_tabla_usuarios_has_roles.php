<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearTablaUsuariosHasRoles extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios_has_roles', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            
            $table->increments('idusuario_has_role');


            $table->integer('idusuario')->unsigned();
            $table->integer('idrole')->unsigned();

            $table->index(["idusuario"], 'fk_usuarios_has_roles_usuarios_idx');
            $table->index(["idrole"], 'fk_usuarios_has_roles_roles_idx');

            $table->foreign('idusuario', 'fk_usuarios_has_roles_usuarios_idx')
                ->references('idusuario')->on('usuarios')
                ->onDelete('no action')
                ->onUpdate('no action');
            $table->foreign('idrole', 'fk_usuarios_has_roles_roles_idx')
                ->references('idrole')->on('roles')
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
        Schema::dropIfExists('usuarios_has_roles');
    }
}
