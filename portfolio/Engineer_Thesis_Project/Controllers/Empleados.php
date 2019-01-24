<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";    //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";        //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                        //Arranca Autoload

use \APP\Models\Empleado;
use App\Utils\Log;

class Empleados {
    public static function login( Empleado $miEmpleado, $password){


        $empleados = $miEmpleado->buscarClase();


        $salida = array();
        if (count($empleados) === 1){
            $miEmpleado = $empleados[0];

            //$miEmpleado->set( "password", password_hash($password,PASSWORD_DEFAULT));      //asi se hashea el password
            if (password_verify($password,$miEmpleado->get("password"))){                         //El password coincide

                if ($miEmpleado->get("estadoSistema")){                                                        //Revisar estado
                    $salida["success"] = true ;

                    session_start();                                                //Se asigna la sesion en el servidor
                    $_SESSION["idEmpleado"] = $miEmpleado->get("idEmpleado");
                    $_SESSION["timelast"] = time();

                }else{
                    $salida["success"] = false;
                    $salida["error"] = "Empleado desactivado.";
                }

            }else{
                $salida["success"] = false;
                $salida["error"] = "Contraseña incorrecta.";
            }

        }else{
            $salida["success"] = false;
            $salida["error"] = "Nombre de usuario no existe.";
        }

        return $salida;

    }

    public static function todosArrelo(){

        $miEmpleado = new Empleado();
        $empleados = $miEmpleado->buscarArreglo();

        $salida = array();
        if (count($empleados) > 0){

            $salida["success"] = true ;
            $salida["todos"] = $empleados ;

        }else{
            $salida["success"] = false;
            $salida["error"] = "Error cargando empleados.";
        }

        return $salida;
    }

    public static function agregar( Empleado $miEmpleado){

        $miEmpleado->set("idEmpleado","NULL");
        $miEmpleado->set("fechaAlta","CURRENT_TIMESTAMP");

        if ($miEmpleado->get("fechaDeNacimiento")==""){
            $miEmpleado->set("fechaDeNacimiento","NULL");
        }

        $empleadoValidate = new Empleado();
        $empleadoValidate->set("userName",$miEmpleado->get("userName"));
        $empleados = $empleadoValidate->buscarClase();

        $salida = array();

        if(count($empleados)!=0){
            $salida["success"] = false;
            $salida["error"] = "Nombre de usuario invalido";
            return $salida;
        }

        if ($miEmpleado->agregar()){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error agregando empleado.";
        }

        return $salida;

    }

    public static function editar( Empleado $miEmpleado){

        $miEmpleado->set("fechaAlta","NO_INCLUDE");
        $miEmpleado->set("password","NO_INCLUDE");
        $miEmpleado->set("modulos","NO_INCLUDE");

        if ($miEmpleado->get("fechaDeNacimiento")==""){
            $miEmpleado->set("fechaDeNacimiento","NULL");
        }


        $empleadoValidate = new Empleado();
        $empleadoValidate->set("userName",$miEmpleado->get("userName"));
        $empleados = $empleadoValidate->buscarClase();

        $salida = array();


        if(count($empleados)!=0 && $empleados[0]->get("idEmpleado") != $miEmpleado->get("idEmpleado")){
            $salida["success"] = false;
            $salida["error"] = "Nombre de usuario invalido";
            return $salida;
        }

        if ($miEmpleado->editar("idEmpleado")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error editando empleado.";
        }

        return $salida;

    }

    public static function editarContraseña( Empleado $miEmpleado){

        $miEmpleado->set("nombre","NO_INCLUDE");
        $miEmpleado->set("apPaterno","NO_INCLUDE");
        $miEmpleado->set("apMaterno","NO_INCLUDE");
        $miEmpleado->set("fechaDeNacimiento","NO_INCLUDE");
        $miEmpleado->set("estadoDomicilio","NO_INCLUDE");
        $miEmpleado->set("delegacionMunicipioDomicilio","NO_INCLUDE");
        $miEmpleado->set("codigoPostalDomicilio","NO_INCLUDE");
        $miEmpleado->set("coloniaDomicilio","NO_INCLUDE");
        $miEmpleado->set("calleNumeroDomicilio","NO_INCLUDE");
        $miEmpleado->set("email","NO_INCLUDE");
        $miEmpleado->set("telefonoLocal","NO_INCLUDE");
        $miEmpleado->set("telefonoMovil","NO_INCLUDE");
        $miEmpleado->set("curp","NO_INCLUDE");
        $miEmpleado->set("fechaAlta","NO_INCLUDE");
        $miEmpleado->set("estadoSistema","NO_INCLUDE");
        $miEmpleado->set("userName","NO_INCLUDE");
        $miEmpleado->set("modulos","NO_INCLUDE");

        $miEmpleado->set("password",password_hash($miEmpleado->get("password"), PASSWORD_DEFAULT));

        $salida = array();

        if ($miEmpleado->editar("idEmpleado")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error modificando contraseña.";
        }

        return $salida;

    }
    public static function editarModulos( Empleado $miEmpleado){

        $miEmpleado->set("nombre","NO_INCLUDE");
        $miEmpleado->set("apPaterno","NO_INCLUDE");
        $miEmpleado->set("apMaterno","NO_INCLUDE");
        $miEmpleado->set("fechaDeNacimiento","NO_INCLUDE");
        $miEmpleado->set("estadoDomicilio","NO_INCLUDE");
        $miEmpleado->set("delegacionMunicipioDomicilio","NO_INCLUDE");
        $miEmpleado->set("codigoPostalDomicilio","NO_INCLUDE");
        $miEmpleado->set("coloniaDomicilio","NO_INCLUDE");
        $miEmpleado->set("calleNumeroDomicilio","NO_INCLUDE");
        $miEmpleado->set("email","NO_INCLUDE");
        $miEmpleado->set("telefonoLocal","NO_INCLUDE");
        $miEmpleado->set("telefonoMovil","NO_INCLUDE");
        $miEmpleado->set("curp","NO_INCLUDE");
        $miEmpleado->set("fechaAlta","NO_INCLUDE");
        $miEmpleado->set("estadoSistema","NO_INCLUDE");
        $miEmpleado->set("userName","NO_INCLUDE");
        $miEmpleado->set("password","NO_INCLUDE");

        $salida = array();

        if ($miEmpleado->editar("idEmpleado")){
            $salida["success"] = true ;
        }else{
            $salida["success"] = false;
            $salida["error"] = "Error modificando módulos.";
        }

        return $salida;

    }
}

/*
COMENTARIOS GENERALES:
*/