<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use APP\Models\Propietario;
use APP\Models\Unidad;
use APP\Models\Conexion;
use App\Utils\Log;

class Unidades {

    public static function todosArrelo(){

        $miUnidad = new Unidad();
        $unidades = $miUnidad->buscarArreglo();

        $salida = array();
        if (count($unidades) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $unidades ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando unidades.";
        }

        return $salida;
    }
    public static function todosClase(){

        $miUnidad = new Unidad();
        $unidades = $miUnidad->buscarClase();

        $salida = array();
        if (count($unidades) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $unidades ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando unidades.";
        }

        return $salida;
    }

    public static function todosUnidadsPropietariosPuntosArreglo(){

        $miUnidad = new Unidad();
        $unidades = $miUnidad->unidadesPropietarios();

        $salida = array();
        if (count($unidades) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $unidades ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando unidades.";
        }

        return $salida;
    }

    public static function agregar( Unidad $miUnidad){

        $miUnidad->set("idUnidad","NULL");
        $miUnidad->set("fechaAlta","CURRENT_TIMESTAMP");

        $salida = array();

        if($miUnidad->get("idPropietario") == ""){
            $salida["success"] = false;
            $salida["error"] = "Propietario invalido";
            return $salida;
        }

        $propietarioValidate = new Propietario();
        $propietarioValidate->set("idPropietario",$miUnidad->get("idPropietario"));

        $propietarios = $propietarioValidate->buscarClase();

        if(count($propietarios)!=1){
            $salida["success"] = false;
            $salida["error"] = "Propietario invalido";
            return $salida;
        }

        if ($miUnidad->agregar()){

            $salida["success"] = true ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando unidad.";
        }

        return $salida;

    }
    public static function editar( Unidad $miUnidad){

        $miUnidad->set("fechaAlta","NO_INCLUDE");

        $propietarioValidate = new Propietario();
        $propietarioValidate->set("idPropietario",$miUnidad->get("idPropietario"));
        $propietarios = $propietarioValidate->buscarClase();

        $salida = array();

        if(count($propietarios)==0){
            $salida["success"] = false;
            $salida["error"] = "Propietario invalido";
            return $salida;
        }

        if ($miUnidad->editar("idUnidad")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error editando unidad.";
        }

        return $salida;

    }

    public static function unidadesPropietariosArrelo(){

        $miUnidad = new Unidad();
        $unidades = $miUnidad->unidadesPropietarios();

        $salida = array();
        if (count($unidades) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $unidades ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando unidades.";
        }

        return $salida;
    }

}

/*
COMENTARIOS GENERALES:
*/