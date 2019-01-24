<?php namespace APP\Controllers;

require_once __DIR__."/../Config/Constantes.php";                     //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";                              //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();                                                                                 //Arranca Autoload

                                                                                                         //Declaraciones
use APP\Models\Registro;
use APP\Models\Venta;
use APP\Models\Pago;
use APP\Models\Unidad;
use APP\Models\Propietario;
use APP\Models\Chofer;
use APP\Models\Cotizacion;
use APP\Models\Punto;
use APP\Models\Viaje;
use APP\Models\Cliente;
use APP\Models\CodigoPostal;
use APP\Models\Empleado;
use App\Utils\Log;

$_GET   = filter_input_array(INPUT_GET, FILTER_SANITIZE_STRING);                                        //Limpia entrada
$_POST  = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);

session_start();

/*file_put_contents('php://stderr', print_r($_POST, TRUE));
file_put_contents('php://stderr', print_r($_GET, TRUE));*/

$miModelo = new Registro();
$miModelo->set("idEmpleado", $_SESSION['idEmpleado']);
$miModelo->set("descripcion", substr(print_r($_POST, TRUE),7,-2));
Registros::agregar($miModelo);

$action = $_POST["action"];
if($action == ""){
    $action = $_GET["action"];

}
unset($_POST["action"]);

if ($action == "codigosPostales_de_Estado_y_DelegacionMunicipio"){
$miModelo = new CodigoPostal();
$miModelo->set("estado", $_POST["estado"]);
$miModelo->set("municipio", $_POST["municipio"]);
echo json_encode(CodigosPostales::buscarRetornaSoloCodigosPostales($miModelo));
}

elseif ($action == "empleadoLogin"){

    $miModelo = new Empleado();
    $miModelo->set( "userName", $_POST["userName"]);
    echo json_encode(Empleados::login($miModelo, $_POST["password"]));

}
elseif ($action == "empleadosTodos"){
    echo json_encode(Empleados::todosArrelo());
}
elseif ($action == "empleadoAgregar"){

    $miModelo = new Empleado();

    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

    echo json_encode(Empleados::agregar($miModelo));

}
elseif ($action == "empleadoEditar"){

    $miModelo = new Empleado();

    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

    echo json_encode(Empleados::editar($miModelo));

}
elseif ($action == "empleadoContraseña"){

    $miModelo = new Empleado();
    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

    echo json_encode(Empleados::editarContraseña($miModelo));

}
elseif ($action == "empleadoModulos"){

    $miModelo = new Empleado();
    $miModelo->set('idEmpleado', $_POST['idEmpleado']);

    $modulos=$_POST['empleados'];
    $modulos.=$_POST['contraseñas'];
    $modulos.=$_POST['clientes'];
    $modulos.=$_POST['viajes'];
    $modulos.=$_POST['cotizaciones'];
    $modulos.=$_POST['ventas'];
    $modulos.=$_POST['unidades'];
    $modulos.=$_POST['choferes'];
    $modulos.=$_POST['propietarios'];
    $modulos.=$_POST['registros'];
    $modulos.=$_POST['configuracion'];

    $miModelo->set('modulos', $modulos);

    echo json_encode(Empleados::editarModulos($miModelo));

}

elseif ($action == "clientesTodos"){
    echo json_encode(Clientes::todosArrelo());
}
elseif ($action == "clienteAgregar"){

    $miModelo = new Cliente();

    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

    echo json_encode(Clientes::agregar($miModelo));

}
elseif ($action == "clienteEditar"){

    $miModelo = new Cliente();

    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

    echo json_encode(Clientes::editar($miModelo));

}

