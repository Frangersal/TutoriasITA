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
              <br><br>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            
            <div class="col-md-4">
                    <h3>Ingresar</h3>
                    <form>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Your Email *" value="" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Your Password *" value="" />
                        </div>
                        <div class="form-group">
                            <input type="submit" class="btnSubmit" value="Login" />
                        </div>
                        <div class="form-group">
                            <a href="#" class="ForgetPwd">Forget Password?</a>
                        </div>
                    </form>
                </div>
                <div class="col-md-4" style="background-color:#233D7B">
                    <h3>¿Primera vez en el sitio?</h3>
                    Si recién comienzas a tomar tutorías y aún no tienes acceso al sitio, da clic en el botón de abajo para registrarte.
                    <form>


            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 

    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
              <br><br><br><br><br><br><br><br><br>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 


    @include ('includes.footer') 
    </body>
</html>
