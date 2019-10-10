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

        <div class="title1" align="center" >Registro de Alumnos</div>

	
        <div class="formularioalumno">
        <div class="etiquetas-nombre"> 
            <div class="labelInfo1" >Nombre:</div>
            <div class="labelInfo1" >Apellclasso paterno:</div>
            <div class="labelInfo1" >Apellclasso materno:</div>      
        </div> <!--Fin etiquetas nombre-->

        <div class="input-nombre"  >        
            <input type="text" name="inputnombre" class="nombre" style="wclassth: calc(30% - 2px); margin-right: 2%;  float: left; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 16px;">        
            <input type="text" name="inputapaterno" class="apaterno" style="wclassth: calc(30% - 2px); margin-right: 2%; float: left; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 16px;">        
            <input type="text" name="inputamaterno" class="amaterno" style="wclassth: calc(30% - 2px); float: left; margin-right: 2%; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 16px;">        
        </div> <!--Fin input nombre-->    

        <div class="form1"  >    
            <div class="etiquetas1" >    
                <div class="labelInfo1" >No. Control:</div>
                <div class="labelInfo1" >Carrera:</div>
                <div class="labelInfo1" >Sexo:</div>
            </div> <!--Fin etiquetas 1-->

            <div class="input1"  >        
                <input type="text" name="numcontrol" class="numcontrol" style="wclassth: calc(30% - 2px); margin-right: 2%;  float: left; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 16px;">
                <select name="carrera" class="carrera" style="wclassth: calc(31% - 2px); margin-right: 2%; float: left; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 15px; font-family: 'Open Sans', sans-serif;">
                    <option value="1">Ing. en Sistemas Computacionales</option>
                    <option value="2">Ing. en Electromecánica</option>
                    <option value="3">Ing. Bioquímica</option>
                    <option value="4">Ing. en Gestión Empresarial</option>
                    <option value="5">Arquitectura</option>
                    <option value="6">Lic. en Administración</option>
                    <option value="7">Contador Público</option>
                </select>

                <div class="genero" >
                    <input type="radio" name="sexo" style="margin-left: 20px;" class="sexo_0" value="femenino">
                        <label for="origen_0" style="margin-left:5px;">Femenino</label>
                    <input style="margin-left: 40px;" type="radio" name="sexo" class="sexo_1" value="masculino">
                        <label for="origen_1" style="margin-left:5px;">Masculino</label>
                </div>
            </div> <!--Fin input1-->       
        </div> <!--Fin fila 1-->

        <div class="form1"  >    
            <div class="etiquetas2" >    
                <div class="labelInfo1" >Fecha de nacimiento (DD/MM/AAAA):</div>
                <div class="labelInfo1" >Lugar de nacimiento:</div>
                <div class="labeledad" style="wclassth: 16.5%; float: left; font-family: 'Open Sans', sans-serif; font-size: 15px; color: #2D2D2D;">Edad:</div>            
                <div class="labeledocivil" style="wclassth: 16.5%; float: left; font-family: 'Open Sans', sans-serif; font-size: 15px; color: #2D2D2D;">Estado civil:</div>
            </div> <!--Fin etiquetas 2-->

            <div class="input2"  >        
                <div class="fechanac" style="wclassth: 33%; float: left;">            
                    <input type="text" name="dianac" class="dianac" style="wclassth: calc(26% - 2px); margin-right: 3%;  float: left; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 15px;" placeholder="Día (dd)">
                    <input type="text" name="mesnac" class="mesnac" style="wclassth: calc(26% - 2px); margin-right: 3%;  float: left; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 15px;" placeholder="Mes (mm)">                
                    <input type="text" name="anionac" class="anioac" style="wclassth: calc(26% - 2px); float: left; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 15px;" placeholder="Año (aaaa)">                
                </div>
                
                <div class="lugarnacimiento" style="wclassth: 30%; float: left; margin-right: 3%;">                
                    <input type="text" name="lugarnac" class="lugarnac" style="wclassth: calc(100% - 2px); margin-right: 2%;  float: left; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 15px;">
                </div> <!--Fin lugar nacimiento-->
                
                <div class="edadalumno" style="wclassth: 13%; float: left; margin-right: 3%;">                
                    <input type="text" name="edad" class="edad" style="wclassth: calc(100% - 2px); margin-right: 2%;  float: left; padding: 5px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 15px;">
                </div> 
                
                <select name="edocivil" class="edocivil" style="wclassth: calc(16% - 2px); margin-right: 2%; float: left; padding: 3px; border-radius: 10px; border: 1px solclass #233D7B; font-size: 15px; font-family: 'Open Sans', sans-serif;">
                    <option value="1">Soltero (a)</option>
                    <option value="2">En una relación</option>
                    <option value="3">Comprometclasso (a)</option>
                    <option value="4">Unión libre</option>
                    <option value="5">Casado (a)</option>
                    <option value="6">Divorciado (a)</option>
                    <option value="7">Separado (a)</option>
                    <option value="8">Viudo (a)</option>
                </select>
            </div> <!--Fin input2-->        
        </div> <!--Fin fila 2-->

        <div class="form1"  >    
            <div class="titledomicilio" align="center" >Domicilio actual</div>
            <div class="etiquetas3" >    
                <div class="labelcalle">Calle:</div>
                <div class="labelnumext">Num. Ext:</div>            
                <div class="labelnumint">Num. Int:</div>
                <div class="labelcolonia">Colonia:</div>            
                <div class="labelcp">CP:</div>
            </div> <!--Fin etiquetas 3-->

            <div class="input1"  >        
                <input type="text" name="calle" class="calle" >
                <input type="text" name="numext" class="numext" >            
                <input type="text" name="numint" class="numint" >            
                <input type="text" name="colonia" class="colonia" >            
                <input type="text" name="cp" class="cp">            
            </div> <!--Fin input3-->
            
        </div> <!--Fin fila 3-->    

        <div class="form1"  >
            <div class="label4" >    
                <div class="labelInfo1" >Correo electrónico:</div>
                <div class="labeltelefono">Teléfono:</div>
                <div class="labeltrabaja">¿Trabajas?:</div>            
                <div class="labelespecifique">Especifique su trabajo:</div>            
            </div> <!--Fin label 4-->

            <div class="input1"  >        
                <input type="text" name="correo" class="correo">
                <input type="text" name="telefono" class="telefono">
                <div class="trabaja">
                    <input type="radio" name="trabaja">                       
                    <label for="origen_0">Sí</label>
                    <input type="radio" name="trabaja" style="margin-left: 10px;" class="trabaja_1" value="no">
                        <label for="origen_1" style="margin-left: 10px;">No</label>
                </div>
                
                <input type="text" name="especifique" class="especifique" >
                
            </div> <!--Fin input 4-->

        </div> <!--Fin fila 4-->

        <input type="button" name="registrarse" class="botongrande" value="Registrarse" onClick="">


        </div> <!--Fin formulario-->

    @include ('includes.footer') 
    </body>
</html>