elseif ($action == "todosViajesClientesPuntos"){

    $salida = Viajes::viajesClientesArrelo();

    if ($salida["success"]){
        $viajes = array();
        foreach ($salida["todos"] as $viaje){
            $viaje["puntos"] = array();
            $viajes[$viaje["idViaje"]] = $viaje;
        }

        $salida = Puntos::todosArrelo();
        if ($salida["success"]){
            foreach ($salida["todos"] as $punto){
                array_push($viajes[$punto["idViaje"]]["puntos"],$punto);
            }
            $salida["todos"] = array();
            foreach ($viajes as $viaje){
                array_push($salida["todos"],$viaje);
            }
        }

    }

    echo json_encode($salida);
}
elseif ($action == "sinCotizarViajesClientesPuntos"){

    $salida = Viajes::sinCotizarViajesClientesArrelo();

    if ($salida["success"]){
        $viajes = array();
        foreach ($salida["todos"] as $viaje){
            $viaje["puntos"] = array();
            $viajes[$viaje["idViaje"]] = $viaje;
        }

        /*$salida = Puntos::todosArrelo();
        if ($salida["success"]){
            foreach ($salida["todos"] as $punto){
                array_push($viajes[$punto["idViaje"]]["puntos"],$punto);
            }
            $salida["todos"] = array();
            foreach ($viajes as $viaje){
                array_push($salida["todos"],$viaje);
            }
        }*/

    }

    echo json_encode($salida);
}
elseif ($action == "viajeAgregar"){

    $miViaje = new Viaje();
    $miPunto = new Punto();

    $miViaje->set("idViaje",$_POST["idViaje"]);
    $miViaje->set("destinoEstado",$_POST["destinoEstado"]);
    $miViaje->set("destinoLugar",$_POST["destinoLugar"]);
    $miViaje->set("salidaFechaHora",$_POST["salidaFechaHora"]);
    $miViaje->set("regresoFechaHora",$_POST["regresoFechaHora"]);
    $miViaje->set("diasNum",$_POST["diasNum"]);
    $miViaje->set("kilometros",$_POST["kilometros"]);
    $miViaje->set("temporada",$_POST["temporada"]);
    $miViaje->set("idCliente",$_POST["idCliente"]);
    $salida = Viajes::agregar($miViaje);

    if ($salida["success"] && isset($_POST["puntos"])){

        $miPunto->set("idViaje",$salida["lastId"]);
        foreach ($_POST["puntos"] as $key => $value) {
            $miPunto->set("fecha",$value["fecha"]);
            $miPunto->set("hora",$value["hora"]);
            $miPunto->set("estadoDireccion",$value["estadoDireccion"]);
            $miPunto->set("delegacionMunicipioDireccion",$value["delegacionMunicipioDireccion"]);
            $miPunto->set("codigoPostalDireccion",$value["codigoPostalDireccion"]);
            $miPunto->set("coloniaDireccion",$value["coloniaDireccion"]);
            $miPunto->set("calleNumeroDireccion",$value["calleNumeroDireccion"]);
            $miPunto->set("descripcionDireccion",$value["descripcionDireccion"]);
            $salida = Puntos::agregar($miPunto);
            if (!$salida["success"]){
                echo json_encode($salida);
            }
        }
        echo json_encode($salida);

    }else{
        echo json_encode($salida);
    }



}
elseif ($action == "viajeEditar"){

    $miViaje = new Viaje();
    $miPunto = new Punto();

    $miViaje->set("idViaje",$_POST["idViaje"]);
    $miViaje->set("destinoEstado",$_POST["destinoEstado"]);
    $miViaje->set("destinoLugar",$_POST["destinoLugar"]);
    $miViaje->set("salidaFechaHora",$_POST["salidaFechaHora"]);
    $miViaje->set("regresoFechaHora",$_POST["regresoFechaHora"]);
    $miViaje->set("diasNum",$_POST["diasNum"]);
    $miViaje->set("kilometros",$_POST["kilometros"]);
    $miViaje->set("temporada",$_POST["temporada"]);
    $miViaje->set("idCliente",$_POST["idCliente"]);

    $salida = Viajes::editar($miViaje);

    if ($salida["success"]){

        $miPunto->set("idViaje",$miViaje->get("idViaje"));

        $salida = Puntos::eliminarPorID($miPunto);

        if(!$salida["success"]){
            echo json_encode($salida);
        }



        if(isset($_POST["puntos"])){
            foreach ($_POST["puntos"] as $key => $value) {
            $miPunto->set("fecha",$value["fecha"]);
            $miPunto->set("hora",$value["hora"]);
            $miPunto->set("estadoDireccion",$value["estadoDireccion"]);
            $miPunto->set("delegacionMunicipioDireccion",$value["delegacionMunicipioDireccion"]);
            $miPunto->set("codigoPostalDireccion",$value["codigoPostalDireccion"]);
            $miPunto->set("coloniaDireccion",$value["coloniaDireccion"]);
            $miPunto->set("calleNumeroDireccion",$value["calleNumeroDireccion"]);
            $miPunto->set("descripcionDireccion",$value["descripcionDireccion"]);
            $salida = Puntos::agregar($miPunto);
            if (!$salida["success"]){
                echo json_encode($salida);
                }
            }

        }

        echo json_encode($salida);


    }else{
        echo json_encode($salida);
    }

}

