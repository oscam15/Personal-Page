<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use \APP\Models\Cliente;
use App\Utils\Log;

class Clientes {

    public static function todosArrelo(){

        $miCliente = new Cliente();
        $clientes = $miCliente->buscarArreglo();

        $salida = array();
        if (count($clientes) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $clientes ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando clientes.";
        }

        return $salida;
    }

    public static function agregar( Cliente $miCliente){

        $miCliente->set("idCliente","NULL");
        $miCliente->set("fechaAlta","CURRENT_TIMESTAMP");

        if ($miCliente->get("fechaDeNacimiento")==""){
            $miCliente->set("fechaDeNacimiento","NULL");
        }

        $salida = array();

        if ($miCliente->agregar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando cliente.";
        }

        return $salida;

    }

    public static function editar( Cliente $miCliente){

        if ($miCliente->get("fechaDeNacimiento")==""){
            $miCliente->set("fechaDeNacimiento","NULL");
        }

        $miCliente->set("fechaAlta","NO_INCLUDE");

        $salida = array();

        if ($miCliente->editar("idCliente")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error editando cliente.";
        }

        return $salida;

    }

}

/*
COMENTARIOS GENERALES:
*/