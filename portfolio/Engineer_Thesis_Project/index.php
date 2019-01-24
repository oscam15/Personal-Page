<?php

	require_once __DIR__."/Config/Constantes.php";                    //Inclusión de las constantes y funciones globales
	require_once __DIR__."/Autoload.php"; 			                  //Inclusión de archivo para Autoload de las clases
	\APP\Autoload::run();							                  //Arranca Autoload

	\APP\Utils\Sesion::checkOnIndex();

 ?>

 <!DOCTYPE html>
<html>
	<head>																							   <!--Unico head-->
		<meta charset="UTF-8">
		<meta name="description" content="descripcion">
		<meta name="keywords" content="keywords">
		<meta name="author" content="Oscar Camacho Urriolagoitia">
		<title><?php echo APPNAME ?> - Login </title>

        <meta name="viewport" content="width=device-width, initial-scale=1">

		<link rel="stylesheet"
			  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet"
              href="./Views/Style/font-awesome-4.7.0/css/font-awesome.min.css">

        <link rel="stylesheet" href="./Views/Style/main.css">	                                <!--Mi hoja de estilo-->


        <script src="https://code.jquery.com/jquery-3.1.1.min.js"	                  <!--Librerias jQuery y Boostrap-->
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
        crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

	</head>																						        <!-- head-->

	<body class="background-morado color-blanco">

		<div id="loginDiv" class="container text-center">									<!--Contenerdor del Login-->
			<div class="row ">
				<div class="col-xs-1 col-sm-3"></div>

				<div class="col-xs-10 col-sm-6">
                    <!--<h1><i class="fa fa-id-card-o fa-4x sombra" aria-hidden="true"></i></h1>-->
                    <img class="sombra" src="./Views/Reports/TCPDF-master/examples/images/my_bus2.png" alt="Buss View" style="width:400px;">
                    <h1 class="sombra">
                        Iniciar Sesión
                    </h1>
                    <form id="loginForm"
                          autocomplete="off">
                        <div class="form-group text-left sombra">
                            Usuario:
                            <input type="text"
                                   id="loginFormUserName"
                                   class="form-control"
                                   placeholder="Use &quot;admin&quot;"
                                   maxlength="45" pattern="[a-zA-Z0-9-]{5,45}"
                                   title="Solo letras y números (no signos), 5 - 45 caracteres."
                                   required autofocus>
                        </div>
                        <div class="form-group text-left sombra">
                            Contraseña:
                            <input type="password"
                                   id="loginFormPassword"
                                   class="form-control"
                                   placeholder="Use &quot;admin&quot;"
                                   maxlength="45"
                                   pattern="[a-zA-Z0-9-]{5,45}"
                                   title="Solo letras y números (no signos), 5 - 45 caracteres."
                                   required>
                        </div>
                        <button class="btn btn-primary btn-lg paddingLeft50"
                               type="submit">
                            Entrar
                            <i id="loadingLogin"
                               class="fa fa-spinner fa-spin fa-fw fa-lg  fade out align-right"></i>
                        </button>

                        <div id="errorLogin"
                             class="alert alert-danger alert-dismissable fade out margen-arriba15 text-left">
                            <a class="close fadeDadOut">×</a>
                            <strong>¡Error!: </strong><span id="errorLoginMensaje"></span>
                        </div>
                    </form>
				</div>

				<div class="col-xs-1 col-sm-3"></div>
			</div>
		</div> 								 <!--Contenedor del Login-->

		<script src="./Views/Js/index.js"></script>                                                  <!--Funciones JS-->

	</body>

</html>

<!--
COMENTARIOS GENERALES:
-->