elseif ($action == "todosCotizacionesViajes"){

    $salida = Cotizaciones::cotizacionesViajes();

    if ($salida["success"]){
        $viajes = array();
        foreach ($salida["todos"] as $viaje){
            $viaje["puntos"] = array();
            $viajes[$viaje["idCotizacion"]] = $viaje;
        }

        $salida2 = Puntos::puntosViajesCotizaciones();

        if ($salida2["success"]){
            foreach ($salida2["todos"] as $punto){
                array_push($viajes[$punto["idCotizacion"]]["puntos"],$punto);
            }
            $salida["todos"] = array();
            foreach ($viajes as $viaje){
                array_push($salida["todos"],$viaje);
            }
        }

    }

    echo json_encode($salida);
}
elseif ($action == "vendidasCotizacionesViajes"){

    $salida = Cotizaciones::vendidasCotizacionesViajes();

    if ($salida["success"]){
        $viajes = array();
        foreach ($salida["todos"] as $viaje){
            $viaje["puntos"] = array();
            $viajes[$viaje["idCotizacion"]] = $viaje;
        }

        $salida2 = Puntos::puntosViajesCotizacionesVentas();

        if ($salida2["success"]){
            foreach ($salida2["todos"] as $punto){
                array_push($viajes[$punto["idCotizacion"]]["puntos"],$punto);
            }
            $salida["todos"] = array();
            foreach ($viajes as $viaje){
                array_push($salida["todos"],$viaje);
            }
        }

    }

    echo json_encode($salida);
}
elseif ($action == "noVentaCotizacionesViajes"){

    $salida = Cotizaciones::noVentaCotizacionesViajes();

    if ($salida["success"]){
        $viajes = array();
        foreach ($salida["todos"] as $viaje){
            $viaje["puntos"] = array();
            $viajes[$viaje["idCotizacion"]] = $viaje;
        }

        $salida2 = Puntos::puntosViajesCotizacionesNoVentas();

        if ($salida2["success"]){
            foreach ($salida2["todos"] as $punto){
                array_push($viajes[$punto["idCotizacion"]]["puntos"],$punto);
            }
            $salida["todos"] = array();
            foreach ($viajes as $viaje){
                array_push($salida["todos"],$viaje);
            }
        }

    }

    echo json_encode($salida);
}
elseif ($action == "estadoLugarDiasTipoCotizacionesViajes"){

    $miViaje = new Viaje();

    $miViaje->set("destinoEstado",$_POST["destinoEstado"]);
    $miViaje->set("destinoLugar",$_POST["destinoLugar"]);
    $miViaje->set("diasNum",$_POST["diasNum"]);

    $miCotizacion = new Cotizacion();

    $miCotizacion->set("tipoUnidad",$_POST["tipoUnidad"]);

    $salida = Cotizaciones::estadoLugarDiasTipoCotizacionesViajes( $miViaje, $miCotizacion);

    echo json_encode($salida);
}
elseif ($action == "tipoKmTCombustibleTCostosCotizacionesViajes"){

    $miViaje = new Viaje();

    $miViaje->set("kilometros",$_POST["kilometros"]);

    $miCotizacion = new Cotizacion();

    $miCotizacion->set("tipoUnidad",$_POST["tipoUnidad"]);
    $miCotizacion->set("costoCombustible",$_POST["costoCombustible"]);

    $salida = Cotizaciones::tipoKmTCombustibleTCostosCotizacionesViajes( $miViaje, $miCotizacion, $_POST["costosTotal"]);

    echo json_encode($salida);
}
elseif ($action == "cotizacionAgregar"){

    $miCotizacion = new Cotizacion();

    $miCotizacion->set("idCotizacion",$_POST["idCotizacion"]);
    $miCotizacion->set("tipoUnidad",$_POST["tipoUnidad"]);
    $miCotizacion->set("precioCombustible",$_POST["precioCombustible"]);
    $miCotizacion->set("costoCombustible",$_POST["costoCombustible"]);
    $miCotizacion->set("peaje",$_POST["peaje"]);
    $miCotizacion->set("sueldoChofer",$_POST["sueldoChofer"]);
    $miCotizacion->set("hospedajeChofer",$_POST["hospedajeChofer"]);
    $miCotizacion->set("extras",$_POST["extras"]);
    $miCotizacion->set("cotizacion",$_POST["cotizacion"]);
    $miCotizacion->set("idViaje",$_POST["idViaje"]);

    $salida = Cotizaciones::agregar($miCotizacion);


    echo json_encode($salida);

}
elseif ($action == "cotizacionEditar"){

    $miModelo = new Cotizacion();

    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

     echo json_encode(Cotizaciones::editar($miModelo));

}

