<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


//  Ejemplo de rutas con numeros, con solo numeros del 0-9
/* 
Route::get('fotos/{numero?}', function ($numero='Sin numero') {
    return 'fotos chidas: '.$numero;
})->where('numero', '[0-9]+');


Route::get('/', function () {
    return view('welcome');
});
*/
Route::get("/wellcome",     "MiControlador@index");
Route::get("/iniciarsesion","MiControlador@iniciarsesion");
Route::get("/registrarse",  "MiControlador@registrarse");
Route::get("/perfiladmin",  "MiControlador@perfiladmin");
Route::get("/perfiltutor",  "MiControlador@perfiltutor");
Route::get("/perfilalumno", "MiControlador@perfilalumno");
Route::get("/infotutor",    "MiControlador@infotutor");
Route::get("/formulario",   "MiControlador@formulario");
Route::get("/graficas",     "MiControlador@graficas");
