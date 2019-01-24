<?php

    require_once __DIR__ . "/Config/Constantes.php";    //Inclusión de las constantes y funciones globales
    require_once __DIR__ . "/Autoload.php";        //Inclusión de archivo para Autoload de las clases

    \APP\Autoload::run();                        //Arranca Autoload

    session_start();
    session_destroy();

    header("Location: ./index.php");
    exit("Redirected to index.");

/*
COMENTARIOS GENERALES:
*/