elseif ($action == "choferesTodos"){
    echo json_encode(Choferes::todosArrelo());
}
elseif ($action == "choferAgregar"){

    $miModelo = new Chofer();

    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

    echo json_encode(Choferes::agregar($miModelo));

}
elseif ($action == "choferEditar"){

    $miModelo = new Chofer();

    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

    echo json_encode(Choferes::editar($miModelo));

}

elseif ($action == "propietariosTodos"){
    echo json_encode(Propietarios::todosArrelo());
}
elseif ($action == "propietarioAgregar"){

    $miModelo = new Propietario();

    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

    echo json_encode(Propietarios::agregar($miModelo));

}
elseif ($action == "propietarioEditar"){

    $miModelo = new Propietario();

    foreach ($_POST as $key => $value) {
        $miModelo->set($key, $value);
    }

    echo json_encode(Propietarios::editar($miModelo));

}

elseif ($action == "todosUnidadesPropietarios"){

    $salida = Unidades::unidadesPropietariosArrelo();

    echo json_encode($salida);
}
elseif ($action == "unidadAgregar"){

    $miUnidad = new Unidad();

    $miUnidad->set("idUnidad",$_POST["idUnidad"]);
    $miUnidad->set("marca",$_POST["marca"]);
    $miUnidad->set("modelo",$_POST["modelo"]);
    $miUnidad->set("ano",$_POST["ano"]);
    $miUnidad->set("personas",$_POST["personas"]);
    $miUnidad->set("idPropietario",$_POST["idPropietario"]);
    $salida = Unidades::agregar($miUnidad);

    echo json_encode($salida);



}
elseif ($action == "unidadEditar"){

    $miUnidad = new Unidad();

    $miUnidad->set("idUnidad",$_POST["idUnidad"]);
    $miUnidad->set("marca",$_POST["marca"]);
    $miUnidad->set("modelo",$_POST["modelo"]);
    $miUnidad->set("ano",$_POST["ano"]);
    $miUnidad->set("personas",$_POST["personas"]);
    $miUnidad->set("idPropietario",$_POST["idPropietario"]);

    $salida = Unidades::editar($miUnidad);


    echo json_encode($salida);


}

