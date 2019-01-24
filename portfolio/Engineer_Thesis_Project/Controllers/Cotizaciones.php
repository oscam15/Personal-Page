<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use APP\Models\Cliente;
use APP\Models\Cotizacion;
use APP\Models\Viaje;
use APP\Models\Conexion;
use App\Utils\Log;

class Cotizaciones {

    public static function todosArrelo(){

        $miCotizacion = new Cotizacion();
        $cotizaciones = $miCotizacion->buscarArreglo();

        $salida = array();
        if (count($cotizaciones) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $cotizaciones ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando cotizaciones.";
        }

        return $salida;
    }
    public static function todosClase(){

        $miCotizacion = new Cotizacion();
        $cotizaciones = $miCotizacion->buscarClase();

        $salida = array();
        if (count($cotizaciones) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $cotizaciones ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando cotizaciones.";
        }

        return $salida;
    }

    public static function agregar( Cotizacion $miCotizacion){

        $miCotizacion->set("idCotizacion","NULL");
        $miCotizacion->set("fechaAlta","CURRENT_TIMESTAMP");

        $salida = array();

        if($miCotizacion->get("idViaje") == ""){
            $salida["success"] = false;
            $salida["error"] = "Viaje invalido";
            return $salida;
        }

        $viajeValidate = new Viaje();
        $viajeValidate->set("idViaje",$miCotizacion->get("idViaje"));

        $viajes = $viajeValidate->buscarClase();

        if(count($viajes)!=1){
            $salida["success"] = false;
            $salida["error"] = "Viaje invalido";
            return $salida;
        }

        if ($miCotizacion->agregar()){

            $salida["success"] = true ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando cotización.";
        }

        return $salida;

    }

    public static function editar( Cotizacion $miCotizacion){

        $miCotizacion->set("fechaAlta","NO_INCLUDE");

        $viajeValidate = new Viaje();
        $viajeValidate->set("idViaje",$miCotizacion->get("idViaje"));
        $viajes = $viajeValidate->buscarClase();

        $salida = array();

        if(count($viajes)==0){
            $salida["success"] = false;
            $salida["error"] = "Viaje invalido";
            return $salida;
        }

        if ($miCotizacion->editar("idCotizacion")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error editando viaje.";
        }

        return $salida;

    }

    public static function cotizacionesViajes(){

        $miCotización = new Cotizacion();
        $cotizaciones = $miCotización->cotizacionesViajes();

        $salida = array();
        if (count($cotizaciones) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $cotizaciones ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando cotizaciones.";
        }

        return $salida;
    }

    public static function vendidasCotizacionesViajes(){

        $miCotización = new Cotizacion();
        $cotizaciones = $miCotización->vendidasCotizacionesViajes();

        $salida = array();
        if (count($cotizaciones) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $cotizaciones ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando cotizaciones.";
        }

        return $salida;
    }
    public static function noVentaCotizacionesViajes(){

        $miCotización = new Cotizacion();
        $cotizaciones = $miCotización->noVentaCotizacionesViajes();

        $salida = array();
        if (count($cotizaciones) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $cotizaciones ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando cotizaciones.";
        }

        return $salida;
    }

    public static function estadoLugarDiasTipoCotizacionesViajes( Viaje $miViaje, Cotizacion $miCotizacion){

        $cotizaciones = $miCotizacion->estadoLugarDiasTipoCotizacionesViajes($miViaje->get("destinoEstado"), $miViaje->get("destinoLugar"), $miViaje->get("diasNum"));
        $cotizacionesAux = $miCotizacion->estadoLugarDiasTipoCotizacionesViajes2($miViaje->get("destinoEstado"), $miViaje->get("destinoLugar"), $miViaje->get("diasNum"));

        foreach ($cotizacionesAux as $item){
            array_push($cotizaciones,$item);
        }

        $cotizacionesAux = $miCotizacion->estadoLugarDiasTipoCotizacionesViajes3($miViaje->get("destinoEstado"), $miViaje->get("destinoLugar"), $miViaje->get("diasNum"));

        foreach ($cotizacionesAux as $item){
            array_push($cotizaciones,$item);
        }

        $cotizacionesAux = $miCotizacion->estadoLugarDiasTipoCotizacionesViajes4($miViaje->get("destinoEstado"), $miViaje->get("destinoLugar"), $miViaje->get("diasNum"));

        foreach ($cotizacionesAux as $item){
            array_push($cotizaciones,$item);
        }




        /*$salida = array();
        if (count($cotizaciones) > 0){*/

            $salida["success"] = true ;
            $salida["todos"] = $cotizaciones ;
/*
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando cotizaciones.";
        }*/

        return $salida;
    }

    public static function tipoKmTCombustibleTCostosCotizacionesViajes( Viaje $miViaje, Cotizacion $miCotizacion , $costosTotal){

        $cotizaciones = $miCotizacion->tipoKmTCombustibleTCostosCotizacionesViajes($miViaje->get("kilometros"), $costosTotal);




        /*$salida = array();
        if (count($cotizaciones) > 0){*/

            $salida["success"] = true ;
            $salida["todos"] = $cotizaciones ;
/*
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando cotizaciones.";
        }*/

        return $salida;
    }

}

/*
COMENTARIOS GENERALES:
*/