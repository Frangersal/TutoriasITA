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
          <div class="col-2 colleft"></div>
            <div class="col-6"style="background-color:#FFF;">
  
            </div>
          <div class="col-2 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
                <br>
                    <div class="title1" align="center" >Perfil de Tutor</div>
                <br>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 

    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
                <div class="col-lg"style="background-color:#fff;">
                <hr style="border-color:#233D7B;border-width: 2px;">
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 



    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
        <div class="col-1 colleft"></div>
            <div class="col-lg colright">
                <br>
                
                <div class="col-8 circulo"style="background-color:blue;">
                    d
                </div>
                <br>
                <div class="title1"  >- Nombre: Reyna el poderoso</div>
                <br>
                <div class="title1"  >- Area: Ingenieria en Sistemas Computacionales</div>
                <br>
            </div>

            
            
            
            <div class="col-lg"style="background-color:#EEEEFF;">   
            <div class="row">
                <div class="col-1"></div>
                    <div class="col-10">
                        <br>
                        <div class="title1" align="center" >Proximas reuniones</div>
                    </div>
                <div class="col-1"></div>
            </div>
            <div class="row"> 
                <div class="col-1"></div>
                <div class="col-10">
                    -Reunión con el alumno Antonio Díaz Gómez el día 23 de Septiembre a las 11:00 hrs.
                </div>
                <div class="col-1"></div>
            </div>
            <div class="row"> 
                <div class="col-1"></div>
                <div class="col-10">
                    -Reunión con el alumno Antonio Díaz Gómez el día 23 de Septiembre a las 11:00 hrs.
                </div>
                <div class="col-1"></div>
            </div>
            <div class="row"> 
                <div class="col-1"></div>
                <div class="col-10">
                    -Reunión con el alumno Antonio Díaz Gómez el día 23 de Septiembre a las 11:00 hrs.
                </div>
                <div class="col-1"></div>
            </div>
            <div class="row"> 
                <div class="col-1"></div>
                <div class="col-10">
                    -Reunión con el alumno Antonio Díaz Gómez el día 23 de Septiembre a las 11:00 hrs.
                </div>
                <div class="col-1"></div>
            </div>
            <div class="row"> 
                <div class="col-1"></div>
                <div class="col-10">
                    -Reunión con el alumno Antonio Díaz Gómez el día 23 de Septiembre a las 11:00 hrs.
                </div>
                <div class="col-1"></div>
            </div>
            <div class="row"> 
                <div class="col-1"></div>
                <div class="col-10">
                    <br> Ver mas...<br>
                </div>
                <div class="col-1"></div>
            </div>

            </div>


          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 




    

    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
                <div class="col-lg"style="background-color:#fff;">
                <br> 
                     <br>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 


    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
                <div class="col-lg"style="background-color:#fff;">
                <br> 
                <hr style="border-color:#233D7B;border-width: 2px;">
                <div class="title1" align="center" >Administrar</div>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 

    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
                <div class="col-lg"style="background-color:#fff;">
                
                <hr style="border-color:#233D7B;border-width: 2px;">
                Administrar tutorados:
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="form-row col-lg"style="background-color:#fff;">
                <div class="col-12">
                <input class="form-control" type="text" placeholder="Default input">
                </div>
                
            </div>
            <div class="form-row col-lg"style="background-color:#fff;">
                <div class="btn col-3">
                <button type="submit" class="btn btn-primary" style="background-color:#233D7B">Buscar</button>
                </div>
                <div class="btn col-3">
                <button type="submit" class="btn btn-primary" style="background-color:#233D7B">Agregar</button>
                </div>
                <div class="btn col-3">
                <button type="submit" class="btn btn-primary" style="background-color:#233D7B">Editar</button>
                </div>
                <div class="btn col-3">
                <button type="submit" class="btn btn-primary" style="background-color:#233D7B">Eliminar</button>
                </div>
                </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-lg"style="background-color:#fff;">                
                <textarea class="form-control col-12" id="exampleFormControlTextarea1" rows="3"></textarea>
                <br>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 

    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
                <div class="col-lg"style="background-color:#fff;">
                
                <hr style="border-color:#233D7B;border-width: 2px;">
                Administrar reuniones:
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="form-row col-lg"style="background-color:#fff;">
                <div class="col-12">
                <input class="form-control" type="text" placeholder="Default input">
                </div>
                
            </div>
            <div class="form-row col-lg"style="background-color:#fff;">
            <div class="btn col-3">
                <button type="submit" class="btn btn-primary" style="background-color:#233D7B">Buscar</button>
                </div>
                <div class="btn col-3">
                <button type="submit" class="btn btn-primary" style="background-color:#233D7B">Agregar</button>
                </div>
                <div class="btn col-3">
                <button type="submit" class="btn btn-primary" style="background-color:#233D7B">Editar</button>
                </div>
                <div class="btn col-3">
                <button type="submit" class="btn btn-primary" style="background-color:#233D7B">Eliminar</button>
                </div>
                </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-lg"style="background-color:#fff;">                
                <textarea class="form-control col-12" id="exampleFormControlTextarea1" rows="3"></textarea>
                <br>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
                <div class="col-lg"style="background-color:#fff;">
                
                <hr style="border-color:#233D7B;border-width: 2px;">
                Agregar foto:
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="form-row col-lg"style="background-color:#fff;">
                <div class="col-12">
                <input class="form-control" type="text" placeholder="Default input">
                </div>
                
            </div>
            <div class="form-row col-lg"style="background-color:#fff;">
                <div class="btn col-6">
                <button type="submit" class="btn btn-primary" style="background-color:#233D7B">Bucar</button>
                </div>
                <div class="btn col-6">
                <button type="submit" class="btn btn-primary " style="background-color:#233D7B">Eliminar</button>
                </div>
                </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    @include ('includes.footer') 
    </body>
</html>
