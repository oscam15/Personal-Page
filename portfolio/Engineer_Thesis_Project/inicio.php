<?php

    require_once __DIR__."/Config/Constantes.php";                    //Inclusión de las constantes y funciones globales
    require_once __DIR__."/Autoload.php";                             //Inclusión de archivo para Autoload de las clases
    \APP\Autoload::run();                                             //Arranca Autoload

    \APP\Utils\Sesion::checkOnInicio();

    use APP\Models\Empleado;

    $miEmpleado = new Empleado();                                                                    /*Cargar empleado*/
    $miEmpleado->set("idEmpleado",$_SESSION["idEmpleado"]);
    $empleados = $miEmpleado->buscarClase();
    $miEmpleado = $empleados[0];
?>

<!DOCTYPE html>
<html>
<head>																							            <!-- head-->
    <meta charset="UTF-8">
    <meta name="description" content="descripcion">
    <meta name="keywords" content="keywords">
    <meta name="author" content="Oscar Camacho Urriolagoitia">
    <title><?php echo APPNAME ?> - Inicio </title>

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          media="all">
    <link rel="stylesheet"
          href="./Views/Style/font-awesome-4.7.0/css/font-awesome.min.css"
          media="all">
    <link rel="stylesheet"
          href="https://cdn.datatables.net/v/dt/dt-1.10.13/b-1.2.4/se-1.2.0/datatables.min.css"
          media="all"/>



    <link rel="stylesheet" href="./Views/Style/main.css" media="all">	                        <!--Mi hoja de estilo-->



    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
            crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.13/b-1.2.4/se-1.2.0/datatables.min.js"></script>
    <script src="./Views/Js/jquery-dateFormat.js"></script>

</head>																						            <!-- head-->

