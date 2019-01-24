<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use \APP\Models\CodigoPostal;
use App\Utils\Log;

class CodigosPostales {

    public static function buscarRetornaSoloCodigosPostales( CodigoPostal $miCodigoPostal){

        $codigosPostales = $miCodigoPostal->buscarArreglo();

        $salida = array();
        if (count($codigosPostales) > 0){

            $salida["success"] = true ;
            $salida["codigosPostalesBusqueda"] = $codigosPostales ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando codigos postales.";
        }

        return $salida;


        return $salida;
    }

}

/*
COMENTARIOS GENERALES:
*/