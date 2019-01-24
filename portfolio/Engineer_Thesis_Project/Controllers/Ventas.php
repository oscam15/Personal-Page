<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use APP\Models\Cliente;
use APP\Models\Cotizacion;
use APP\Models\Venta;
use APP\Models\Conexion;
use App\Utils\Log;

class Ventas {

    public static function todosArrelo(){

        $miVenta = new Venta();
        $ventas = $miVenta->buscarArreglo();

        $salida = array();
        if (count($ventas) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $ventas ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando ventas.";
        }

        return $salida;
    }
    public static function todosClase(){

        $miVenta = new Venta();
        $ventas = $miVenta->buscarClase();

        $salida = array();
        if (count($ventas) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $ventas ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando ventas.";
        }

        return $salida;
    }

    public static function ventasViajesClientesCotizaciones(){

        $miVenta = new Venta();
        $ventas = $miVenta->ventasViajesClientesCotizaciones();

        $salida = array();
        if (count($ventas) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $ventas ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando ventas.";
        }

        return $salida;
    }
    public static function pendientesVentasViajesClientesCotizacionesPagos(){

        $miVenta = new Venta();
        $ventas = $miVenta->pendientesVentasViajesClientesCotizacionesPagos();

        /*$salida = array();
        if (count($ventas) > 0){*/

            $salida["success"] = true ;
            $salida["todos"] = $ventas ;

        /*}else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando ventas.";
        }*/

        return $salida;
    }
    public static function ventasViajesPuntos(){

        $miVenta = new Venta();
        $ventas = $miVenta->ventasViajesPuntos();

        $salida = array();
        /*if (count($ventas) > 0){*/

            $salida["success"] = true ;
            $salida["todos"] = $ventas ;

        /*}else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando ventas.";
        }*/

        return $salida;
    }
    public static function ventasPagos(){

        $miVenta = new Venta();
        $ventas = $miVenta->ventasPagos();

        $salida = array();
        /*if (count($ventas) > 0){*/

            $salida["success"] = true ;
            $salida["todos"] = $ventas ;

        /*}else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando ventas.";
        }*/

        return $salida;
    }

    public static function agregar( Venta $miVenta){

        $miVenta->set("idVenta","NULL");
        $miVenta->set("fechaAlta","CURRENT_TIMESTAMP");

        $salida = array();

        if($miVenta->get("idCotizacion") == ""){
            $salida["success"] = false;
            $salida["error"] = "Cotización invalida";
            return $salida;
        }

        $cotizacionValidate = new Cotizacion();
        $cotizacionValidate->set("idCotizacion",$miVenta->get("idCotizacion"));

        $cotizaciones = $cotizacionValidate->buscarClase();

        if(count($cotizaciones)!=1){
            $salida["success"] = false;
            $salida["error"] = "Cotización invalida";
            return $salida;
        }

        if ($miVenta->agregar()){

            $salida["success"] = true ;
            $salida["lastId"] = Conexion::getConnection()->lastInsertId();

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando cotización.";
        }

        return $salida;

    }
    public static function editar( Venta $miVenta){

        $miVenta->set("fechaAlta","NO_INCLUDE");

        if($miVenta->get("idCotizacion") == ""){
            $salida["success"] = false;
            $salida["error"] = "Cotización invalida";
            return $salida;
        }

        $cotizacionValidate = new Cotizacion();
        $cotizacionValidate->set("idCotizacion",$miVenta->get("idCotizacion"));
        $cotizaciones = $cotizacionValidate->buscarClase();

        $salida = array();

        if(count($cotizaciones)!=1){
            $salida["success"] = false;
            $salida["error"] = "Cotización invalida";
            return $salida;
        }

        if ($miVenta->editar("idVenta")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error editando venta.";
        }

        return $salida;

    }









}

/*
COMENTARIOS GENERALES:
*/