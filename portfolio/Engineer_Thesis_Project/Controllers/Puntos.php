<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use APP\Models\Cliente;
use APP\Models\Punto;
use \APP\Models\Viaje;
use App\Utils\Log;

class Puntos {

    public static function todosArrelo(){

        $miPunto = new Punto();
        $puntos = $miPunto->buscarArreglo();

        $salida = array();
        if (count($puntos) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $puntos ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando puntos.";
        }

        return $salida;
    }
    public static function todosClase(){

        $miPunto = new Punto();
        $puntos = $miPunto->buscarClase();

        $salida = array();
        if (count($puntos) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $puntos ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando puntos.";
        }

        return $salida;
    }

    public static function agregar( Punto $miPunto){

        $miPunto->set("idPunto","NULL");

        if ($miPunto->get("hora")==""){
            $miPunto->set("hora","NULL");
        }

        $viajeValidate = new Viaje();
        $viajeValidate->set("idViaje",$miPunto->get("idViaje"));
        $viajes = $viajeValidate->buscarClase();

        $salida = array();

        if(count($viajes)==0){
            $salida["success"] = false;
            $salida["error"] = "Viaje invalido";
            return $salida;
        }

        if ($miPunto->agregar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando punto.";
        }

        return $salida;

    }

    public static function editar( Punto $miPunto){

        if ($miPunto->get("hora")==""){
            $miPunto->set("hora","NULL");
        }

        $viajeValidate = new Viaje();
        $viajeValidate->set("idViaje",$miPunto->get("idViaje"));
        $viajes = $viajeValidate->buscarClase();

        $salida = array();

        if(count($viajes)==0){
            $salida["success"] = false;
            $salida["error"] = "Viaje invalido";
            return $salida;
        }

        if ($miPunto->editar("idPunto")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error editando punto.";
        }

        return $salida;

    }

    public static function eliminarPorID( Punto $miPunto){

        $miPunto->set('idPunto','NO_INCLUDE');
        $miPunto->set('fecha','NO_INCLUDE');
        $miPunto->set('hora','NO_INCLUDE');
        $miPunto->set('estadoDireccion','NO_INCLUDE');
        $miPunto->set('delegacionMunicipioDireccion','NO_INCLUDE');
        $miPunto->set('codigoPostalDireccion','NO_INCLUDE');
        $miPunto->set('calleNumeroDireccion','NO_INCLUDE');
        $miPunto->set('descripcionDireccion','NO_INCLUDE');

        $salida = array();

        if ($miPunto->eliminar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error eliminando punto.";
        }

        return $salida;

    }
    public static function puntosViajesCotizaciones(){

        $miPunto = new Punto();
        $puntos = $miPunto->puntosViajesCotizaciones();

        $salida = array();

        if (count($puntos)>0){
            $salida["success"] = true ;
            $salida["todos"] = $puntos ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando puntos.";
        }

        return $salida;

    }
    public static function puntosViajesCotizacionesVentas(){

        $miPunto = new Punto();
        $puntos = $miPunto->puntosViajesCotizacionesVentas();

        $salida = array();

        if (count($puntos)>0){
            $salida["success"] = true ;
            $salida["todos"] = $puntos ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando puntos.";
        }

        return $salida;

    }
    public static function puntosViajesCotizacionesNoVentas(){

        $miPunto = new Punto();
        $puntos = $miPunto->puntosViajesCotizacionesNoVentas();

        $salida = array();

        if (count($puntos)>0){
            $salida["success"] = true ;
            $salida["todos"] = $puntos ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando puntos.";
        }

        return $salida;

    }



}

/*
COMENTARIOS GENERALES:
*/