<body class="background-morado color-blanco paddingBotom50">

    <nav id="headerDiv" class="navbar-inverse navbar-fixed-top hiden">			                     <!--Contendor Header-->
        <div class="container-fluid">
            <ul class="nav navbar-nav">                                                    <!--Parte izquierda header-->
                <li class="active">
                    <a class="irAInicio fa-lg" href="#">
                        <span class="glyphicon glyphicon-home"></span> Inicio
                    </a>
                </li>
            </ul>                                                <!--Parte izquierda header-->
            <ul class="nav navbar-nav navbar-right">                                         <!--Parte derecha header-->
                <li class="dropdown">
                    <a class="dropdown-toggle fa-lg" data-toggle="dropdown" href="#">
                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                        <?=$miEmpleado->get("nombre")." ".$miEmpleado->get("apPaterno")?>
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu darkerBgOnHoverDropdown-menu">
                        <li>
                            <a href="https://www.google.com.mx/maps/" target="_blank">Google Maps</a>
                        </li>
                        <li>
                            <a href="http://app.sct.gob.mx/sibuac_internet/ControllerUI?action=cmdEscogeRuta" target="_blank">Mappir</a>
                        </li>
                        <li>
                            <a href="#" class="cerrarSesion">Cerrar sesión</a>
                        </li>
                    </ul>
                </li>
            </ul>                                      <!--Parte derecha header-->
        </div>
    </nav>    		            <!--Contenedor Header-->


    <div id="divMain" class="container"> 								              <!--Contenedor Main-->

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[0]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                               <!--Modulo Empleados-->

            <div class="acceso-icon empleadosIcon" nombre="Empleados">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Empleados
            </div>

        </div>                                            <!--Acceso Empleados-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[1]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                               <!--Acceso Contraseñas-->

            <div class="acceso-icon contraseñasIcon" nombre="Contraseñas">
                <i class="fa fa-key fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Contraseñas
            </div>

        </div>                                             <!--Acceso Contraseñas-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[2]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                               <!--Acceso Clientes-->

            <div class="acceso-icon clientesIcon" nombre="Clientes">
                <i class="fa fa-handshake-o fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Clientes
            </div>

        </div>                                             <!--Acceso Clientes-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[3]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                                  <!--Acceso Viajes-->

            <div class="acceso-icon viajesIcon" nombre="Viajes">
                <i class="fa fa-suitcase fa-3x" aria-hidden="true"></i>                </div>
            <div class="acceso-nombre">
                Viajes
            </div>

        </div>                                               <!--Acceso Viajes-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[4]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                            <!--Acceso Cotizaciones-->

            <div class="acceso-icon cotizacionesIcon" nombre="Cotizaciones">
                <i class="fa fa-map-signs fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Cotizaciones
            </div>

        </div>                                         <!--Acceso Cotizaciones-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[5]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                                  <!--Acceso Ventas-->

            <div class="acceso-icon ventasIcon" nombre="Ventas">
                <i class="fa fa-money fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Ventas
            </div>

        </div>                                               <!--Acceso Ventas-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[6]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                                <!--Acceso Unidades-->

            <div class="acceso-icon unidadesIcon" nombre="Unidades">
                <i class="fa fa-bus fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Unidades
            </div>

        </div>                                             <!--Acceso Unidades-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[7]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                                <!--Acceso Choferes-->

            <div class="acceso-icon choferesIcon" nombre="Choferes">
                <i class="fa fa-tachometer fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Choferes
            </div>

        </div>                                             <!--Acceso Choferes-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[8]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                            <!--Acceso Propietarios-->

            <div class="acceso-icon propietariosIcon" nombre="Propietarios">
                <i class="fa fa-star fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Propietarios
            </div>

        </div>                                         <!--Acceso Propietarios-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[9]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                               <!--Acceso Registros-->

            <div class="acceso-icon registrosIcon" nombre="Registros">
                <i class="fa fa-hdd-o fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Registros
            </div>

        </div>                                            <!--Acceso Registros-->
        <?php endif; ?>

        <?php if($miEmpleado->get('modulos')!=""&&$miEmpleado->get('modulos')[10]==1) : ?>
        <div class="col-xs-6 col-sm-2 acceso">                                               <!--Acceso Configuracion-->


            <div class="acceso-icon configuracionIcon" nombre="Configuracion">
                <i class="fa fa-cogs fa-3x" aria-hidden="true"></i>
            </div>
            <div class="acceso-nombre">
                Configuración
            </div>

        </div>                                            <!--Acceso Configuracion-->
        <?php endif; ?>


    </div>                                                       <!--Contenedor Main-->





    <div id="divEmpleados" class="container"> 				                         <!--Contenedor Empleados-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                            <!--Modulo Empleados-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon empleadosIcon">
                    <i class="fa fa-users fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Empleados</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button type="button" class="btn-agregar btn btn-default btn-md ">Agregar Nuevo</button>
                    <button id="empleadoEditar" type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Editar</button>
                </div>


                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Formulario Empleado:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal mainFormDiv" autocomplete="off">

                                    <div class="form-group-sm collapse">
                                        <label class="control-label col-sm-3">ID:</label>
                                        <div class="col-sm-7">
                                            <input type="text"
                                                   class="form-control idEmpleado"
                                                   placeholder="XX"
                                                   maxlength="35"
                                                   title="Id, no modificable por el usuario."
                                            >
                                        </div>
                                    </div>                                        <!--idEmpelado-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">*Nombre:</label>
                                        <div class="col-sm-7">
                                            <input type="text"
                                                   class="form-control nombre"
                                                   placeholder="Xxxxx"
                                                   maxlength="35"
                                                   pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                                   title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                                   autofocus
                                                   required
                                            >
                                        </div>
                                    </div>                                                     <!--nombre-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3" >*Apellido Paterno:</label>
                                        <div class="col-sm-7">
                                            <input type="text"
                                                   class="form-control apPaterno"
                                                   placeholder="Yyyyy"
                                                   maxlength="35"
                                                   pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                                   title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                                   required
                                            >
                                        </div>
                                    </div>                                                  <!--apPaterno-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3" >Apellido Materno:</label>
                                        <div class="col-sm-7">
                                            <input type="text"
                                                   class="form-control apMaterno"
                                                   placeholder="Zzzzz"
                                                   maxlength="35"
                                                   pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                                   title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. " >
                                        </div>
                                    </div>                                                  <!--apMaterno-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Fecha de Nacimiento:</label>
                                        <div class="col-sm-7">
                                            <input type="date"
                                                   class="form-control fechaDeNacimiento">
                                        </div>
                                    </div>                                          <!--fechaDeNacimiento-->

                                    <!--Estado, Delegación municipio, codigo postal, colonia deben de estar juntos y en ese orden para funcionar.-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Estado:</label>
                                        <div class="col-sm-7">
                                            <!–– Dropdown estados de México ––>
                                            <select class="form-control direccionSelectEstado estadoDomicilio">
                                                <option value="">Selecciona uno</option>
                                                <option value="Distrito Federal">Distrito Federal</option>
                                                <option value="Aguascalientes">Aguascalientes</option>
                                                <option value="Baja California">Baja California</option>
                                                <option value="Baja California Sur">Baja California Sur</option>
                                                <option value="Campeche">Campeche</option>
                                                <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
                                                <option value="Colima">Colima</option>
                                                <option value="Chiapas">Chiapas</option>
                                                <option value="Chihuahua">Chihuahua</option>
                                                <option value="Durango">Durango</option>
                                                <option value="Guanajuato">Guanajuato</option>
                                                <option value="Guerrero">Guerrero</option>
                                                <option value="Hidalgo">Hidalgo</option>
                                                <option value="Jalisco">Jalisco</option>
                                                <option value="México">México</option>
                                                <option value="Michoacán de Ocampo">Michoacán de Ocampo</option>
                                                <option value="Morelos">Morelos</option>
                                                <option value="Nayarit">Nayarit</option>
                                                <option value="Nuevo León">Nuevo León</option>
                                                <option value="Oaxaca">Oaxaca</option>
                                                <option value="Puebla">Puebla</option>
                                                <option value="Querétaro">Querétaro</option>
                                                <option value="Quintana Roo">Quintana Roo</option>
                                                <option value="San Luis Potosí">San Luis Potosí</option>
                                                <option value="Sinaloa">Sinaloa</option>
                                                <option value="Sonora">Sonora</option>
                                                <option value="Tabasco">Tabasco</option>
                                                <option value="Tamaulipas">Tamaulipas</option>
                                                <option value="Tlaxcala">Tlaxcala</option>
                                                <option value="Veracruz de Ignacio de la Llave">Veracruz de Ignacio de la Llave</option>
                                                <option value="Yucatán">Yucatán</option>
                                                <option value="Zacatecas">Zacatecas</option>
                                            </select>
                                        </div>
                                    </div>                                            <!--estadoDomicilio-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Delegación o Municipio:</label>
                                        <div class="col-sm-7">
                                            <select class="form-control direccionSelectDelegacionMunicipio delegacionMunicipioDomicilio" >
                                                <option value="">Primero selecciona un estado</option>
                                            </select>
                                        </div>
                                    </div>                               <!--delegacionMunicipioDomicilio-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Código Postal:</label>
                                        <div class="col-sm-7">
                                            <select class="form-control direccionSelectCodigoPostal codigoPostalDomicilio">
                                                <option value="">Primero selecciona una delegación o municipio</option>
                                            </select>
                                        </div>
                                    </div>                                      <!--codigoPostalDomicilio-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Colonia:</label>
                                        <div class="col-sm-7">
                                            <select class="form-control coloniaDomicilio">
                                                <option value="">Primero selecciona un codigo postal</option>
                                            </select>
                                        </div>
                                    </div>                                           <!--coloniaDomicilio-->

                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Calle y número:</label>
                                        <div class="col-sm-7">
                                            <input type="text"
                                                   class="form-control calleNumeroDomicilio"
                                                   placeholder="Xxxxx YYY"
                                                   maxlength="70"
                                                   pattern="[a-zA-Z0-9- ñáéíóú]{5,70}"
                                                   title="Solo letras,espacios y números (no signos), 5 - 70 caracteres.">
                                        </div>
                                    </div>                                       <!--calleNumeroDomicilio-->

                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Email:</label>
                                        <div class="col-sm-7">
                                            <input type="email" class="form-control email" placeholder="xxxxx@yyyyy.zzz" maxlength="128">
                                        </div>
                                    </div>                                                      <!--email-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Teléfono Local:</label>
                                        <div class="col-sm-7">
                                            <input type="tel"
                                                   class="form-control telefonoLocal"
                                                   placeholder="XXXXXXXX"
                                                   maxlength="32"
                                                   pattern="[0-9]{8,32}"
                                                   title="Solo números, sin espacios, 8 - 32 caracteres.">
                                        </div>
                                    </div>                                              <!--telefonoLocal-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Teléfono Movil:</label>
                                        <div class="col-sm-7">
                                            <input type="tel"
                                                   class="form-control telefonoMovil"
                                                   placeholder="XXXXXXXX" maxlength="32"
                                                   pattern="[0-9]{8,32}" title="Solo números, sin espacios, 8 - 32 caracteres.">
                                        </div>
                                    </div>                                              <!--telefonoMovil-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">CURP:</label>
                                        <div class="col-sm-7">
                                            <input type="text"
                                                   class="form-control curp"
                                                   placeholder="XXXXXXXXXXXXXXXXXX"
                                                   maxlength="18"
                                                   pattern="^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$"
                                                   title="Solo letras y números (no signos), 18 caracteres."
                                            >
                                        </div>
                                    </div>                                                       <!--curp-->

                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">Estado en el Sistema:</label>
                                        <div class="col-sm-7">
                                            <select class="form-control estadoSistema">
                                                <option value="0">Inactivo</option>
                                                <option value="1">Activo</option>
                                            </select>
                                        </div>
                                    </div>                                              <!--estadoSistema-->
                                    <div class="form-group-sm">
                                        <label class="control-label col-sm-3">*Nombre de usuario:</label>
                                        <div class="col-sm-7">
                                            <input type="text"
                                                   class="form-control userName"
                                                   placeholder="xxxxx"
                                                   maxlength="45"
                                                   pattern="[a-zA-Z0-9-]{5,45}"
                                                   title="Solo letras y números (no signos), 5 - 45 caracteres."
                                                   required
                                            >
                                        </div>
                                    </div>                                                   <!--userName-->

                                <div class="col-sm-12 margen-arriba15 margen-abajo15">
                                    <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                                    <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                                </div>

                                </form>
                        </div>
                    </div>
                </div>



                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Todos los empleados:
                        </div>
                        <div class="panel-body">
                            <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="empleadosTodos">
                                <thead>
                                <tr>
                                    <th rowspan="2">Nombre</th>
                                    <th colspan="2">Apellido</th>
                                    <th rowspan="2">Fecha nacimiento</th>
                                    <th colspan="5">Dirección</th>
                                    <th rowspan="2">Email</th>
                                    <th colspan="2">Teléfono</th>
                                    <th rowspan="2">CURP</th>
                                    <th colspan="3">Sistema</th>
                                </tr>
                                <tr>
                                    <th>Paterno</th>
                                    <th>Materno</th>
                                    <th>Calle y número</th>
                                    <th>Delegación</th>
                                    <th>C.P.</th>
                                    <th>Colonia</th>
                                    <th>Estado</th>
                                    <th>Local</th>
                                    <th>Movil</th>
                                    <th>Alta</th>
                                    <th>Estado</th>
                                    <th>Usuario</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>




            </div>

        </div>                                  <!--Modulo Empleados-->


    </div>                                             <!--Contenedor Empleados-->

    <div id="divContraseñas" class="container"> 				                   <!--Contenedor Contraseñas-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                          <!--Modulo Contraseñas-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon contraseñasIcon">
                    <i class="fa fa-key fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Contraseñas Empleados</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button id="contraseñaEditar" type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Asignar contraseña</button>
                </div>


                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Nueva contraseña:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal" autocomplete="off">

                        <div class="form-group-sm collapse">
                            <label class="control-label col-sm-3">ID:</label>
                            <div class="col-sm-7">
                                <input type="text"
                                       class="form-control idEmpleado"
                                       placeholder="XX"
                                       maxlength="35"
                                       title="Id, no modificable por el usuario."
                                >
                            </div>
                        </div>
                        <div class="form-group-sm">
                            <label class="control-label col-sm-3">Nombre completo:</label>
                            <div class="col-sm-7">
                                <input type="text"
                                       class="form-control nombre"
                                       placeholder="Nombre completo"
                                       maxlength="35"
                                       pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                       title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                       disabled
                                >
                            </div>
                        </div>
                        <div class="form-group-sm">
                            <label class="control-label col-sm-3" >*Nueva contraseña:</label>
                            <div class="col-sm-7">
                                <input type="password"
                                       id="loginFormPassword"
                                       class="form-control password"
                                       placeholder="Nueva contraseña"
                                       maxlength="45"
                                       pattern="[a-zA-Z0-9-]{5,45}"
                                       title="Solo letras y números (no signos), 5 - 45 caracteres."
                                       required>
                            </div>
                        </div>

                        <div class="col-sm-12 margen-arriba15 margen-abajo15">
                            <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                            <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                        </div>

                    </form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Todos los empleados:
                        </div>
                        <div class="panel-body">
                <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="empleadosTodos">
                    <thead>
                        <tr>
                            <th rowspan="2">Nombre</th>
                            <th colspan="2">Apellido</th>
                            <th rowspan="2">Fecha nacimiento</th>
                            <th colspan="5">Dirección</th>
                            <th rowspan="2">Email</th>
                            <th colspan="2">Teléfono</th>
                            <th rowspan="2">CURP</th>
                            <th colspan="3">Sistema</th>
                        </tr>
                        <tr>
                            <th>Paterno</th>
                            <th>Materno</th>
                            <th>Calle y número</th>
                            <th>Delegación</th>
                            <th>C.P.</th>
                            <th>Colonia</th>
                            <th>Estado</th>
                            <th>Local</th>
                            <th>Movil</th>
                            <th>Alta</th>
                            <th>Estado</th>
                            <th>Usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                        </div>
                    </div>
                </div>

                </div>

        </div>                                  <!--Modulo Contraseñas-->


    </div>                                         <!--Contenedor Contraseñas-->

    <div id="divClientes" class="container"> 				                         <!--Contenedor Clientes-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                            <!--Modulo Clientes-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon clientesIcon">
                    <i class="fa fa-handshake-o fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Clientes</h2>
            </div>

            <div class="divModuloMain">
                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button type="button" class="btn-agregar btn btn-default btn-md ">Agregar Nuevo</button>
                    <button id="clienteEditar" type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Editar</button>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Formulario de Cliente:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal" autocomplete="off">

                                <div class="form-group-sm collapse">
                                    <label class="control-label col-sm-3">ID:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control idCliente"
                                               placeholder="XX"
                                               maxlength="35"
                                               title="Id, no modificable por el usuario."
                                        >
                                    </div>
                                </div>                                         <!--idCliente-->                        <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Nombre:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control nombre"
                                               placeholder="Xxxxx"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                               autofocus
                                               required
                                        >
                                    </div>
                                </div>                                                      <!--nombre-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3" >*Apellido Paterno:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control apPaterno"
                                               placeholder="Yyyyy"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                               required
                                        >
                                    </div>
                                </div>                                                  <!--apPaterno-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3" >Apellido Materno:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control apMaterno"
                                               placeholder="Zzzzz"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. " >
                                    </div>
                                </div>                                                  <!--apMaterno-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Teléfono Movil:</label>
                                    <div class="col-sm-7">
                                        <input type="tel"
                                               class="form-control telefonoMovil"
                                               placeholder="XXXXXXXX"
                                               maxlength="32"
                                               pattern="[0-9]{8,32}"
                                               title="Solo números, sin espacios, 8 - 32 caracteres.">
                                    </div>
                                </div>                                              <!--telefonoMovil-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Teléfono Local:</label>
                                    <div class="col-sm-7">
                                        <input type="tel"
                                               class="form-control telefonoLocal"
                                               placeholder="XXXXXXXX"
                                               maxlength="32"
                                               pattern="[0-9]{8,32}" title="Solo números, sin espacios, 8 - 32 caracteres.">
                                    </div>
                                </div>                                              <!--telefonoLocal-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Email:</label>
                                    <div class="col-sm-7">
                                        <input type="email"
                                               class="form-control email"
                                               placeholder="xxxxx@yyyyy.zzz"
                                               maxlength="128">
                                    </div>
                                </div>                                                      <!--email-->

                                <!--Estado, Delegación municipio, codigo postal, colonia deben de estar juntos y en ese orden para funcionar.-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Estado:</label>
                                    <div class="col-sm-7">
                                        <!–– Dropdown estados de México ––>
                                        <select class="form-control direccionSelectEstado estadoDomicilio">
                                            <option value="">Selecciona uno</option>
                                            <option value="Distrito Federal">Distrito Federal</option>
                                            <option value="Aguascalientes">Aguascalientes</option>
                                            <option value="Baja California">Baja California</option>
                                            <option value="Baja California Sur">Baja California Sur</option>
                                            <option value="Campeche">Campeche</option>
                                            <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
                                            <option value="Colima">Colima</option>
                                            <option value="Chiapas">Chiapas</option>
                                            <option value="Chihuahua">Chihuahua</option>
                                            <option value="Durango">Durango</option>
                                            <option value="Guanajuato">Guanajuato</option>
                                            <option value="Guerrero">Guerrero</option>
                                            <option value="Hidalgo">Hidalgo</option>
                                            <option value="Jalisco">Jalisco</option>
                                            <option value="México">México</option>
                                            <option value="Michoacán de Ocampo">Michoacán de Ocampo</option>
                                            <option value="Morelos">Morelos</option>
                                            <option value="Nayarit">Nayarit</option>
                                            <option value="Nuevo León">Nuevo León</option>
                                            <option value="Oaxaca">Oaxaca</option>
                                            <option value="Puebla">Puebla</option>
                                            <option value="Querétaro">Querétaro</option>
                                            <option value="Quintana Roo">Quintana Roo</option>
                                            <option value="San Luis Potosí">San Luis Potosí</option>
                                            <option value="Sinaloa">Sinaloa</option>
                                            <option value="Sonora">Sonora</option>
                                            <option value="Tabasco">Tabasco</option>
                                            <option value="Tamaulipas">Tamaulipas</option>
                                            <option value="Tlaxcala">Tlaxcala</option>
                                            <option value="Veracruz de Ignacio de la Llave">Veracruz de Ignacio de la Llave</option>
                                            <option value="Yucatán">Yucatán</option>
                                            <option value="Zacatecas">Zacatecas</option>
                                        </select>
                                    </div>
                                </div>                                            <!--estadoDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Delegación o Municipio:</label>
                                    <div class="col-sm-7">
                                        <select class="form-control direccionSelectDelegacionMunicipio delegacionMunicipioDomicilio" >
                                            <option value="">Primero selecciona un estado</option>
                                        </select>
                                    </div>
                                </div>                               <!--delegacionMunicipioDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Código Postal:</label>
                                    <div class="col-sm-7">
                                        <select class="form-control direccionSelectCodigoPostal codigoPostalDomicilio">
                                            <option value="">Primero selecciona una delegación o municipio</option>
                                        </select>
                                    </div>
                                </div>                                      <!--codigoPostalDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Colonia:</label>
                                    <div class="col-sm-7">
                                        <select class="form-control coloniaDomicilio">
                                            <option value="">Primero selecciona un codigo postal</option>
                                        </select>
                                    </div>
                                </div>                                           <!--coloniaDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Calle y número:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control calleNumeroDomicilio"
                                               placeholder="Xxxxx YYY"
                                               maxlength="70"
                                               pattern="[a-zA-Z0-9- ñáéíóú]{5,70}"
                                               title="Solo letras,espacios y números (no signos), 5 - 70 caracteres.">
                                    </div>
                                </div>                                       <!--calleNumeroDomicilio-->

                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Fecha de Nacimiento:</label>
                                    <div class="col-sm-7">
                                        <input type="date"
                                               class="form-control fechaDeNacimiento">
                                    </div>
                                </div>                                          <!--fechaDeNacimiento-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">CURP:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control curp"
                                               placeholder="XXXXXXXXXXXXXXXXXX"
                                               maxlength="18"
                                               pattern="^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$"
                                               title="Solo letras y números (no signos), 18 caracteres."
                                        >
                                    </div>
                                </div>                                                       <!--curp-->

                                <div class="col-sm-12 margen-arriba15 margen-abajo15">
                                    <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                                    <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>



                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Todos los clientes:
                        </div>
                        <div class="panel-body">
                            <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="clientesTodos">
                                <thead>
                                <tr>
                                    <th rowspan="2">Nombre</th>
                                    <th colspan="2">Apellido</th>
                                    <th colspan="2">Teléfono</th>
                                    <th rowspan="2">Email</th>
                                    <th colspan="5">Dirección</th>
                                    <th rowspan="2">Fecha nacimiento</th>
                                    <th rowspan="2">CURP</th>
                                    <th rowspan="2">Alta en sistema</th>
                                </tr>
                                <tr>
                                    <th>Paterno</th>
                                    <th>Materno</th>
                                    <th>Movil</th>
                                    <th>Local</th>
                                    <th>Estado</th>
                                    <th>Delegación</th>
                                    <th>C.P.</th>
                                    <th>Colonia</th>
                                    <th>Calle y número</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </div>

        </div>                                  <!--Modulo Clientes-->


    </div>                                               <!--Contenedor Clientes-->

    <div id="divViajes" class="container"> 				                            <!--Contenedor Viajes-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                               <!--Modulo Viajes-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon viajesIcon">
                    <i class="fa fa-suitcase fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Viajes</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button type="button" class="btn-agregar btn btn-default btn-md">Agregar Nuevo</button>
                    <button type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Editar</button>
                    <button type="button" class="btn-PDF btn-needStelect btn btn-default btn-md margen-izquierda15" disabled>PDF</button>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Formulario de Viaje:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal" autocomplete="off">

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        1. Selecciona un cliente:
                                    </div>
                                    <div class="panel-body">
                                        <table class="display nowrap compact table-bordered" cellspacing="0" width="100%" controller="clientesTodos">
                                            <thead>
                                            <tr>
                                                <th rowspan="2">Nombre</th>
                                                <th colspan="2">Apellido</th>
                                                <th colspan="2">Teléfono</th>
                                                <th rowspan="2">Email</th>
                                                <th colspan="5">Dirección</th>
                                                <th rowspan="2">Fecha nacimiento</th>
                                                <th rowspan="2">CURP</th>
                                                <th rowspan="2">Alta en sistema</th>
                                            </tr>
                                            <tr>
                                                <th>Paterno</th>
                                                <th>Materno</th>
                                                <th>Movil</th>
                                                <th>Local</th>
                                                <th>Estado</th>
                                                <th>Delegación</th>
                                                <th>C.P.</th>
                                                <th>Colonia</th>
                                                <th>Calle y número</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        2. Datos Críticos:
                                    </div>
                                    <div class="panel-body">
                                        <div class="form-group-sm collapse">
                                            <label class="control-label col-sm-3">ID:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control idViaje"
                                                       placeholder="XX"
                                                       maxlength="35"
                                                       title="Id, no modificable por el usuario."
                                                       disabled
                                                >
                                            </div>
                                        </div>                                   <!--idViaje-->
                                        <div class="form-group-sm collapse">
                                            <label class="control-label col-sm-3">ID Cliente:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control idCliente"
                                                       placeholder="XX"
                                                       maxlength="35"
                                                       title="Id, no modificable por el usuario."
                                                       disabled
                                                >
                                            </div>
                                        </div>                                 <!--idCliente-->

                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Nombre cliente:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control nombre"
                                                       placeholder="Selecciona un cliente"
                                                       maxlength="35"
                                                       pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                                       title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                                       autofocus
                                                       disabled
                                                >
                                            </div>
                                        </div>                                             <!--nombre-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Destino Estado:</label>
                                            <div class="col-sm-7">
                                                <!–– Dropdown estados de México ––>
                                                <select class="form-control destinoEstado" required>
                                                    <option value="">Selecciona uno</option>
                                                    <option value="Distrito Federal">Local</option>
                                                    <option value="Aguascalientes">Aguascalientes</option>
                                                    <option value="Baja California">Baja California</option>
                                                    <option value="Baja California Sur">Baja California Sur</option>
                                                    <option value="Campeche">Campeche</option>
                                                    <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
                                                    <option value="Colima">Colima</option>
                                                    <option value="Chiapas">Chiapas</option>
                                                    <option value="Chihuahua">Chihuahua</option>
                                                    <option value="Distrito Federal">Distrito Federal</option>
                                                    <option value="Durango">Durango</option>
                                                    <option value="Guanajuato">Guanajuato</option>
                                                    <option value="Guerrero">Guerrero</option>
                                                    <option value="Hidalgo">Hidalgo</option>
                                                    <option value="Jalisco">Jalisco</option>
                                                    <option value="México">México</option>
                                                    <option value="Michoacán de Ocampo">Michoacán de Ocampo</option>
                                                    <option value="Morelos">Morelos</option>
                                                    <option value="Nayarit">Nayarit</option>
                                                    <option value="Nuevo León">Nuevo León</option>
                                                    <option value="Oaxaca">Oaxaca</option>
                                                    <option value="Puebla">Puebla</option>
                                                    <option value="Querétaro">Querétaro</option>
                                                    <option value="Quintana Roo">Quintana Roo</option>
                                                    <option value="San Luis Potosí">San Luis Potosí</option>
                                                    <option value="Sinaloa">Sinaloa</option>
                                                    <option value="Sonora">Sonora</option>
                                                    <option value="Tabasco">Tabasco</option>
                                                    <option value="Tamaulipas">Tamaulipas</option>
                                                    <option value="Tlaxcala">Tlaxcala</option>
                                                    <option value="Veracruz de Ignacio de la Llave">Veracruz de Ignacio de la Llave</option>
                                                    <option value="Yucatán">Yucatán</option>
                                                    <option value="Zacatecas">Zacatecas</option>
                                                </select>
                                            </div>
                                        </div>                                      <!--destinoEstado-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">Destino Lugar:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control destinoLugar"
                                                       placeholder="Agrega un lugar"
                                                       maxlength="35"
                                                       pattern="[a-zA-Z0-9- ñáéíóú]{5,70}"
                                                       title="Solo letras,espacios y números (no signos), 5 - 70 caracteres."
                                                >
                                            </div>
                                        </div>                                       <!--destinoLugar-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Salida fecha y hora:</label>
                                            <div class="col-sm-7">
                                                <input type="datetime-local"
                                                       class="form-control salidaFechaHora"
                                                       required
                                                >
                                            </div>
                                        </div>                                    <!--salidaFechaHora-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Regreso fecha y hora:</label>
                                            <div class="col-sm-7">
                                                <input type="datetime-local"
                                                       class="form-control regresoFechaHora"
                                                       required
                                                >
                                            </div>
                                        </div>                                   <!--regresoFechaHora-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Número de Días:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control diasNum"
                                                       placeholder="Dias considerados"
                                                       maxlength="35"
                                                       pattern="[0-9]{1,70}"
                                                       title="Solo números (no espacios), 1 - 70 caracteres."
                                                       required
                                                >
                                            </div>
                                        </div>                                         <!--diasNum-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Kilometros:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control kilometros"
                                                       placeholder="Totales del viaje"
                                                       maxlength="35"
                                                       pattern="[0-9]{1,70}"
                                                       title="Solo números (no espacios), 1 - 70 caracteres."
                                                       required
                                                >
                                            </div>
                                        </div>                                         <!--kilometros-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Temporada:</label>
                                            <div class="col-sm-7">
                                                <select class="form-control  temporada" required>
                                                    <option value="">Selecciona uno</option>
                                                    <option value="Alta">Alta</option>
                                                    <option value="Baja">Baja</option>
                                                </select>
                                            </div>
                                        </div>                                         <!--temporada-->

                                    </div>
                                    <div class="panel-footer text-right">
                                        <button type="button" class="btn btn-default btn-xs agregarPuntoUno">3. Agregar Itinerario</button>
                                    </div>
                                </div>

                                <div class="puntos">

                                </div>





                                <div class="col-sm-12 margen-arriba15 margen-abajo15">
                                    <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                                    <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Todos los viajes:
                        </div>
                        <div class="panel-body">
                <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="todosViajesClientesPuntos">
                    <thead>
                    <tr>
                        <th colspan="2">Sistema</th>
                        <th colspan="3">Cliente</th>
                        <th colspan="2">Destino</th>
                        <th colspan="2">Fecha y Hora</th>
                        <th rowspan="2">Núm.Días</th>
                        <th rowspan="2">Kilometros</th>
                        <th rowspan="2">Temporada</th>
                        <th rowspan="2">Itinerario</th>
                    </tr>
                    <tr>
                        <th>ID<br>Viaje</th>
                        <th>Fecha Alta</th>
                        <th>Nombre</th>
                        <th>Paterno</th>
                        <th>Materno</th>
                        <th>Estado</th>
                        <th>Lugar</th>
                        <th>Salida</th>
                        <th>Regreso</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>                                  <!--Modulo Viajes-->


    </div>                                                   <!--Contenedor Viajes-->

    <div id="divChoferes" class="container"> 				                          <!--Contenedor Choferes-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                            <!--Modulo Choferes-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon choferesIcon">
                    <i class="fa fa-tachometer fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Choferes</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button type="button" class="btn-agregar btn btn-default btn-md ">Agregar Nuevo</button>
                    <button id="choferEditar" type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Editar</button>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Formulario Chofer:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal mainFormDiv" autocomplete="off">

                                <div class="form-group-sm collapse">
                                    <label class="control-label col-sm-3">ID:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control idChofer"
                                               placeholder="XX"
                                               maxlength="35"
                                               title="Id, no modificable por el usuario."
                                        >
                                    </div>
                                </div>                                        <!--idChofer-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Nombre:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control nombre"
                                               placeholder="Xxxxx"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                               autofocus
                                               required
                                        >
                                    </div>
                                </div>                                                     <!--nombre-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3" >*Apellido Paterno:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control apPaterno"
                                               placeholder="Yyyyy"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                               required
                                        >
                                    </div>
                                </div>                                                  <!--apPaterno-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3" >Apellido Materno:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control apMaterno"
                                               placeholder="Zzzzz"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. " >
                                    </div>
                                </div>                                                  <!--apMaterno-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Fecha de Nacimiento:</label>
                                    <div class="col-sm-7">
                                        <input type="date"
                                               class="form-control fechaDeNacimiento">
                                    </div>
                                </div>                                          <!--fechaDeNacimiento-->

                                <!--Estado, Delegación municipio, codigo postal, colonia deben de estar juntos y en ese orden para funcionar.-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Estado:</label>
                                    <div class="col-sm-7">
                                        <!–– Dropdown estados de México ––>
                                        <select class="form-control direccionSelectEstado estadoDomicilio">
                                            <option value="">Selecciona uno</option>
                                            <option value="Distrito Federal">Distrito Federal</option>
                                            <option value="Aguascalientes">Aguascalientes</option>
                                            <option value="Baja California">Baja California</option>
                                            <option value="Baja California Sur">Baja California Sur</option>
                                            <option value="Campeche">Campeche</option>
                                            <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
                                            <option value="Colima">Colima</option>
                                            <option value="Chiapas">Chiapas</option>
                                            <option value="Chihuahua">Chihuahua</option>
                                            <option value="Durango">Durango</option>
                                            <option value="Guanajuato">Guanajuato</option>
                                            <option value="Guerrero">Guerrero</option>
                                            <option value="Hidalgo">Hidalgo</option>
                                            <option value="Jalisco">Jalisco</option>
                                            <option value="México">México</option>
                                            <option value="Michoacán de Ocampo">Michoacán de Ocampo</option>
                                            <option value="Morelos">Morelos</option>
                                            <option value="Nayarit">Nayarit</option>
                                            <option value="Nuevo León">Nuevo León</option>
                                            <option value="Oaxaca">Oaxaca</option>
                                            <option value="Puebla">Puebla</option>
                                            <option value="Querétaro">Querétaro</option>
                                            <option value="Quintana Roo">Quintana Roo</option>
                                            <option value="San Luis Potosí">San Luis Potosí</option>
                                            <option value="Sinaloa">Sinaloa</option>
                                            <option value="Sonora">Sonora</option>
                                            <option value="Tabasco">Tabasco</option>
                                            <option value="Tamaulipas">Tamaulipas</option>
                                            <option value="Tlaxcala">Tlaxcala</option>
                                            <option value="Veracruz de Ignacio de la Llave">Veracruz de Ignacio de la Llave</option>
                                            <option value="Yucatán">Yucatán</option>
                                            <option value="Zacatecas">Zacatecas</option>
                                        </select>
                                    </div>
                                </div>                                            <!--estadoDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Delegación o Municipio:</label>
                                    <div class="col-sm-7">
                                        <select class="form-control direccionSelectDelegacionMunicipio delegacionMunicipioDomicilio" >
                                            <option value="">Primero selecciona un estado</option>
                                        </select>
                                    </div>
                                </div>                               <!--delegacionMunicipioDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Código Postal:</label>
                                    <div class="col-sm-7">
                                        <select class="form-control direccionSelectCodigoPostal codigoPostalDomicilio">
                                            <option value="">Primero selecciona una delegación o municipio</option>
                                        </select>
                                    </div>
                                </div>                                      <!--codigoPostalDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Colonia:</label>
                                    <div class="col-sm-7">
                                        <select class="form-control coloniaDomicilio">
                                            <option value="">Primero selecciona un codigo postal</option>
                                        </select>
                                    </div>
                                </div>                                           <!--coloniaDomicilio-->

                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Calle y número:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control calleNumeroDomicilio"
                                               placeholder="Xxxxx YYY"
                                               maxlength="70"
                                               pattern="[a-zA-Z0-9- ñáéíóú]{5,70}"
                                               title="Solo letras,espacios y números (no signos), 5 - 70 caracteres.">
                                    </div>
                                </div>                                       <!--calleNumeroDomicilio-->

                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Email:</label>
                                    <div class="col-sm-7">
                                        <input type="email" class="form-control email" placeholder="xxxxx@yyyyy.zzz" maxlength="128">
                                    </div>
                                </div>                                                      <!--email-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Teléfono Local:</label>
                                    <div class="col-sm-7">
                                        <input type="tel"
                                               class="form-control telefonoLocal"
                                               placeholder="XXXXXXXX"
                                               maxlength="32"
                                               pattern="[0-9]{8,32}"
                                               title="Solo números, sin espacios, 8 - 32 caracteres.">
                                    </div>
                                </div>                                              <!--telefonoLocal-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Teléfono Movil:</label>
                                    <div class="col-sm-7">
                                        <input type="tel"
                                               class="form-control telefonoMovil"
                                               placeholder="XXXXXXXX" maxlength="32"
                                               pattern="[0-9]{8,32}" title="Solo números, sin espacios, 8 - 32 caracteres.">
                                    </div>
                                </div>                                              <!--telefonoMovil-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">CURP:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control curp"
                                               placeholder="XXXXXXXXXXXXXXXXXX"
                                               maxlength="18"
                                               pattern="^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$"
                                               title="Solo letras y números (no signos), 18 caracteres."
                                        >
                                    </div>
                                </div>                                                       <!--curp-->

                                <div class="col-sm-12 margen-arriba15 margen-abajo15">
                                    <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                                    <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Todos los choferes:
                        </div>
                        <div class="panel-body">
                            <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="choferesTodos">
                                <thead>
                                <tr>
                                    <th rowspan="2">Nombre</th>
                                    <th colspan="2">Apellido</th>
                                    <th rowspan="2">Fecha nacimiento</th>
                                    <th colspan="5">Dirección</th>
                                    <th rowspan="2">Email</th>
                                    <th colspan="2">Teléfono</th>
                                    <th rowspan="2">CURP</th>
                                </tr>
                                <tr>
                                    <th>Paterno</th>
                                    <th>Materno</th>
                                    <th>Calle y número</th>
                                    <th>Delegación</th>
                                    <th>C.P.</th>
                                    <th>Colonia</th>
                                    <th>Estado</th>
                                    <th>Local</th>
                                    <th>Movil</th>
                                    <th>Sistema<br>Alta</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



            </div>

        </div>                                  <!--Modulo Choferes-->


    </div>                                               <!--Contenedor Choferes-->

    <div id="divPropietarios" class="container"> 				                          <!--Contenedor Propietarios-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                             <!--Modulo Propietarios-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon propietariosIcon">
                    <i class="fa fa-star fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Propietarios</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button type="button" class="btn-agregar btn btn-default btn-md ">Agregar Nuevo</button>
                    <button id="propietarioEditar" type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Editar</button>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Formulario Propietario:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal mainFormDiv" autocomplete="off">

                                <div class="form-group-sm collapse">
                                    <label class="control-label col-sm-3">ID:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control idPropietario"
                                               placeholder="XX"
                                               maxlength="35"
                                               title="Id, no modificable por el usuario."
                                        >
                                    </div>
                                </div>                                        <!--idPropietario-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Nombre:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control nombre"
                                               placeholder="Xxxxx"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                               autofocus
                                               required
                                        >
                                    </div>
                                </div>                                                     <!--nombre-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3" >*Apellido Paterno:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control apPaterno"
                                               placeholder="Yyyyy"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                               required
                                        >
                                    </div>
                                </div>                                                  <!--apPaterno-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3" >Apellido Materno:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control apMaterno"
                                               placeholder="Zzzzz"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. " >
                                    </div>
                                </div>                                                  <!--apMaterno-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Fecha de Nacimiento:</label>
                                    <div class="col-sm-7">
                                        <input type="date"
                                               class="form-control fechaDeNacimiento">
                                    </div>
                                </div>                                          <!--fechaDeNacimiento-->

                                <!--Estado, Delegación municipio, codigo postal, colonia deben de estar juntos y en ese orden para funcionar.-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Estado:</label>
                                    <div class="col-sm-7">
                                        <!–– Dropdown estados de México ––>
                                        <select class="form-control direccionSelectEstado estadoDomicilio">
                                            <option value="">Selecciona uno</option>
                                            <option value="Distrito Federal">Distrito Federal</option>
                                            <option value="Aguascalientes">Aguascalientes</option>
                                            <option value="Baja California">Baja California</option>
                                            <option value="Baja California Sur">Baja California Sur</option>
                                            <option value="Campeche">Campeche</option>
                                            <option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>
                                            <option value="Colima">Colima</option>
                                            <option value="Chiapas">Chiapas</option>
                                            <option value="Chihuahua">Chihuahua</option>
                                            <option value="Durango">Durango</option>
                                            <option value="Guanajuato">Guanajuato</option>
                                            <option value="Guerrero">Guerrero</option>
                                            <option value="Hidalgo">Hidalgo</option>
                                            <option value="Jalisco">Jalisco</option>
                                            <option value="México">México</option>
                                            <option value="Michoacán de Ocampo">Michoacán de Ocampo</option>
                                            <option value="Morelos">Morelos</option>
                                            <option value="Nayarit">Nayarit</option>
                                            <option value="Nuevo León">Nuevo León</option>
                                            <option value="Oaxaca">Oaxaca</option>
                                            <option value="Puebla">Puebla</option>
                                            <option value="Querétaro">Querétaro</option>
                                            <option value="Quintana Roo">Quintana Roo</option>
                                            <option value="San Luis Potosí">San Luis Potosí</option>
                                            <option value="Sinaloa">Sinaloa</option>
                                            <option value="Sonora">Sonora</option>
                                            <option value="Tabasco">Tabasco</option>
                                            <option value="Tamaulipas">Tamaulipas</option>
                                            <option value="Tlaxcala">Tlaxcala</option>
                                            <option value="Veracruz de Ignacio de la Llave">Veracruz de Ignacio de la Llave</option>
                                            <option value="Yucatán">Yucatán</option>
                                            <option value="Zacatecas">Zacatecas</option>
                                        </select>
                                    </div>
                                </div>                                            <!--estadoDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Delegación o Municipio:</label>
                                    <div class="col-sm-7">
                                        <select class="form-control direccionSelectDelegacionMunicipio delegacionMunicipioDomicilio" >
                                            <option value="">Primero selecciona un estado</option>
                                        </select>
                                    </div>
                                </div>                               <!--delegacionMunicipioDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Código Postal:</label>
                                    <div class="col-sm-7">
                                        <select class="form-control direccionSelectCodigoPostal codigoPostalDomicilio">
                                            <option value="">Primero selecciona una delegación o municipio</option>
                                        </select>
                                    </div>
                                </div>                                      <!--codigoPostalDomicilio-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Colonia:</label>
                                    <div class="col-sm-7">
                                        <select class="form-control coloniaDomicilio">
                                            <option value="">Primero selecciona un codigo postal</option>
                                        </select>
                                    </div>
                                </div>                                           <!--coloniaDomicilio-->

                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Calle y número:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control calleNumeroDomicilio"
                                               placeholder="Xxxxx YYY"
                                               maxlength="70"
                                               pattern="[a-zA-Z0-9- ñáéíóú]{5,70}"
                                               title="Solo letras,espacios y números (no signos), 5 - 70 caracteres.">
                                    </div>
                                </div>                                       <!--calleNumeroDomicilio-->

                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Email:</label>
                                    <div class="col-sm-7">
                                        <input type="email" class="form-control email" placeholder="xxxxx@yyyyy.zzz" maxlength="128">
                                    </div>
                                </div>                                                      <!--email-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Teléfono Local:</label>
                                    <div class="col-sm-7">
                                        <input type="tel"
                                               class="form-control telefonoLocal"
                                               placeholder="XXXXXXXX"
                                               maxlength="32"
                                               pattern="[0-9]{8,32}"
                                               title="Solo números, sin espacios, 8 - 32 caracteres.">
                                    </div>
                                </div>                                              <!--telefonoLocal-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Teléfono Movil:</label>
                                    <div class="col-sm-7">
                                        <input type="tel"
                                               class="form-control telefonoMovil"
                                               placeholder="XXXXXXXX" maxlength="32"
                                               pattern="[0-9]{8,32}" title="Solo números, sin espacios, 8 - 32 caracteres.">
                                    </div>
                                </div>                                              <!--telefonoMovil-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">CURP:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control curp"
                                               placeholder="XXXXXXXXXXXXXXXXXX"
                                               maxlength="18"
                                               pattern="^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$"
                                               title="Solo letras y números (no signos), 18 caracteres."
                                        >
                                    </div>
                                </div>                                                       <!--curp-->

                                <div class="col-sm-12 margen-arriba15 margen-abajo15">
                                    <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                                    <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Todos los empleados:
                        </div>
                        <div class="panel-body">
                            <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="propietariosTodos">
                                <thead>
                                <tr>
                                    <th rowspan="2">Nombre</th>
                                    <th colspan="2">Apellido</th>
                                    <th rowspan="2">Fecha nacimiento</th>
                                    <th colspan="5">Dirección</th>
                                    <th rowspan="2">Email</th>
                                    <th colspan="2">Teléfono</th>
                                    <th rowspan="2">CURP</th>
                                </tr>
                                <tr>
                                    <th>Paterno</th>
                                    <th>Materno</th>
                                    <th>Calle y número</th>
                                    <th>Delegación</th>
                                    <th>C.P.</th>
                                    <th>Colonia</th>
                                    <th>Estado</th>
                                    <th>Local</th>
                                    <th>Movil</th>
                                    <th>Sistema<br>Alta</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



            </div>

        </div>                                  <!--Modulo Propietarios-->


    </div>                                       <!--Contenedor Propietarios-->

    <div id="divUnidades" class="container"> 				                            <!--Contenedor Unidades-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                               <!--Modulo Unidades-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon unidadesIcon">
                    <i class="fa fa-bus fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Unidades</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button type="button" class="btn-agregar btn btn-default btn-md">Agregar Nuevo</button>
                    <button type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Editar</button>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Formulario de Unidad:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal" autocomplete="off">

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        Selecciona un propietario:
                                    </div>
                                    <div class="panel-body">
                                        <table class="display nowrap compact table-bordered" cellspacing="0" width="100%" controller="propietariosTodos">
                                            <thead>
                                            <tr>
                                                <th rowspan="2">Nombre</th>
                                                <th colspan="2">Apellido</th>
                                                <th rowspan="2">Fecha nacimiento</th>
                                                <th colspan="5">Dirección</th>
                                                <th rowspan="2">Email</th>
                                                <th colspan="2">Teléfono</th>
                                                <th rowspan="2">CURP</th>
                                            </tr>
                                            <tr>
                                                <th>Paterno</th>
                                                <th>Materno</th>
                                                <th>Calle y número</th>
                                                <th>Delegación</th>
                                                <th>C.P.</th>
                                                <th>Colonia</th>
                                                <th>Estado</th>
                                                <th>Local</th>
                                                <th>Movil</th>
                                                <th>Sistema<br>Alta</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        Datos Unidad:
                                    </div>
                                    <div class="panel-body">
                                        <div class="form-group-sm collapse">
                                            <label class="control-label col-sm-3">ID:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control idUnidad"
                                                       placeholder="XX"
                                                       maxlength="35"
                                                       title="Id, no modificable por el usuario."
                                                       disabled
                                                >
                                            </div>
                                        </div>                                  <!--idUnidad-->
                                        <div class="form-group-sm collapse">
                                            <label class="control-label col-sm-3">ID Cliente:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control idPropietario"
                                                       placeholder="XX"
                                                       maxlength="35"
                                                       title="Id, no modificable por el usuario."
                                                       disabled
                                                >
                                            </div>
                                        </div>                             <!--idPropietario-->

                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Nombre propietario:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control nombre"
                                                       placeholder="Selecciona un propietario"
                                                       maxlength="35"
                                                       pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                                       title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                                       autofocus
                                                       disabled
                                                >
                                            </div>
                                        </div>                                             <!--nombre-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Marca:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control marca"
                                                       placeholder="Descripción unidad"
                                                       maxlength="35"
                                                       pattern="[a-zA-Z0-9- ñáéíóú]{5,70}"
                                                       title="Solo letras,espacios y números (no signos), 5 - 70 caracteres."
                                                >
                                            </div>
                                        </div>                                              <!--marca-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">*Modelo:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control modelo"
                                                       placeholder="Descripción unidad"
                                                       maxlength="35"
                                                       pattern="[a-zA-Z0-9- ñáéíóú]{5,70}"
                                                       title="Solo letras,espacios y números (no signos), 5 - 70 caracteres."
                                                >
                                            </div>
                                        </div>                                             <!--modelo-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">Año:</label>
                                            <div class="col-sm-7">
                                                <input
                                                    type="number"
                                                    class="form-control ano"
                                                    min="1900"
                                                    max="2099"
                                                    step="1"
                                                    value=""
                                                />
                                            </div>
                                        </div>                                                <!--ano-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">Capacidad de personas:</label>
                                            <div class="col-sm-7">
                                                <input
                                                    type="number"
                                                    class="form-control personas"
                                                    min="1"
                                                    max="100"
                                                    step="1"
                                                    value=""
                                                />
                                            </div>
                                        </div>                                           <!--personas-->

                                    </div>
                                </div>





                                <div class="col-sm-12 margen-arriba15 margen-abajo15">
                                    <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                                    <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Todas las unidades:
                        </div>
                        <div class="panel-body">
                            <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="todosUnidadesPropietarios">
                                <thead>
                                <tr>
                                    <th colspan="2">Sistema</th>
                                    <th rowspan="2">Marca</th>
                                    <th rowspan="2">Modelo</th>
                                    <th rowspan="2">Año</th>
                                    <th rowspan="2">Capacidad<br>de personas</th>
                                    <th colspan="3">Propietario</th>
                                </tr>
                                <tr>
                                    <th>ID<br>Unidad</th>
                                    <th>Fecha Alta</th>
                                    <th>Nombre</th>
                                    <th>Paterno</th>
                                    <th>Materno</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



            </div>

        </div>                                  <!--Modulo Unidades-->


    </div>                                               <!--Contenedor Unidades-->



    <div id="divCotizaciones" class="container"> 				                  <!--Contenedor Cotizaciones-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                         <!--Modulo Cotizaciones-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon cotizacionesIcon">
                    <i class="fa fa-map-signs fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Cotizaciones</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button type="button" class="btn-agregar btn btn-default btn-md">Agregar Nueva</button>
                    <button type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Editar</button>
                    <button type="button" class="btn-PDF btn-needStelect btn btn-default btn-md margen-izquierda15" disabled>PDF</button>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Formulario de Viaje:
                        </div>
                        <div class="panel-body">
                    <form class="form-horizontal" autocomplete="off">

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                1. Selecciona un viaje:
                            </div>
                            <div class="panel-body">
                                <ul class="nav nav-tabs">
                                    <li class="active"><a data-toggle="tab" href="#Cotizaciones_todosViajesClientesPuntos">Todos los Viajes</a></li>
                                    <li><a data-toggle="tab" href="#Cotizaciones_sinCotizarViajesClientesPuntos">Sin cotización</a></li>
                                </ul>

                                <div class="tab-content">
                                    <div id="Cotizaciones_todosViajesClientesPuntos" class="tab-pane fade in active">

                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <table class="display nowrap compact table-bordered viaje" cellspacing="0" width="100%" controller="todosViajesClientesPuntos">
                                                    <thead>
                                                    <tr>
                                                        <th colspan="2">Sistema</th>
                                                        <th colspan="3">Cliente</th>
                                                        <th colspan="2">Destino</th>
                                                        <th colspan="2">Fecha y Hora</th>
                                                        <th rowspan="2">Núme<br>Días</th>
                                                        <th rowspan="2">Kilometros</th>
                                                        <th rowspan="2">Temporada</th>
                                                    </tr>
                                                    <tr>
                                                        <th>ID<br>Viaje</th>
                                                        <th>Fecha Alta</th>
                                                        <th>Nombre</th>
                                                        <th>Paterno</th>
                                                        <th>Materno</th>
                                                        <th>Estado</th>
                                                        <th>Lugar</th>
                                                        <th>Salida</th>
                                                        <th>Regreso</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                    <div id="Cotizaciones_sinCotizarViajesClientesPuntos" class="tab-pane fade">

                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <table class="display nowrap compact table-bordered viaje" cellspacing="0" width="100%" controller="sinCotizarViajesClientesPuntos">
                                                    <thead>
                                                    <tr>
                                                        <th colspan="2">Sistema</th>
                                                        <th colspan="3">Cliente</th>
                                                        <th colspan="2">Destino</th>
                                                        <th colspan="2">Fecha y Hora</th>
                                                        <th rowspan="2">Núme<br>Días</th>
                                                        <th rowspan="2">Kilometros</th>
                                                        <th rowspan="2">Temporada</th>
                                                    </tr>
                                                    <tr>
                                                        <th>ID<br>Viaje</th>
                                                        <th>Fecha Alta</th>
                                                        <th>Nombre</th>
                                                        <th>Paterno</th>
                                                        <th>Materno</th>
                                                        <th>Estado</th>
                                                        <th>Lugar</th>
                                                        <th>Salida</th>
                                                        <th>Regreso</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                2. Costos y cotización:
                            </div>
                            <div class="panel-body">
                                <div class="form-group-sm collapse">
                                    <label class="control-label col-sm-3">ID:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control idCotizacion"
                                               placeholder="XX"
                                               maxlength="35"
                                               title="Id, no modificable por el usuario."
                                               disabled
                                        >
                                    </div>
                                </div>                              <!--idCotizacion-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">ID Viaje:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control idViaje"
                                               placeholder="Selecciona un Viaje"
                                               maxlength="35"
                                               title="Id, no modificable por el usuario."
                                               disabled
                                        >
                                    </div>
                                </div>                                   <!--idViaje-->

                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Tipo de unidad:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control tipoUnidad comparacionForm"
                                               placeholder="Descripción unidad"
                                               maxlength="35"
                                               pattern="[a-zA-Z0-9- ñáéíóú]{5,70}"
                                               title="Solo letras,espacios y números (no signos), 5 - 70 caracteres."
                                        >
                                    </div>
                                </div>                                         <!--tipoUnidad-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Precio Combustible (l):</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control precioCombustible"
                                               placeholder="Al día."
                                               maxlength="35"
                                               pattern="[0-9.]{1,70}"
                                               title="Solo números y punto decimal(no espacios), 1 - 70 caracteres."
                                               required
                                        >
                                    </div>
                                </div>                                  <!--precioCombustible-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Costo Combustible:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control costoCombustible suma"
                                               placeholder="Total todo el viaje"
                                               maxlength="35"
                                               pattern="[0-9]{1,70}"
                                               title="Solo números (no espacios), 1 - 70 caracteres."
                                               required
                                        >
                                    </div>
                                </div>                                   <!--costoCombustible-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Peaje:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control peaje suma"
                                               placeholder="Calculo del peaje"
                                               maxlength="35"
                                               pattern="[0-9]{1,70}"
                                               title="Solo números (no espacios), 1 - 70 caracteres."
                                               required
                                        >
                                    </div>
                                </div>                                              <!--peaje-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Sueldo Chofer:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control sueldoChofer suma"
                                               placeholder="Sueldo Total"
                                               maxlength="35"
                                               pattern="[0-9]{1,70}"
                                               title="Solo números (no espacios), 1 - 70 caracteres."
                                               required
                                        >
                                    </div>
                                </div>                                       <!--sueldoChofer-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Hospedaje Chofer:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control hospedajeChofer suma"
                                               placeholder="Hospedaje Total"
                                               maxlength="35"
                                               pattern="[0-9]{1,70}"
                                               title="Solo números (no espacios), 1 - 70 caracteres."
                                               required
                                        >
                                    </div>
                                </div>                                    <!--hospedajeChofer-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*Extras:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control extras suma"
                                               placeholder="Extras Total"
                                               maxlength="35"
                                               pattern="[0-9]{1,70}"
                                               title="Solo números (no espacios), 1 - 70 caracteres."
                                               required
                                        >
                                    </div>
                                </div>                                             <!--extras-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Total Costos:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control costosTotal comparacionForm"
                                               placeholder="Autogenerado"
                                               maxlength="35"
                                               pattern="[0-9]{1,70}"
                                               title="Solo números (no espacios), 1 - 70 caracteres."
                                               required
                                               disabled
                                        >
                                    </div>
                                </div>                                        <!--costosTotal-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">*COTIZACIÓN:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control cotizacion"
                                               placeholder="Oferta al Cliente"
                                               maxlength="35"
                                               pattern="[0-9]{1,70}"
                                               title="Solo números (no espacios), 1 - 70 caracteres."
                                               required
                                        >
                                    </div>
                                </div>                                         <!--cotizacion-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Utilidad ($):</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control utilidad"
                                               placeholder="Autogenerado"
                                               maxlength="35"
                                               pattern="[0-9]{1,70}"
                                               title="Solo números (no espacios), 1 - 70 caracteres."
                                               required
                                               disabled
                                        >
                                    </div>
                                </div>                                           <!--utilidad-->
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Utilidad (%):</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control utilidadP"
                                               placeholder="Autogenerado opcional"
                                               maxlength="35"
                                               pattern="[0-9]{1,70}"
                                               title="Solo números (no espacios), 1 - 70 caracteres."
                                               required
                                        >
                                    </div>
                                </div>                                          <!--utilidadP-->
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-heading">
                                3. Comparación:
                            </div>
                            <div class="panel-body">

                                <ul class="nav nav-tabs">
                                    <li class="active"><a data-toggle="tab" href="#CotizacionesForm_estadoLugarDiasTipoCotizacionesViajes">| Estado + Lugar + #Días + Tipo |</a></li>
                                    <!--<li><a data-toggle="tab" href="#CotizacionesForm_tipoKmTCombustibleTCostosCotizacionesViajes">| Tipo + Km + TCombustible + TCostos |</a></li>-->
                                    <li><a data-toggle="tab" href="#CotizacionesForm_todosCotizacionesViajes">Todas las cotizaciones</a></li>
                                </ul>

                                <div class="tab-content">

                                    <div id="CotizacionesForm_estadoLugarDiasTipoCotizacionesViajes" class="tab-pane fade in active">

                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <table class="display nowrap compact table-bordered comparacion" cellspacing="0" width="100%" controller="estadoLugarDiasTipoCotizacionesViajes" usedata="comparacion">
                                                    <thead>
                                                    <tr>
                                                        <th colspan="3">Sistema</th>
                                                        <th colspan="2">Destino</th>
                                                        <th rowspan="2">Núm.<br>Días</th>
                                                        <th rowspan="2">Km</th>
                                                        <th rowspan="2">Temp.</th>
                                                        <th rowspan="2">Tipo<br>Unidad</th>
                                                        <th rowspan="2">Precio<br>Combustible<br>(l)</th>
                                                        <th colspan="5">Costos</th>
                                                        <th rowspan="2">Total<br>Costos</th>
                                                        <th rowspan="2">COTIZACIÓN</th>
                                                        <th rowspan="2">Utilidad<br>($)</th>
                                                        <th rowspan="2">Utilidad<br>(%)</th>
                                                    </tr>
                                                    <tr>
                                                        <th>ID <br>Cot.</th>
                                                        <th>Fecha Alta</th>
                                                        <th>ID <br>Viaje</th>
                                                        <th>Estado</th>
                                                        <th>Lugar</th>
                                                        <th>Total<br>Combustible<br>(km/l)</th>
                                                        <th>Peaje</th>
                                                        <th>Sueldo<br>Chofer</th>
                                                        <th>Hospedaje<br>Chofer</th>
                                                        <th>Extras</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                    </div>

                                    <!--<div id="CotizacionesForm_tipoKmTCombustibleTCostosCotizacionesViajes" class="tab-pane fade">

                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <table class="display nowrap compact table-bordered comparacion" cellspacing="0" width="100%" controller="tipoKmTCombustibleTCostosCotizacionesViajes" usedata="comparacion2">
                                                    <thead>
                                                    <tr>
                                                        <th colspan="3">Sistema</th>
                                                        <th colspan="2">Destino</th>
                                                        <th rowspan="2">Núm.<br>Días</th>
                                                        <th rowspan="2">Km</th>
                                                        <th rowspan="2">Temp.</th>
                                                        <th rowspan="2">Tipo<br>Unidad</th>
                                                        <th rowspan="2">Precio<br>Combustible<br>(l)</th>
                                                        <th colspan="5">Costos</th>
                                                        <th rowspan="2">Total<br>Costos</th>
                                                        <th rowspan="2">COTIZACIÓN</th>
                                                        <th rowspan="2">Utilidad<br>($)</th>
                                                        <th rowspan="2">Utilidad<br>(%)</th>
                                                    </tr>
                                                    <tr>
                                                        <th>ID <br>Cot.</th>
                                                        <th>Fecha Alta</th>
                                                        <th>ID <br>Viaje</th>
                                                        <th>Estado</th>
                                                        <th>Lugar</th>
                                                        <th>Total<br>Combustible<br>(km/l)</th>
                                                        <th>Peaje</th>
                                                        <th>Sueldo<br>Chofer</th>
                                                        <th>Hospedaje<br>Chofer</th>
                                                        <th>Extras</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>


                                    </div>-->

                                    <div id="CotizacionesForm_todosCotizacionesViajes" class="tab-pane fade">

                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <table class="display nowrap compact table-bordered comparacion" cellspacing="0" width="100%" controller="todosCotizacionesViajes">
                                                    <thead>
                                                    <tr>
                                                        <th colspan="3">Sistema</th>
                                                        <th colspan="2">Destino</th>
                                                        <th rowspan="2">Núm.<br>Días</th>
                                                        <th rowspan="2">Km</th>
                                                        <th rowspan="2">Temp.</th>
                                                        <th rowspan="2">Tipo<br>Unidad</th>
                                                        <th rowspan="2">Precio<br>Combustible<br>(l)</th>
                                                        <th colspan="5">Costos</th>
                                                        <th rowspan="2">Total<br>Costos</th>
                                                        <th rowspan="2">COTIZACIÓN</th>
                                                        <th rowspan="2">Utilidad<br>($)</th>
                                                        <th rowspan="2">Utilidad<br>(%)</th>
                                                    </tr>
                                                    <tr>
                                                        <th>ID <br>Cot.</th>
                                                        <th>Fecha Alta</th>
                                                        <th>ID <br>Viaje</th>
                                                        <th>Estado</th>
                                                        <th>Lugar</th>
                                                        <th>Total<br>Combustible<br>(km/l)</th>
                                                        <th>Peaje</th>
                                                        <th>Sueldo<br>Chofer</th>
                                                        <th>Hospedaje<br>Chofer</th>
                                                        <th>Extras</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>


                        <div class="col-sm-12 margen-arriba15 margen-abajo15">
                            <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                            <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                        </div>


                    </form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <ul class="nav nav-tabs">
                        <li class="active"><a data-toggle="tab" href="#Cotizaciones_todosCotizacionesViajes">Todas las cotizaciones</a></li>
                        <li><a data-toggle="tab" href="#Cotizaciones_vendidasCotizacionesViajes">Vendidas</a></li>
                        <li><a data-toggle="tab" href="#Cotizaciones_noVendidasCotizacionesViajes">No vendidas</a></li>
                    </ul>

                    <div class="tab-content">
                        <div id="Cotizaciones_todosCotizacionesViajes" class="tab-pane fade in active">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="todosCotizacionesViajes">
                                            <thead>
                                            <tr>
                                                <th colspan="3">Sistema</th>
                                                <th colspan="2">Destino</th>
                                                <th rowspan="2">Núm.<br>Días</th>
                                                <th rowspan="2">Km</th>
                                                <th rowspan="2">Temp.</th>
                                                <th rowspan="2">Tipo<br>Unidad</th>
                                                <th rowspan="2">Precio<br>Combustible<br>(l)</th>
                                                <th colspan="5">Costos</th>
                                                <th rowspan="2">Total<br>Costos</th>
                                                <th rowspan="2">COTIZACIÓN</th>
                                                <th rowspan="2">Utilidad<br>($)</th>
                                                <th rowspan="2">Utilidad<br>(%)</th>
                                            </tr>
                                            <tr>
                                                <th>ID <br>Cot.</th>
                                                <th>Fecha Alta</th>
                                                <th>ID <br>Viaje</th>
                                                <th>Estado</th>
                                                <th>Lugar</th>
                                                <th>Total<br>Combustible<br>(km/l)</th>
                                                <th>Peaje</th>
                                                <th>Sueldo<br>Chofer</th>
                                                <th>Hospedaje<br>Chofer</th>
                                                <th>Extras</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        </div>
                        <div id="Cotizaciones_vendidasCotizacionesViajes" class="tab-pane fade">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="vendidasCotizacionesViajes">
                                        <thead>
                                        <tr>
                                            <th colspan="3">Sistema</th>
                                            <th colspan="2">Destino</th>
                                            <th rowspan="2">Núm.<br>Días</th>
                                            <th rowspan="2">Km</th>
                                            <th rowspan="2">Temp.</th>
                                            <th rowspan="2">Tipo<br>Unidad</th>
                                            <th rowspan="2">Precio<br>Combustible<br>(l)</th>
                                            <th colspan="5">Costos</th>
                                            <th rowspan="2">Total<br>Costos</th>
                                            <th rowspan="2">COTIZACIÓN</th>
                                            <th rowspan="2">Utilidad<br>($)</th>
                                            <th rowspan="2">Utilidad<br>(%)</th>
                                        </tr>
                                        <tr>
                                            <th>ID <br>Cot.</th>
                                            <th>Fecha Alta</th>
                                            <th>ID <br>Viaje</th>
                                            <th>Estado</th>
                                            <th>Lugar</th>
                                            <th>Total<br>Combustible<br>(km/l)</th>
                                            <th>Peaje</th>
                                            <th>Sueldo<br>Chofer</th>
                                            <th>Hospedaje<br>Chofer</th>
                                            <th>Extras</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div id="Cotizaciones_noVendidasCotizacionesViajes" class="tab-pane fade">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="noVentaCotizacionesViajes">
                                        <thead>
                                        <tr>
                                            <th colspan="3">Sistema</th>
                                            <th colspan="2">Destino</th>
                                            <th rowspan="2">Núm.<br>Días</th>
                                            <th rowspan="2">Km</th>
                                            <th rowspan="2">Temp.</th>
                                            <th rowspan="2">Tipo<br>Unidad</th>
                                            <th rowspan="2">Precio<br>Combustible<br>(l)</th>
                                            <th colspan="5">Costos</th>
                                            <th rowspan="2">Total<br>Costos</th>
                                            <th rowspan="2">COTIZACIÓN</th>
                                            <th rowspan="2">Utilidad<br>($)</th>
                                            <th rowspan="2">Utilidad<br>(%)</th>
                                        </tr>
                                        <tr>
                                            <th>ID <br>Cot.</th>
                                            <th>Fecha Alta</th>
                                            <th>ID <br>Viaje</th>
                                            <th>Estado</th>
                                            <th>Lugar</th>
                                            <th>Total<br>Combustible<br>(km/l)</th>
                                            <th>Peaje</th>
                                            <th>Sueldo<br>Chofer</th>
                                            <th>Hospedaje<br>Chofer</th>
                                            <th>Extras</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </div>                                  <!--Modulo Cotizaciones-->


    </div>                                       <!--Contenedor Cotizaciones-->

    <div id="divVentas" class="container"> 				                            <!--Contenedor Ventas-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                               <!--Modulo Ventas-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon ventasIcon">
                    <i class="fa fa-money fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Ventas</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button type="button" class="btn-agregar btn btn-default btn-md">Agregar Nuevo</button>
                    <button type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Editar</button>
                    <button type="button" class="btn-PDF btn-needStelect btn btn-default btn-md margen-izquierda15" disabled>PDF</button>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Formulario de Venta:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal" autocomplete="off">

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        1. Selecciona una cotización:
                                    </div>
                                    <div class="panel-body">
                                        <table class="display nowrap compact table-bordered cotizacion" cellspacing="0" width="100%" controller="noVentaCotizacionesViajes">
                                            <thead>
                                            <tr>
                                                <th colspan="3">Sistema</th>
                                                <th colspan="2">Destino</th>
                                                <th rowspan="2">Núm.<br>Días</th>
                                                <th rowspan="2">Km</th>
                                                <th rowspan="2">Temp.</th>
                                                <th rowspan="2">Tipo<br>Unidad</th>
                                                <th rowspan="2">Precio<br>Combustible<br>(l)</th>
                                                <th colspan="5">Costos</th>
                                                <th rowspan="2">Total<br>Costos</th>
                                                <th rowspan="2">COTIZACIÓN</th>
                                                <th rowspan="2">Utilidad<br>($)</th>
                                                <th rowspan="2">Utilidad<br>(%)</th>
                                            </tr>
                                            <tr>
                                                <th>ID <br>Cot.</th>
                                                <th>Fecha Alta</th>
                                                <th>ID <br>Viaje</th>
                                                <th>Estado</th>
                                                <th>Lugar</th>
                                                <th>Total<br>Combustible<br>(km/l)</th>
                                                <th>Peaje</th>
                                                <th>Sueldo<br>Chofer</th>
                                                <th>Hospedaje<br>Chofer</th>
                                                <th>Extras</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        2. Selecciona una unidad:
                                    </div>
                                    <div class="panel-body">
                                        <table class="display nowrap compact table-bordered unidad" cellspacing="0" width="100%" controller="todosUnidadesPropietarios">
                                            <thead>
                                            <tr>
                                                <th colspan="2">Sistema</th>
                                                <th rowspan="2">Marca</th>
                                                <th rowspan="2">Modelo</th>
                                                <th rowspan="2">Año</th>
                                                <th rowspan="2">Capacidad<br>de personas</th>
                                                <th colspan="3">Propietario</th>
                                            </tr>
                                            <tr>
                                                <th>ID<br>Unidad</th>
                                                <th>Fecha Alta</th>
                                                <th>Nombre</th>
                                                <th>Paterno</th>
                                                <th>Materno</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        3. Selecciona un chofer:
                                    </div>
                                    <div class="panel-body">
                                        <table class="display nowrap compact table-bordered chofer" cellspacing="0" width="100%" controller="choferesTodos">
                                            <thead>
                                            <tr>
                                                <th rowspan="2">Nombre</th>
                                                <th colspan="2">Apellido</th>
                                                <th rowspan="2">Fecha nacimiento</th>
                                                <th colspan="5">Dirección</th>
                                                <th rowspan="2">Email</th>
                                                <th colspan="2">Teléfono</th>
                                                <th rowspan="2">CURP</th>
                                            </tr>
                                            <tr>
                                                <th>Paterno</th>
                                                <th>Materno</th>
                                                <th>Calle y número</th>
                                                <th>Delegación</th>
                                                <th>C.P.</th>
                                                <th>Colonia</th>
                                                <th>Estado</th>
                                                <th>Local</th>
                                                <th>Movil</th>
                                                <th>Sistema<br>Alta</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        2. Datos Críticos:
                                    </div>
                                    <div class="panel-body">
                                        <div class="form-group-sm collapse">
                                            <label class="control-label col-sm-3">ID:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control idVenta"
                                                       placeholder="XX"
                                                       maxlength="35"
                                                       title="Id, no modificable por el usuario."
                                                       disabled
                                                >
                                            </div>
                                        </div>                           <!--idVenta-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">ID Cotización:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control idCotizacion"
                                                       placeholder="Selecciona una cotización"
                                                       maxlength="35"
                                                       title="Id, no modificable por el usuario."
                                                       disabled
                                                >
                                            </div>
                                        </div>                               <!--idCotizacion-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">ID Unidad:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control idUnidad"
                                                       placeholder="Selecciona una unidad"
                                                       maxlength="35"
                                                       title="Id, no modificable por el usuario."
                                                       disabled
                                                >
                                            </div>
                                        </div>                                   <!--idUnidad-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">ID Chofer:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control idChofer"
                                                       placeholder="Selecciona un chofer"
                                                       maxlength="35"
                                                       title="Id, no modificable por el usuario."
                                                       disabled
                                                >
                                            </div>
                                        </div>                                   <!--idChofer-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">COTIZACIÓN:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control cotizacion"
                                                       placeholder="Selecciona una cotización"
                                                       maxlength="35"
                                                       pattern="[0-9]{1,70}"
                                                       title="Solo números (no espacios), 1 - 70 caracteres."
                                                       disabled
                                                >
                                            </div>
                                        </div>                                    <!--cotizacion-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">Total pagado:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control tPagado"
                                                       placeholder="Calculado en automatico"
                                                       maxlength="35"
                                                       pattern="[0-9]{1,70}"
                                                       title="Solo números (no espacios), 1 - 70 caracteres."
                                                       disabled
                                                >
                                            </div>
                                        </div>                                    <!--tPagado-->
                                        <div class="form-group-sm">
                                            <label class="control-label col-sm-3">Pago restante:</label>
                                            <div class="col-sm-7">
                                                <input type="text"
                                                       class="form-control deuda"
                                                       placeholder="Calculado en automatico"
                                                       maxlength="35"
                                                       pattern="[0-9]{1,70}"
                                                       title="Solo números (no espacios), 1 - 70 caracteres."
                                                       disabled
                                                >
                                            </div>
                                        </div>                                    <!--deuda-->
                                    </div>
                                    <div class="panel-footer text-right">
                                        <button type="button" class="btn btn-default btn-xs agregarPagosUno">3. Agregar Pagos</button>
                                    </div>
                                </div>

                                <div class="pagos">

                                </div>

                                <div class="col-sm-12 margen-arriba15 margen-abajo15">
                                    <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                                    <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default">

                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#Ventas_todosVentasViajesClientesCotizacionesPagos">Todas los ventas</a></li>
                            <li><a data-toggle="tab" href="#Ventas_pendientesVentasViajesClientesCotizacionesPagos">Cuentas pendientes</a></li>
                        </ul>

                        <div class="tab-content">
                            <div id="Ventas_todosVentasViajesClientesCotizacionesPagos" class="tab-pane fade in active">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="todosVentasViajesClientesCotizacionesPagos">
                                            <thead>
                                            <tr>
                                                <th colspan="2">Sistema</th>
                                                <th colspan="3">Cliente</th>
                                                <th colspan="2">Destino</th>
                                                <th colspan="2">Fecha y Hora</th>
                                                <th rowspan="2">Núm.Días</th>
                                                <th rowspan="2">Km</th>
                                                <th rowspan="2">Temp.</th>
                                                <!--<th rowspan="2">Itinerario</th>-->
                                                <th rowspan="2">Tipo<br>Unidad</th>
                                                <th rowspan="2">Precio<br>Combustible<br>(l)</th>
                                                <th colspan="5">Costos</th>
                                                <th rowspan="2">Total<br>Costos</th>
                                                <th rowspan="2">COTIZACIÓN</th>
                                                <th rowspan="2">Utilidad<br>($)</th>
                                                <th rowspan="2">Utilidad<br>(%)</th>
                                                <th rowspan="2">Pagos</th>
                                                <th rowspan="2">DEUDA</th>
                                                <th colspan="2">Unidad</th>
                                                <th rowspan="2">Chofer</th>
                                            </tr>
                                            <tr>
                                                <th>ID<br>Venta</th>
                                                <th>Fecha Alta</th>
                                                <th>Nombre</th>
                                                <th>Paterno</th>
                                                <th>Materno</th>
                                                <th>Estado</th>
                                                <th>Lugar</th>
                                                <th>Salida</th>
                                                <th>Regreso</th>
                                                <th>Total<br>Combustible<br>(km/l)</th>
                                                <th>Peaje</th>
                                                <th>Sueldo<br>Chofer</th>
                                                <th>Hospedaje<br>Chofer</th>
                                                <th>Extras</th>
                                                <th>Modelo</th>
                                                <th>Cap.Personas</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div id="Ventas_pendientesVentasViajesClientesCotizacionesPagos" class="tab-pane fade">
                                <div class="panel panel-default">
                                    <div class="panel-body">
                                        <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="pendientesVentasViajesClientesCotizacionesPagos">
                                            <thead>
                                            <tr>
                                                <th colspan="2">Sistema</th>
                                                <th colspan="3">Cliente</th>
                                                <th colspan="2">Destino</th>
                                                <th colspan="2">Fecha y Hora</th>
                                                <th rowspan="2">Núm.Días</th>
                                                <th rowspan="2">Km</th>
                                                <th rowspan="2">Temp.</th>
                                                <!--<th rowspan="2">Itinerario</th>-->
                                                <th rowspan="2">Tipo<br>Unidad</th>
                                                <th rowspan="2">Precio<br>Combustible<br>(l)</th>
                                                <th colspan="5">Costos</th>
                                                <th rowspan="2">Total<br>Costos</th>
                                                <th rowspan="2">COTIZACIÓN</th>
                                                <th rowspan="2">Utilidad<br>($)</th>
                                                <th rowspan="2">Utilidad<br>(%)</th>
                                                <th rowspan="2">Pagos</th>
                                                <th rowspan="2">DEUDA</th>
                                                <th colspan="2">Unidad</th>
                                                <th rowspan="2">Chofer</th>
                                            </tr>
                                            <tr>
                                                <th>ID<br>Venta</th>
                                                <th>Fecha Alta</th>
                                                <th>Nombre</th>
                                                <th>Paterno</th>
                                                <th>Materno</th>
                                                <th>Estado</th>
                                                <th>Lugar</th>
                                                <th>Salida</th>
                                                <th>Regreso</th>
                                                <th>Total<br>Combustible<br>(km/l)</th>
                                                <th>Peaje</th>
                                                <th>Sueldo<br>Chofer</th>
                                                <th>Hospedaje<br>Chofer</th>
                                                <th>Extras</th>
                                                <th>Modelo</th>
                                                <th>Cap.Personas</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>

        </div>                                  <!--Modulo Ventas-->


    </div>                                                   <!--Contenedor Ventas-->




    <div id="divConfiguracion" class="container"> 				                   <!--Contenedor Configuracion-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                          <!--Modulo Configuracion-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon configuracionIcon">
                    <i class="fa fa-cogs fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Configuración Módulos</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <div class="col-sm-12 acciones margen-abajo15">
                    <button id="configuracionEditar" type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Configurar modulos</button>
                </div>


                <div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Móduos activos:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal" autocomplete="off">

                                <div class="form-group-sm collapse">
                                    <label class="control-label col-sm-3">ID:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control idEmpleado"
                                               placeholder="XX"
                                               maxlength="35"
                                               title="Id, no modificable por el usuario."
                                        >
                                    </div>
                                </div>
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Nombre completo:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control nombre"
                                               placeholder="Nombre completo"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                               disabled
                                        >
                                    </div>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Empleados:
                                        <input type="checkbox" class="form-check-input empleados">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Contraseñas:
                                        <input type="checkbox" class="form-check-input contraseñas">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Clientes:
                                        <input type="checkbox" class="form-check-input clientes">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Viajes:
                                        <input type="checkbox" class="form-check-input viajes">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Cotizaciones:
                                        <input type="checkbox" class="form-check-input cotizaciones">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Ventas:
                                        <input type="checkbox" class="form-check-input ventas">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Unidades:
                                        <input type="checkbox" class="form-check-input unidades">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Choferes:
                                        <input type="checkbox" class="form-check-input choferes">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Propietarios:
                                        <input type="checkbox" class="form-check-input propietarios">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Registros:
                                        <input type="checkbox" class="form-check-input registros">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Configuración:
                                        <input type="checkbox" class="form-check-input configuracion">
                                    </label>
                                </div>


                                <div class="col-sm-12 margen-arriba15 margen-abajo15">
                                    <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                                    <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Todos los empleados:
                        </div>
                        <div class="panel-body">
                            <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="empleadosTodos">
                                <thead>
                                <tr>
                                    <th rowspan="2">Nombre</th>
                                    <th colspan="2">Apellido</th>
                                    <th rowspan="2">Fecha nacimiento</th>
                                    <th colspan="5">Dirección</th>
                                    <th rowspan="2">Email</th>
                                    <th colspan="2">Teléfono</th>
                                    <th rowspan="2">CURP</th>
                                    <th colspan="3">Sistema</th>
                                </tr>
                                <tr>
                                    <th>Paterno</th>
                                    <th>Materno</th>
                                    <th>Calle y número</th>
                                    <th>Delegación</th>
                                    <th>C.P.</th>
                                    <th>Colonia</th>
                                    <th>Estado</th>
                                    <th>Local</th>
                                    <th>Movil</th>
                                    <th>Alta</th>
                                    <th>Estado</th>
                                    <th>Usuario</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>                                  <!--Modulo Configuracion-->


    </div>                                         <!--Contenedor Configuracion-->

    <div id="divRegistros" class="container"> 				                   <!--Contenedor Registros-->

        <div class="col-xs-12 col-sm-12 paddingCero">                                          <!--Modulo Registros-->

            <div class="divModuloEncabezado">
                <div class="modulo-icon registrosIcon">
                    <i class="fa fa-hdd-o fa-3x" aria-hidden="true"></i>
                </div>
                <h2 class="floatLeft margen-izquierda15">Registros</h2>
            </div>

            <div class="divModuloMain">

                <div class="alert alert-danger alert-dismissable hiden margen-arriba15 text-left">
                    <a class="close collapseDad">×</a>
                    <span class="alertMensaje"></span>
                </div>

                <!--<div class="col-sm-12 acciones margen-abajo15">
                    <button id="configuracionEditar" type="button" class="btn-editar btn-needStelect btn btn-default btn-md" disabled>Configurar modulos</button>
                </div>-->


                <!--<div class="col-sm-12">
                    <div class="panel panel-default divMainForm hiden">
                        <div class="panel-heading">
                            Móduos activos:
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal" autocomplete="off">

                                <div class="form-group-sm collapse">
                                    <label class="control-label col-sm-3">ID:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control idEmpleado"
                                               placeholder="XX"
                                               maxlength="35"
                                               title="Id, no modificable por el usuario."
                                        >
                                    </div>
                                </div>
                                <div class="form-group-sm">
                                    <label class="control-label col-sm-3">Nombre completo:</label>
                                    <div class="col-sm-7">
                                        <input type="text"
                                               class="form-control nombre"
                                               placeholder="Nombre completo"
                                               maxlength="35"
                                               pattern="[A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]{1}[a-zñáéíóú]*([ ][A-ZÑÁÉÍÓÚ][a-zñáéíóú]*)*"
                                               title="Iniciales en mayúsculas, solo letras y espacios, no espacios al final, 2 - 35 caracteres. "
                                               disabled
                                        >
                                    </div>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Empleados:
                                        <input type="checkbox" class="form-check-input empleados">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Contraseñas:
                                        <input type="checkbox" class="form-check-input contraseñas">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Clientes:
                                        <input type="checkbox" class="form-check-input clientes">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Viajes:
                                        <input type="checkbox" class="form-check-input viajes">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Cotizaciones:
                                        <input type="checkbox" class="form-check-input cotizaciones">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Ventas:
                                        <input type="checkbox" class="form-check-input ventas">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Unidades:
                                        <input type="checkbox" class="form-check-input unidades">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Choferes:
                                        <input type="checkbox" class="form-check-input choferes">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Propietarios:
                                        <input type="checkbox" class="form-check-input propietarios">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Registros:
                                        <input type="checkbox" class="form-check-input registros">
                                    </label>
                                </div>
                                <div class="form-group-sm form-check">
                                    <label class="form-check-label control-label col-sm-7">
                                        Configuración:
                                        <input type="checkbox" class="form-check-input configuracion">
                                    </label>
                                </div>


                                <div class="col-sm-12 margen-arriba15 margen-abajo15">
                                    <button type="submit" class="btn .btn-lg btn-block btn-success">Guardar</button>
                                    <button type="reset" class="btn .btn-lg btn-block btn-danger btn-cancelar">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>-->

                <div class="col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Todos los registros:
                        </div>
                        <div class="panel-body">
                            <table class="display nowrap compact table-bordered mainTableDiv" cellspacing="0" width="100%" controller="registrosTodos">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Empleado ID</th>
                                    <th>Descripción</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

        </div>                                  <!--Modulo Registros-->


    </div>                                         <!--Contenedor Registros-->


    <script src="./Views/Js/inicio.js"></script>

</body>

</html>

<!--
COMENTARIOS GENERALES:

-->














