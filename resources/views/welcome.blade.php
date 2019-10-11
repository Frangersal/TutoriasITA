<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
        section {
            padding: 70px 0;
            border-bottom: 1px dotted #ccc;
        }

        </style>
    </head>
    <body>

    @include ('includes.header')
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-6">Sistema de Tutorías ITA</h1>
        <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </div>
    </div>
    

    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"style="background-color:#FFF; border-width: 2px; border-left: solid; border-color: #233D7B;"></div>
            <div class="col-8"style="background-color:#FFF;">
              <hr style="border-color:#233D7B;border-width: 2px;">
            </div>
          <div class="col-1 colright"style="background-color:#FFF; border-width: 2px; border-right: solid; border-color: #233D7B;"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
              <div class="title1" align="center">
                  ¿Por qué tomar tutorías?
              </div>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div>
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
            Lorem ipsum dolor sit amet consectetur, adipiscing elit varius leo sed, pharetra et urna faucibus. Nec risus sagittis venenatis lectus dignissim placerat porta lacus potenti euismod, luctus consequat elementum imperdiet eros magnis tristique dis inceptos, phasellus orci nascetur cum a class quis dictumst malesuada. Urna cras imperdiet consequat montes nullam porta aliquam lectus non mi, ante auctor viverra netus nostra nisl diam quis magna, praesent phasellus penatibus etiam sem hac eget natoque lacus. Tristique tempus cubilia semper rhoncus scelerisque convallis vivamus lectus tincclassunt, ac class enim montes hac phasellus auctor fusce habitasse, molestie vehicula laoreet metus justo placerat etiam tellus. Rutrum orci fringilla a erat cubilia dui blandit egestas, praesent gravclassa taciti potenti litora euismod volutpat, tortor nisl habitasse enim libero placerat imperdiet. Sapien mi nibh porta eget aliquam torquent diam tincclassunt aenean, arcu class convallis in leo mollis porttitor urna, neque faucibus libero eleifend lobortis fermentum turpis quis.
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
              <hr style="border-color:#233D7B;border-width: 2px;">
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
              <div class="title1" align="center">
                Tutores ITA
              </div>
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div>     
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-2 "style="background-color:#FFF;">
              Nombre
            </div>
            <div class="col-2 "style="background-color:#FFF;">
              Nombre
            </div>
            <div class="col-2 "style="background-color:#FFF;">
             Nombre 
            </div>
            <div class="col-2 "style="background-color:#FFF;">
              Nombre
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-2 circulo"style="background-color:green;">
              d
            </div>
            <div class="col-2 circulo"style="background-color:black;">
              d
            </div>
            <div class="col-2 circulo"style="background-color:green;">
             g 
            </div>
            <div class="col-2 circulo"style="background-color:black;">
              g
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    <div class="row">
        <div class="col-1"style="background-color:#EEEEFF;"></div>
          <div class="col-1 colleft"></div>
            <div class="col-8"style="background-color:#FFF;">
              <hr style="border-color:#233D7B;border-width: 2px;">
            </div>
          <div class="col-1 colright"></div>
        <div class="col-1"style="background-color:#EEEEFF"></div>
    </div> 
    @include ('includes.footer') 
    
    
    </body>
</html>

