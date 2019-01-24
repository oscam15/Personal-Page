<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use APP\Models\Registro;
use App\Utils\Log;

class Registros {

    public static function todosArrelo(){

        $miRegistro = new Registro();
        $registros = $miRegistro->buscarArreglo();

        $salida = array();
        if (count($registros) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $registros ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando registros.";
        }

        return $salida;
    }
    public static function todosClase(){

        $miRegistro = new Registro();
        $registros = $miRegistro->buscarClase();

        $salida = array();
        if (count($registros) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $registros ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando registros.";
        }

        return $salida;
    }

    public static function agregar( Registro $miRegistro){

        $miRegistro->set("idRegistro","NULL");
        $miRegistro->set("fechaAlta","CURRENT_TIMESTAMP");


        if ($miRegistro->agregar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando registro.";
        }

        return $salida;

    }
    public static function eliminar( Registro $miRegistro){

        /*$miRegistro->set('monto','NO_INCLUDE');
        $miRegistro->set('fechaAlta','NO_INCLUDE');
        $miRegistro->set('idVenta','NO_INCLUDE');

        if ($miRegistro->eliminar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error eliminando registro.";
        }

        return $salida;*/

    }






}

/*
COMENTARIOS GENERALES:
*/