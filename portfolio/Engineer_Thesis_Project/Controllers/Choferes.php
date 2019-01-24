<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use \APP\Models\Chofer;
use App\Utils\Log;

class Choferes {

    public static function todosArrelo(){

        $miChofer = new Chofer();
        $choferes = $miChofer->buscarArreglo();

        $salida = array();
        if (count($choferes) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $choferes ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando choferes.";
        }

        return $salida;
    }

    public static function agregar( Chofer $miChofer){

        $miChofer->set("idChofer","NULL");
        $miChofer->set("fechaAlta","CURRENT_TIMESTAMP");

        if ($miChofer->get("fechaDeNacimiento")==""){
            $miChofer->set("fechaDeNacimiento","NULL");
        }

        if ($miChofer->agregar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando chofer.";
        }

        return $salida;

    }

    public static function editar( Chofer $miChofer){

        $miChofer->set("fechaAlta","NO_INCLUDE");

        if ($miChofer->get("fechaDeNacimiento")==""){
            $miChofer->set("fechaDeNacimiento","NULL");
        }

        if ($miChofer->editar("idChofer")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error editando chofer.";
        }

        return $salida;

    }


}

/*
COMENTARIOS GENERALES:
*/