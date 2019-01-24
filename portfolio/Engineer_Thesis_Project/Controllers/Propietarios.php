<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use \APP\Models\Propietario;
use App\Utils\Log;

class Propietarios {

    public static function todosArrelo(){

        $miPropietario = new Propietario();
        $propietarios = $miPropietario->buscarArreglo();

        $salida = array();
        if (count($propietarios) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $propietarios ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando propietarios.";
        }

        return $salida;
    }

    public static function agregar( Propietario $miPropietario){

        $miPropietario->set("idPropietario","NULL");
        $miPropietario->set("fechaAlta","CURRENT_TIMESTAMP");

        if ($miPropietario->get("fechaDeNacimiento")==""){
            $miPropietario->set("fechaDeNacimiento","NULL");
        }

        if ($miPropietario->agregar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando propietario.";
        }

        return $salida;

    }

    public static function editar( Propietario $miPropietario){

        $miPropietario->set("fechaAlta","NO_INCLUDE");

        if ($miPropietario->get("fechaDeNacimiento")==""){
            $miPropietario->set("fechaDeNacimiento","NULL");
        }

        if ($miPropietario->editar("idPropietario")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error editando propietario.";
        }

        return $salida;

    }


}

/*
COMENTARIOS GENERALES:
*/