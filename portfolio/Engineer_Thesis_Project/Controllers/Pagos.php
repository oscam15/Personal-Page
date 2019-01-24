<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use APP\Models\Pago;
use APP\Models\Punto;
use \APP\Models\Venta;
use App\Utils\Log;

class Pagos {

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

    public static function agregar( Pago $miPago){

        $miPago->set("idPago","NULL");
        $miPago->set("fechaAlta","CURRENT_TIMESTAMP");

        $ventaValidate = new Venta();
        $ventaValidate->set("idVenta",$miPago->get("idVenta"));
        $ventas = $ventaValidate->buscarClase();

        $salida = array();

        if(count($ventas)==0){
            $salida["success"] = false;
            $salida["error"] = "Venta invalida";
            return $salida;
        }

        if ($miPago->agregar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando pago.";
        }

        return $salida;

    }
    public static function eliminar( Pago $miPago){

        $miPago->set('monto','NO_INCLUDE');
        $miPago->set('fechaAlta','NO_INCLUDE');
        $miPago->set('idVenta','NO_INCLUDE');

        if ($miPago->eliminar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error eliminando pago.";
        }

        return $salida;

    }

    public static function pagosVentaID(Pago $miPago){

        $pagos = $miPago->pagosVentaID();

        $salida = array();
        /*if (count($ventas) > 0){*/

        $salida["success"] = true ;
        $salida["todos"] = $pagos ;

        /*}else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando ventas.";
        }*/

        return $salida;
    }





}

/*
COMENTARIOS GENERALES:
*/