<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        
    </head>
    <body>
    @include ('includes.header')
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
              <br>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
                <div class="title1" align="center" >Registro de Alumnos</div>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div>

    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
               
            <form>
            
                <div class="form-group">
                    <label for="inputAddress2">Ejemplo completo</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                    <label for="inputCity">Nombre: </label>
                    <input type="text" class="form-control" id="inputCity">
                    </div>
                    <div class="form-group col-md-4">
                    <label for="inputCity">Apellido paterno: </label>
                    <input type="text" class="form-control" id="inputCity">
                    </div>
                    <div class="form-group col-md-4">
                    <label for="inputZip">Apellido materno: </label>
                    <input type="text" class="form-control" id="inputZip">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                    <label for="inputCity">No. Control: </label>
                    <input type="text" class="form-control" id="inputCity">
                    </div>
                    <div class="form-group col-md-4">
                    <label for="inputState">Carrera: </label>
                    <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                    </div>
                    <div class="form-group col-md-4">
                    <label for="inputState">Sexo: </label>
                    <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-4">
                    <label for="inputCity">Fecha de nacimiento: </label>
                    <input type="text" class="form-control" id="inputCity">
                    </div>
                    <div class="form-group col-md-4">
                    <label for="inputState">Estado civil: </label>
                    <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                    </div>
                    <div class="form-group col-md-4">
                    <label for="inputZip">Ciudad de nacimiento: </label>
                    <input type="text" class="form-control" id="inputZip">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputEmail4">Direccion: </label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputPassword4">Colonia: </label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
                    </div>
                    <div class="form-group col-md-3">
                        <label for="inputPassword4">Codigo postal: </label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
                    </div>
                </div>


                <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="inputCity">Correo electronico: </label>
                    <input type="text" class="form-control" id="inputCity">
                    </div>
 
                    <div class="form-group col-md-6">
                    <label for="inputZip">Telefono: </label>
                    <input type="text" class="form-control" id="inputZip">
                    </div>
                </div>



                <button type="button" name="registrarse" class="botongrande" value="Registrarse" onClick="">Registrarse</button>
             </form>

            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    @include ('includes.footer') 
    </body>
</html>
