<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use APP\Models\Cliente;
use APP\Models\Viaje;
use APP\Models\Conexion;
use App\Utils\Log;

class Viajes {

    public static function todosArrelo(){

        $miViaje = new Viaje();
        $viajes = $miViaje->buscarArreglo();

        $salida = array();
        if (count($viajes) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $viajes ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando viajes.";
        }

        return $salida;
    }
    public static function todosClase(){

        $miViaje = new Viaje();
        $viajes = $miViaje->buscarClase();

        $salida = array();
        if (count($viajes) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $viajes ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando viajes.";
        }

        return $salida;
    }

    public static function todosViajesClientesPuntosArreglo(){

        $miViaje = new Viaje();
        $viajes = $miViaje->viajesClientesPuntos();

        $salida = array();
        if (count($viajes) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $viajes ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando viajes.";
        }

        return $salida;
    }

    public static function agregar( Viaje $miViaje){

        $miViaje->set("idViaje","NULL");
        $miViaje->set("fechaAlta","CURRENT_TIMESTAMP");

        $salida = array();

        if($miViaje->get("idCliente") == ""){
            $salida["success"] = false;
            $salida["error"] = "Cliente invalido";
            return $salida;
        }

        $clienteValidate = new Cliente();
        $clienteValidate->set("idCliente",$miViaje->get("idCliente"));

        $clientes = $clienteValidate->buscarClase();

        if(count($clientes)!=1){
            $salida["success"] = false;
            $salida["error"] = "Cliente invalido";
            return $salida;
        }

        if ($miViaje->agregar()){

            $salida["success"] = true ;
            $salida["lastId"] = Conexion::getConnection()->lastInsertId();

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando viaje.";
        }

        return $salida;

    }
    public static function editar( Viaje $miViaje){

        $miViaje->set("fechaAlta","NO_INCLUDE");

        if ($miViaje->get("kilometros")==""){
            $miViaje->set("kilometros","NULL");
        }

        $clienteValidate = new Cliente();
        $clienteValidate->set("idCliente",$miViaje->get("idCliente"));
        $clientes = $clienteValidate->buscarClase();

        $salida = array();

        if(count($clientes)==0){
            $salida["success"] = false;
            $salida["error"] = "Cliente invalido";
            return $salida;
        }

        if ($miViaje->editar("idViaje")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error editando viaje.";
        }

        return $salida;

    }

    public static function viajesClientesArrelo(){

        $miViaje = new Viaje();
        $viajes = $miViaje->viajesClientes();

        $salida = array();
        if (count($viajes) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $viajes ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando viajes.";
        }

        return $salida;
    }

    public static function sinCotizarViajesClientesArrelo(){

        $miViaje = new Viaje();
        $viajes = $miViaje->sinCotizarViajesClientes();

        /*$salida = array();
        if (count($viajes) > 0){*/

            $salida["success"] = true ;
            $salida["todos"] = $viajes ;

        /*}else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando viajes.";
        }*/

        return $salida;
    }

}

/*
COMENTARIOS GENERALES:
*/