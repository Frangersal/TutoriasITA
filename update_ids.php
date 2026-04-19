<?php
function updateAnswersO() {
    $path = 'c:/wamp64/www/TutoriasITA/database/seeders/AnswersOptionsSeeder.php';
    $lines = file($path);
    $started = false;
    foreach($lines as &$l){
        // Si encontramos la línea a partir de la cual queremos empezar, marcamos "started"
        // Empezamos cuando encontramos el id => 220 de question 108
        if(strpos($l, '"id" => "220"') !== false && strpos($l, '108') !== false) {
            $started = true;
        }
        
        // Si hemos activado la bandera, actualizamos todos los ids
        if($started && preg_match('/"id"\s*=>\s*"([0-9]+)"/', $l, $m)){
            $old = $m[1];
            $new = (int)$old + 4;
            $l = str_replace('"id" => "'.$old.'"', '"id" => "'.$new.'"', $l);
        }
    }
    file_put_contents($path, implode('', $lines));
    echo "OK updated\n";
}
updateAnswersO();