elseif ($action == "todosVentasViajesClientesCotizacionesPagos"){

    $salida = Ventas::ventasViajesClientesCotizaciones();

    if ($salida["success"]){
        $ventas = array();
        foreach ($salida["todos"] as $venta){
            $venta["puntos"] = array();
            $venta["pagos"] = array();
            $ventas[$venta["idVenta"]] = $venta;
        }

        $salida = Ventas::ventasViajesPuntos();;
        if ($salida["success"]){
            foreach ($salida["todos"] as $punto){
                array_push($ventas[$punto["idVenta"]]["puntos"],$punto);
            }
            $salida["todos"] = array();
            foreach ($ventas as $venta){
                array_push($salida["todos"],$venta);
            }
        }

        $salida = Ventas::ventasPagos();;
        if ($salida["success"]){
            foreach ($salida["todos"] as $pago){
                array_push($ventas[$pago["idVenta"]]["pagos"],$pago);
            }
            $salida["todos"] = array();
            foreach ($ventas as $venta){
                array_push($salida["todos"],$venta);
            }
        }

    }

    echo json_encode($salida);
}
elseif ($action == "pendientesVentasViajesClientesCotizacionesPagos"){

    $salida = Ventas::pendientesVentasViajesClientesCotizacionesPagos();

    if ($salida["success"]){
        $ventas = array();
        foreach ($salida["todos"] as $venta){
            $venta["puntos"] = array();
            $venta["pagos"] = array();
            $ventas[$venta["idVenta"]] = $venta;
        }

        $salida = Ventas::ventasViajesPuntos();
        if ($salida["success"]){
            foreach ($salida["todos"] as $punto){
                array_push($ventas[$punto["idVenta"]]["puntos"],$punto);
            }
            $salida["todos"] = array();
            foreach ($ventas as $venta){
                array_push($salida["todos"],$venta);
            }
        }


        $salida = Ventas::ventasPagos();


        if ($salida["success"]){
            foreach ($salida["todos"] as $pago){


                if(isset($ventas[$pago["idVenta"]])){
                    array_push($ventas[$pago["idVenta"]]["pagos"],$pago);
                }


            }
            $salida["todos"] = array();
            foreach ($ventas as $venta){
                array_push($salida["todos"],$venta);
            }
        }

    }



    echo json_encode($salida);
}
elseif ($action == "ventaAgregar"){

    $miVenta = new Venta();
    $miPago = new Pago();

    $miVenta->set("idVenta",$_POST["idVenta"]);
    $miVenta->set("idCotizacion",$_POST["idCotizacion"]);
    $miVenta->set("idUnidad",$_POST["idUnidad"]);
    $miVenta->set("idChofer",$_POST["idChofer"]);
    $salida = Ventas::agregar($miVenta);

    if ($salida["success"] && isset($_POST["pagos"])){

        $miPago->set("idVenta",$salida["lastId"]);
        foreach ($_POST["pagos"] as $key => $value) {
            $miPago->set("monto",$value["monto"]);
            $salida = Pagos::agregar($miPago);
            if (!$salida["success"]){
                echo json_encode($salida);
            }
        }
        echo json_encode($salida);

    }else{
        echo json_encode($salida);
    }



}
elseif ($action == "ventaEditar"){

    $miVenta = new Venta();
    $miPago = new Pago();

    $miVenta->set("idVenta",$_POST["idVenta"]);
    $miVenta->set("idCotizacion",$_POST["idCotizacion"]);
    $miVenta->set("idUnidad",$_POST["idUnidad"]);
    $miVenta->set("idChofer",$_POST["idChofer"]);

    $salida = Ventas::editar($miVenta);

    if ($salida["success"]){

        $miPago->set("idVenta",$miVenta->get("idVenta"));

        $salida = Pagos::pagosVentaID($miPago);

        if(!$salida["success"]){
            echo json_encode($salida);
        }



        $oldPagos = array();
        foreach ($salida["todos"] as $pago){
            $oldPagos[$pago["idPago"]]=$pago;
        }


        if(isset($_POST["pagos"])){
            $miPago->set("idVenta",$_POST["idVenta"]);
            foreach ($_POST["pagos"] as $key => $value) {

                if($value["idPago"]==""){
                    $miPago->set("monto",$value["monto"]);
                    $salida = Pagos::agregar($miPago);
                    if (!$salida["success"]){
                        echo json_encode($salida);
                    }
                }else{

                    unset($oldPagos[$value["idPago"]]);

                }
            }

        }

        foreach ($oldPagos as $pago){
            $miPago->set('idPago',$pago['idPago']);
            $salida = Pagos::eliminar($miPago);
            if (!$salida["success"]){
                echo json_encode($salida);
            }
        }


        echo json_encode($salida);


    }else{
        echo json_encode($salida);
    }

}

elseif ($action == "registrosTodos"){
    echo json_encode(Registros::todosArrelo());
}



else{

    $salida["success"] = false;
    $salida["error"] = "Controlador desconocido.";

    echo json_encode($salida);
}

/*
COMENTARIOS GENERALES:

    Este controlador se encarga de tomar el post, MAPEAR EL POST CON LOS OBJETOS, llamar al controlador especifico y
    formatear respuesta
*/