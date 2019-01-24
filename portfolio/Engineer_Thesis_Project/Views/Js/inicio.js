$(document).ready(function () {

    $.extend( true, $.fn.dataTable.defaults, {
        "scrollX": true,
        "fixedColumns": true,
        "language": {
            "lengthMenu": "Mostrar _MENU_ filas por página",
            "zeroRecords": "Sin resultados",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "Sin información disponible",
            "thousands":      ",",
            "loadingRecords": "Cargando...",
            "processing":     "Procesando...",
            "search":         "Buscar:",
            "paginate": {
                "first":      "Inicio",
                "last":       "Final",
                "next":       "Siguiente",
                "previous":   "Anterior"
            },
            "aria": {
                "sortAscending":  ": activa para ordenar la comlumna ascendente",
                "sortDescending": ": activa para ordenar la comlumna descendente"
            },
            "infoFiltered": "(filtrado de _MAX_ filas totales)",
            "select": {
                rows: "",
            }
        }
    } );                   /*Valores por default de las jQuery DataTables*/

    $("#headerDiv").fadeIn(500, function(){  $("#divMain").fadeIn(1500); });



    $(".irAInicio").click( function (evt) {
        irAInicio();
    });                                                       /*Ir al inicio*/
    $(".cerrarSesion").click( function (evt) {
        cerrarSesion();
    });                                                   /*Cerrar sesion*/

    function irAInicio() {
        $(".container").fadeOut(0, function(){
            $("body").removeClass("background-blanco");
            $("body").addClass("background-morado");
            $("#divMain").fadeIn("fast");
        });


    }
    function cerrarSesion() {
        window.location.href = "./cerrarsesion.php";
    }

    $(".acceso-icon").click(function (evt) {
        var theDiv = $('#div'+$(this).attr('nombre'));

        irModulo(theDiv);
        //actualizatabla($(theDiv.find('.mainTableDiv')));

        var tablas = $(theDiv.find('.mainTableDiv'));
        $.each(tablas, function( key, value ) {

            if(key%2==0){
                actualizatabla($(tablas[key,key+1]));
            }

        });
    });
    function irModulo(elementModulo){
        $("#divMain").fadeOut(0, function(){
            $("body").removeClass("background-morado");
            $("body").addClass("background-blanco");
            elementModulo.fadeIn("fast");
        });

    }
    function actualizatabla(tablaHtml){

        if (tablaHtml.attr('usedata') == 'comparacion'){
            var selected = theDivCotizaciones.find('.divMainForm form table.viaje').DataTable().row( { selected: true } ).data();

            if(!selected||theDivCotizaciones.find('.divMainForm form').find('.tipoUnidad').val()=="")return;

            $.ajax({
                url     : "./Controllers/baseController.php",
                type    : 'POST',
                dataType: 'json',
                data    : {
                    action: tablaHtml.attr('controller'),
                    destinoEstado: selected.destinoEstado,
                    destinoLugar: selected.destinoLugar,
                    diasNum: selected.diasNum,
                    tipoUnidad: theDivCotizaciones.find('.divMainForm form').find('.tipoUnidad').val()
                }
            })
                .done(function (data) {
                    if (data.success) {
                        tablaHtml.DataTable()
                            .row().deselect()
                            .clear()
                            .rows.add(data.todos).draw();
                    }
                    else {

                        alerta(tablaHtml,"error","<strong>¡Error!: </strong>"+data.error);

                    }
                })
                .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Error: " + errorThrown);
                });

        }
        else if (tablaHtml.attr('usedata') == 'comparacion2'){

            var selected = theDivCotizaciones.find('.divMainForm form table.viaje').DataTable().row( { selected: true } ).data();

            if(!selected
                ||theDivCotizaciones.find('.divMainForm form').find('.tipoUnidad').val()==""
                ||theDivCotizaciones.find('.divMainForm form').find('.costoCombustible').val()==""
                ||theDivCotizaciones.find('.divMainForm form').find('.costosTotal').val()==""
            )return;

            $.ajax({
                url     : "./Controllers/baseController.php",
                type    : 'POST',
                dataType: 'json',
                data    : {
                    action: tablaHtml.attr('controller'),
                    kilometros: selected.kilometros,
                    tipoUnidad: theDivCotizaciones.find('.divMainForm form').find('.tipoUnidad').val(),
                    costoCombustible: theDivCotizaciones.find('.divMainForm form').find('.costoCombustible').val(),
                    costosTotal: theDivCotizaciones.find('.divMainForm form').find('.costosTotal').val()
                }
            })
                .done(function (data) {
                    if (data.success) {
                        tablaHtml.DataTable()
                            .row().deselect()
                            .clear()
                            .rows.add(data.todos).draw();
                    }
                    else {

                        alerta(tablaHtml,"error","<strong>¡Error!: </strong>"+data.error);

                    }
                })
                .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Error: " + errorThrown);
                });

        }
        else{

            $.ajax({
                url     : "./Controllers/baseController.php",
                type    : 'POST',
                dataType: 'json',
                data    : {
                    action: tablaHtml.attr('controller')
                }
            })
                .done(function (data) {
                    if (data.success) {
                        tablaHtml.DataTable()
                            .row().deselect()
                            .clear()
                            .rows.add(data.todos).draw();
                    }
                    else {

                        alerta(tablaHtml,"error","<strong>¡Error!: </strong>"+data.error);

                    }
                })
                .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("Error: " + errorThrown);
                });

        }

    }
    function alerta(element,type,mensaje){

        if (type == "success"){
            element.closest(".divModuloMain").children(".alert")
                .removeClass("alert-danger")
                .addClass("alert-success")
        }else{
            element.closest(".divModuloMain").children(".alert")
                .removeClass("alert-success")
                .addClass("alert-danger")
        }
        element.closest(".divModuloMain").children(".alert")
            .fadeIn("fast")
            .children(".alertMensaje")
            .html(mensaje);
        $('html, body').animate({ scrollTop: $('body').offset().top}, 'slow');

    }

    $(".collapseDad").click( function (evt) {
        $(this).parent().fadeOut("fast");
    });                                                /*Replegar al padre*/


    $(".btn-agregar").click(function (evt) {
        $(this).closest('.divModuloMain').find('.divMainForm')
            .show("fast")

            .find('form')
            .attr("accion","agregar")
            .trigger("reset");

    });
    $(".btn-cancelar").click(function (evt) {
        $(this).closest(".divMainForm").hide("fast");
    });

    $(".btn-editar").click(function (evt) {
        $(this).closest('.divModuloMain').find(".divMainForm")
            .show("fast")
            
            .find('form')
            .attr("accion","editar");
    });
    

    $(".divMainForm").on('change',".direccionSelectEstado", function() {

        $(this).closest(".form-group-sm").next().next().find("select").html('' +
            '<option value="">Primero selecciona una delegación o municipio</option>');
        $(this).closest(".form-group-sm").next().next().next().find("select").html('' +
            '<option value="">Primero selecciona un codigo postal</option>');

        if ($(this).find(":selected").val() == "Aguascalientes"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Aguascalientes">Aguascalientes</option>'+
                '<option value="Asientos">Asientos</option>'+
                '<option value="Calvillo">Calvillo</option>'+
                '<option value="Cosio">Cosio</option>'+
                '<option value="Jesus Maria">Jesus Maria</option>'+
                '<option value="Pabellon de Arteaga">Pabellon de Arteaga</option>'+
                '<option value="Rincon de Romos">Rincon de Romos</option>'+
                '<option value="San Jose de Gracia">San Jose de Gracia</option>'+
                '<option value="Tepezala">Tepezala</option>'+
                '<option value="El Llano">El Llano</option>'+
                '<option value="San Francisco de los Romo">San Francisco de los Romo</option>');
        }
        else if ($(this).find(":selected").val() == "Baja California"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Ensenada">Ensenada</option>'+
                '<option value="Mexicali">Mexicali</option>'+
                '<option value="Tecate">Tecate</option>'+
                '<option value="Tijuana">Tijuana</option>'+
                '<option value="Playas de Rosarito">Playas de Rosarito</option>');
        }
        else if ($(this).find(":selected").val() == "Baja California Sur"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Comondu\">Comondu<\/option>' +
                '<option value=\"Mulege\">Mulege<\/option>' +
                '<option value=\"La Paz\">La Paz<\/option>' +
                '<option value=\"Los Cabos\">Los Cabos<\/option>' +
                '<option value=\"Loreto\">Loreto<\/option>');
        }
        else if ($(this).find(":selected").val() == "Campeche"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Calkini">Calkini</option>'+
                '<option value="Campeche">Campeche</option>'+
                '<option value="Carmen">Carmen</option>'+
                '<option value="Champoton">Champoton</option>'+
                '<option value="Hecelchakan">Hecelchakan</option>'+
                '<option value="Hopelchen">Hopelchen</option>'+
                '<option value="Palizada">Palizada</option>'+
                '<option value="Tenabo">Tenabo</option>'+
                '<option value="Escarcega">Escarcega</option>'+
                '<option value="Calakmul">Calakmul</option>'+
                '<option value="Candelaria">Candelaria</option>');
        }
        else if ($(this).find(":selected").val() == "Coahuila de Zaragoza"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Abasolo">Abasolo</option>'+
                '<option value="Acu">Acu</option>'+
                '<option value="Allende">Allende</option>'+
                '<option value="Arteaga">Arteaga</option>'+
                '<option value="Candela">Candela</option>'+
                '<option value="Casta">Casta</option>'+
                '<option value="Cuatro Cienegas">Cuatro Cienegas</option>'+
                '<option value="Escobedo">Escobedo</option>'+
                '<option value="Francisco I. Madero">Francisco I. Madero</option>'+
                '<option value="Frontera">Frontera</option>'+
                '<option value="General Cepeda">General Cepeda</option>'+
                '<option value="Guerrero">Guerrero</option>'+
                '<option value="Hidalgo">Hidalgo</option>'+
                '<option value="Jimenez">Jimenez</option>'+
                '<option value="Juarez">Juarez</option>'+
                '<option value="Lamadrid">Lamadrid</option>'+
                '<option value="Matamoros">Matamoros</option>'+
                '<option value="Monclova">Monclova</option>'+
                '<option value="Morelos">Morelos</option>'+
                '<option value="Muzquiz">Muzquiz</option>'+
                '<option value="Nadadores">Nadadores</option>'+
                '<option value="Nava">Nava</option>'+
                '<option value="Ocampo">Ocampo</option>'+
                '<option value="Parras">Parras</option>'+
                '<option value="Piedras Negras">Piedras Negras</option>'+
                '<option value="Progreso">Progreso</option>'+
                '<option value="Ramos Arizpe">Ramos Arizpe</option>'+
                '<option value="Sabinas">Sabinas</option>'+
                '<option value="Sacramento">Sacramento</option>'+
                '<option value="Saltillo">Saltillo</option>'+
                '<option value="San Buenaventura">San Buenaventura</option>'+
                '<option value="San Juan de Sabinas">San Juan de Sabinas</option>'+
                '<option value="San Pedro">San Pedro</option>'+
                '<option value="Sierra Mojada">Sierra Mojada</option>'+
                '<option value="Torreon">Torreon</option>'+
                '<option value="Viesca">Viesca</option>'+
                '<option value="Villa Union">Villa Union</option>'+
                '<option value="Zaragoza">Zaragoza</option>');
        }
        else if ($(this).find(":selected").val() == "Colima"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Armeria">Armeria</option>'+
                '<option value="Colima">Colima</option>'+
                '<option value="Comala">Comala</option>'+
                '<option value="Coquimatlan">Coquimatlan</option>'+
                '<option value="Cuauhtemoc">Cuauhtemoc</option>'+
                '<option value="Ixtlahuacan">Ixtlahuacan</option>'+
                '<option value="Manzanillo">Manzanillo</option>'+
                '<option value="Minatitlan">Minatitlan</option>'+
                '<option value="Tecoman">Tecoman</option>'+
                '<option value="Villa de Alvarez">Villa de Alvarez</option>');
        }
        else if ($(this).find(":selected").val() == "Chiapas"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Acacoyagua">Acacoyagua</option>'+
                '<option value="Acala">Acala</option>'+
                '<option value="Acapetahua">Acapetahua</option>'+
                '<option value="Altamirano">Altamirano</option>'+
                '<option value="Amatan">Amatan</option>'+
                '<option value="Amatenango de la Frontera">Amatenango de la Frontera</option>'+
                '<option value="Amatenango del Valle">Amatenango del Valle</option>'+
                '<option value="Angel Albino Corzo">Angel Albino Corzo</option>'+
                '<option value="Arriaga">Arriaga</option>'+
                '<option value="Bejucal de Ocampo">Bejucal de Ocampo</option>'+
                '<option value="Bella Vista">Bella Vista</option>'+
                '<option value="Berriozabal">Berriozabal</option>'+
                '<option value="Bochil">Bochil</option>'+
                '<option value="El Bosque">El Bosque</option>'+
                '<option value="Cacahoatan">Cacahoatan</option>'+
                '<option value="Catazaja">Catazaja</option>'+
                '<option value="Cintalapa">Cintalapa</option>'+
                '<option value="Coapilla">Coapilla</option>'+
                '<option value="Comitan de Dominguez">Comitan de Dominguez</option>'+
                '<option value="La Concordia">La Concordia</option>'+
                '<option value="Copainala">Copainala</option>'+
                '<option value="Chalchihuitan">Chalchihuitan</option>'+
                '<option value="Chamula">Chamula</option>'+
                '<option value="Chanal">Chanal</option>'+
                '<option value="Chapultenango">Chapultenango</option>'+
                '<option value="Chenalho">Chenalho</option>'+
                '<option value="Chiapa de Corzo">Chiapa de Corzo</option>'+
                '<option value="Chiapilla">Chiapilla</option>'+
                '<option value="Chicoasen">Chicoasen</option>'+
                '<option value="Chicomuselo">Chicomuselo</option>'+
                '<option value="Chilon">Chilon</option>'+
                '<option value="Escuintla">Escuintla</option>'+
                '<option value="Francisco Leon">Francisco Leon</option>'+
                '<option value="Frontera Comalapa">Frontera Comalapa</option>'+
                '<option value="Frontera Hidalgo">Frontera Hidalgo</option>'+
                '<option value="La Grandeza">La Grandeza</option>'+
                '<option value="Huehuetan">Huehuetan</option>'+
                '<option value="Huixtan">Huixtan</option>'+
                '<option value="Huitiupan">Huitiupan</option>'+
                '<option value="Huixtla">Huixtla</option>'+
                '<option value="La Independencia">La Independencia</option>'+
                '<option value="Ixhuatan">Ixhuatan</option>'+
                '<option value="Ixtacomitan">Ixtacomitan</option>'+
                '<option value="Ixtapa">Ixtapa</option>'+
                '<option value="Ixtapangajoya">Ixtapangajoya</option>'+
                '<option value="Jiquipilas">Jiquipilas</option>'+
                '<option value="Jitotol">Jitotol</option>'+
                '<option value="Juarez">Juarez</option>'+
                '<option value="Larrainzar">Larrainzar</option>'+
                '<option value="La Libertad">La Libertad</option>'+
                '<option value="Mapastepec">Mapastepec</option>'+
                '<option value="Las Margaritas">Las Margaritas</option>'+
                '<option value="Mazapa de Madero">Mazapa de Madero</option>'+
                '<option value="Mazatan">Mazatan</option>'+
                '<option value="Metapa">Metapa</option>'+
                '<option value="Mitontic">Mitontic</option>'+
                '<option value="Motozintla">Motozintla</option>'+
                '<option value="Nicolas Ruiz">Nicolas Ruiz</option>'+
                '<option value="Ocosingo">Ocosingo</option>'+
                '<option value="Ocotepec">Ocotepec</option>'+
                '<option value="Ocozocoautla de Espinosa">Ocozocoautla de Espinosa</option>'+
                '<option value="Ostuacan">Ostuacan</option>'+
                '<option value="Osumacinta">Osumacinta</option>'+
                '<option value="Oxchuc">Oxchuc</option>'+
                '<option value="Palenque">Palenque</option>'+
                '<option value="Pantelho">Pantelho</option>'+
                '<option value="Pantepec">Pantepec</option>'+
                '<option value="Pichucalco">Pichucalco</option>'+
                '<option value="Pijijiapan">Pijijiapan</option>'+
                '<option value="El Porvenir">El Porvenir</option>'+
                '<option value="Villa Comaltitlan">Villa Comaltitlan</option>'+
                '<option value="Pueblo Nuevo Solistahuacan">Pueblo Nuevo Solistahuacan</option>'+
                '<option value="Rayon">Rayon</option>'+
                '<option value="Reforma">Reforma</option>'+
                '<option value="Las Rosas">Las Rosas</option>'+
                '<option value="Sabanilla">Sabanilla</option>'+
                '<option value="Salto de Agua">Salto de Agua</option>'+
                '<option value="San Cristobal de las Casas">San Cristobal de las Casas</option>'+
                '<option value="San Fernando">San Fernando</option>'+
                '<option value="Siltepec">Siltepec</option>'+
                '<option value="Simojovel">Simojovel</option>'+
                '<option value="Sitala">Sitala</option>'+
                '<option value="Socoltenango">Socoltenango</option>'+
                '<option value="Solosuchiapa">Solosuchiapa</option>'+
                '<option value="Soyalo">Soyalo</option>'+
                '<option value="Suchiapa">Suchiapa</option>'+
                '<option value="Suchiate">Suchiate</option>'+
                '<option value="Sunuapa">Sunuapa</option>'+
                '<option value="Tapachula">Tapachula</option>'+
                '<option value="Tapalapa">Tapalapa</option>'+
                '<option value="Tapilula">Tapilula</option>'+
                '<option value="Tecpatan">Tecpatan</option>'+
                '<option value="Tenejapa">Tenejapa</option>'+
                '<option value="Teopisca">Teopisca</option>'+
                '<option value="Tila">Tila</option>'+
                '<option value="Tonala">Tonala</option>'+
                '<option value="Totolapa">Totolapa</option>'+
                '<option value="La Trinitaria">La Trinitaria</option>'+
                '<option value="Tumbala">Tumbala</option>'+
                '<option value="Tuxtla Gutierrez">Tuxtla Gutierrez</option>'+
                '<option value="Tuxtla Chico">Tuxtla Chico</option>'+
                '<option value="Tuzantan">Tuzantan</option>'+
                '<option value="Tzimol">Tzimol</option>'+
                '<option value="Union Juarez">Union Juarez</option>'+
                '<option value="Venustiano Carranza">Venustiano Carranza</option>'+
                '<option value="Villa Corzo">Villa Corzo</option>'+
                '<option value="Villaflores">Villaflores</option>'+
                '<option value="Yajalon">Yajalon</option>'+
                '<option value="San Lucas">San Lucas</option>'+
                '<option value="Zinacantan">Zinacantan</option>'+
                '<option value="San Juan Cancuc">San Juan Cancuc</option>'+
                '<option value="Aldama">Aldama</option>'+
                '<option value="Benemerito de las Americas">Benemerito de las Americas</option>'+
                '<option value="Maravilla Tenejapa">Maravilla Tenejapa</option>'+
                '<option value="Marques de Comillas">Marques de Comillas</option>'+
                '<option value="Montecristo de Guerrero">Montecristo de Guerrero</option>'+
                '<option value="San Andres Duraznal">San Andres Duraznal</option>'+
                '<option value="Santiago el Pinar">Santiago el Pinar</option>');
        }
        else if ($(this).find(":selected").val() == "Chihuahua"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Ahumada">Ahumada</option>'+
                '<option value="Aldama">Aldama</option>'+
                '<option value="Allende">Allende</option>'+
                '<option value="Aquiles Serdan">Aquiles Serdan</option>'+
                '<option value="Ascension">Ascension</option>'+
                '<option value="Bachiniva">Bachiniva</option>'+
                '<option value="Balleza">Balleza</option>'+
                '<option value="Batopilas">Batopilas</option>'+
                '<option value="Bocoyna">Bocoyna</option>'+
                '<option value="Buenaventura">Buenaventura</option>'+
                '<option value="Camargo">Camargo</option>'+
                '<option value="Carichi">Carichi</option>'+
                '<option value="Casas Grandes">Casas Grandes</option>'+
                '<option value="Coronado">Coronado</option>'+
                '<option value="Coyame del Sotol">Coyame del Sotol</option>'+
                '<option value="La Cruz">La Cruz</option>'+
                '<option value="Cuauhtemoc">Cuauhtemoc</option>'+
                '<option value="Cusihuiriachi">Cusihuiriachi</option>'+
                '<option value="Chihuahua">Chihuahua</option>'+
                '<option value="Chinipas">Chinipas</option>'+
                '<option value="Delicias">Delicias</option>'+
                '<option value="Dr. Belisario Dominguez">Dr. Belisario Dominguez</option>'+
                '<option value="Galeana">Galeana</option>'+
                '<option value="Santa Isabel">Santa Isabel</option>'+
                '<option value="Gomez Farias">Gomez Farias</option>'+
                '<option value="Gran Morelos">Gran Morelos</option>'+
                '<option value="Guachochi">Guachochi</option>'+
                '<option value="Guadalupe">Guadalupe</option>'+
                '<option value="Guadalupe y Calvo">Guadalupe y Calvo</option>'+
                '<option value="Guazapares">Guazapares</option>'+
                '<option value="Guerrero">Guerrero</option>'+
                '<option value="Hidalgo del Parral">Hidalgo del Parral</option>'+
                '<option value="Huejotitan">Huejotitan</option>'+
                '<option value="Ignacio Zaragoza">Ignacio Zaragoza</option>'+
                '<option value="Janos">Janos</option>'+
                '<option value="Jimenez">Jimenez</option>'+
                '<option value="Juarez">Juarez</option>'+
                '<option value="Julimes">Julimes</option>'+
                '<option value="Lopez">Lopez</option>'+
                '<option value="Madera">Madera</option>'+
                '<option value="Maguarichi">Maguarichi</option>'+
                '<option value="Manuel Benavides">Manuel Benavides</option>'+
                '<option value="Matachi">Matachi</option>'+
                '<option value="Matamoros">Matamoros</option>'+
                '<option value="Meoqui">Meoqui</option>'+
                '<option value="Morelos">Morelos</option>'+
                '<option value="Moris">Moris</option>'+
                '<option value="Namiquipa">Namiquipa</option>'+
                '<option value="Nonoava">Nonoava</option>'+
                '<option value="Nuevo Casas Grandes">Nuevo Casas Grandes</option>'+
                '<option value="Ocampo">Ocampo</option>'+
                '<option value="Ojinaga">Ojinaga</option>'+
                '<option value="Praxedis G. Guerrero">Praxedis G. Guerrero</option>'+
                '<option value="Riva Palacio">Riva Palacio</option>'+
                '<option value="Rosales">Rosales</option>'+
                '<option value="Rosario">Rosario</option>'+
                '<option value="San Francisco de Borja">San Francisco de Borja</option>'+
                '<option value="San Francisco de Conchos">San Francisco de Conchos</option>'+
                '<option value="San Francisco del Oro">San Francisco del Oro</option>'+
                '<option value="Santa Barbara">Santa Barbara</option>'+
                '<option value="Satevo">Satevo</option>'+
                '<option value="Saucillo">Saucillo</option>'+
                '<option value="Temosachic">Temosachic</option>'+
                '<option value="El Tule">El Tule</option>'+
                '<option value="Urique">Urique</option>'+
                '<option value="Uruachi">Uruachi</option>'+
                '<option value="Valle de Zaragoza">Valle de Zaragoza</option>');
        }
        else if ($(this).find(":selected").val() == "Distrito Federal"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Azcapotzalco">Azcapotzalco</option>'+
                '<option value="Coyoacan">Coyoacan</option>'+
                '<option value="Cuajimalpa de Morelos">Cuajimalpa de Morelos</option>'+
                '<option value="Gustavo A. Madero">Gustavo A. Madero</option>'+
                '<option value="Iztacalco">Iztacalco</option>'+
                '<option value="Iztapalapa">Iztapalapa</option>'+
                '<option value="La Magdalena Contreras">La Magdalena Contreras</option>'+
                '<option value="Milpa Alta">Milpa Alta</option>'+
                '<option value="Alvaro Obregon">Alvaro Obregon</option>'+
                '<option value="Tlahuac">Tlahuac</option>'+
                '<option value="Tlalpan">Tlalpan</option>'+
                '<option value="Xochimilco">Xochimilco</option>'+
                '<option value="Benito Juarez">Benito Juarez</option>'+
                '<option value="Cuauhtemoc">Cuauhtemoc</option>'+
                '<option value="Miguel Hidalgo">Miguel Hidalgo</option>'+
                '<option value="Venustiano Carranza">Venustiano Carranza</option>');
        }
        else if ($(this).find(":selected").val() == "Durango"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Canatlan">Canatlan</option>'+
                '<option value="Canelas">Canelas</option>'+
                '<option value="Coneto de Comonfort">Coneto de Comonfort</option>'+
                '<option value="Cuencame">Cuencame</option>'+
                '<option value="Durango">Durango</option>'+
                '<option value="General Simon Bolivar">General Simon Bolivar</option>'+
                '<option value="Gomez Palacio">Gomez Palacio</option>'+
                '<option value="Guadalupe Victoria">Guadalupe Victoria</option>'+
                '<option value="Guanacevi">Guanacevi</option>'+
                '<option value="Hidalgo">Hidalgo</option>'+
                '<option value="Inde">Inde</option>'+
                '<option value="Lerdo">Lerdo</option>'+
                '<option value="Mapimi">Mapimi</option>'+
                '<option value="Mezquital">Mezquital</option>'+
                '<option value="Nazas">Nazas</option>'+
                '<option value="Nombre de Dios">Nombre de Dios</option>'+
                '<option value="Ocampo">Ocampo</option>'+
                '<option value="El Oro">El Oro</option>'+
                '<option value="Otaez">Otaez</option>'+
                '<option value="Panuco de Coronado">Panuco de Coronado</option>'+
                '<option value="Pe">Pe</option>'+
                '<option value="Poanas">Poanas</option>'+
                '<option value="Pueblo Nuevo">Pueblo Nuevo</option>'+
                '<option value="Rodeo">Rodeo</option>'+
                '<option value="San Bernardo">San Bernardo</option>'+
                '<option value="San Dimas">San Dimas</option>'+
                '<option value="San Juan de Guadalupe">San Juan de Guadalupe</option>'+
                '<option value="San Juan del Rio">San Juan del Rio</option>'+
                '<option value="San Luis del Cordero">San Luis del Cordero</option>'+
                '<option value="San Pedro del Gallo">San Pedro del Gallo</option>'+
                '<option value="Santa Clara">Santa Clara</option>'+
                '<option value="Santiago Papasquiaro">Santiago Papasquiaro</option>'+
                '<option value="Suchil">Suchil</option>'+
                '<option value="Tamazula">Tamazula</option>'+
                '<option value="Tepehuanes">Tepehuanes</option>'+
                '<option value="Tlahualilo">Tlahualilo</option>'+
                '<option value="Topia">Topia</option>'+
                '<option value="Vicente Guerrero">Vicente Guerrero</option>'+
                '<option value="Nuevo Ideal">Nuevo Ideal</option>');
        }
        else if ($(this).find(":selected").val() == "Guanajuato"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Abasolo">Abasolo</option>'+
                '<option value="Acambaro">Acambaro</option>'+
                '<option value="San Miguel de Allende">San Miguel de Allende</option>'+
                '<option value="Apaseo el Alto">Apaseo el Alto</option>'+
                '<option value="Apaseo el Grande">Apaseo el Grande</option>'+
                '<option value="Atarjea">Atarjea</option>'+
                '<option value="Celaya">Celaya</option>'+
                '<option value="Manuel Doblado">Manuel Doblado</option>'+
                '<option value="Comonfort">Comonfort</option>'+
                '<option value="Coroneo">Coroneo</option>'+
                '<option value="Cortazar">Cortazar</option>'+
                '<option value="Cueramaro">Cueramaro</option>'+
                '<option value="Doctor Mora">Doctor Mora</option>'+
                '<option value="Dolores Hidalgo Cuna de la Independencia Nacional">Dolores Hidalgo Cuna de la Independencia Nacional</option>'+
                '<option value="Guanajuato">Guanajuato</option>'+
                '<option value="Huanimaro">Huanimaro</option>'+
                '<option value="Irapuato">Irapuato</option>'+
                '<option value="Jaral del Progreso">Jaral del Progreso</option>'+
                '<option value="Jerecuaro">Jerecuaro</option>'+
                '<option value="Leon">Leon</option>'+
                '<option value="Moroleon">Moroleon</option>'+
                '<option value="Ocampo">Ocampo</option>'+
                '<option value="Penjamo">Penjamo</option>'+
                '<option value="Pueblo Nuevo">Pueblo Nuevo</option>'+
                '<option value="Purisima del Rincon">Purisima del Rincon</option>'+
                '<option value="Romita">Romita</option>'+
                '<option value="Salamanca">Salamanca</option>'+
                '<option value="Salvatierra">Salvatierra</option>'+
                '<option value="San Diego de la Union">San Diego de la Union</option>'+
                '<option value="San Felipe">San Felipe</option>'+
                '<option value="San Francisco del Rincon">San Francisco del Rincon</option>'+
                '<option value="San Jose Iturbide">San Jose Iturbide</option>'+
                '<option value="San Luis de la Paz">San Luis de la Paz</option>'+
                '<option value="Santa Catarina">Santa Catarina</option>'+
                '<option value="Santa Cruz de Juventino Rosas">Santa Cruz de Juventino Rosas</option>'+
                '<option value="Santiago Maravatio">Santiago Maravatio</option>'+
                '<option value="Silao">Silao</option>'+
                '<option value="Tarandacuao">Tarandacuao</option>'+
                '<option value="Tarimoro">Tarimoro</option>'+
                '<option value="Tierra Blanca">Tierra Blanca</option>'+
                '<option value="Uriangato">Uriangato</option>'+
                '<option value="Valle de Santiago">Valle de Santiago</option>'+
                '<option value="Victoria">Victoria</option>'+
                '<option value="Villagran">Villagran</option>'+
                '<option value="Xichu">Xichu</option>'+
                '<option value="Yuriria">Yuriria</option>');
        }
        else if ($(this).find(":selected").val() == "Guerrero"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Acapulco de Juarez">Acapulco de Juarez</option>'+
                '<option value="Ahuacuotzingo">Ahuacuotzingo</option>'+
                '<option value="Ajuchitlan del Progreso">Ajuchitlan del Progreso</option>'+
                '<option value="Alcozauca de Guerrero">Alcozauca de Guerrero</option>'+
                '<option value="Alpoyeca">Alpoyeca</option>'+
                '<option value="Apaxtla">Apaxtla</option>'+
                '<option value="Arcelia">Arcelia</option>'+
                '<option value="Atenango del Rio">Atenango del Rio</option>'+
                '<option value="Atlamajalcingo del Monte">Atlamajalcingo del Monte</option>'+
                '<option value="Atlixtac">Atlixtac</option>'+
                '<option value="Atoyac de Alvarez">Atoyac de Alvarez</option>'+
                '<option value="Ayutla de los Libres">Ayutla de los Libres</option>'+
                '<option value="Azoyu">Azoyu</option>'+
                '<option value="Benito Juarez">Benito Juarez</option>'+
                '<option value="Buenavista de Cuellar">Buenavista de Cuellar</option>'+
                '<option value="Coahuayutla de Jose Maria Izazaga">Coahuayutla de Jose Maria Izazaga</option>'+
                '<option value="Cocula">Cocula</option>'+
                '<option value="Copala">Copala</option>'+
                '<option value="Copalillo">Copalillo</option>'+
                '<option value="Copanatoyac">Copanatoyac</option>'+
                '<option value="Coyuca de Benitez">Coyuca de Benitez</option>'+
                '<option value="Coyuca de Catalan">Coyuca de Catalan</option>'+
                '<option value="Cuajinicuilapa">Cuajinicuilapa</option>'+
                '<option value="Cualac">Cualac</option>'+
                '<option value="Cuautepec">Cuautepec</option>'+
                '<option value="Cuetzala del Progreso">Cuetzala del Progreso</option>'+
                '<option value="Cutzamala de Pinzon">Cutzamala de Pinzon</option>'+
                '<option value="Chilapa de Alvarez">Chilapa de Alvarez</option>'+
                '<option value="Chilpancingo de los Bravo">Chilpancingo de los Bravo</option>'+
                '<option value="Florencio Villarreal">Florencio Villarreal</option>'+
                '<option value="General Canuto A. Neri">General Canuto A. Neri</option>'+
                '<option value="General Heliodoro Castillo">General Heliodoro Castillo</option>'+
                '<option value="Huamuxtitlan">Huamuxtitlan</option>'+
                '<option value="Huitzuco de los Figueroa">Huitzuco de los Figueroa</option>'+
                '<option value="Iguala de la Independencia">Iguala de la Independencia</option>'+
                '<option value="Igualapa">Igualapa</option>'+
                '<option value="Ixcateopan de Cuauhtemoc">Ixcateopan de Cuauhtemoc</option>'+
                '<option value="Zihuatanejo de Azueta">Zihuatanejo de Azueta</option>'+
                '<option value="Juan R. Escudero">Juan R. Escudero</option>'+
                '<option value="Leonardo Bravo">Leonardo Bravo</option>'+
                '<option value="Malinaltepec">Malinaltepec</option>'+
                '<option value="Martir de Cuilapan">Martir de Cuilapan</option>'+
                '<option value="Metlatonoc">Metlatonoc</option>'+
                '<option value="Mochitlan">Mochitlan</option>'+
                '<option value="Olinala">Olinala</option>'+
                '<option value="Ometepec">Ometepec</option>'+
                '<option value="Pedro Ascencio Alquisiras">Pedro Ascencio Alquisiras</option>'+
                '<option value="Petatlan">Petatlan</option>'+
                '<option value="Pilcaya">Pilcaya</option>'+
                '<option value="Pungarabato">Pungarabato</option>'+
                '<option value="Quechultenango">Quechultenango</option>'+
                '<option value="San Luis Acatlan">San Luis Acatlan</option>'+
                '<option value="San Marcos">San Marcos</option>'+
                '<option value="San Miguel Totolapan">San Miguel Totolapan</option>'+
                '<option value="Taxco de Alarcon">Taxco de Alarcon</option>'+
                '<option value="Tecoanapa">Tecoanapa</option>'+
                '<option value="Tecpan de Galeana">Tecpan de Galeana</option>'+
                '<option value="Teloloapan">Teloloapan</option>'+
                '<option value="Tepecoacuilco de Trujano">Tepecoacuilco de Trujano</option>'+
                '<option value="Tetipac">Tetipac</option>'+
                '<option value="Tixtla de Guerrero">Tixtla de Guerrero</option>'+
                '<option value="Tlacoachistlahuaca">Tlacoachistlahuaca</option>'+
                '<option value="Tlacoapa">Tlacoapa</option>'+
                '<option value="Tlalchapa">Tlalchapa</option>'+
                '<option value="Tlalixtaquilla de Maldonado">Tlalixtaquilla de Maldonado</option>'+
                '<option value="Tlapa de Comonfort">Tlapa de Comonfort</option>'+
                '<option value="Tlapehuala">Tlapehuala</option>'+
                '<option value="La Union de Isidoro Montes de Oca">La Union de Isidoro Montes de Oca</option>'+
                '<option value="Xalpatlahuac">Xalpatlahuac</option>'+
                '<option value="Xochihuehuetlan">Xochihuehuetlan</option>'+
                '<option value="Xochistlahuaca">Xochistlahuaca</option>'+
                '<option value="Zapotitlan Tablas">Zapotitlan Tablas</option>'+
                '<option value="Zirandaro">Zirandaro</option>'+
                '<option value="Zitlala">Zitlala</option>'+
                '<option value="Eduardo Neri">Eduardo Neri</option>'+
                '<option value="Acatepec">Acatepec</option>'+
                '<option value="Marquelia">Marquelia</option>'+
                '<option value="Cochoapa el Grande">Cochoapa el Grande</option>'+
                '<option value="Jose Joaquin de Herrera">Jose Joaquin de Herrera</option>'+
                '<option value="Juchitan">Juchitan</option>'+
                '<option value="Iliatenco">Iliatenco</option>');
        }
        else if ($(this).find(":selected").val() == "Hidalgo"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Acatlan">Acatlan</option>'+
                '<option value="Acaxochitlan">Acaxochitlan</option>'+
                '<option value="Actopan">Actopan</option>'+
                '<option value="Agua Blanca de Iturbide">Agua Blanca de Iturbide</option>'+
                '<option value="Ajacuba">Ajacuba</option>'+
                '<option value="Alfajayucan">Alfajayucan</option>'+
                '<option value="Almoloya">Almoloya</option>'+
                '<option value="Apan">Apan</option>'+
                '<option value="El Arenal">El Arenal</option>'+
                '<option value="Atitalaquia">Atitalaquia</option>'+
                '<option value="Atlapexco">Atlapexco</option>'+
                '<option value="Atotonilco el Grande">Atotonilco el Grande</option>'+
                '<option value="Atotonilco de Tula">Atotonilco de Tula</option>'+
                '<option value="Calnali">Calnali</option>'+
                '<option value="Cardonal">Cardonal</option>'+
                '<option value="Cuautepec de Hinojosa">Cuautepec de Hinojosa</option>'+
                '<option value="Chapantongo">Chapantongo</option>'+
                '<option value="Chapulhuacan">Chapulhuacan</option>'+
                '<option value="Chilcuautla">Chilcuautla</option>'+
                '<option value="Eloxochitlan">Eloxochitlan</option>'+
                '<option value="Emiliano Zapata">Emiliano Zapata</option>'+
                '<option value="Epazoyucan">Epazoyucan</option>'+
                '<option value="Francisco I. Madero">Francisco I. Madero</option>'+
                '<option value="Huasca de Ocampo">Huasca de Ocampo</option>'+
                '<option value="Huautla">Huautla</option>'+
                '<option value="Huazalingo">Huazalingo</option>'+
                '<option value="Huehuetla">Huehuetla</option>'+
                '<option value="Huejutla de Reyes">Huejutla de Reyes</option>'+
                '<option value="Huichapan">Huichapan</option>'+
                '<option value="Ixmiquilpan">Ixmiquilpan</option>'+
                '<option value="Jacala de Ledezma">Jacala de Ledezma</option>'+
                '<option value="Jaltocan">Jaltocan</option>'+
                '<option value="Juarez Hidalgo">Juarez Hidalgo</option>'+
                '<option value="Lolotla">Lolotla</option>'+
                '<option value="Metepec">Metepec</option>'+
                '<option value="San Agustin Metzquititlan">San Agustin Metzquititlan</option>'+
                '<option value="Metztitlan">Metztitlan</option>'+
                '<option value="Mineral del Chico">Mineral del Chico</option>'+
                '<option value="Mineral del Monte">Mineral del Monte</option>'+
                '<option value="La Mision">La Mision</option>'+
                '<option value="Mixquiahuala de Juarez">Mixquiahuala de Juarez</option>'+
                '<option value="Molango de Escamilla">Molango de Escamilla</option>'+
                '<option value="Nicolas Flores">Nicolas Flores</option>'+
                '<option value="Nopala de Villagran">Nopala de Villagran</option>'+
                '<option value="Omitlan de Juarez">Omitlan de Juarez</option>'+
                '<option value="San Felipe Orizatlan">San Felipe Orizatlan</option>'+
                '<option value="Pacula">Pacula</option>'+
                '<option value="Pachuca de Soto">Pachuca de Soto</option>'+
                '<option value="Pisaflores">Pisaflores</option>'+
                '<option value="Progreso de Obregon">Progreso de Obregon</option>'+
                '<option value="Mineral de la Reforma">Mineral de la Reforma</option>'+
                '<option value="San Agustin Tlaxiaca">San Agustin Tlaxiaca</option>'+
                '<option value="San Bartolo Tutotepec">San Bartolo Tutotepec</option>'+
                '<option value="San Salvador">San Salvador</option>'+
                '<option value="Santiago de Anaya">Santiago de Anaya</option>'+
                '<option value="Santiago Tulantepec de Lugo Guerrero">Santiago Tulantepec de Lugo Guerrero</option>'+
                '<option value="Singuilucan">Singuilucan</option>'+
                '<option value="Tasquillo">Tasquillo</option>'+
                '<option value="Tecozautla">Tecozautla</option>'+
                '<option value="Tenango de Doria">Tenango de Doria</option>'+
                '<option value="Tepeapulco">Tepeapulco</option>'+
                '<option value="Tepehuacan de Guerrero">Tepehuacan de Guerrero</option>'+
                '<option value="Tepeji del Rio de Ocampo">Tepeji del Rio de Ocampo</option>'+
                '<option value="Tepetitlan">Tepetitlan</option>'+
                '<option value="Tetepango">Tetepango</option>'+
                '<option value="Villa de Tezontepec">Villa de Tezontepec</option>'+
                '<option value="Tezontepec de Aldama">Tezontepec de Aldama</option>'+
                '<option value="Tianguistengo">Tianguistengo</option>'+
                '<option value="Tizayuca">Tizayuca</option>'+
                '<option value="Tlahuelilpan">Tlahuelilpan</option>'+
                '<option value="Tlahuiltepa">Tlahuiltepa</option>'+
                '<option value="Tlanalapa">Tlanalapa</option>'+
                '<option value="Tlanchinol">Tlanchinol</option>'+
                '<option value="Tlaxcoapan">Tlaxcoapan</option>'+
                '<option value="Tolcayuca">Tolcayuca</option>'+
                '<option value="Tula de Allende">Tula de Allende</option>'+
                '<option value="Tulancingo de Bravo">Tulancingo de Bravo</option>'+
                '<option value="Xochiatipan">Xochiatipan</option>'+
                '<option value="Xochicoatlan">Xochicoatlan</option>'+
                '<option value="Yahualica">Yahualica</option>'+
                '<option value="Zacualtipan de Angeles">Zacualtipan de Angeles</option>'+
                '<option value="Zapotlan de Juarez">Zapotlan de Juarez</option>'+
                '<option value="Zempoala">Zempoala</option>'+
                '<option value="Zimapan">Zimapan</option>');
        }
        else if ($(this).find(":selected").val() == "Jalisco"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Acatic">Acatic</option>'+
                '<option value="Acatlan de Juarez">Acatlan de Juarez</option>'+
                '<option value="Ahualulco de Mercado">Ahualulco de Mercado</option>'+
                '<option value="Amacueca">Amacueca</option>'+
                '<option value="Amatitan">Amatitan</option>'+
                '<option value="Ameca">Ameca</option>'+
                '<option value="San Juanito de Escobedo">San Juanito de Escobedo</option>'+
                '<option value="Arandas">Arandas</option>'+
                '<option value="El Arenal">El Arenal</option>'+
                '<option value="Atemajac de Brizuela">Atemajac de Brizuela</option>'+
                '<option value="Atengo">Atengo</option>'+
                '<option value="Atenguillo">Atenguillo</option>'+
                '<option value="Atotonilco el Alto">Atotonilco el Alto</option>'+
                '<option value="Atoyac">Atoyac</option>'+
                '<option value="Autlan de Navarro">Autlan de Navarro</option>'+
                '<option value="Ayotlan">Ayotlan</option>'+
                '<option value="Ayutla">Ayutla</option>'+
                '<option value="La Barca">La Barca</option>'+
                '<option value="Bola">Bola</option>'+
                '<option value="Cabo Corrientes">Cabo Corrientes</option>'+
                '<option value="Casimiro Castillo">Casimiro Castillo</option>'+
                '<option value="Cihuatlan">Cihuatlan</option>'+
                '<option value="Zapotlan el Grande">Zapotlan el Grande</option>'+
                '<option value="Cocula">Cocula</option>'+
                '<option value="Colotlan">Colotlan</option>'+
                '<option value="Concepcion de Buenos Aires">Concepcion de Buenos Aires</option>'+
                '<option value="Cuautitlan de Garcia Barragan">Cuautitlan de Garcia Barragan</option>'+
                '<option value="Cuautla">Cuautla</option>'+
                '<option value="Cuquio">Cuquio</option>'+
                '<option value="Chapala">Chapala</option>'+
                '<option value="Chimaltitan">Chimaltitan</option>'+
                '<option value="Chiquilistlan">Chiquilistlan</option>'+
                '<option value="Degollado">Degollado</option>'+
                '<option value="Ejutla">Ejutla</option>'+
                '<option value="Encarnacion de Diaz">Encarnacion de Diaz</option>'+
                '<option value="Etzatlan">Etzatlan</option>'+
                '<option value="El Grullo">El Grullo</option>'+
                '<option value="Guachinango">Guachinango</option>'+
                '<option value="Guadalajara">Guadalajara</option>'+
                '<option value="Hostotipaquillo">Hostotipaquillo</option>'+
                '<option value="Huejucar">Huejucar</option>'+
                '<option value="Huejuquilla el Alto">Huejuquilla el Alto</option>'+
                '<option value="La Huerta">La Huerta</option>'+
                '<option value="Ixtlahuacan de los Membrillos">Ixtlahuacan de los Membrillos</option>'+
                '<option value="Ixtlahuacan del Rio">Ixtlahuacan del Rio</option>'+
                '<option value="Jalostotitlan">Jalostotitlan</option>'+
                '<option value="Jamay">Jamay</option>'+
                '<option value="Jesus Maria">Jesus Maria</option>'+
                '<option value="Jilotlan de los Dolores">Jilotlan de los Dolores</option>'+
                '<option value="Jocotepec">Jocotepec</option>'+
                '<option value="Juanacatlan">Juanacatlan</option>'+
                '<option value="Juchitlan">Juchitlan</option>'+
                '<option value="Lagos de Moreno">Lagos de Moreno</option>'+
                '<option value="El Limon">El Limon</option>'+
                '<option value="Magdalena">Magdalena</option>'+
                '<option value="Santa Maria del Oro">Santa Maria del Oro</option>'+
                '<option value="La Manzanilla de la Paz">La Manzanilla de la Paz</option>'+
                '<option value="Mascota">Mascota</option>'+
                '<option value="Mazamitla">Mazamitla</option>'+
                '<option value="Mexticacan">Mexticacan</option>'+
                '<option value="Mezquitic">Mezquitic</option>'+
                '<option value="Mixtlan">Mixtlan</option>'+
                '<option value="Ocotlan">Ocotlan</option>'+
                '<option value="Ojuelos de Jalisco">Ojuelos de Jalisco</option>'+
                '<option value="Pihuamo">Pihuamo</option>'+
                '<option value="Poncitlan">Poncitlan</option>'+
                '<option value="Puerto Vallarta">Puerto Vallarta</option>'+
                '<option value="Villa Purificacion">Villa Purificacion</option>'+
                '<option value="Quitupan">Quitupan</option>'+
                '<option value="El Salto">El Salto</option>'+
                '<option value="San Cristobal de la Barranca">San Cristobal de la Barranca</option>'+
                '<option value="San Diego de Alejandria">San Diego de Alejandria</option>'+
                '<option value="San Juan de los Lagos">San Juan de los Lagos</option>'+
                '<option value="San Julian">San Julian</option>'+
                '<option value="San Marcos">San Marcos</option>'+
                '<option value="San Martin de Bola">San Martin de Bola</option>'+
                '<option value="San Martin Hidalgo">San Martin Hidalgo</option>'+
                '<option value="San Miguel el Alto">San Miguel el Alto</option>'+
                '<option value="Gomez Farias">Gomez Farias</option>'+
                '<option value="San Sebastian del Oeste">San Sebastian del Oeste</option>'+
                '<option value="Santa Maria de los Angeles">Santa Maria de los Angeles</option>'+
                '<option value="Sayula">Sayula</option>'+
                '<option value="Tala">Tala</option>'+
                '<option value="Talpa de Allende">Talpa de Allende</option>'+
                '<option value="Tamazula de Gordiano">Tamazula de Gordiano</option>'+
                '<option value="Tapalpa">Tapalpa</option>'+
                '<option value="Tecalitlan">Tecalitlan</option>'+
                '<option value="Tecolotlan">Tecolotlan</option>'+
                '<option value="Techaluta de Montenegro">Techaluta de Montenegro</option>'+
                '<option value="Tenamaxtlan">Tenamaxtlan</option>'+
                '<option value="Teocaltiche">Teocaltiche</option>'+
                '<option value="Teocuitatlan de Corona">Teocuitatlan de Corona</option>'+
                '<option value="Tepatitlan de Morelos">Tepatitlan de Morelos</option>'+
                '<option value="Tequila">Tequila</option>'+
                '<option value="Teuchitlan">Teuchitlan</option>'+
                '<option value="Tizapan el Alto">Tizapan el Alto</option>'+
                '<option value="Tlajomulco de Zu">Tlajomulco de Zu</option>'+
                '<option value="San Pedro Tlaquepaque">San Pedro Tlaquepaque</option>'+
                '<option value="Toliman">Toliman</option>'+
                '<option value="Tomatlan">Tomatlan</option>'+
                '<option value="Tonala">Tonala</option>'+
                '<option value="Tonaya">Tonaya</option>'+
                '<option value="Tonila">Tonila</option>'+
                '<option value="Totatiche">Totatiche</option>'+
                '<option value="Tototlan">Tototlan</option>'+
                '<option value="Tuxcacuesco">Tuxcacuesco</option>'+
                '<option value="Tuxcueca">Tuxcueca</option>'+
                '<option value="Tuxpan">Tuxpan</option>'+
                '<option value="Union de San Antonio">Union de San Antonio</option>'+
                '<option value="Union de Tula">Union de Tula</option>'+
                '<option value="Valle de Guadalupe">Valle de Guadalupe</option>'+
                '<option value="Valle de Juarez">Valle de Juarez</option>'+
                '<option value="San Gabriel">San Gabriel</option>'+
                '<option value="Villa Corona">Villa Corona</option>'+
                '<option value="Villa Guerrero">Villa Guerrero</option>'+
                '<option value="Villa Hidalgo">Villa Hidalgo</option>'+
                '<option value="Ca">Ca</option>'+
                '<option value="Yahualica de Gonzalez Gallo">Yahualica de Gonzalez Gallo</option>'+
                '<option value="Zacoalco de Torres">Zacoalco de Torres</option>'+
                '<option value="Zapopan">Zapopan</option>'+
                '<option value="Zapotiltic">Zapotiltic</option>'+
                '<option value="Zapotitlan de Vadillo">Zapotitlan de Vadillo</option>'+
                '<option value="Zapotlan del Rey">Zapotlan del Rey</option>'+
                '<option value="Zapotlanejo">Zapotlanejo</option>'+
                '<option value="San Ignacio Cerro Gordo">San Ignacio Cerro Gordo</option>');
        }
        else if ($(this).find(":selected").val() == "México"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Acambay">Acambay</option>'+
                '<option value="Acolman">Acolman</option>'+
                '<option value="Aculco">Aculco</option>'+
                '<option value="Almoloya de Alquisiras">Almoloya de Alquisiras</option>'+
                '<option value="Almoloya de Juarez">Almoloya de Juarez</option>'+
                '<option value="Almoloya del Rio">Almoloya del Rio</option>'+
                '<option value="Amanalco">Amanalco</option>'+
                '<option value="Amatepec">Amatepec</option>'+
                '<option value="Amecameca">Amecameca</option>'+
                '<option value="Apaxco">Apaxco</option>'+
                '<option value="Atenco">Atenco</option>'+
                '<option value="Atizapan">Atizapan</option>'+
                '<option value="Atizapan de Zaragoza">Atizapan de Zaragoza</option>'+
                '<option value="Atlacomulco">Atlacomulco</option>'+
                '<option value="Atlautla">Atlautla</option>'+
                '<option value="Axapusco">Axapusco</option>'+
                '<option value="Ayapango">Ayapango</option>'+
                '<option value="Calimaya">Calimaya</option>'+
                '<option value="Capulhuac">Capulhuac</option>'+
                '<option value="Coacalco de Berriozabal">Coacalco de Berriozabal</option>'+
                '<option value="Coatepec Harinas">Coatepec Harinas</option>'+
                '<option value="Cocotitlan">Cocotitlan</option>'+
                '<option value="Coyotepec">Coyotepec</option>'+
                '<option value="Cuautitlan">Cuautitlan</option>'+
                '<option value="Chalco">Chalco</option>'+
                '<option value="Chapa de Mota">Chapa de Mota</option>'+
                '<option value="Chapultepec">Chapultepec</option>'+
                '<option value="Chiautla">Chiautla</option>'+
                '<option value="Chicoloapan">Chicoloapan</option>'+
                '<option value="Chiconcuac">Chiconcuac</option>'+
                '<option value="Chimalhuacan">Chimalhuacan</option>'+
                '<option value="Donato Guerra">Donato Guerra</option>'+
                '<option value="Ecatepec de Morelos">Ecatepec de Morelos</option>'+
                '<option value="Ecatzingo">Ecatzingo</option>'+
                '<option value="Huehuetoca">Huehuetoca</option>'+
                '<option value="Hueypoxtla">Hueypoxtla</option>'+
                '<option value="Huixquilucan">Huixquilucan</option>'+
                '<option value="Isidro Fabela">Isidro Fabela</option>'+
                '<option value="Ixtapaluca">Ixtapaluca</option>'+
                '<option value="Ixtapan de la Sal">Ixtapan de la Sal</option>'+
                '<option value="Ixtapan del Oro">Ixtapan del Oro</option>'+
                '<option value="Ixtlahuaca">Ixtlahuaca</option>'+
                '<option value="Xalatlaco">Xalatlaco</option>'+
                '<option value="Jaltenco">Jaltenco</option>'+
                '<option value="Jilotepec">Jilotepec</option>'+
                '<option value="Jilotzingo">Jilotzingo</option>'+
                '<option value="Jiquipilco">Jiquipilco</option>'+
                '<option value="Jocotitlan">Jocotitlan</option>'+
                '<option value="Joquicingo">Joquicingo</option>'+
                '<option value="Juchitepec">Juchitepec</option>'+
                '<option value="Lerma">Lerma</option>'+
                '<option value="Malinalco">Malinalco</option>'+
                '<option value="Melchor Ocampo">Melchor Ocampo</option>'+
                '<option value="Metepec">Metepec</option>'+
                '<option value="Mexicaltzingo">Mexicaltzingo</option>'+
                '<option value="Morelos">Morelos</option>'+
                '<option value="Naucalpan de Juarez">Naucalpan de Juarez</option>'+
                '<option value="Nezahualcoyotl">Nezahualcoyotl</option>'+
                '<option value="Nextlalpan">Nextlalpan</option>'+
                '<option value="Nicolas Romero">Nicolas Romero</option>'+
                '<option value="Nopaltepec">Nopaltepec</option>'+
                '<option value="Ocoyoacac">Ocoyoacac</option>'+
                '<option value="Ocuilan">Ocuilan</option>'+
                '<option value="El Oro">El Oro</option>'+
                '<option value="Otumba">Otumba</option>'+
                '<option value="Otzoloapan">Otzoloapan</option>'+
                '<option value="Otzolotepec">Otzolotepec</option>'+
                '<option value="Ozumba">Ozumba</option>'+
                '<option value="Papalotla">Papalotla</option>'+
                '<option value="La Paz">La Paz</option>'+
                '<option value="Polotitlan">Polotitlan</option>'+
                '<option value="Rayon">Rayon</option>'+
                '<option value="San Antonio la Isla">San Antonio la Isla</option>'+
                '<option value="San Felipe del Progreso">San Felipe del Progreso</option>'+
                '<option value="San Martin de las Piramides">San Martin de las Piramides</option>'+
                '<option value="San Mateo Atenco">San Mateo Atenco</option>'+
                '<option value="San Simon de Guerrero">San Simon de Guerrero</option>'+
                '<option value="Santo Tomas">Santo Tomas</option>'+
                '<option value="Soyaniquilpan de Juarez">Soyaniquilpan de Juarez</option>'+
                '<option value="Sultepec">Sultepec</option>'+
                '<option value="Tecamac">Tecamac</option>'+
                '<option value="Tejupilco">Tejupilco</option>'+
                '<option value="Temamatla">Temamatla</option>'+
                '<option value="Temascalapa">Temascalapa</option>'+
                '<option value="Temascalcingo">Temascalcingo</option>'+
                '<option value="Temascaltepec">Temascaltepec</option>'+
                '<option value="Temoaya">Temoaya</option>'+
                '<option value="Tenancingo">Tenancingo</option>'+
                '<option value="Tenango del Aire">Tenango del Aire</option>'+
                '<option value="Tenango del Valle">Tenango del Valle</option>'+
                '<option value="Teoloyucan">Teoloyucan</option>'+
                '<option value="Teotihuacan">Teotihuacan</option>'+
                '<option value="Tepetlaoxtoc">Tepetlaoxtoc</option>'+
                '<option value="Tepetlixpa">Tepetlixpa</option>'+
                '<option value="Tepotzotlan">Tepotzotlan</option>'+
                '<option value="Tequixquiac">Tequixquiac</option>'+
                '<option value="Texcaltitlan">Texcaltitlan</option>'+
                '<option value="Texcalyacac">Texcalyacac</option>'+
                '<option value="Texcoco">Texcoco</option>'+
                '<option value="Tezoyuca">Tezoyuca</option>'+
                '<option value="Tianguistenco">Tianguistenco</option>'+
                '<option value="Timilpan">Timilpan</option>'+
                '<option value="Tlalmanalco">Tlalmanalco</option>'+
                '<option value="Tlalnepantla de Baz">Tlalnepantla de Baz</option>'+
                '<option value="Tlatlaya">Tlatlaya</option>'+
                '<option value="Toluca">Toluca</option>'+
                '<option value="Tonatico">Tonatico</option>'+
                '<option value="Tultepec">Tultepec</option>'+
                '<option value="Tultitlan">Tultitlan</option>'+
                '<option value="Valle de Bravo">Valle de Bravo</option>'+
                '<option value="Villa de Allende">Villa de Allende</option>'+
                '<option value="Villa del Carbon">Villa del Carbon</option>'+
                '<option value="Villa Guerrero">Villa Guerrero</option>'+
                '<option value="Villa Victoria">Villa Victoria</option>'+
                '<option value="Xonacatlan">Xonacatlan</option>'+
                '<option value="Zacazonapan">Zacazonapan</option>'+
                '<option value="Zacualpan">Zacualpan</option>'+
                '<option value="Zinacantepec">Zinacantepec</option>'+
                '<option value="Zumpahuacan">Zumpahuacan</option>'+
                '<option value="Zumpango">Zumpango</option>'+
                '<option value="Cuautitlan Izcalli">Cuautitlan Izcalli</option>'+
                '<option value="Valle de Chalco Solidaridad">Valle de Chalco Solidaridad</option>'+
                '<option value="Luvianos">Luvianos</option>'+
                '<option value="San Jose del Rincon">San Jose del Rincon</option>'+
                '<option value="Tonanitla">Tonanitla</option>');
        }
        else if ($(this).find(":selected").val() == "Michoacán de Ocampo"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Acuitzio">Acuitzio</option>'+
                '<option value="Aguililla">Aguililla</option>'+
                '<option value="Alvaro Obregon">Alvaro Obregon</option>'+
                '<option value="Angamacutiro">Angamacutiro</option>'+
                '<option value="Angangueo">Angangueo</option>'+
                '<option value="Apatzingan">Apatzingan</option>'+
                '<option value="Aporo">Aporo</option>'+
                '<option value="Aquila">Aquila</option>'+
                '<option value="Ario">Ario</option>'+
                '<option value="Arteaga">Arteaga</option>'+
                '<option value="Brise">Brise</option>'+
                '<option value="Buenavista">Buenavista</option>'+
                '<option value="Caracuaro">Caracuaro</option>'+
                '<option value="Coahuayana">Coahuayana</option>'+
                '<option value="Coalcoman de Vazquez Pallares">Coalcoman de Vazquez Pallares</option>'+
                '<option value="Coeneo">Coeneo</option>'+
                '<option value="Contepec">Contepec</option>'+
                '<option value="Copandaro">Copandaro</option>'+
                '<option value="Cotija">Cotija</option>'+
                '<option value="Cuitzeo">Cuitzeo</option>'+
                '<option value="Charapan">Charapan</option>'+
                '<option value="Charo">Charo</option>'+
                '<option value="Chavinda">Chavinda</option>'+
                '<option value="Cheran">Cheran</option>'+
                '<option value="Chilchota">Chilchota</option>'+
                '<option value="Chinicuila">Chinicuila</option>'+
                '<option value="Chucandiro">Chucandiro</option>'+
                '<option value="Churintzio">Churintzio</option>'+
                '<option value="Churumuco">Churumuco</option>'+
                '<option value="Ecuandureo">Ecuandureo</option>'+
                '<option value="Epitacio Huerta">Epitacio Huerta</option>'+
                '<option value="Erongaricuaro">Erongaricuaro</option>'+
                '<option value="Gabriel Zamora">Gabriel Zamora</option>'+
                '<option value="Hidalgo">Hidalgo</option>'+
                '<option value="La Huacana">La Huacana</option>'+
                '<option value="Huandacareo">Huandacareo</option>'+
                '<option value="Huaniqueo">Huaniqueo</option>'+
                '<option value="Huetamo">Huetamo</option>'+
                '<option value="Huiramba">Huiramba</option>'+
                '<option value="Indaparapeo">Indaparapeo</option>'+
                '<option value="Irimbo">Irimbo</option>'+
                '<option value="Ixtlan">Ixtlan</option>'+
                '<option value="Jacona">Jacona</option>'+
                '<option value="Jimenez">Jimenez</option>'+
                '<option value="Jiquilpan">Jiquilpan</option>'+
                '<option value="Juarez">Juarez</option>'+
                '<option value="Jungapeo">Jungapeo</option>'+
                '<option value="Lagunillas">Lagunillas</option>'+
                '<option value="Madero">Madero</option>'+
                '<option value="Maravatio">Maravatio</option>'+
                '<option value="Marcos Castellanos">Marcos Castellanos</option>'+
                '<option value="Lazaro Cardenas">Lazaro Cardenas</option>'+
                '<option value="Morelia">Morelia</option>'+
                '<option value="Morelos">Morelos</option>'+
                '<option value="Mugica">Mugica</option>'+
                '<option value="Nahuatzen">Nahuatzen</option>'+
                '<option value="Nocupetaro">Nocupetaro</option>'+
                '<option value="Nuevo Parangaricutiro">Nuevo Parangaricutiro</option>'+
                '<option value="Nuevo Urecho">Nuevo Urecho</option>'+
                '<option value="Numaran">Numaran</option>'+
                '<option value="Ocampo">Ocampo</option>'+
                '<option value="Pajacuaran">Pajacuaran</option>'+
                '<option value="Panindicuaro">Panindicuaro</option>'+
                '<option value="Paracuaro">Paracuaro</option>'+
                '<option value="Paracho">Paracho</option>'+
                '<option value="Patzcuaro">Patzcuaro</option>'+
                '<option value="Penjamillo">Penjamillo</option>'+
                '<option value="Periban">Periban</option>'+
                '<option value="La Piedad">La Piedad</option>'+
                '<option value="Purepero">Purepero</option>'+
                '<option value="Puruandiro">Puruandiro</option>'+
                '<option value="Querendaro">Querendaro</option>'+
                '<option value="Quiroga">Quiroga</option>'+
                '<option value="Cojumatlan de Regules">Cojumatlan de Regules</option>'+
                '<option value="Los Reyes">Los Reyes</option>'+
                '<option value="Sahuayo">Sahuayo</option>'+
                '<option value="San Lucas">San Lucas</option>'+
                '<option value="Santa Ana Maya">Santa Ana Maya</option>'+
                '<option value="Salvador Escalante">Salvador Escalante</option>'+
                '<option value="Senguio">Senguio</option>'+
                '<option value="Susupuato">Susupuato</option>'+
                '<option value="Tacambaro">Tacambaro</option>'+
                '<option value="Tancitaro">Tancitaro</option>'+
                '<option value="Tangamandapio">Tangamandapio</option>'+
                '<option value="Tangancicuaro">Tangancicuaro</option>'+
                '<option value="Tanhuato">Tanhuato</option>'+
                '<option value="Taretan">Taretan</option>'+
                '<option value="Tarimbaro">Tarimbaro</option>'+
                '<option value="Tepalcatepec">Tepalcatepec</option>'+
                '<option value="Tingambato">Tingambato</option>'+
                '<option value="Ting">Ting</option>'+
                '<option value="Tiquicheo de Nicolas Romero">Tiquicheo de Nicolas Romero</option>'+
                '<option value="Tlalpujahua">Tlalpujahua</option>'+
                '<option value="Tlazazalca">Tlazazalca</option>'+
                '<option value="Tocumbo">Tocumbo</option>'+
                '<option value="Tumbiscatio">Tumbiscatio</option>'+
                '<option value="Turicato">Turicato</option>'+
                '<option value="Tuxpan">Tuxpan</option>'+
                '<option value="Tuzantla">Tuzantla</option>'+
                '<option value="Tzintzuntzan">Tzintzuntzan</option>'+
                '<option value="Tzitzio">Tzitzio</option>'+
                '<option value="Uruapan">Uruapan</option>'+
                '<option value="Venustiano Carranza">Venustiano Carranza</option>'+
                '<option value="Villamar">Villamar</option>'+
                '<option value="Vista Hermosa">Vista Hermosa</option>'+
                '<option value="Yurecuaro">Yurecuaro</option>'+
                '<option value="Zacapu">Zacapu</option>'+
                '<option value="Zamora">Zamora</option>'+
                '<option value="Zinaparo">Zinaparo</option>'+
                '<option value="Zinapecuaro">Zinapecuaro</option>'+
                '<option value="Ziracuaretiro">Ziracuaretiro</option>'+
                '<option value="Zitacuaro">Zitacuaro</option>'+
                '<option value="Jose Sixto Verduzco">Jose Sixto Verduzco</option>');
        }
        else if ($(this).find(":selected").val() == "Morelos"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Amacuzac">Amacuzac</option>'+
                '<option value="Atlatlahucan">Atlatlahucan</option>'+
                '<option value="Axochiapan">Axochiapan</option>'+
                '<option value="Ayala">Ayala</option>'+
                '<option value="Coatlan del Rio">Coatlan del Rio</option>'+
                '<option value="Cuautla">Cuautla</option>'+
                '<option value="Cuernavaca">Cuernavaca</option>'+
                '<option value="Emiliano Zapata">Emiliano Zapata</option>'+
                '<option value="Huitzilac">Huitzilac</option>'+
                '<option value="Jantetelco">Jantetelco</option>'+
                '<option value="Jiutepec">Jiutepec</option>'+
                '<option value="Jojutla">Jojutla</option>'+
                '<option value="Jonacatepec">Jonacatepec</option>'+
                '<option value="Mazatepec">Mazatepec</option>'+
                '<option value="Miacatlan">Miacatlan</option>'+
                '<option value="Ocuituco">Ocuituco</option>'+
                '<option value="Puente de Ixtla">Puente de Ixtla</option>'+
                '<option value="Temixco">Temixco</option>'+
                '<option value="Tepalcingo">Tepalcingo</option>'+
                '<option value="Tepoztlan">Tepoztlan</option>'+
                '<option value="Tetecala">Tetecala</option>'+
                '<option value="Tetela del Volcan">Tetela del Volcan</option>'+
                '<option value="Tlalnepantla">Tlalnepantla</option>'+
                '<option value="Tlaltizapan de Zapata">Tlaltizapan de Zapata</option>'+
                '<option value="Tlaquiltenango">Tlaquiltenango</option>'+
                '<option value="Tlayacapan">Tlayacapan</option>'+
                '<option value="Totolapan">Totolapan</option>'+
                '<option value="Xochitepec">Xochitepec</option>'+
                '<option value="Yautepec">Yautepec</option>'+
                '<option value="Yecapixtla">Yecapixtla</option>'+
                '<option value="Zacatepec">Zacatepec</option>'+
                '<option value="Zacualpan">Zacualpan</option>'+
                '<option value="Temoac">Temoac</option>');
        }
        else if ($(this).find(":selected").val() == "Nayarit"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Acaponeta">Acaponeta</option>'+
                '<option value="Ahuacatlan">Ahuacatlan</option>'+
                '<option value="Amatlan de Ca">Amatlan de Ca</option>'+
                '<option value="Compostela">Compostela</option>'+
                '<option value="Huajicori">Huajicori</option>'+
                '<option value="Ixtlan del Rio">Ixtlan del Rio</option>'+
                '<option value="Jala">Jala</option>'+
                '<option value="Xalisco">Xalisco</option>'+
                '<option value="Del Nayar">Del Nayar</option>'+
                '<option value="Rosamorada">Rosamorada</option>'+
                '<option value="Ruiz">Ruiz</option>'+
                '<option value="San Blas">San Blas</option>'+
                '<option value="San Pedro Lagunillas">San Pedro Lagunillas</option>'+
                '<option value="Santa Maria del Oro">Santa Maria del Oro</option>'+
                '<option value="Santiago Ixcuintla">Santiago Ixcuintla</option>'+
                '<option value="Tecuala">Tecuala</option>'+
                '<option value="Tepic">Tepic</option>'+
                '<option value="Tuxpan">Tuxpan</option>'+
                '<option value="La Yesca">La Yesca</option>'+
                '<option value="Bahia de Banderas">Bahia de Banderas</option>');
        }
        else if ($(this).find(":selected").val() == "Nuevo León"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value="Abasolo">Abasolo</option>'+
                '<option value="Agualeguas">Agualeguas</option>'+
                '<option value="Los Aldamas">Los Aldamas</option>'+
                '<option value="Allende">Allende</option>'+
                '<option value="Anahuac">Anahuac</option>'+
                '<option value="Apodaca">Apodaca</option>'+
                '<option value="Aramberri">Aramberri</option>'+
                '<option value="Bustamante">Bustamante</option>'+
                '<option value="Cadereyta Jimenez">Cadereyta Jimenez</option>'+
                '<option value="Carmen">Carmen</option>'+
                '<option value="Cerralvo">Cerralvo</option>'+
                '<option value="Cienega de Flores">Cienega de Flores</option>'+
                '<option value="China">China</option>'+
                '<option value="Dr. Arroyo">Dr. Arroyo</option>'+
                '<option value="Dr. Coss">Dr. Coss</option>'+
                '<option value="Dr. Gonzalez">Dr. Gonzalez</option>'+
                '<option value="Galeana">Galeana</option>'+
                '<option value="Garcia">Garcia</option>'+
                '<option value="San Pedro Garza Garcia">San Pedro Garza Garcia</option>'+
                '<option value="Gral. Bravo">Gral. Bravo</option>'+
                '<option value="Gral. Escobedo">Gral. Escobedo</option>'+
                '<option value="Gral. Teran">Gral. Teran</option>'+
                '<option value="Gral. Trevi">Gral. Trevi</option>'+
                '<option value="Gral. Zaragoza">Gral. Zaragoza</option>'+
                '<option value="Gral. Zuazua">Gral. Zuazua</option>'+
                '<option value="Guadalupe">Guadalupe</option>'+
                '<option value="Los Herreras">Los Herreras</option>'+
                '<option value="Higueras">Higueras</option>'+
                '<option value="Hualahuises">Hualahuises</option>'+
                '<option value="Iturbide">Iturbide</option>'+
                '<option value="Juarez">Juarez</option>'+
                '<option value="Lampazos de Naranjo">Lampazos de Naranjo</option>'+
                '<option value="Linares">Linares</option>'+
                '<option value="Marin">Marin</option>'+
                '<option value="Melchor Ocampo">Melchor Ocampo</option>'+
                '<option value="Mier y Noriega">Mier y Noriega</option>'+
                '<option value="Mina">Mina</option>'+
                '<option value="Montemorelos">Montemorelos</option>'+
                '<option value="Monterrey">Monterrey</option>'+
                '<option value="Paras">Paras</option>'+
                '<option value="Pesqueria">Pesqueria</option>'+
                '<option value="Los Ramones">Los Ramones</option>'+
                '<option value="Rayones">Rayones</option>'+
                '<option value="Sabinas Hidalgo">Sabinas Hidalgo</option>'+
                '<option value="Salinas Victoria">Salinas Victoria</option>'+
                '<option value="San Nicolas de los Garza">San Nicolas de los Garza</option>'+
                '<option value="Hidalgo">Hidalgo</option>'+
                '<option value="Santa Catarina">Santa Catarina</option>'+
                '<option value="Santiago">Santiago</option>'+
                '<option value="Vallecillo">Vallecillo</option>'+
                '<option value="Villaldama">Villaldama</option>');
        }
        else if ($(this).find(":selected").val() == "Oaxaca"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"todo el estado\">todo el estado<\/option>\r\n<option value=\"Abejones\">Abejones<\/option>\r\n<option value=\"Acatlan de Perez Figueroa\">Acatlan de Perez Figueroa<\/option>\r\n<option value=\"Asuncion Cacalotepec\">Asuncion Cacalotepec<\/option>\r\n<option value=\"Asuncion Cuyotepeji\">Asuncion Cuyotepeji<\/option>\r\n<option value=\"Asuncion Ixtaltepec\">Asuncion Ixtaltepec<\/option>\r\n<option value=\"Asuncion Nochixtlan\">Asuncion Nochixtlan<\/option>\r\n<option value=\"Asuncion Ocotlan\">Asuncion Ocotlan<\/option>\r\n<option value=\"Asuncion Tlacolulita\">Asuncion Tlacolulita<\/option>\r\n<option value=\"Ayotzintepec\">Ayotzintepec<\/option>\r\n<option value=\"El Barrio de la Soledad\">El Barrio de la Soledad<\/option>\r\n<option value=\"Calihuala\">Calihuala<\/option>\r\n<option value=\"Candelaria Loxicha\">Candelaria Loxicha<\/option>\r\n<option value=\"Cienega de Zimatlan\">Cienega de Zimatlan<\/option>\r\n<option value=\"Ciudad Ixtepec\">Ciudad Ixtepec<\/option>\r\n<option value=\"Coatecas Altas\">Coatecas Altas<\/option>\r\n<option value=\"Coicoyan de las Flores\">Coicoyan de las Flores<\/option>\r\n<option value=\"La Compa\">La Compa<\/option>\r\n<option value=\"Concepcion Buenavista\">Concepcion Buenavista<\/option>\r\n<option value=\"Concepcion Papalo\">Concepcion Papalo<\/option>\r\n<option value=\"Constancia del Rosario\">Constancia del Rosario<\/option>\r\n<option value=\"Cosolapa\">Cosolapa<\/option>\r\n<option value=\"Cosoltepec\">Cosoltepec<\/option>\r\n<option value=\"Cuilapam de Guerrero\">Cuilapam de Guerrero<\/option>\r\n<option value=\"Cuyamecalco Villa de Zaragoza\">Cuyamecalco Villa de Zaragoza<\/option>\r\n<option value=\"Chahuites\">Chahuites<\/option>\r\n<option value=\"Chalcatongo de Hidalgo\">Chalcatongo de Hidalgo<\/option>\r\n<option value=\"Chiquihuitlan de Benito Juarez\">Chiquihuitlan de Benito Juarez<\/option>\r\n<option value=\"Heroica Ciudad de Ejutla de Crespo\">Heroica Ciudad de Ejutla de Crespo<\/option>\r\n<option value=\"Eloxochitlan de Flores Magon\">Eloxochitlan de Flores Magon<\/option>\r\n<option value=\"El Espinal\">El Espinal<\/option>\r\n<option value=\"Tamazulapam del Espiritu Santo\">Tamazulapam del Espiritu Santo<\/option>\r\n<option value=\"Fresnillo de Trujano\">Fresnillo de Trujano<\/option>\r\n<option value=\"Guadalupe Etla\">Guadalupe Etla<\/option>\r\n<option value=\"Guadalupe de Ramirez\">Guadalupe de Ramirez<\/option>\r\n<option value=\"Guelatao de Juarez\">Guelatao de Juarez<\/option>\r\n<option value=\"Guevea de Humboldt\">Guevea de Humboldt<\/option>\r\n<option value=\"Mesones Hidalgo\">Mesones Hidalgo<\/option>\r\n<option value=\"Villa Hidalgo\">Villa Hidalgo<\/option>\r\n<option value=\"Heroica Ciudad de Huajuapan de Leon\">Heroica Ciudad de Huajuapan de Leon<\/option>\r\n<option value=\"Huautepec\">Huautepec<\/option>\r\n<option value=\"Huautla de Jimenez\">Huautla de Jimenez<\/option>\r\n<option value=\"Ixtlan de Juarez\">Ixtlan de Juarez<\/option>\r\n<option value=\"Heroica Ciudad de Juchitan de Zaragoza\">Heroica Ciudad de Juchitan de Zaragoza<\/option>\r\n<option value=\"Loma Bonita\">Loma Bonita<\/option>\r\n<option value=\"Magdalena Apasco\">Magdalena Apasco<\/option>\r\n<option value=\"Magdalena Jaltepec\">Magdalena Jaltepec<\/option>\r\n<option value=\"Santa Magdalena Jicotlan\">Santa Magdalena Jicotlan<\/option>\r\n<option value=\"Magdalena Mixtepec\">Magdalena Mixtepec<\/option>\r\n<option value=\"Magdalena Ocotlan\">Magdalena Ocotlan<\/option>\r\n<option value=\"Magdalena Pe\">Magdalena Pe<\/option>\r\n<option value=\"Magdalena Teitipac\">Magdalena Teitipac<\/option>\r\n<option value=\"Magdalena Tequisistlan\">Magdalena Tequisistlan<\/option>\r\n<option value=\"Magdalena Tlacotepec\">Magdalena Tlacotepec<\/option>\r\n<option value=\"Magdalena Zahuatlan\">Magdalena Zahuatlan<\/option>\r\n<option value=\"Mariscala de Juarez\">Mariscala de Juarez<\/option>\r\n<option value=\"Martires de Tacubaya\">Martires de Tacubaya<\/option>\r\n<option value=\"Matias Romero Avenda\">Matias Romero Avenda<\/option>\r\n<option value=\"Mazatlan Villa de Flores\">Mazatlan Villa de Flores<\/option>\r\n<option value=\"Miahuatlan de Porfirio Diaz\">Miahuatlan de Porfirio Diaz<\/option>\r\n<option value=\"Mixistlan de la Reforma\">Mixistlan de la Reforma<\/option>\r\n<option value=\"Monjas\">Monjas<\/option>\r\n<option value=\"Natividad\">Natividad<\/option>\r\n<option value=\"Nazareno Etla\">Nazareno Etla<\/option>\r\n<option value=\"Nejapa de Madero\">Nejapa de Madero<\/option>\r\n<option value=\"Ixpantepec Nieves\">Ixpantepec Nieves<\/option>\r\n<option value=\"Santiago Niltepec\">Santiago Niltepec<\/option>\r\n<option value=\"Oaxaca de Juarez\">Oaxaca de Juarez<\/option>\r\n<option value=\"Ocotlan de Morelos\">Ocotlan de Morelos<\/option>\r\n<option value=\"La Pe\">La Pe<\/option>\r\n<option value=\"Pinotepa de Don Luis\">Pinotepa de Don Luis<\/option>\r\n<option value=\"Pluma Hidalgo\">Pluma Hidalgo<\/option>\r\n<option value=\"San Jose del Progreso\">San Jose del Progreso<\/option>\r\n<option value=\"Putla Villa de Guerrero\">Putla Villa de Guerrero<\/option>\r\n<option value=\"Santa Catarina Quioquitani\">Santa Catarina Quioquitani<\/option>\r\n<option value=\"Reforma de Pineda\">Reforma de Pineda<\/option>\r\n<option value=\"La Reforma\">La Reforma<\/option>\r\n<option value=\"Reyes Etla\">Reyes Etla<\/option>\r\n<option value=\"Rojas de Cuauhtemoc\">Rojas de Cuauhtemoc<\/option>\r\n<option value=\"Salina Cruz\">Salina Cruz<\/option>\r\n<option value=\"San Agustin Amatengo\">San Agustin Amatengo<\/option>\r\n<option value=\"San Agustin Atenango\">San Agustin Atenango<\/option>\r\n<option value=\"San Agustin Chayuco\">San Agustin Chayuco<\/option>\r\n<option value=\"San Agustin de las Juntas\">San Agustin de las Juntas<\/option>\r\n<option value=\"San Agustin Etla\">San Agustin Etla<\/option>\r\n<option value=\"San Agustin Loxicha\">San Agustin Loxicha<\/option>\r\n<option value=\"San Agustin Tlacotepec\">San Agustin Tlacotepec<\/option>\r\n<option value=\"San Agustin Yatareni\">San Agustin Yatareni<\/option>\r\n<option value=\"San Andres Cabecera Nueva\">San Andres Cabecera Nueva<\/option>\r\n<option value=\"San Andres Dinicuiti\">San Andres Dinicuiti<\/option>\r\n<option value=\"San Andres Huaxpaltepec\">San Andres Huaxpaltepec<\/option>\r\n<option value=\"San Andres Huayapam\">San Andres Huayapam<\/option>\r\n<option value=\"San Andres Ixtlahuaca\">San Andres Ixtlahuaca<\/option>\r\n<option value=\"San Andres Lagunas\">San Andres Lagunas<\/option>\r\n<option value=\"San Andres Nuxi\">San Andres Nuxi<\/option>\r\n<option value=\"San Andres Paxtlan\">San Andres Paxtlan<\/option>\r\n<option value=\"San Andres Sinaxtla\">San Andres Sinaxtla<\/option>\r\n<option value=\"San Andres Solaga\">San Andres Solaga<\/option>\r\n<option value=\"San Andres Teotilalpam\">San Andres Teotilalpam<\/option>\r\n<option value=\"San Andres Tepetlapa\">San Andres Tepetlapa<\/option>\r\n<option value=\"San Andres Yaa\">San Andres Yaa<\/option>\r\n<option value=\"San Andres Zabache\">San Andres Zabache<\/option>\r\n<option value=\"San Andres Zautla\">San Andres Zautla<\/option>\r\n<option value=\"San Antonino Castillo Velasco\">San Antonino Castillo Velasco<\/option>\r\n<option value=\"San Antonino el Alto\">San Antonino el Alto<\/option>\r\n<option value=\"San Antonino Monte Verde\">San Antonino Monte Verde<\/option>\r\n<option value=\"San Antonio Acutla\">San Antonio Acutla<\/option>\r\n<option value=\"San Antonio de la Cal\">San Antonio de la Cal<\/option>\r\n<option value=\"San Antonio Huitepec\">San Antonio Huitepec<\/option>\r\n<option value=\"San Antonio Nanahuatipam\">San Antonio Nanahuatipam<\/option>\r\n<option value=\"San Antonio Sinicahua\">San Antonio Sinicahua<\/option>\r\n<option value=\"San Antonio Tepetlapa\">San Antonio Tepetlapa<\/option>\r\n<option value=\"San Baltazar Chichicapam\">San Baltazar Chichicapam<\/option>\r\n<option value=\"San Baltazar Loxicha\">San Baltazar Loxicha<\/option>\r\n<option value=\"San Baltazar Yatzachi el Bajo\">San Baltazar Yatzachi el Bajo<\/option>\r\n<option value=\"San Bartolo Coyotepec\">San Bartolo Coyotepec<\/option>\r\n<option value=\"San Bartolome Ayautla\">San Bartolome Ayautla<\/option>\r\n<option value=\"San Bartolome Loxicha\">San Bartolome Loxicha<\/option>\r\n<option value=\"San Bartolome Quialana\">San Bartolome Quialana<\/option>\r\n<option value=\"San Bartolome Yucua\">San Bartolome Yucua<\/option>\r\n<option value=\"San Bartolome Zoogocho\">San Bartolome Zoogocho<\/option>\r\n<option value=\"San Bartolo Soyaltepec\">San Bartolo Soyaltepec<\/option>\r\n<option value=\"San Bartolo Yautepec\">San Bartolo Yautepec<\/option>\r\n<option value=\"San Bernardo Mixtepec\">San Bernardo Mixtepec<\/option>\r\n<option value=\"San Blas Atempa\">San Blas Atempa<\/option>\r\n<option value=\"San Carlos Yautepec\">San Carlos Yautepec<\/option>\r\n<option value=\"San Cristobal Amatlan\">San Cristobal Amatlan<\/option>\r\n<option value=\"San Cristobal Amoltepec\">San Cristobal Amoltepec<\/option>\r\n<option value=\"San Cristobal Lachirioag\">San Cristobal Lachirioag<\/option>\r\n<option value=\"San Cristobal Suchixtlahuaca\">San Cristobal Suchixtlahuaca<\/option>\r\n<option value=\"San Dionisio del Mar\">San Dionisio del Mar<\/option>\r\n<option value=\"San Dionisio Ocotepec\">San Dionisio Ocotepec<\/option>\r\n<option value=\"San Dionisio Ocotlan\">San Dionisio Ocotlan<\/option>\r\n<option value=\"San Esteban Atatlahuca\">San Esteban Atatlahuca<\/option>\r\n<option value=\"San Felipe Jalapa de Diaz\">San Felipe Jalapa de Diaz<\/option>\r\n<option value=\"San Felipe Tejalapam\">San Felipe Tejalapam<\/option>\r\n<option value=\"San Felipe Usila\">San Felipe Usila<\/option>\r\n<option value=\"San Francisco Cahuacua\">San Francisco Cahuacua<\/option>\r\n<option value=\"San Francisco Cajonos\">San Francisco Cajonos<\/option>\r\n<option value=\"San Francisco Chapulapa\">San Francisco Chapulapa<\/option>\r\n<option value=\"San Francisco Chindua\">San Francisco Chindua<\/option>\r\n<option value=\"San Francisco del Mar\">San Francisco del Mar<\/option>\r\n<option value=\"San Francisco Huehuetlan\">San Francisco Huehuetlan<\/option>\r\n<option value=\"San Francisco Ixhuatan\">San Francisco Ixhuatan<\/option>\r\n<option value=\"San Francisco Jaltepetongo\">San Francisco Jaltepetongo<\/option>\r\n<option value=\"San Francisco Lachigolo\">San Francisco Lachigolo<\/option>\r\n<option value=\"San Francisco Logueche\">San Francisco Logueche<\/option>\r\n<option value=\"San Francisco Nuxa\">San Francisco Nuxa<\/option>\r\n<option value=\"San Francisco Ozolotepec\">San Francisco Ozolotepec<\/option>\r\n<option value=\"San Francisco Sola\">San Francisco Sola<\/option>\r\n<option value=\"San Francisco Telixtlahuaca\">San Francisco Telixtlahuaca<\/option>\r\n<option value=\"San Francisco Teopan\">San Francisco Teopan<\/option>\r\n<option value=\"San Francisco Tlapancingo\">San Francisco Tlapancingo<\/option>\r\n<option value=\"San Gabriel Mixtepec\">San Gabriel Mixtepec<\/option>\r\n<option value=\"San Ildefonso Amatlan\">San Ildefonso Amatlan<\/option>\r\n<option value=\"San Ildefonso Sola\">San Ildefonso Sola<\/option>\r\n<option value=\"San Ildefonso Villa Alta\">San Ildefonso Villa Alta<\/option>\r\n<option value=\"San Jacinto Amilpas\">San Jacinto Amilpas<\/option>\r\n<option value=\"San Jacinto Tlacotepec\">San Jacinto Tlacotepec<\/option>\r\n<option value=\"San Jeronimo Coatlan\">San Jeronimo Coatlan<\/option>\r\n<option value=\"San Jeronimo Silacayoapilla\">San Jeronimo Silacayoapilla<\/option>\r\n<option value=\"San Jeronimo Sosola\">San Jeronimo Sosola<\/option>\r\n<option value=\"San Jeronimo Taviche\">San Jeronimo Taviche<\/option>\r\n<option value=\"San Jeronimo Tecoatl\">San Jeronimo Tecoatl<\/option>\r\n<option value=\"San Jorge Nuchita\">San Jorge Nuchita<\/option>\r\n<option value=\"San Jose Ayuquila\">San Jose Ayuquila<\/option>\r\n<option value=\"San Jose Chiltepec\">San Jose Chiltepec<\/option>\r\n<option value=\"San Jose del Pe\">San Jose del Pe<\/option>\r\n<option value=\"San Jose Estancia Grande\">San Jose Estancia Grande<\/option>\r\n<option value=\"San Jose Independencia\">San Jose Independencia<\/option>\r\n<option value=\"San Jose Lachiguiri\">San Jose Lachiguiri<\/option>\r\n<option value=\"San Jose Tenango\">San Jose Tenango<\/option>\r\n<option value=\"San Juan Achiutla\">San Juan Achiutla<\/option>\r\n<option value=\"San Juan Atepec\">San Juan Atepec<\/option>\r\n<option value=\"Animas Trujano\">Animas Trujano<\/option>\r\n<option value=\"San Juan Bautista Atatlahuca\">San Juan Bautista Atatlahuca<\/option>\r\n<option value=\"San Juan Bautista Coixtlahuaca\">San Juan Bautista Coixtlahuaca<\/option>\r\n<option value=\"San Juan Bautista Cuicatlan\">San Juan Bautista Cuicatlan<\/option>\r\n<option value=\"San Juan Bautista Guelache\">San Juan Bautista Guelache<\/option>\r\n<option value=\"San Juan Bautista Jayacatlan\">San Juan Bautista Jayacatlan<\/option>\r\n<option value=\"San Juan Bautista Lo de Soto\">San Juan Bautista Lo de Soto<\/option>\r\n<option value=\"San Juan Bautista Suchitepec\">San Juan Bautista Suchitepec<\/option>\r\n<option value=\"San Juan Bautista Tlacoatzintepec\">San Juan Bautista Tlacoatzintepec<\/option>\r\n<option value=\"San Juan Bautista Tlachichilco\">San Juan Bautista Tlachichilco<\/option>\r\n<option value=\"San Juan Bautista Tuxtepec\">San Juan Bautista Tuxtepec<\/option>\r\n<option value=\"San Juan Cacahuatepec\">San Juan Cacahuatepec<\/option>\r\n<option value=\"San Juan Cieneguilla\">San Juan Cieneguilla<\/option>\r\n<option value=\"San Juan Coatzospam\">San Juan Coatzospam<\/option>\r\n<option value=\"San Juan Colorado\">San Juan Colorado<\/option>\r\n<option value=\"San Juan Comaltepec\">San Juan Comaltepec<\/option>\r\n<option value=\"San Juan Cotzocon\">San Juan Cotzocon<\/option>\r\n<option value=\"San Juan Chicomezuchil\">San Juan Chicomezuchil<\/option>\r\n<option value=\"San Juan Chilateca\">San Juan Chilateca<\/option>\r\n<option value=\"San Juan del Estado\">San Juan del Estado<\/option>\r\n<option value=\"San Juan del Rio\">San Juan del Rio<\/option>\r\n<option value=\"San Juan Diuxi\">San Juan Diuxi<\/option>\r\n<option value=\"San Juan Evangelista Analco\">San Juan Evangelista Analco<\/option>\r\n<option value=\"San Juan Guelavia\">San Juan Guelavia<\/option>\r\n<option value=\"San Juan Guichicovi\">San Juan Guichicovi<\/option>\r\n<option value=\"San Juan Ihualtepec\">San Juan Ihualtepec<\/option>\r\n<option value=\"San Juan Juquila Mixes\">San Juan Juquila Mixes<\/option>\r\n<option value=\"San Juan Juquila Vijanos\">San Juan Juquila Vijanos<\/option>\r\n<option value=\"San Juan Lachao\">San Juan Lachao<\/option>\r\n<option value=\"San Juan Lachigalla\">San Juan Lachigalla<\/option>\r\n<option value=\"San Juan Lajarcia\">San Juan Lajarcia<\/option>\r\n<option value=\"San Juan Lalana\">San Juan Lalana<\/option>\r\n<option value=\"San Juan de los Cues\">San Juan de los Cues<\/option>\r\n<option value=\"San Juan Mazatlan\">San Juan Mazatlan<\/option>\r\n<option value=\"San Juan Mixtepec -Dto. 08 -\">San Juan Mixtepec -Dto. 08 -<\/option>\r\n<option value=\"San Juan Mixtepec -Dto. 26 -\">San Juan Mixtepec -Dto. 26 -<\/option>\r\n<option value=\"San Juan \">San Juan <\/option>\r\n<option value=\"San Juan Ozolotepec\">San Juan Ozolotepec<\/option>\r\n<option value=\"San Juan Petlapa\">San Juan Petlapa<\/option>\r\n<option value=\"San Juan Quiahije\">San Juan Quiahije<\/option>\r\n<option value=\"San Juan Quiotepec\">San Juan Quiotepec<\/option>\r\n<option value=\"San Juan Sayultepec\">San Juan Sayultepec<\/option>\r\n<option value=\"San Juan Tabaa\">San Juan Tabaa<\/option>\r\n<option value=\"San Juan Tamazola\">San Juan Tamazola<\/option>\r\n<option value=\"San Juan Teita\">San Juan Teita<\/option>\r\n<option value=\"San Juan Teitipac\">San Juan Teitipac<\/option>\r\n<option value=\"San Juan Tepeuxila\">San Juan Tepeuxila<\/option>\r\n<option value=\"San Juan Teposcolula\">San Juan Teposcolula<\/option>\r\n<option value=\"San Juan Yaee\">San Juan Yaee<\/option>\r\n<option value=\"San Juan Yatzona\">San Juan Yatzona<\/option>\r\n<option value=\"San Juan Yucuita\">San Juan Yucuita<\/option>\r\n<option value=\"San Lorenzo\">San Lorenzo<\/option>\r\n<option value=\"San Lorenzo Albarradas\">San Lorenzo Albarradas<\/option>\r\n<option value=\"San Lorenzo Cacaotepec\">San Lorenzo Cacaotepec<\/option>\r\n<option value=\"San Lorenzo Cuaunecuiltitla\">San Lorenzo Cuaunecuiltitla<\/option>\r\n<option value=\"San Lorenzo Texmelucan\">San Lorenzo Texmelucan<\/option>\r\n<option value=\"San Lorenzo Victoria\">San Lorenzo Victoria<\/option>\r\n<option value=\"San Lucas Camotlan\">San Lucas Camotlan<\/option>\r\n<option value=\"San Lucas Ojitlan\">San Lucas Ojitlan<\/option>\r\n<option value=\"San Lucas Quiavini\">San Lucas Quiavini<\/option>\r\n<option value=\"San Lucas Zoquiapam\">San Lucas Zoquiapam<\/option>\r\n<option value=\"San Luis Amatlan\">San Luis Amatlan<\/option>\r\n<option value=\"San Marcial Ozolotepec\">San Marcial Ozolotepec<\/option>\r\n<option value=\"San Marcos Arteaga\">San Marcos Arteaga<\/option>\r\n<option value=\"San Martin de los Cansecos\">San Martin de los Cansecos<\/option>\r\n<option value=\"San Martin Huamelulpam\">San Martin Huamelulpam<\/option>\r\n<option value=\"San Martin Itunyoso\">San Martin Itunyoso<\/option>\r\n<option value=\"San Martin Lachila\">San Martin Lachila<\/option>\r\n<option value=\"San Martin Peras\">San Martin Peras<\/option>\r\n<option value=\"San Martin Tilcajete\">San Martin Tilcajete<\/option>\r\n<option value=\"San Martin Toxpalan\">San Martin Toxpalan<\/option>\r\n<option value=\"San Martin Zacatepec\">San Martin Zacatepec<\/option>\r\n<option value=\"San Mateo Cajonos\">San Mateo Cajonos<\/option>\r\n<option value=\"Capulalpam de Mendez\">Capulalpam de Mendez<\/option>\r\n<option value=\"San Mateo del Mar\">San Mateo del Mar<\/option>\r\n<option value=\"San Mateo Yoloxochitlan\">San Mateo Yoloxochitlan<\/option>\r\n<option value=\"San Mateo Etlatongo\">San Mateo Etlatongo<\/option>\r\n<option value=\"San Mateo Nejapam\">San Mateo Nejapam<\/option>\r\n<option value=\"San Mateo Pe\">San Mateo Pe<\/option>\r\n<option value=\"San Mateo Pi\">San Mateo Pi<\/option>\r\n<option value=\"San Mateo Rio Hondo\">San Mateo Rio Hondo<\/option>\r\n<option value=\"San Mateo Sindihui\">San Mateo Sindihui<\/option>\r\n<option value=\"San Mateo Tlapiltepec\">San Mateo Tlapiltepec<\/option>\r\n<option value=\"San Melchor Betaza\">San Melchor Betaza<\/option>\r\n<option value=\"San Miguel Achiutla\">San Miguel Achiutla<\/option>\r\n<option value=\"San Miguel Ahuehuetitlan\">San Miguel Ahuehuetitlan<\/option>\r\n<option value=\"San Miguel Aloapam\">San Miguel Aloapam<\/option>\r\n<option value=\"San Miguel Amatitlan\">San Miguel Amatitlan<\/option>\r\n<option value=\"San Miguel Amatlan\">San Miguel Amatlan<\/option>\r\n<option value=\"San Miguel Coatlan\">San Miguel Coatlan<\/option>\r\n<option value=\"San Miguel Chicahua\">San Miguel Chicahua<\/option>\r\n<option value=\"San Miguel Chimalapa\">San Miguel Chimalapa<\/option>\r\n<option value=\"San Miguel del Puerto\">San Miguel del Puerto<\/option>\r\n<option value=\"San Miguel del Rio\">San Miguel del Rio<\/option>\r\n<option value=\"San Miguel Ejutla\">San Miguel Ejutla<\/option>\r\n<option value=\"San Miguel el Grande\">San Miguel el Grande<\/option>\r\n<option value=\"San Miguel Huautla\">San Miguel Huautla<\/option>\r\n<option value=\"San Miguel Mixtepec\">San Miguel Mixtepec<\/option>\r\n<option value=\"San Miguel Panixtlahuaca\">San Miguel Panixtlahuaca<\/option>\r\n<option value=\"San Miguel Peras\">San Miguel Peras<\/option>\r\n<option value=\"San Miguel Piedras\">San Miguel Piedras<\/option>\r\n<option value=\"San Miguel Quetzaltepec\">San Miguel Quetzaltepec<\/option>\r\n<option value=\"San Miguel Santa Flor\">San Miguel Santa Flor<\/option>\r\n<option value=\"Villa Sola de Vega\">Villa Sola de Vega<\/option>\r\n<option value=\"San Miguel Soyaltepec\">San Miguel Soyaltepec<\/option>\r\n<option value=\"San Miguel Suchixtepec\">San Miguel Suchixtepec<\/option>\r\n<option value=\"Villa Talea de Castro\">Villa Talea de Castro<\/option>\r\n<option value=\"San Miguel Tecomatlan\">San Miguel Tecomatlan<\/option>\r\n<option value=\"San Miguel Tenango\">San Miguel Tenango<\/option>\r\n<option value=\"San Miguel Tequixtepec\">San Miguel Tequixtepec<\/option>\r\n<option value=\"San Miguel Tilquiapam\">San Miguel Tilquiapam<\/option>\r\n<option value=\"San Miguel Tlacamama\">San Miguel Tlacamama<\/option>\r\n<option value=\"San Miguel Tlacotepec\">San Miguel Tlacotepec<\/option>\r\n<option value=\"San Miguel Tulancingo\">San Miguel Tulancingo<\/option>\r\n<option value=\"San Miguel Yotao\">San Miguel Yotao<\/option>\r\n<option value=\"San Nicolas\">San Nicolas<\/option>\r\n<option value=\"San Nicolas Hidalgo\">San Nicolas Hidalgo<\/option>\r\n<option value=\"San Pablo Coatlan\">San Pablo Coatlan<\/option>\r\n<option value=\"San Pablo Cuatro Venados\">San Pablo Cuatro Venados<\/option>\r\n<option value=\"San Pablo Etla\">San Pablo Etla<\/option>\r\n<option value=\"San Pablo Huitzo\">San Pablo Huitzo<\/option>\r\n<option value=\"San Pablo Huixtepec\">San Pablo Huixtepec<\/option>\r\n<option value=\"San Pablo Macuiltianguis\">San Pablo Macuiltianguis<\/option>\r\n<option value=\"San Pablo Tijaltepec\">San Pablo Tijaltepec<\/option>\r\n<option value=\"San Pablo Villa de Mitla\">San Pablo Villa de Mitla<\/option>\r\n<option value=\"San Pablo Yaganiza\">San Pablo Yaganiza<\/option>\r\n<option value=\"San Pedro Amuzgos\">San Pedro Amuzgos<\/option>\r\n<option value=\"San Pedro Apostol\">San Pedro Apostol<\/option>\r\n<option value=\"San Pedro Atoyac\">San Pedro Atoyac<\/option>\r\n<option value=\"San Pedro Cajonos\">San Pedro Cajonos<\/option>\r\n<option value=\"San Pedro Coxcaltepec Cantaros\">San Pedro Coxcaltepec Cantaros<\/option>\r\n<option value=\"San Pedro Comitancillo\">San Pedro Comitancillo<\/option>\r\n<option value=\"San Pedro el Alto\">San Pedro el Alto<\/option>\r\n<option value=\"San Pedro Huamelula\">San Pedro Huamelula<\/option>\r\n<option value=\"San Pedro Huilotepec\">San Pedro Huilotepec<\/option>\r\n<option value=\"San Pedro Ixcatlan\">San Pedro Ixcatlan<\/option>\r\n<option value=\"San Pedro Ixtlahuaca\">San Pedro Ixtlahuaca<\/option>\r\n<option value=\"San Pedro Jaltepetongo\">San Pedro Jaltepetongo<\/option>\r\n<option value=\"San Pedro Jicayan\">San Pedro Jicayan<\/option>\r\n<option value=\"San Pedro Jocotipac\">San Pedro Jocotipac<\/option>\r\n<option value=\"San Pedro Juchatengo\">San Pedro Juchatengo<\/option>\r\n<option value=\"San Pedro Martir\">San Pedro Martir<\/option>\r\n<option value=\"San Pedro Martir Quiechapa\">San Pedro Martir Quiechapa<\/option>\r\n<option value=\"San Pedro Martir Yucuxaco\">San Pedro Martir Yucuxaco<\/option>\r\n<option value=\"San Pedro Mixtepec -Dto. 22 -\">San Pedro Mixtepec -Dto. 22 -<\/option>\r\n<option value=\"San Pedro Mixtepec -Dto. 26 -\">San Pedro Mixtepec -Dto. 26 -<\/option>\r\n<option value=\"San Pedro Molinos\">San Pedro Molinos<\/option>\r\n<option value=\"San Pedro Nopala\">San Pedro Nopala<\/option>\r\n<option value=\"San Pedro Ocopetatillo\">San Pedro Ocopetatillo<\/option>\r\n<option value=\"San Pedro Ocotepec\">San Pedro Ocotepec<\/option>\r\n<option value=\"San Pedro Pochutla\">San Pedro Pochutla<\/option>\r\n<option value=\"San Pedro Quiatoni\">San Pedro Quiatoni<\/option>\r\n<option value=\"San Pedro Sochiapam\">San Pedro Sochiapam<\/option>\r\n<option value=\"San Pedro Tapanatepec\">San Pedro Tapanatepec<\/option>\r\n<option value=\"San Pedro Taviche\">San Pedro Taviche<\/option>\r\n<option value=\"San Pedro Teozacoalco\">San Pedro Teozacoalco<\/option>\r\n<option value=\"San Pedro Teutila\">San Pedro Teutila<\/option>\r\n<option value=\"San Pedro Tidaa\">San Pedro Tidaa<\/option>\r\n<option value=\"San Pedro Topiltepec\">San Pedro Topiltepec<\/option>\r\n<option value=\"San Pedro Totolapam\">San Pedro Totolapam<\/option>\r\n<option value=\"Villa de Tututepec de Melchor Ocampo\">Villa de Tututepec de Melchor Ocampo<\/option>\r\n<option value=\"San Pedro Yaneri\">San Pedro Yaneri<\/option>\r\n<option value=\"San Pedro Yolox\">San Pedro Yolox<\/option>\r\n<option value=\"San Pedro y San Pablo Ayutla\">San Pedro y San Pablo Ayutla<\/option>\r\n<option value=\"Villa de Etla\">Villa de Etla<\/option>\r\n<option value=\"San Pedro y San Pablo Teposcolula\">San Pedro y San Pablo Teposcolula<\/option>\r\n<option value=\"San Pedro y San Pablo Tequixtepec\">San Pedro y San Pablo Tequixtepec<\/option>\r\n<option value=\"San Pedro Yucunama\">San Pedro Yucunama<\/option>\r\n<option value=\"San Raymundo Jalpan\">San Raymundo Jalpan<\/option>\r\n<option value=\"San Sebastian Abasolo\">San Sebastian Abasolo<\/option>\r\n<option value=\"San Sebastian Coatlan\">San Sebastian Coatlan<\/option>\r\n<option value=\"San Sebastian Ixcapa\">San Sebastian Ixcapa<\/option>\r\n<option value=\"San Sebastian Nicananduta\">San Sebastian Nicananduta<\/option>\r\n<option value=\"San Sebastian Rio Hondo\">San Sebastian Rio Hondo<\/option>\r\n<option value=\"San Sebastian Tecomaxtlahuaca\">San Sebastian Tecomaxtlahuaca<\/option>\r\n<option value=\"San Sebastian Teitipac\">San Sebastian Teitipac<\/option>\r\n<option value=\"San Sebastian Tutla\">San Sebastian Tutla<\/option>\r\n<option value=\"San Simon Almolongas\">San Simon Almolongas<\/option>\r\n<option value=\"San Simon Zahuatlan\">San Simon Zahuatlan<\/option>\r\n<option value=\"Santa Ana\">Santa Ana<\/option>\r\n<option value=\"Santa Ana Ateixtlahuaca\">Santa Ana Ateixtlahuaca<\/option>\r\n<option value=\"Santa Ana Cuauhtemoc\">Santa Ana Cuauhtemoc<\/option>\r\n<option value=\"Santa Ana del Valle\">Santa Ana del Valle<\/option>\r\n<option value=\"Santa Ana Tavela\">Santa Ana Tavela<\/option>\r\n<option value=\"Santa Ana Tlapacoyan\">Santa Ana Tlapacoyan<\/option>\r\n<option value=\"Santa Ana Yareni\">Santa Ana Yareni<\/option>\r\n<option value=\"Santa Ana Zegache\">Santa Ana Zegache<\/option>\r\n<option value=\"Santa Catalina Quieri\">Santa Catalina Quieri<\/option>\r\n<option value=\"Santa Catarina Cuixtla\">Santa Catarina Cuixtla<\/option>\r\n<option value=\"Santa Catarina Ixtepeji\">Santa Catarina Ixtepeji<\/option>\r\n<option value=\"Santa Catarina Juquila\">Santa Catarina Juquila<\/option>\r\n<option value=\"Santa Catarina Lachatao\">Santa Catarina Lachatao<\/option>\r\n<option value=\"Santa Catarina Loxicha\">Santa Catarina Loxicha<\/option>\r\n<option value=\"Santa Catarina Mechoacan\">Santa Catarina Mechoacan<\/option>\r\n<option value=\"Santa Catarina Minas\">Santa Catarina Minas<\/option>\r\n<option value=\"Santa Catarina Quiane\">Santa Catarina Quiane<\/option>\r\n<option value=\"Santa Catarina Tayata\">Santa Catarina Tayata<\/option>\r\n<option value=\"Santa Catarina Ticua\">Santa Catarina Ticua<\/option>\r\n<option value=\"Santa Catarina Yosonotu\">Santa Catarina Yosonotu<\/option>\r\n<option value=\"Santa Catarina Zapoquila\">Santa Catarina Zapoquila<\/option>\r\n<option value=\"Santa Cruz Acatepec\">Santa Cruz Acatepec<\/option>\r\n<option value=\"Santa Cruz Amilpas\">Santa Cruz Amilpas<\/option>\r\n<option value=\"Santa Cruz de Bravo\">Santa Cruz de Bravo<\/option>\r\n<option value=\"Santa Cruz Itundujia\">Santa Cruz Itundujia<\/option>\r\n<option value=\"Santa Cruz Mixtepec\">Santa Cruz Mixtepec<\/option>\r\n<option value=\"Santa Cruz Nundaco\">Santa Cruz Nundaco<\/option>\r\n<option value=\"Santa Cruz Papalutla\">Santa Cruz Papalutla<\/option>\r\n<option value=\"Santa Cruz Tacache de Mina\">Santa Cruz Tacache de Mina<\/option>\r\n<option value=\"Santa Cruz Tacahua\">Santa Cruz Tacahua<\/option>\r\n<option value=\"Santa Cruz Tayata\">Santa Cruz Tayata<\/option>\r\n<option value=\"Santa Cruz Xitla\">Santa Cruz Xitla<\/option>\r\n<option value=\"Santa Cruz Xoxocotlan\">Santa Cruz Xoxocotlan<\/option>\r\n<option value=\"Santa Cruz Zenzontepec\">Santa Cruz Zenzontepec<\/option>\r\n<option value=\"Santa Gertrudis\">Santa Gertrudis<\/option>\r\n<option value=\"Santa Ines del Monte\">Santa Ines del Monte<\/option>\r\n<option value=\"Santa Ines Yatzeche\">Santa Ines Yatzeche<\/option>\r\n<option value=\"Santa Lucia del Camino\">Santa Lucia del Camino<\/option>\r\n<option value=\"Santa Lucia Miahuatlan\">Santa Lucia Miahuatlan<\/option>\r\n<option value=\"Santa Lucia Monteverde\">Santa Lucia Monteverde<\/option>\r\n<option value=\"Santa Lucia Ocotlan\">Santa Lucia Ocotlan<\/option>\r\n<option value=\"Santa Maria Alotepec\">Santa Maria Alotepec<\/option>\r\n<option value=\"Santa Maria Apazco\">Santa Maria Apazco<\/option>\r\n<option value=\"Santa Maria la Asuncion\">Santa Maria la Asuncion<\/option>\r\n<option value=\"Heroica Ciudad de Tlaxiaco\">Heroica Ciudad de Tlaxiaco<\/option>\r\n<option value=\"Ayoquezco de Aldama\">Ayoquezco de Aldama<\/option>\r\n<option value=\"Santa Maria Atzompa\">Santa Maria Atzompa<\/option>\r\n<option value=\"Santa Maria Camotlan\">Santa Maria Camotlan<\/option>\r\n<option value=\"Santa Maria Colotepec\">Santa Maria Colotepec<\/option>\r\n<option value=\"Santa Maria Cortijo\">Santa Maria Cortijo<\/option>\r\n<option value=\"Santa Maria Coyotepec\">Santa Maria Coyotepec<\/option>\r\n<option value=\"Santa Maria Chachoapam\">Santa Maria Chachoapam<\/option>\r\n<option value=\"Villa de Chilapa de Diaz\">Villa de Chilapa de Diaz<\/option>\r\n<option value=\"Santa Maria Chilchotla\">Santa Maria Chilchotla<\/option>\r\n<option value=\"Santa Maria Chimalapa\">Santa Maria Chimalapa<\/option>\r\n<option value=\"Santa Maria del Rosario\">Santa Maria del Rosario<\/option>\r\n<option value=\"Santa Maria del Tule\">Santa Maria del Tule<\/option>\r\n<option value=\"Santa Maria Ecatepec\">Santa Maria Ecatepec<\/option>\r\n<option value=\"Santa Maria Guelace\">Santa Maria Guelace<\/option>\r\n<option value=\"Santa Maria Guienagati\">Santa Maria Guienagati<\/option>\r\n<option value=\"Santa Maria Huatulco\">Santa Maria Huatulco<\/option>\r\n<option value=\"Santa Maria Huazolotitlan\">Santa Maria Huazolotitlan<\/option>\r\n<option value=\"Santa Maria Ipalapa\">Santa Maria Ipalapa<\/option>\r\n<option value=\"Santa Maria Ixcatlan\">Santa Maria Ixcatlan<\/option>\r\n<option value=\"Santa Maria Jacatepec\">Santa Maria Jacatepec<\/option>\r\n<option value=\"Santa Maria Jalapa del Marques\">Santa Maria Jalapa del Marques<\/option>\r\n<option value=\"Santa Maria Jaltianguis\">Santa Maria Jaltianguis<\/option>\r\n<option value=\"Santa Maria Lachixio\">Santa Maria Lachixio<\/option>\r\n<option value=\"Santa Maria Mixtequilla\">Santa Maria Mixtequilla<\/option>\r\n<option value=\"Santa Maria Nativitas\">Santa Maria Nativitas<\/option>\r\n<option value=\"Santa Maria Nduayaco\">Santa Maria Nduayaco<\/option>\r\n<option value=\"Santa Maria Ozolotepec\">Santa Maria Ozolotepec<\/option>\r\n<option value=\"Santa Maria Papalo\">Santa Maria Papalo<\/option>\r\n<option value=\"Santa Maria Pe\">Santa Maria Pe<\/option>\r\n<option value=\"Santa Maria Petapa\">Santa Maria Petapa<\/option>\r\n<option value=\"Santa Maria Quiegolani\">Santa Maria Quiegolani<\/option>\r\n<option value=\"Santa Maria Sola\">Santa Maria Sola<\/option>\r\n<option value=\"Santa Maria Tataltepec\">Santa Maria Tataltepec<\/option>\r\n<option value=\"Santa Maria Tecomavaca\">Santa Maria Tecomavaca<\/option>\r\n<option value=\"Santa Maria Temaxcalapa\">Santa Maria Temaxcalapa<\/option>\r\n<option value=\"Santa Maria Temaxcaltepec\">Santa Maria Temaxcaltepec<\/option>\r\n<option value=\"Santa Maria Teopoxco\">Santa Maria Teopoxco<\/option>\r\n<option value=\"Santa Maria Tepantlali\">Santa Maria Tepantlali<\/option>\r\n<option value=\"Santa Maria Texcatitlan\">Santa Maria Texcatitlan<\/option>\r\n<option value=\"Santa Maria Tlahuitoltepec\">Santa Maria Tlahuitoltepec<\/option>\r\n<option value=\"Santa Maria Tlalixtac\">Santa Maria Tlalixtac<\/option>\r\n<option value=\"Santa Maria Tonameca\">Santa Maria Tonameca<\/option>\r\n<option value=\"Santa Maria Totolapilla\">Santa Maria Totolapilla<\/option>\r\n<option value=\"Santa Maria Xadani\">Santa Maria Xadani<\/option>\r\n<option value=\"Santa Maria Yalina\">Santa Maria Yalina<\/option>\r\n<option value=\"Santa Maria Yavesia\">Santa Maria Yavesia<\/option>\r\n<option value=\"Santa Maria Yolotepec\">Santa Maria Yolotepec<\/option>\r\n<option value=\"Santa Maria Yosoyua\">Santa Maria Yosoyua<\/option>\r\n<option value=\"Santa Maria Yucuhiti\">Santa Maria Yucuhiti<\/option>\r\n<option value=\"Santa Maria Zacatepec\">Santa Maria Zacatepec<\/option>\r\n<option value=\"Santa Maria Zaniza\">Santa Maria Zaniza<\/option>\r\n<option value=\"Santa Maria Zoquitlan\">Santa Maria Zoquitlan<\/option>\r\n<option value=\"Santiago Amoltepec\">Santiago Amoltepec<\/option>\r\n<option value=\"Santiago Apoala\">Santiago Apoala<\/option>\r\n<option value=\"Santiago Apostol\">Santiago Apostol<\/option>\r\n<option value=\"Santiago Astata\">Santiago Astata<\/option>\r\n<option value=\"Santiago Atitlan\">Santiago Atitlan<\/option>\r\n<option value=\"Santiago Ayuquililla\">Santiago Ayuquililla<\/option>\r\n<option value=\"Santiago Cacaloxtepec\">Santiago Cacaloxtepec<\/option>\r\n<option value=\"Santiago Camotlan\">Santiago Camotlan<\/option>\r\n<option value=\"Santiago Comaltepec\">Santiago Comaltepec<\/option>\r\n<option value=\"Santiago Chazumba\">Santiago Chazumba<\/option>\r\n<option value=\"Santiago Choapam\">Santiago Choapam<\/option>\r\n<option value=\"Santiago del Rio\">Santiago del Rio<\/option>\r\n<option value=\"Santiago Huajolotitlan\">Santiago Huajolotitlan<\/option>\r\n<option value=\"Santiago Huauclilla\">Santiago Huauclilla<\/option>\r\n<option value=\"Santiago Ihuitlan Plumas\">Santiago Ihuitlan Plumas<\/option>\r\n<option value=\"Santiago Ixcuintepec\">Santiago Ixcuintepec<\/option>\r\n<option value=\"Santiago Ixtayutla\">Santiago Ixtayutla<\/option>\r\n<option value=\"Santiago Jamiltepec\">Santiago Jamiltepec<\/option>\r\n<option value=\"Santiago Jocotepec\">Santiago Jocotepec<\/option>\r\n<option value=\"Santiago Juxtlahuaca\">Santiago Juxtlahuaca<\/option>\r\n<option value=\"Santiago Lachiguiri\">Santiago Lachiguiri<\/option>\r\n<option value=\"Santiago Lalopa\">Santiago Lalopa<\/option>\r\n<option value=\"Santiago Laollaga\">Santiago Laollaga<\/option>\r\n<option value=\"Santiago Laxopa\">Santiago Laxopa<\/option>\r\n<option value=\"Santiago Llano Grande\">Santiago Llano Grande<\/option>\r\n<option value=\"Santiago Matatlan\">Santiago Matatlan<\/option>\r\n<option value=\"Santiago Miltepec\">Santiago Miltepec<\/option>\r\n<option value=\"Santiago Minas\">Santiago Minas<\/option>\r\n<option value=\"Santiago Nacaltepec\">Santiago Nacaltepec<\/option>\r\n<option value=\"Santiago Nejapilla\">Santiago Nejapilla<\/option>\r\n<option value=\"Santiago Nundiche\">Santiago Nundiche<\/option>\r\n<option value=\"Santiago Nuyoo\">Santiago Nuyoo<\/option>\r\n<option value=\"Santiago Pinotepa Nacional\">Santiago Pinotepa Nacional<\/option>\r\n<option value=\"Santiago Suchilquitongo\">Santiago Suchilquitongo<\/option>\r\n<option value=\"Santiago Tamazola\">Santiago Tamazola<\/option>\r\n<option value=\"Santiago Tapextla\">Santiago Tapextla<\/option>\r\n<option value=\"Villa Tejupam de la Union\">Villa Tejupam de la Union<\/option>\r\n<option value=\"Santiago Tenango\">Santiago Tenango<\/option>\r\n<option value=\"Santiago Tepetlapa\">Santiago Tepetlapa<\/option>\r\n<option value=\"Santiago Tetepec\">Santiago Tetepec<\/option>\r\n<option value=\"Santiago Texcalcingo\">Santiago Texcalcingo<\/option>\r\n<option value=\"Santiago Textitlan\">Santiago Textitlan<\/option>\r\n<option value=\"Santiago Tilantongo\">Santiago Tilantongo<\/option>\r\n<option value=\"Santiago Tillo\">Santiago Tillo<\/option>\r\n<option value=\"Santiago Tlazoyaltepec\">Santiago Tlazoyaltepec<\/option>\r\n<option value=\"Santiago Xanica\">Santiago Xanica<\/option>\r\n<option value=\"Santiago Xiacui\">Santiago Xiacui<\/option>\r\n<option value=\"Santiago Yaitepec\">Santiago Yaitepec<\/option>\r\n<option value=\"Santiago Yaveo\">Santiago Yaveo<\/option>\r\n<option value=\"Santiago Yolomecatl\">Santiago Yolomecatl<\/option>\r\n<option value=\"Santiago Yosondua\">Santiago Yosondua<\/option>\r\n<option value=\"Santiago Yucuyachi\">Santiago Yucuyachi<\/option>\r\n<option value=\"Santiago Zacatepec\">Santiago Zacatepec<\/option>\r\n<option value=\"Santiago Zoochila\">Santiago Zoochila<\/option>\r\n<option value=\"Nuevo Zoquiapam\">Nuevo Zoquiapam<\/option>\r\n<option value=\"Santo Domingo Ingenio\">Santo Domingo Ingenio<\/option>\r\n<option value=\"Santo Domingo Albarradas\">Santo Domingo Albarradas<\/option>\r\n<option value=\"Santo Domingo Armenta\">Santo Domingo Armenta<\/option>\r\n<option value=\"Santo Domingo Chihuitan\">Santo Domingo Chihuitan<\/option>\r\n<option value=\"Santo Domingo de Morelos\">Santo Domingo de Morelos<\/option>\r\n<option value=\"Santo Domingo Ixcatlan\">Santo Domingo Ixcatlan<\/option>\r\n<option value=\"Santo Domingo Nuxaa\">Santo Domingo Nuxaa<\/option>\r\n<option value=\"Santo Domingo Ozolotepec\">Santo Domingo Ozolotepec<\/option>\r\n<option value=\"Santo Domingo Petapa\">Santo Domingo Petapa<\/option>\r\n<option value=\"Santo Domingo Roayaga\">Santo Domingo Roayaga<\/option>\r\n<option value=\"Santo Domingo Tehuantepec\">Santo Domingo Tehuantepec<\/option>\r\n<option value=\"Santo Domingo Teojomulco\">Santo Domingo Teojomulco<\/option>\r\n<option value=\"Santo Domingo Tepuxtepec\">Santo Domingo Tepuxtepec<\/option>\r\n<option value=\"Santo Domingo Tlatayapam\">Santo Domingo Tlatayapam<\/option>\r\n<option value=\"Santo Domingo Tomaltepec\">Santo Domingo Tomaltepec<\/option>\r\n<option value=\"Santo Domingo Tonala\">Santo Domingo Tonala<\/option>\r\n<option value=\"Santo Domingo Tonaltepec\">Santo Domingo Tonaltepec<\/option>\r\n<option value=\"Santo Domingo Xagacia\">Santo Domingo Xagacia<\/option>\r\n<option value=\"Santo Domingo Yanhuitlan\">Santo Domingo Yanhuitlan<\/option>\r\n<option value=\"Santo Domingo Yodohino\">Santo Domingo Yodohino<\/option>\r\n<option value=\"Santo Domingo Zanatepec\">Santo Domingo Zanatepec<\/option>\r\n<option value=\"Santos Reyes Nopala\">Santos Reyes Nopala<\/option>\r\n<option value=\"Santos Reyes Papalo\">Santos Reyes Papalo<\/option>\r\n<option value=\"Santos Reyes Tepejillo\">Santos Reyes Tepejillo<\/option>\r\n<option value=\"Santos Reyes Yucuna\">Santos Reyes Yucuna<\/option>\r\n<option value=\"Santo Tomas Jalieza\">Santo Tomas Jalieza<\/option>\r\n<option value=\"Santo Tomas Mazaltepec\">Santo Tomas Mazaltepec<\/option>\r\n<option value=\"Santo Tomas Ocotepec\">Santo Tomas Ocotepec<\/option>\r\n<option value=\"Santo Tomas Tamazulapan\">Santo Tomas Tamazulapan<\/option>\r\n<option value=\"San Vicente Coatlan\">San Vicente Coatlan<\/option>\r\n<option value=\"San Vicente Lachixio\">San Vicente Lachixio<\/option>\r\n<option value=\"San Vicente Nu\">San Vicente Nu<\/option>\r\n<option value=\"Silacayoapam\">Silacayoapam<\/option>\r\n<option value=\"Sitio de Xitlapehua\">Sitio de Xitlapehua<\/option>\r\n<option value=\"Soledad Etla\">Soledad Etla<\/option>\r\n<option value=\"Villa de Tamazulapam del Progreso\">Villa de Tamazulapam del Progreso<\/option>\r\n<option value=\"Tanetze de Zaragoza\">Tanetze de Zaragoza<\/option>\r\n<option value=\"Taniche\">Taniche<\/option>\r\n<option value=\"Tataltepec de Valdes\">Tataltepec de Valdes<\/option>\r\n<option value=\"Teococuilco de Marcos Perez\">Teococuilco de Marcos Perez<\/option>\r\n<option value=\"Teotitlan de Flores Magon\">Teotitlan de Flores Magon<\/option>\r\n<option value=\"Teotitlan del Valle\">Teotitlan del Valle<\/option>\r\n<option value=\"Teotongo\">Teotongo<\/option>\r\n<option value=\"Tepelmeme Villa de Morelos\">Tepelmeme Villa de Morelos<\/option>\r\n<option value=\"Heroica Villa Tezoatlan de Segura y Luna, Cuna de la Independenc\">Heroica Villa Tezoatlan de Segura y Luna, Cuna de la Independenc<\/option>\r\n<option value=\"San Jeronimo Tlacochahuaya\">San Jeronimo Tlacochahuaya<\/option>\r\n<option value=\"Tlacolula de Matamoros\">Tlacolula de Matamoros<\/option>\r\n<option value=\"Tlacotepec Plumas\">Tlacotepec Plumas<\/option>\r\n<option value=\"Tlalixtac de Cabrera\">Tlalixtac de Cabrera<\/option>\r\n<option value=\"Totontepec Villa de Morelos\">Totontepec Villa de Morelos<\/option>\r\n<option value=\"Trinidad Zaachila\">Trinidad Zaachila<\/option>\r\n<option value=\"La Trinidad Vista Hermosa\">La Trinidad Vista Hermosa<\/option>\r\n<option value=\"Union Hidalgo\">Union Hidalgo<\/option>\r\n<option value=\"Valerio Trujano\">Valerio Trujano<\/option>\r\n<option value=\"San Juan Bautista Valle Nacional\">San Juan Bautista Valle Nacional<\/option>\r\n<option value=\"Villa Diaz Ordaz\">Villa Diaz Ordaz<\/option>\r\n<option value=\"Yaxe\">Yaxe<\/option>\r\n<option value=\"Magdalena Yodocono de Porfirio Diaz\">Magdalena Yodocono de Porfirio Diaz<\/option>\r\n<option value=\"Yogana\">Yogana<\/option>\r\n<option value=\"Yutanduchi de Guerrero\">Yutanduchi de Guerrero<\/option>\r\n<option value=\"Villa de Zaachila\">Villa de Zaachila<\/option>\r\n<option value=\"San Mateo Yucutindo\">San Mateo Yucutindo<\/option>\r\n<option value=\"Zapotitlan Lagunas\">Zapotitlan Lagunas<\/option>\r\n<option value=\"Zapotitlan Palmas\">Zapotitlan Palmas<\/option>\r\n<option value=\"Santa Ines de Zaragoza\">Santa Ines de Zaragoza<\/option>\r\n<option value=\"Zimatlan de Alvarez\">Zimatlan de Alvarez<\/option>');
        }
        else if ($(this).find(":selected").val() == "Puebla"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Acajete\">Acajete<\/option>\r\n<option value=\"Acateno\">Acateno<\/option>\r\n<option value=\"Acatlan\">Acatlan<\/option>\r\n<option value=\"Acatzingo\">Acatzingo<\/option>\r\n<option value=\"Acteopan\">Acteopan<\/option>\r\n<option value=\"Ahuacatlan\">Ahuacatlan<\/option>\r\n<option value=\"Ahuatlan\">Ahuatlan<\/option>\r\n<option value=\"Ahuazotepec\">Ahuazotepec<\/option>\r\n<option value=\"Ahuehuetitla\">Ahuehuetitla<\/option>\r\n<option value=\"Ajalpan\">Ajalpan<\/option>\r\n<option value=\"Albino Zertuche\">Albino Zertuche<\/option>\r\n<option value=\"Aljojuca\">Aljojuca<\/option>\r\n<option value=\"Altepexi\">Altepexi<\/option>\r\n<option value=\"Amixtlan\">Amixtlan<\/option>\r\n<option value=\"Amozoc\">Amozoc<\/option>\r\n<option value=\"Aquixtla\">Aquixtla<\/option>\r\n<option value=\"Atempan\">Atempan<\/option>\r\n<option value=\"Atexcal\">Atexcal<\/option>\r\n<option value=\"Atlixco\">Atlixco<\/option>\r\n<option value=\"Atoyatempan\">Atoyatempan<\/option>\r\n<option value=\"Atzala\">Atzala<\/option>\r\n<option value=\"Atzitzihuacan\">Atzitzihuacan<\/option>\r\n<option value=\"Atzitzintla\">Atzitzintla<\/option>\r\n<option value=\"Axutla\">Axutla<\/option>\r\n<option value=\"Ayotoxco de Guerrero\">Ayotoxco de Guerrero<\/option>\r\n<option value=\"Calpan\">Calpan<\/option>\r\n<option value=\"Caltepec\">Caltepec<\/option>\r\n<option value=\"Camocuautla\">Camocuautla<\/option>\r\n<option value=\"Caxhuacan\">Caxhuacan<\/option>\r\n<option value=\"Coatepec\">Coatepec<\/option>\r\n<option value=\"Coatzingo\">Coatzingo<\/option>\r\n<option value=\"Cohetzala\">Cohetzala<\/option>\r\n<option value=\"Cohuecan\">Cohuecan<\/option>\r\n<option value=\"Coronango\">Coronango<\/option>\r\n<option value=\"Coxcatlan\">Coxcatlan<\/option>\r\n<option value=\"Coyomeapan\">Coyomeapan<\/option>\r\n<option value=\"Coyotepec\">Coyotepec<\/option>\r\n<option value=\"Cuapiaxtla de Madero\">Cuapiaxtla de Madero<\/option>\r\n<option value=\"Cuautempan\">Cuautempan<\/option>\r\n<option value=\"Cuautinchan\">Cuautinchan<\/option>\r\n<option value=\"Cuautlancingo\">Cuautlancingo<\/option>\r\n<option value=\"Cuayuca de Andrade\">Cuayuca de Andrade<\/option>\r\n<option value=\"Cuetzalan del Progreso\">Cuetzalan del Progreso<\/option>\r\n<option value=\"Cuyoaco\">Cuyoaco<\/option>\r\n<option value=\"Chalchicomula de Sesma\">Chalchicomula de Sesma<\/option>\r\n<option value=\"Chapulco\">Chapulco<\/option>\r\n<option value=\"Chiautla\">Chiautla<\/option>\r\n<option value=\"Chiautzingo\">Chiautzingo<\/option>\r\n<option value=\"Chiconcuautla\">Chiconcuautla<\/option>\r\n<option value=\"Chichiquila\">Chichiquila<\/option>\r\n<option value=\"Chietla\">Chietla<\/option>\r\n<option value=\"Chigmecatitlan\">Chigmecatitlan<\/option>\r\n<option value=\"Chignahuapan\">Chignahuapan<\/option>\r\n<option value=\"Chignautla\">Chignautla<\/option>\r\n<option value=\"Chila\">Chila<\/option>\r\n<option value=\"Chila de la Sal\">Chila de la Sal<\/option>\r\n<option value=\"Honey\">Honey<\/option>\r\n<option value=\"Chilchotla\">Chilchotla<\/option>\r\n<option value=\"Chinantla\">Chinantla<\/option>\r\n<option value=\"Domingo Arenas\">Domingo Arenas<\/option>\r\n<option value=\"Eloxochitlan\">Eloxochitlan<\/option>\r\n<option value=\"Epatlan\">Epatlan<\/option>\r\n<option value=\"Esperanza\">Esperanza<\/option>\r\n<option value=\"Francisco Z. Mena\">Francisco Z. Mena<\/option>\r\n<option value=\"General Felipe Angeles\">General Felipe Angeles<\/option>\r\n<option value=\"Guadalupe\">Guadalupe<\/option>\r\n<option value=\"Guadalupe Victoria\">Guadalupe Victoria<\/option>\r\n<option value=\"Hermenegildo Galeana\">Hermenegildo Galeana<\/option>\r\n<option value=\"Huaquechula\">Huaquechula<\/option>\r\n<option value=\"Huatlatlauca\">Huatlatlauca<\/option>\r\n<option value=\"Huauchinango\">Huauchinango<\/option>\r\n<option value=\"Huehuetla\">Huehuetla<\/option>\r\n<option value=\"Huehuetlan el Chico\">Huehuetlan el Chico<\/option>\r\n<option value=\"Huejotzingo\">Huejotzingo<\/option>\r\n<option value=\"Hueyapan\">Hueyapan<\/option>\r\n<option value=\"Hueytamalco\">Hueytamalco<\/option>\r\n<option value=\"Hueytlalpan\">Hueytlalpan<\/option>\r\n<option value=\"Huitzilan de Serdan\">Huitzilan de Serdan<\/option>\r\n<option value=\"Huitziltepec\">Huitziltepec<\/option>\r\n<option value=\"Atlequizayan\">Atlequizayan<\/option>\r\n<option value=\"Ixcamilpa de Guerrero\">Ixcamilpa de Guerrero<\/option>\r\n<option value=\"Ixcaquixtla\">Ixcaquixtla<\/option>\r\n<option value=\"Ixtacamaxtitlan\">Ixtacamaxtitlan<\/option>\r\n<option value=\"Ixtepec\">Ixtepec<\/option>\r\n<option value=\"Izucar de Matamoros\">Izucar de Matamoros<\/option>\r\n<option value=\"Jalpan\">Jalpan<\/option>\r\n<option value=\"Jolalpan\">Jolalpan<\/option>\r\n<option value=\"Jonotla\">Jonotla<\/option>\r\n<option value=\"Jopala\">Jopala<\/option>\r\n<option value=\"Juan C. Bonilla\">Juan C. Bonilla<\/option>\r\n<option value=\"Juan Galindo\">Juan Galindo<\/option>\r\n<option value=\"Juan N. Mendez\">Juan N. Mendez<\/option>\r\n<option value=\"Lafragua\">Lafragua<\/option>\r\n<option value=\"Libres\">Libres<\/option>\r\n<option value=\"La Magdalena Tlatlauquitepec\">La Magdalena Tlatlauquitepec<\/option>\r\n<option value=\"Mazapiltepec de Juarez\">Mazapiltepec de Juarez<\/option>\r\n<option value=\"Mixtla\">Mixtla<\/option>\r\n<option value=\"Molcaxac\">Molcaxac<\/option>\r\n<option value=\"Ca\">Ca<\/option>\r\n<option value=\"Naupan\">Naupan<\/option>\r\n<option value=\"Nauzontla\">Nauzontla<\/option>\r\n<option value=\"Nealtican\">Nealtican<\/option>\r\n<option value=\"Nicolas Bravo\">Nicolas Bravo<\/option>\r\n<option value=\"Nopalucan\">Nopalucan<\/option>\r\n<option value=\"Ocotepec\">Ocotepec<\/option>\r\n<option value=\"Ocoyucan\">Ocoyucan<\/option>\r\n<option value=\"Olintla\">Olintla<\/option>\r\n<option value=\"Oriental\">Oriental<\/option>\r\n<option value=\"Pahuatlan\">Pahuatlan<\/option>\r\n<option value=\"Palmar de Bravo\">Palmar de Bravo<\/option>\r\n<option value=\"Pantepec\">Pantepec<\/option>\r\n<option value=\"Petlalcingo\">Petlalcingo<\/option>\r\n<option value=\"Piaxtla\">Piaxtla<\/option>\r\n<option value=\"Puebla\">Puebla<\/option>\r\n<option value=\"Quecholac\">Quecholac<\/option>\r\n<option value=\"Quimixtlan\">Quimixtlan<\/option>\r\n<option value=\"Rafael Lara Grajales\">Rafael Lara Grajales<\/option>\r\n<option value=\"Los Reyes de Juarez\">Los Reyes de Juarez<\/option>\r\n<option value=\"San Andres Cholula\">San Andres Cholula<\/option>\r\n<option value=\"San Antonio Ca\">San Antonio Ca<\/option>\r\n<option value=\"San Diego la Mesa Tochimiltzingo\">San Diego la Mesa Tochimiltzingo<\/option>\r\n<option value=\"San Felipe Teotlalcingo\">San Felipe Teotlalcingo<\/option>\r\n<option value=\"San Felipe Tepatlan\">San Felipe Tepatlan<\/option>\r\n<option value=\"San Gabriel Chilac\">San Gabriel Chilac<\/option>\r\n<option value=\"San Gregorio Atzompa\">San Gregorio Atzompa<\/option>\r\n<option value=\"San Jeronimo Tecuanipan\">San Jeronimo Tecuanipan<\/option>\r\n<option value=\"San Jeronimo Xayacatlan\">San Jeronimo Xayacatlan<\/option>\r\n<option value=\"San Jose Chiapa\">San Jose Chiapa<\/option>\r\n<option value=\"San Jose Miahuatlan\">San Jose Miahuatlan<\/option>\r\n<option value=\"San Juan Atenco\">San Juan Atenco<\/option>\r\n<option value=\"San Juan Atzompa\">San Juan Atzompa<\/option>\r\n<option value=\"San Martin Texmelucan\">San Martin Texmelucan<\/option>\r\n<option value=\"San Martin Totoltepec\">San Martin Totoltepec<\/option>\r\n<option value=\"San Matias Tlalancaleca\">San Matias Tlalancaleca<\/option>\r\n<option value=\"San Miguel Ixitlan\">San Miguel Ixitlan<\/option>\r\n<option value=\"San Miguel Xoxtla\">San Miguel Xoxtla<\/option>\r\n<option value=\"San Nicolas Buenos Aires\">San Nicolas Buenos Aires<\/option>\r\n<option value=\"San Nicolas de los Ranchos\">San Nicolas de los Ranchos<\/option>\r\n<option value=\"San Pablo Anicano\">San Pablo Anicano<\/option>\r\n<option value=\"San Pedro Cholula\">San Pedro Cholula<\/option>\r\n<option value=\"San Pedro Yeloixtlahuaca\">San Pedro Yeloixtlahuaca<\/option>\r\n<option value=\"San Salvador el Seco\">San Salvador el Seco<\/option>\r\n<option value=\"San Salvador el Verde\">San Salvador el Verde<\/option>\r\n<option value=\"San Salvador Huixcolotla\">San Salvador Huixcolotla<\/option>\r\n<option value=\"San Sebastian Tlacotepec\">San Sebastian Tlacotepec<\/option>\r\n<option value=\"Santa Catarina Tlaltempan\">Santa Catarina Tlaltempan<\/option>\r\n<option value=\"Santa Ines Ahuatempan\">Santa Ines Ahuatempan<\/option>\r\n<option value=\"Santa Isabel Cholula\">Santa Isabel Cholula<\/option>\r\n<option value=\"Santiago Miahuatlan\">Santiago Miahuatlan<\/option>\r\n<option value=\"Huehuetlan el Grande\">Huehuetlan el Grande<\/option>\r\n<option value=\"Santo Tomas Hueyotlipan\">Santo Tomas Hueyotlipan<\/option>\r\n<option value=\"Soltepec\">Soltepec<\/option>\r\n<option value=\"Tecali de Herrera\">Tecali de Herrera<\/option>\r\n<option value=\"Tecamachalco\">Tecamachalco<\/option>\r\n<option value=\"Tecomatlan\">Tecomatlan<\/option>\r\n<option value=\"Tehuacan\">Tehuacan<\/option>\r\n<option value=\"Tehuitzingo\">Tehuitzingo<\/option>\r\n<option value=\"Tenampulco\">Tenampulco<\/option>\r\n<option value=\"Teopantlan\">Teopantlan<\/option>\r\n<option value=\"Teotlalco\">Teotlalco<\/option>\r\n<option value=\"Tepanco de Lopez\">Tepanco de Lopez<\/option>\r\n<option value=\"Tepango de Rodriguez\">Tepango de Rodriguez<\/option>\r\n<option value=\"Tepatlaxco de Hidalgo\">Tepatlaxco de Hidalgo<\/option>\r\n<option value=\"Tepeaca\">Tepeaca<\/option>\r\n<option value=\"Tepemaxalco\">Tepemaxalco<\/option>\r\n<option value=\"Tepeojuma\">Tepeojuma<\/option>\r\n<option value=\"Tepetzintla\">Tepetzintla<\/option>\r\n<option value=\"Tepexco\">Tepexco<\/option>\r\n<option value=\"Tepexi de Rodriguez\">Tepexi de Rodriguez<\/option>\r\n<option value=\"Tepeyahualco\">Tepeyahualco<\/option>\r\n<option value=\"Tepeyahualco de Cuauhtemoc\">Tepeyahualco de Cuauhtemoc<\/option>\r\n<option value=\"Tetela de Ocampo\">Tetela de Ocampo<\/option>\r\n<option value=\"Teteles de Avila Castillo\">Teteles de Avila Castillo<\/option>\r\n<option value=\"Teziutlan\">Teziutlan<\/option>\r\n<option value=\"Tianguismanalco\">Tianguismanalco<\/option>\r\n<option value=\"Tilapa\">Tilapa<\/option>\r\n<option value=\"Tlacotepec de Benito Juarez\">Tlacotepec de Benito Juarez<\/option>\r\n<option value=\"Tlacuilotepec\">Tlacuilotepec<\/option>\r\n<option value=\"Tlachichuca\">Tlachichuca<\/option>\r\n<option value=\"Tlahuapan\">Tlahuapan<\/option>\r\n<option value=\"Tlaltenango\">Tlaltenango<\/option>\r\n<option value=\"Tlanepantla\">Tlanepantla<\/option>\r\n<option value=\"Tlaola\">Tlaola<\/option>\r\n<option value=\"Tlapacoya\">Tlapacoya<\/option>\r\n<option value=\"Tlapanala\">Tlapanala<\/option>\r\n<option value=\"Tlatlauquitepec\">Tlatlauquitepec<\/option>\r\n<option value=\"Tlaxco\">Tlaxco<\/option>\r\n<option value=\"Tochimilco\">Tochimilco<\/option>\r\n<option value=\"Tochtepec\">Tochtepec<\/option>\r\n<option value=\"Totoltepec de Guerrero\">Totoltepec de Guerrero<\/option>\r\n<option value=\"Tulcingo\">Tulcingo<\/option>\r\n<option value=\"Tuzamapan de Galeana\">Tuzamapan de Galeana<\/option>\r\n<option value=\"Tzicatlacoyan\">Tzicatlacoyan<\/option>\r\n<option value=\"Venustiano Carranza\">Venustiano Carranza<\/option>\r\n<option value=\"Vicente Guerrero\">Vicente Guerrero<\/option>\r\n<option value=\"Xayacatlan de Bravo\">Xayacatlan de Bravo<\/option>\r\n<option value=\"Xicotepec\">Xicotepec<\/option>\r\n<option value=\"Xicotlan\">Xicotlan<\/option>\r\n<option value=\"Xiutetelco\">Xiutetelco<\/option>\r\n<option value=\"Xochiapulco\">Xochiapulco<\/option>\r\n<option value=\"Xochiltepec\">Xochiltepec<\/option>\r\n<option value=\"Xochitlan de Vicente Suarez\">Xochitlan de Vicente Suarez<\/option>\r\n<option value=\"Xochitlan Todos Santos\">Xochitlan Todos Santos<\/option>\r\n<option value=\"Yaonahuac\">Yaonahuac<\/option>\r\n<option value=\"Yehualtepec\">Yehualtepec<\/option>\r\n<option value=\"Zacapala\">Zacapala<\/option>\r\n<option value=\"Zacapoaxtla\">Zacapoaxtla<\/option>\r\n<option value=\"Zacatlan\">Zacatlan<\/option>\r\n<option value=\"Zapotitlan\">Zapotitlan<\/option>\r\n<option value=\"Zapotitlan de Mendez\">Zapotitlan de Mendez<\/option>\r\n<option value=\"Zaragoza\">Zaragoza<\/option>\r\n<option value=\"Zautla\">Zautla<\/option>\r\n<option value=\"Zihuateutla\">Zihuateutla<\/option>\r\n<option value=\"Zinacatepec\">Zinacatepec<\/option>\r\n<option value=\"Zongozotla\">Zongozotla<\/option>\r\n<option value=\"Zoquiapan\">Zoquiapan<\/option>\r\n<option value=\"Zoquitlan\">Zoquitlan<\/option>');
        }
        else if ($(this).find(":selected").val() == "Querétaro"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Amealco de Bonfil\">Amealco de Bonfil<\/option>\r\n<option value=\"Pinal de Amoles\">Pinal de Amoles<\/option>\r\n<option value=\"Arroyo Seco\">Arroyo Seco<\/option>\r\n<option value=\"Cadereyta de Montes\">Cadereyta de Montes<\/option>\r\n<option value=\"Colon\">Colon<\/option>\r\n<option value=\"Corregidora\">Corregidora<\/option>\r\n<option value=\"Ezequiel Montes\">Ezequiel Montes<\/option>\r\n<option value=\"Huimilpan\">Huimilpan<\/option>\r\n<option value=\"Jalpan de Serra\">Jalpan de Serra<\/option>\r\n<option value=\"Landa de Matamoros\">Landa de Matamoros<\/option>\r\n<option value=\"El Marques\">El Marques<\/option>\r\n<option value=\"Pedro Escobedo\">Pedro Escobedo<\/option>\r\n<option value=\"Pe\">Pe<\/option>\r\n<option value=\"Queretaro\">Queretaro<\/option>\r\n<option value=\"San Joaquin\">San Joaquin<\/option>\r\n<option value=\"San Juan del Rio\">San Juan del Rio<\/option>\r\n<option value=\"Tequisquiapan\">Tequisquiapan<\/option>\r\n<option value=\"Toliman\">Toliman<\/option>');
        }
        else if ($(this).find(":selected").val() == "Quintana Roo"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Cozumel\">Cozumel<\/option>\r\n<option value=\"Felipe Carrillo Puerto\">Felipe Carrillo Puerto<\/option>\r\n<option value=\"Isla Mujeres\">Isla Mujeres<\/option>\r\n<option value=\"Othon P. Blanco\">Othon P. Blanco<\/option>\r\n<option value=\"Benito Juarez\">Benito Juarez<\/option>\r\n<option value=\"Jose Maria Morelos\">Jose Maria Morelos<\/option>\r\n<option value=\"Lazaro Cardenas\">Lazaro Cardenas<\/option>\r\n<option value=\"Solidaridad\">Solidaridad<\/option>\r\n<option value=\"Tulum\">Tulum<\/option>\r\n<option value=\"Bacalar\">Bacalar<\/option>');
        }
        else if ($(this).find(":selected").val() == "San Luis Potosí"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Ahualulco\">Ahualulco<\/option>\r\n<option value=\"Alaquines\">Alaquines<\/option>\r\n<option value=\"Aquismon\">Aquismon<\/option>\r\n<option value=\"Armadillo de los Infante\">Armadillo de los Infante<\/option>\r\n<option value=\"Cardenas\">Cardenas<\/option>\r\n<option value=\"Catorce\">Catorce<\/option>\r\n<option value=\"Cedral\">Cedral<\/option>\r\n<option value=\"Cerritos\">Cerritos<\/option>\r\n<option value=\"Cerro de San Pedro\">Cerro de San Pedro<\/option>\r\n<option value=\"Ciudad del Maiz\">Ciudad del Maiz<\/option>\r\n<option value=\"Ciudad Fernandez\">Ciudad Fernandez<\/option>\r\n<option value=\"Tancanhuitz\">Tancanhuitz<\/option>\r\n<option value=\"Ciudad Valles\">Ciudad Valles<\/option>\r\n<option value=\"Coxcatlan\">Coxcatlan<\/option>\r\n<option value=\"Charcas\">Charcas<\/option>\r\n<option value=\"Ebano\">Ebano<\/option>\r\n<option value=\"Guadalcazar\">Guadalcazar<\/option>\r\n<option value=\"Huehuetlan\">Huehuetlan<\/option>\r\n<option value=\"Lagunillas\">Lagunillas<\/option>\r\n<option value=\"Matehuala\">Matehuala<\/option>\r\n<option value=\"Mexquitic de Carmona\">Mexquitic de Carmona<\/option>\r\n<option value=\"Moctezuma\">Moctezuma<\/option>\r\n<option value=\"Rayon\">Rayon<\/option>\r\n<option value=\"Rioverde\">Rioverde<\/option>\r\n<option value=\"Salinas\">Salinas<\/option>\r\n<option value=\"San Antonio\">San Antonio<\/option>\r\n<option value=\"San Ciro de Acosta\">San Ciro de Acosta<\/option>\r\n<option value=\"San Luis Potosi\">San Luis Potosi<\/option>\r\n<option value=\"San Martin Chalchicuautla\">San Martin Chalchicuautla<\/option>\r\n<option value=\"San Nicolas Tolentino\">San Nicolas Tolentino<\/option>\r\n<option value=\"Santa Catarina\">Santa Catarina<\/option>\r\n<option value=\"Santa Maria del Rio\">Santa Maria del Rio<\/option>\r\n<option value=\"Santo Domingo\">Santo Domingo<\/option>\r\n<option value=\"San Vicente Tancuayalab\">San Vicente Tancuayalab<\/option>\r\n<option value=\"Soledad de Graciano Sanchez\">Soledad de Graciano Sanchez<\/option>\r\n<option value=\"Tamasopo\">Tamasopo<\/option>\r\n<option value=\"Tamazunchale\">Tamazunchale<\/option>\r\n<option value=\"Tampacan\">Tampacan<\/option>\r\n<option value=\"Tampamolon Corona\">Tampamolon Corona<\/option>\r\n<option value=\"Tamuin\">Tamuin<\/option>\r\n<option value=\"Tanlajas\">Tanlajas<\/option>\r\n<option value=\"Tanquian de Escobedo\">Tanquian de Escobedo<\/option>\r\n<option value=\"Tierra Nueva\">Tierra Nueva<\/option>\r\n<option value=\"Vanegas\">Vanegas<\/option>\r\n<option value=\"Venado\">Venado<\/option>\r\n<option value=\"Villa de Arriaga\">Villa de Arriaga<\/option>\r\n<option value=\"Villa de Guadalupe\">Villa de Guadalupe<\/option>\r\n<option value=\"Villa de la Paz\">Villa de la Paz<\/option>\r\n<option value=\"Villa de Ramos\">Villa de Ramos<\/option>\r\n<option value=\"Villa de Reyes\">Villa de Reyes<\/option>\r\n<option value=\"Villa Hidalgo\">Villa Hidalgo<\/option>\r\n<option value=\"Villa Juarez\">Villa Juarez<\/option>\r\n<option value=\"Axtla de Terrazas\">Axtla de Terrazas<\/option>\r\n<option value=\"Xilitla\">Xilitla<\/option>\r\n<option value=\"Zaragoza\">Zaragoza<\/option>\r\n<option value=\"Villa de Arista\">Villa de Arista<\/option>\r\n<option value=\"Matlapa\">Matlapa<\/option>\r\n<option value=\"El Naranjo\">El Naranjo<\/option>');
        }
        else if ($(this).find(":selected").val() == "Sinaloa"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Ahome\">Ahome<\/option>\r\n<option value=\"Angostura\">Angostura<\/option>\r\n<option value=\"Badiraguato\">Badiraguato<\/option>\r\n<option value=\"Concordia\">Concordia<\/option>\r\n<option value=\"Cosala\">Cosala<\/option>\r\n<option value=\"Culiacan\">Culiacan<\/option>\r\n<option value=\"Choix\">Choix<\/option>\r\n<option value=\"Elota\">Elota<\/option>\r\n<option value=\"Escuinapa\">Escuinapa<\/option>\r\n<option value=\"El Fuerte\">El Fuerte<\/option>\r\n<option value=\"Guasave\">Guasave<\/option>\r\n<option value=\"Mazatlan\">Mazatlan<\/option>\r\n<option value=\"Mocorito\">Mocorito<\/option>\r\n<option value=\"Rosario\">Rosario<\/option>\r\n<option value=\"Salvador Alvarado\">Salvador Alvarado<\/option>\r\n<option value=\"San Ignacio\">San Ignacio<\/option>\r\n<option value=\"Sinaloa\">Sinaloa<\/option>\r\n<option value=\"Navolato\">Navolato<\/option>');
        }
        else if ($(this).find(":selected").val() == "Sonora"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Aconchi\">Aconchi<\/option>\r\n<option value=\"Agua Prieta\">Agua Prieta<\/option>\r\n<option value=\"Alamos\">Alamos<\/option>\r\n<option value=\"Altar\">Altar<\/option>\r\n<option value=\"Arivechi\">Arivechi<\/option>\r\n<option value=\"Arizpe\">Arizpe<\/option>\r\n<option value=\"Atil\">Atil<\/option>\r\n<option value=\"Bacadehuachi\">Bacadehuachi<\/option>\r\n<option value=\"Bacanora\">Bacanora<\/option>\r\n<option value=\"Bacerac\">Bacerac<\/option>\r\n<option value=\"Bacoachi\">Bacoachi<\/option>\r\n<option value=\"Bacum\">Bacum<\/option>\r\n<option value=\"Banamichi\">Banamichi<\/option>\r\n<option value=\"Baviacora\">Baviacora<\/option>\r\n<option value=\"Bavispe\">Bavispe<\/option>\r\n<option value=\"Benjamin Hill\">Benjamin Hill<\/option>\r\n<option value=\"Caborca\">Caborca<\/option>\r\n<option value=\"Cajeme\">Cajeme<\/option>\r\n<option value=\"Cananea\">Cananea<\/option>\r\n<option value=\"Carbo\">Carbo<\/option>\r\n<option value=\"La Colorada\">La Colorada<\/option>\r\n<option value=\"Cucurpe\">Cucurpe<\/option>\r\n<option value=\"Cumpas\">Cumpas<\/option>\r\n<option value=\"Divisaderos\">Divisaderos<\/option>\r\n<option value=\"Empalme\">Empalme<\/option>\r\n<option value=\"Etchojoa\">Etchojoa<\/option>\r\n<option value=\"Fronteras\">Fronteras<\/option>\r\n<option value=\"Granados\">Granados<\/option>\r\n<option value=\"Guaymas\">Guaymas<\/option>\r\n<option value=\"Hermosillo\">Hermosillo<\/option>\r\n<option value=\"Huachinera\">Huachinera<\/option>\r\n<option value=\"Huasabas\">Huasabas<\/option>\r\n<option value=\"Huatabampo\">Huatabampo<\/option>\r\n<option value=\"Huepac\">Huepac<\/option>\r\n<option value=\"Imuris\">Imuris<\/option>\r\n<option value=\"Magdalena\">Magdalena<\/option>\r\n<option value=\"Mazatan\">Mazatan<\/option>\r\n<option value=\"Moctezuma\">Moctezuma<\/option>\r\n<option value=\"Naco\">Naco<\/option>\r\n<option value=\"Nacori Chico\">Nacori Chico<\/option>\r\n<option value=\"Nacozari de Garcia\">Nacozari de Garcia<\/option>\r\n<option value=\"Navojoa\">Navojoa<\/option>\r\n<option value=\"Nogales\">Nogales<\/option>\r\n<option value=\"Onavas\">Onavas<\/option>\r\n<option value=\"Opodepe\">Opodepe<\/option>\r\n<option value=\"Oquitoa\">Oquitoa<\/option>\r\n<option value=\"Pitiquito\">Pitiquito<\/option>\r\n<option value=\"Puerto Pe\">Puerto Pe<\/option>\r\n<option value=\"Quiriego\">Quiriego<\/option>\r\n<option value=\"Rayon\">Rayon<\/option>\r\n<option value=\"Rosario\">Rosario<\/option>\r\n<option value=\"Sahuaripa\">Sahuaripa<\/option>\r\n<option value=\"San Felipe de Jesus\">San Felipe de Jesus<\/option>\r\n<option value=\"San Javier\">San Javier<\/option>\r\n<option value=\"San Luis Rio Colorado\">San Luis Rio Colorado<\/option>\r\n<option value=\"San Miguel de Horcasitas\">San Miguel de Horcasitas<\/option>\r\n<option value=\"San Pedro de la Cueva\">San Pedro de la Cueva<\/option>\r\n<option value=\"Santa Ana\">Santa Ana<\/option>\r\n<option value=\"Santa Cruz\">Santa Cruz<\/option>\r\n<option value=\"Saric\">Saric<\/option>\r\n<option value=\"Soyopa\">Soyopa<\/option>\r\n<option value=\"Suaqui Grande\">Suaqui Grande<\/option>\r\n<option value=\"Tepache\">Tepache<\/option>\r\n<option value=\"Trincheras\">Trincheras<\/option>\r\n<option value=\"Tubutama\">Tubutama<\/option>\r\n<option value=\"Ures\">Ures<\/option>\r\n<option value=\"Villa Hidalgo\">Villa Hidalgo<\/option>\r\n<option value=\"Villa Pesqueira\">Villa Pesqueira<\/option>\r\n<option value=\"Yecora\">Yecora<\/option>\r\n<option value=\"General Plutarco Elias Calles\">General Plutarco Elias Calles<\/option>\r\n<option value=\"Benito Juarez\">Benito Juarez<\/option>\r\n<option value=\"San Ignacio Rio Muerto\">San Ignacio Rio Muerto<\/option>');
        }
        else if ($(this).find(":selected").val() == "Tabasco"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Balancan\">Balancan<\/option>\r\n<option value=\"Cardenas\">Cardenas<\/option>\r\n<option value=\"Centla\">Centla<\/option>\r\n<option value=\"Centro\">Centro<\/option>\r\n<option value=\"Comalcalco\">Comalcalco<\/option>\r\n<option value=\"Cunduacan\">Cunduacan<\/option>\r\n<option value=\"Emiliano Zapata\">Emiliano Zapata<\/option>\r\n<option value=\"Huimanguillo\">Huimanguillo<\/option>\r\n<option value=\"Jalapa\">Jalapa<\/option>\r\n<option value=\"Jalpa de Mendez\">Jalpa de Mendez<\/option>\r\n<option value=\"Jonuta\">Jonuta<\/option>\r\n<option value=\"Macuspana\">Macuspana<\/option>\r\n<option value=\"Nacajuca\">Nacajuca<\/option>\r\n<option value=\"Paraiso\">Paraiso<\/option>\r\n<option value=\"Tacotalpa\">Tacotalpa<\/option>\r\n<option value=\"Teapa\">Teapa<\/option>\r\n<option value=\"Tenosique\">Tenosique<\/option>');
        }
        else if ($(this).find(":selected").val() == "Tamaulipas"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Abasolo\">Abasolo<\/option>\r\n<option value=\"Aldama\">Aldama<\/option>\r\n<option value=\"Altamira\">Altamira<\/option>\r\n<option value=\"Antiguo Morelos\">Antiguo Morelos<\/option>\r\n<option value=\"Burgos\">Burgos<\/option>\r\n<option value=\"Bustamante\">Bustamante<\/option>\r\n<option value=\"Camargo\">Camargo<\/option>\r\n<option value=\"Casas\">Casas<\/option>\r\n<option value=\"Ciudad Madero\">Ciudad Madero<\/option>\r\n<option value=\"Cruillas\">Cruillas<\/option>\r\n<option value=\"Gomez Farias\">Gomez Farias<\/option>\r\n<option value=\"Gonzalez\">Gonzalez<\/option>\r\n<option value=\"G\">G<\/option>\r\n<option value=\"Guerrero\">Guerrero<\/option>\r\n<option value=\"Gustavo Diaz Ordaz\">Gustavo Diaz Ordaz<\/option>\r\n<option value=\"Hidalgo\">Hidalgo<\/option>\r\n<option value=\"Jaumave\">Jaumave<\/option>\r\n<option value=\"Jimenez\">Jimenez<\/option>\r\n<option value=\"Llera\">Llera<\/option>\r\n<option value=\"Mainero\">Mainero<\/option>\r\n<option value=\"El Mante\">El Mante<\/option>\r\n<option value=\"Matamoros\">Matamoros<\/option>\r\n<option value=\"Mendez\">Mendez<\/option>\r\n<option value=\"Mier\">Mier<\/option>\r\n<option value=\"Miguel Aleman\">Miguel Aleman<\/option>\r\n<option value=\"Miquihuana\">Miquihuana<\/option>\r\n<option value=\"Nuevo Laredo\">Nuevo Laredo<\/option>\r\n<option value=\"Nuevo Morelos\">Nuevo Morelos<\/option>\r\n<option value=\"Ocampo\">Ocampo<\/option>\r\n<option value=\"Padilla\">Padilla<\/option>\r\n<option value=\"Palmillas\">Palmillas<\/option>\r\n<option value=\"Reynosa\">Reynosa<\/option>\r\n<option value=\"Rio Bravo\">Rio Bravo<\/option>\r\n<option value=\"San Carlos\">San Carlos<\/option>\r\n<option value=\"San Fernando\">San Fernando<\/option>\r\n<option value=\"San Nicolas\">San Nicolas<\/option>\r\n<option value=\"Soto la Marina\">Soto la Marina<\/option>\r\n<option value=\"Tampico\">Tampico<\/option>\r\n<option value=\"Tula\">Tula<\/option>\r\n<option value=\"Valle Hermoso\">Valle Hermoso<\/option>\r\n<option value=\"Victoria\">Victoria<\/option>\r\n<option value=\"Villagran\">Villagran<\/option>\r\n<option value=\"Xicotencatl\">Xicotencatl<\/option>');
        }
        else if ($(this).find(":selected").val() == "Tlaxcala"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Amaxac de Guerrero\">Amaxac de Guerrero<\/option>\r\n<option value=\"Apetatitlan de Antonio Carvajal\">Apetatitlan de Antonio Carvajal<\/option>\r\n<option value=\"Atlangatepec\">Atlangatepec<\/option>\r\n<option value=\"Atltzayanca\">Atltzayanca<\/option>\r\n<option value=\"Apizaco\">Apizaco<\/option>\r\n<option value=\"Calpulalpan\">Calpulalpan<\/option>\r\n<option value=\"El Carmen Tequexquitla\">El Carmen Tequexquitla<\/option>\r\n<option value=\"Cuapiaxtla\">Cuapiaxtla<\/option>\r\n<option value=\"Cuaxomulco\">Cuaxomulco<\/option>\r\n<option value=\"Chiautempan\">Chiautempan<\/option>\r\n<option value=\"Mu\">Mu<\/option>\r\n<option value=\"Espa\">Espa<\/option>\r\n<option value=\"Huamantla\">Huamantla<\/option>\r\n<option value=\"Hueyotlipan\">Hueyotlipan<\/option>\r\n<option value=\"Ixtacuixtla de Mariano Matamoros\">Ixtacuixtla de Mariano Matamoros<\/option>\r\n<option value=\"Ixtenco\">Ixtenco<\/option>\r\n<option value=\"Mazatecochco de Jose Maria Morelos\">Mazatecochco de Jose Maria Morelos<\/option>\r\n<option value=\"Contla de Juan Cuamatzi\">Contla de Juan Cuamatzi<\/option>\r\n<option value=\"Tepetitla de Lardizabal\">Tepetitla de Lardizabal<\/option>\r\n<option value=\"Sanctorum de Lazaro Cardenas\">Sanctorum de Lazaro Cardenas<\/option>\r\n<option value=\"Nanacamilpa de Mariano Arista\">Nanacamilpa de Mariano Arista<\/option>\r\n<option value=\"Acuamanala de Miguel Hidalgo\">Acuamanala de Miguel Hidalgo<\/option>\r\n<option value=\"Nativitas\">Nativitas<\/option>\r\n<option value=\"Panotla\">Panotla<\/option>\r\n<option value=\"San Pablo del Monte\">San Pablo del Monte<\/option>\r\n<option value=\"Santa Cruz Tlaxcala\">Santa Cruz Tlaxcala<\/option>\r\n<option value=\"Tenancingo\">Tenancingo<\/option>\r\n<option value=\"Teolocholco\">Teolocholco<\/option>\r\n<option value=\"Tepeyanco\">Tepeyanco<\/option>\r\n<option value=\"Terrenate\">Terrenate<\/option>\r\n<option value=\"Tetla de la Solidaridad\">Tetla de la Solidaridad<\/option>\r\n<option value=\"Tetlatlahuca\">Tetlatlahuca<\/option>\r\n<option value=\"Tlaxcala\">Tlaxcala<\/option>\r\n<option value=\"Tlaxco\">Tlaxco<\/option>\r\n<option value=\"Tocatlan\">Tocatlan<\/option>\r\n<option value=\"Totolac\">Totolac<\/option>\r\n<option value=\"Ziltlaltepec de Trinidad Sanchez Santos\">Ziltlaltepec de Trinidad Sanchez Santos<\/option>\r\n<option value=\"Tzompantepec\">Tzompantepec<\/option>\r\n<option value=\"Xaloztoc\">Xaloztoc<\/option>\r\n<option value=\"Xaltocan\">Xaltocan<\/option>\r\n<option value=\"Papalotla de Xicohtencatl\">Papalotla de Xicohtencatl<\/option>\r\n<option value=\"Xicohtzinco\">Xicohtzinco<\/option>\r\n<option value=\"Yauhquemehcan\">Yauhquemehcan<\/option>\r\n<option value=\"Zacatelco\">Zacatelco<\/option>\r\n<option value=\"Benito Juarez\">Benito Juarez<\/option>\r\n<option value=\"Emiliano Zapata\">Emiliano Zapata<\/option>\r\n<option value=\"Lazaro Cardenas\">Lazaro Cardenas<\/option>\r\n<option value=\"La Magdalena Tlaltelulco\">La Magdalena Tlaltelulco<\/option>\r\n<option value=\"San Damian Texoloc\">San Damian Texoloc<\/option>\r\n<option value=\"San Francisco Tetlanohcan\">San Francisco Tetlanohcan<\/option>\r\n<option value=\"San Jeronimo Zacualpan\">San Jeronimo Zacualpan<\/option>\r\n<option value=\"San Jose Teacalco\">San Jose Teacalco<\/option>\r\n<option value=\"San Juan Huactzinco\">San Juan Huactzinco<\/option>\r\n<option value=\"San Lorenzo Axocomanitla\">San Lorenzo Axocomanitla<\/option>\r\n<option value=\"San Lucas Tecopilco\">San Lucas Tecopilco<\/option>\r\n<option value=\"Santa Ana Nopalucan\">Santa Ana Nopalucan<\/option>\r\n<option value=\"Santa Apolonia Teacalco\">Santa Apolonia Teacalco<\/option>\r\n<option value=\"Santa Catarina Ayometla\">Santa Catarina Ayometla<\/option>\r\n<option value=\"Santa Cruz Quilehtla\">Santa Cruz Quilehtla<\/option>\r\n<option value=\"Santa Isabel Xiloxoxtla\">Santa Isabel Xiloxoxtla<\/option>');
        }
        else if ($(this).find(":selected").val() == "Veracruz de Ignacio de la Llave"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Acajete\">Acajete<\/option>\r\n<option value=\"Acatlan\">Acatlan<\/option>\r\n<option value=\"Acayucan\">Acayucan<\/option>\r\n<option value=\"Actopan\">Actopan<\/option>\r\n<option value=\"Acula\">Acula<\/option>\r\n<option value=\"Acultzingo\">Acultzingo<\/option>\r\n<option value=\"Camaron de Tejeda\">Camaron de Tejeda<\/option>\r\n<option value=\"Alpatlahuac\">Alpatlahuac<\/option>\r\n<option value=\"Alto Lucero de Gutierrez Barrios\">Alto Lucero de Gutierrez Barrios<\/option>\r\n<option value=\"Altotonga\">Altotonga<\/option>\r\n<option value=\"Alvarado\">Alvarado<\/option>\r\n<option value=\"Amatitlan\">Amatitlan<\/option>\r\n<option value=\"Naranjos Amatlan\">Naranjos Amatlan<\/option>\r\n<option value=\"Amatlan de los Reyes\">Amatlan de los Reyes<\/option>\r\n<option value=\"Angel R. Cabada\">Angel R. Cabada<\/option>\r\n<option value=\"La Antigua\">La Antigua<\/option>\r\n<option value=\"Apazapan\">Apazapan<\/option>\r\n<option value=\"Aquila\">Aquila<\/option>\r\n<option value=\"Astacinga\">Astacinga<\/option>\r\n<option value=\"Atlahuilco\">Atlahuilco<\/option>\r\n<option value=\"Atoyac\">Atoyac<\/option>\r\n<option value=\"Atzacan\">Atzacan<\/option>\r\n<option value=\"Atzalan\">Atzalan<\/option>\r\n<option value=\"Tlaltetela\">Tlaltetela<\/option>\r\n<option value=\"Ayahualulco\">Ayahualulco<\/option>\r\n<option value=\"Banderilla\">Banderilla<\/option>\r\n<option value=\"Benito Juarez\">Benito Juarez<\/option>\r\n<option value=\"Boca del Rio\">Boca del Rio<\/option>\r\n<option value=\"Calcahualco\">Calcahualco<\/option>\r\n<option value=\"Camerino Z. Mendoza\">Camerino Z. Mendoza<\/option>\r\n<option value=\"Carrillo Puerto\">Carrillo Puerto<\/option>\r\n<option value=\"Catemaco\">Catemaco<\/option>\r\n<option value=\"Cazones de Herrera\">Cazones de Herrera<\/option>\r\n<option value=\"Cerro Azul\">Cerro Azul<\/option>\r\n<option value=\"Citlaltepetl\">Citlaltepetl<\/option>\r\n<option value=\"Coacoatzintla\">Coacoatzintla<\/option>\r\n<option value=\"Coahuitlan\">Coahuitlan<\/option>\r\n<option value=\"Coatepec\">Coatepec<\/option>\r\n<option value=\"Coatzacoalcos\">Coatzacoalcos<\/option>\r\n<option value=\"Coatzintla\">Coatzintla<\/option>\r\n<option value=\"Coetzala\">Coetzala<\/option>\r\n<option value=\"Colipa\">Colipa<\/option>\r\n<option value=\"Comapa\">Comapa<\/option>\r\n<option value=\"Cordoba\">Cordoba<\/option>\r\n<option value=\"Cosamaloapan de Carpio\">Cosamaloapan de Carpio<\/option>\r\n<option value=\"Cosautlan de Carvajal\">Cosautlan de Carvajal<\/option>\r\n<option value=\"Coscomatepec\">Coscomatepec<\/option>\r\n<option value=\"Cosoleacaque\">Cosoleacaque<\/option>\r\n<option value=\"Cotaxtla\">Cotaxtla<\/option>\r\n<option value=\"Coxquihui\">Coxquihui<\/option>\r\n<option value=\"Coyutla\">Coyutla<\/option>\r\n<option value=\"Cuichapa\">Cuichapa<\/option>\r\n<option value=\"Cuitlahuac\">Cuitlahuac<\/option>\r\n<option value=\"Chacaltianguis\">Chacaltianguis<\/option>\r\n<option value=\"Chalma\">Chalma<\/option>\r\n<option value=\"Chiconamel\">Chiconamel<\/option>\r\n<option value=\"Chiconquiaco\">Chiconquiaco<\/option>\r\n<option value=\"Chicontepec\">Chicontepec<\/option>\r\n<option value=\"Chinameca\">Chinameca<\/option>\r\n<option value=\"Chinampa de Gorostiza\">Chinampa de Gorostiza<\/option>\r\n<option value=\"Las Choapas\">Las Choapas<\/option>\r\n<option value=\"Chocaman\">Chocaman<\/option>\r\n<option value=\"Chontla\">Chontla<\/option>\r\n<option value=\"Chumatlan\">Chumatlan<\/option>\r\n<option value=\"Emiliano Zapata\">Emiliano Zapata<\/option>\r\n<option value=\"Espinal\">Espinal<\/option>\r\n<option value=\"Filomeno Mata\">Filomeno Mata<\/option>\r\n<option value=\"Fortin\">Fortin<\/option>\r\n<option value=\"Gutierrez Zamora\">Gutierrez Zamora<\/option>\r\n<option value=\"Hidalgotitlan\">Hidalgotitlan<\/option>\r\n<option value=\"Huatusco\">Huatusco<\/option>\r\n<option value=\"Huayacocotla\">Huayacocotla<\/option>\r\n<option value=\"Hueyapan de Ocampo\">Hueyapan de Ocampo<\/option>\r\n<option value=\"Huiloapan de Cuauhtemoc\">Huiloapan de Cuauhtemoc<\/option>\r\n<option value=\"Ignacio de la Llave\">Ignacio de la Llave<\/option>\r\n<option value=\"Ilamatlan\">Ilamatlan<\/option>\r\n<option value=\"Isla\">Isla<\/option>\r\n<option value=\"Ixcatepec\">Ixcatepec<\/option>\r\n<option value=\"Ixhuacan de los Reyes\">Ixhuacan de los Reyes<\/option>\r\n<option value=\"Ixhuatlan del Cafe\">Ixhuatlan del Cafe<\/option>\r\n<option value=\"Ixhuatlancillo\">Ixhuatlancillo<\/option>\r\n<option value=\"Ixhuatlan del Sureste\">Ixhuatlan del Sureste<\/option>\r\n<option value=\"Ixhuatlan de Madero\">Ixhuatlan de Madero<\/option>\r\n<option value=\"Ixmatlahuacan\">Ixmatlahuacan<\/option>\r\n<option value=\"Ixtaczoquitlan\">Ixtaczoquitlan<\/option>\r\n<option value=\"Jalacingo\">Jalacingo<\/option>\r\n<option value=\"Xalapa\">Xalapa<\/option>\r\n<option value=\"Jalcomulco\">Jalcomulco<\/option>\r\n<option value=\"Jaltipan\">Jaltipan<\/option>\r\n<option value=\"Jamapa\">Jamapa<\/option>\r\n<option value=\"Jesus Carranza\">Jesus Carranza<\/option>\r\n<option value=\"Xico\">Xico<\/option>\r\n<option value=\"Jilotepec\">Jilotepec<\/option>\r\n<option value=\"Juan Rodriguez Clara\">Juan Rodriguez Clara<\/option>\r\n<option value=\"Juchique de Ferrer\">Juchique de Ferrer<\/option>\r\n<option value=\"Landero y Coss\">Landero y Coss<\/option>\r\n<option value=\"Lerdo de Tejada\">Lerdo de Tejada<\/option>\r\n<option value=\"Magdalena\">Magdalena<\/option>\r\n<option value=\"Maltrata\">Maltrata<\/option>\r\n<option value=\"Manlio Fabio Altamirano\">Manlio Fabio Altamirano<\/option>\r\n<option value=\"Mariano Escobedo\">Mariano Escobedo<\/option>\r\n<option value=\"Martinez de la Torre\">Martinez de la Torre<\/option>\r\n<option value=\"Mecatlan\">Mecatlan<\/option>\r\n<option value=\"Mecayapan\">Mecayapan<\/option>\r\n<option value=\"Medellin\">Medellin<\/option>\r\n<option value=\"Miahuatlan\">Miahuatlan<\/option>\r\n<option value=\"Las Minas\">Las Minas<\/option>\r\n<option value=\"Minatitlan\">Minatitlan<\/option>\r\n<option value=\"Misantla\">Misantla<\/option>\r\n<option value=\"Mixtla de Altamirano\">Mixtla de Altamirano<\/option>\r\n<option value=\"Moloacan\">Moloacan<\/option>\r\n<option value=\"Naolinco\">Naolinco<\/option>\r\n<option value=\"Naranjal\">Naranjal<\/option>\r\n<option value=\"Nautla\">Nautla<\/option>\r\n<option value=\"Nogales\">Nogales<\/option>\r\n<option value=\"Oluta\">Oluta<\/option>\r\n<option value=\"Omealca\">Omealca<\/option>\r\n<option value=\"Orizaba\">Orizaba<\/option>\r\n<option value=\"Otatitlan\">Otatitlan<\/option>\r\n<option value=\"Oteapan\">Oteapan<\/option>\r\n<option value=\"Ozuluama de Mascare\">Ozuluama de Mascare<\/option>\r\n<option value=\"Pajapan\">Pajapan<\/option>\r\n<option value=\"Panuco\">Panuco<\/option>\r\n<option value=\"Papantla\">Papantla<\/option>\r\n<option value=\"Paso del Macho\">Paso del Macho<\/option>\r\n<option value=\"Paso de Ovejas\">Paso de Ovejas<\/option>\r\n<option value=\"La Perla\">La Perla<\/option>\r\n<option value=\"Perote\">Perote<\/option>\r\n<option value=\"Platon Sanchez\">Platon Sanchez<\/option>\r\n<option value=\"Playa Vicente\">Playa Vicente<\/option>\r\n<option value=\"Poza Rica de Hidalgo\">Poza Rica de Hidalgo<\/option>\r\n<option value=\"Las Vigas de Ramirez\">Las Vigas de Ramirez<\/option>\r\n<option value=\"Pueblo Viejo\">Pueblo Viejo<\/option>\r\n<option value=\"Puente Nacional\">Puente Nacional<\/option>\r\n<option value=\"Rafael Delgado\">Rafael Delgado<\/option>\r\n<option value=\"Rafael Lucio\">Rafael Lucio<\/option>\r\n<option value=\"Los Reyes\">Los Reyes<\/option>\r\n<option value=\"Rio Blanco\">Rio Blanco<\/option>\r\n<option value=\"Saltabarranca\">Saltabarranca<\/option>\r\n<option value=\"San Andres Tenejapan\">San Andres Tenejapan<\/option>\r\n<option value=\"San Andres Tuxtla\">San Andres Tuxtla<\/option>\r\n<option value=\"San Juan Evangelista\">San Juan Evangelista<\/option>\r\n<option value=\"Santiago Tuxtla\">Santiago Tuxtla<\/option>\r\n<option value=\"Sayula de Aleman\">Sayula de Aleman<\/option>\r\n<option value=\"Soconusco\">Soconusco<\/option>\r\n<option value=\"Sochiapa\">Sochiapa<\/option>\r\n<option value=\"Soledad Atzompa\">Soledad Atzompa<\/option>\r\n<option value=\"Soledad de Doblado\">Soledad de Doblado<\/option>\r\n<option value=\"Soteapan\">Soteapan<\/option>\r\n<option value=\"Tamalin\">Tamalin<\/option>\r\n<option value=\"Tamiahua\">Tamiahua<\/option>\r\n<option value=\"Tampico Alto\">Tampico Alto<\/option>\r\n<option value=\"Tancoco\">Tancoco<\/option>\r\n<option value=\"Tantima\">Tantima<\/option>\r\n<option value=\"Tantoyuca\">Tantoyuca<\/option>\r\n<option value=\"Tatatila\">Tatatila<\/option>\r\n<option value=\"Castillo de Teayo\">Castillo de Teayo<\/option>\r\n<option value=\"Tecolutla\">Tecolutla<\/option>\r\n<option value=\"Tehuipango\">Tehuipango<\/option>\r\n<option value=\"Alamo Temapache\">Alamo Temapache<\/option>\r\n<option value=\"Tempoal\">Tempoal<\/option>\r\n<option value=\"Tenampa\">Tenampa<\/option>\r\n<option value=\"Tenochtitlan\">Tenochtitlan<\/option>\r\n<option value=\"Teocelo\">Teocelo<\/option>\r\n<option value=\"Tepatlaxco\">Tepatlaxco<\/option>\r\n<option value=\"Tepetlan\">Tepetlan<\/option>\r\n<option value=\"Tepetzintla\">Tepetzintla<\/option>\r\n<option value=\"Tequila\">Tequila<\/option>\r\n<option value=\"Jose Azueta\">Jose Azueta<\/option>\r\n<option value=\"Texcatepec\">Texcatepec<\/option>\r\n<option value=\"Texhuacan\">Texhuacan<\/option>\r\n<option value=\"Texistepec\">Texistepec<\/option>\r\n<option value=\"Tezonapa\">Tezonapa<\/option>\r\n<option value=\"Tierra Blanca\">Tierra Blanca<\/option>\r\n<option value=\"Tihuatlan\">Tihuatlan<\/option>\r\n<option value=\"Tlacojalpan\">Tlacojalpan<\/option>\r\n<option value=\"Tlacolulan\">Tlacolulan<\/option>\r\n<option value=\"Tlacotalpan\">Tlacotalpan<\/option>\r\n<option value=\"Tlacotepec de Mejia\">Tlacotepec de Mejia<\/option>\r\n<option value=\"Tlachichilco\">Tlachichilco<\/option>\r\n<option value=\"Tlalixcoyan\">Tlalixcoyan<\/option>\r\n<option value=\"Tlalnelhuayocan\">Tlalnelhuayocan<\/option>\r\n<option value=\"Tlapacoyan\">Tlapacoyan<\/option>\r\n<option value=\"Tlaquilpa\">Tlaquilpa<\/option>\r\n<option value=\"Tlilapan\">Tlilapan<\/option>\r\n<option value=\"Tomatlan\">Tomatlan<\/option>\r\n<option value=\"Tonayan\">Tonayan<\/option>\r\n<option value=\"Totutla\">Totutla<\/option>\r\n<option value=\"Tuxpan\">Tuxpan<\/option>\r\n<option value=\"Tuxtilla\">Tuxtilla<\/option>\r\n<option value=\"Ursulo Galvan\">Ursulo Galvan<\/option>\r\n<option value=\"Vega de Alatorre\">Vega de Alatorre<\/option>\r\n<option value=\"Veracruz\">Veracruz<\/option>\r\n<option value=\"Villa Aldama\">Villa Aldama<\/option>\r\n<option value=\"Xoxocotla\">Xoxocotla<\/option>\r\n<option value=\"Yanga\">Yanga<\/option>\r\n<option value=\"Yecuatla\">Yecuatla<\/option>\r\n<option value=\"Zacualpan\">Zacualpan<\/option>\r\n<option value=\"Zaragoza\">Zaragoza<\/option>\r\n<option value=\"Zentla\">Zentla<\/option>\r\n<option value=\"Zongolica\">Zongolica<\/option>\r\n<option value=\"Zontecomatlan de Lopez y Fuentes\">Zontecomatlan de Lopez y Fuentes<\/option>\r\n<option value=\"Zozocolco de Hidalgo\">Zozocolco de Hidalgo<\/option>\r\n<option value=\"Agua Dulce\">Agua Dulce<\/option>\r\n<option value=\"El Higo\">El Higo<\/option>\r\n<option value=\"Nanchital de Lazaro Cardenas del Rio\">Nanchital de Lazaro Cardenas del Rio<\/option>\r\n<option value=\"Tres Valles\">Tres Valles<\/option>\r\n<option value=\"Carlos A. Carrillo\">Carlos A. Carrillo<\/option>\r\n<option value=\"Tatahuicapan de Juarez\">Tatahuicapan de Juarez<\/option>\r\n<option value=\"Uxpanapa\">Uxpanapa<\/option>\r\n<option value=\"San Rafael\">San Rafael<\/option>\r\n<option value=\"Santiago Sochiapan\">Santiago Sochiapan<\/option>');
        }
        else if ($(this).find(":selected").val() == "Yucatán"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Abala\">Abala<\/option>\r\n<option value=\"Acanceh\">Acanceh<\/option>\r\n<option value=\"Akil\">Akil<\/option>\r\n<option value=\"Baca\">Baca<\/option>\r\n<option value=\"Bokoba\">Bokoba<\/option>\r\n<option value=\"Buctzotz\">Buctzotz<\/option>\r\n<option value=\"Cacalchen\">Cacalchen<\/option>\r\n<option value=\"Calotmul\">Calotmul<\/option>\r\n<option value=\"Cansahcab\">Cansahcab<\/option>\r\n<option value=\"Cantamayec\">Cantamayec<\/option>\r\n<option value=\"Celestun\">Celestun<\/option>\r\n<option value=\"Cenotillo\">Cenotillo<\/option>\r\n<option value=\"Conkal\">Conkal<\/option>\r\n<option value=\"Cuncunul\">Cuncunul<\/option>\r\n<option value=\"Cuzama\">Cuzama<\/option>\r\n<option value=\"Chacsinkin\">Chacsinkin<\/option>\r\n<option value=\"Chankom\">Chankom<\/option>\r\n<option value=\"Chapab\">Chapab<\/option>\r\n<option value=\"Chemax\">Chemax<\/option>\r\n<option value=\"Chicxulub Pueblo\">Chicxulub Pueblo<\/option>\r\n<option value=\"Chichimila\">Chichimila<\/option>\r\n<option value=\"Chikindzonot\">Chikindzonot<\/option>\r\n<option value=\"Chochola\">Chochola<\/option>\r\n<option value=\"Chumayel\">Chumayel<\/option>\r\n<option value=\"Dzan\">Dzan<\/option>\r\n<option value=\"Dzemul\">Dzemul<\/option>\r\n<option value=\"Dzidzantun\">Dzidzantun<\/option>\r\n<option value=\"Dzilam de Bravo\">Dzilam de Bravo<\/option>\r\n<option value=\"Dzilam Gonzalez\">Dzilam Gonzalez<\/option>\r\n<option value=\"Dzitas\">Dzitas<\/option>\r\n<option value=\"Dzoncauich\">Dzoncauich<\/option>\r\n<option value=\"Espita\">Espita<\/option>\r\n<option value=\"Halacho\">Halacho<\/option>\r\n<option value=\"Hocaba\">Hocaba<\/option>\r\n<option value=\"Hoctun\">Hoctun<\/option>\r\n<option value=\"Homun\">Homun<\/option>\r\n<option value=\"Huhi\">Huhi<\/option>\r\n<option value=\"Hunucma\">Hunucma<\/option>\r\n<option value=\"Ixil\">Ixil<\/option>\r\n<option value=\"Izamal\">Izamal<\/option>\r\n<option value=\"Kanasin\">Kanasin<\/option>\r\n<option value=\"Kantunil\">Kantunil<\/option>\r\n<option value=\"Kaua\">Kaua<\/option>\r\n<option value=\"Kinchil\">Kinchil<\/option>\r\n<option value=\"Kopoma\">Kopoma<\/option>\r\n<option value=\"Mama\">Mama<\/option>\r\n<option value=\"Mani\">Mani<\/option>\r\n<option value=\"Maxcanu\">Maxcanu<\/option>\r\n<option value=\"Mayapan\">Mayapan<\/option>\r\n<option value=\"Merida\">Merida<\/option>\r\n<option value=\"Mococha\">Mococha<\/option>\r\n<option value=\"Motul\">Motul<\/option>\r\n<option value=\"Muna\">Muna<\/option>\r\n<option value=\"Muxupip\">Muxupip<\/option>\r\n<option value=\"Opichen\">Opichen<\/option>\r\n<option value=\"Oxkutzcab\">Oxkutzcab<\/option>\r\n<option value=\"Panaba\">Panaba<\/option>\r\n<option value=\"Peto\">Peto<\/option>\r\n<option value=\"Progreso\">Progreso<\/option>\r\n<option value=\"Quintana Roo\">Quintana Roo<\/option>\r\n<option value=\"Rio Lagartos\">Rio Lagartos<\/option>\r\n<option value=\"Sacalum\">Sacalum<\/option>\r\n<option value=\"Samahil\">Samahil<\/option>\r\n<option value=\"Sanahcat\">Sanahcat<\/option>\r\n<option value=\"San Felipe\">San Felipe<\/option>\r\n<option value=\"Santa Elena\">Santa Elena<\/option>\r\n<option value=\"Seye\">Seye<\/option>\r\n<option value=\"Sinanche\">Sinanche<\/option>\r\n<option value=\"Sotuta\">Sotuta<\/option>\r\n<option value=\"Sucila\">Sucila<\/option>\r\n<option value=\"Sudzal\">Sudzal<\/option>\r\n<option value=\"Suma\">Suma<\/option>\r\n<option value=\"Tahdziu\">Tahdziu<\/option>\r\n<option value=\"Tahmek\">Tahmek<\/option>\r\n<option value=\"Teabo\">Teabo<\/option>\r\n<option value=\"Tecoh\">Tecoh<\/option>\r\n<option value=\"Tekal de Venegas\">Tekal de Venegas<\/option>\r\n<option value=\"Tekanto\">Tekanto<\/option>\r\n<option value=\"Tekax\">Tekax<\/option>\r\n<option value=\"Tekit\">Tekit<\/option>\r\n<option value=\"Tekom\">Tekom<\/option>\r\n<option value=\"Telchac Pueblo\">Telchac Pueblo<\/option>\r\n<option value=\"Telchac Puerto\">Telchac Puerto<\/option>\r\n<option value=\"Temax\">Temax<\/option>\r\n<option value=\"Temozon\">Temozon<\/option>\r\n<option value=\"Tepakan\">Tepakan<\/option>\r\n<option value=\"Tetiz\">Tetiz<\/option>\r\n<option value=\"Teya\">Teya<\/option>\r\n<option value=\"Ticul\">Ticul<\/option>\r\n<option value=\"Timucuy\">Timucuy<\/option>\r\n<option value=\"Tinum\">Tinum<\/option>\r\n<option value=\"Tixcacalcupul\">Tixcacalcupul<\/option>\r\n<option value=\"Tixkokob\">Tixkokob<\/option>\r\n<option value=\"Tixmehuac\">Tixmehuac<\/option>\r\n<option value=\"Tixpehual\">Tixpehual<\/option>\r\n<option value=\"Tizimin\">Tizimin<\/option>\r\n<option value=\"Tunkas\">Tunkas<\/option>\r\n<option value=\"Tzucacab\">Tzucacab<\/option>\r\n<option value=\"Uayma\">Uayma<\/option>\r\n<option value=\"Ucu\">Ucu<\/option>\r\n<option value=\"Uman\">Uman<\/option>\r\n<option value=\"Valladolid\">Valladolid<\/option>\r\n<option value=\"Xocchel\">Xocchel<\/option>\r\n<option value=\"Yaxcaba\">Yaxcaba<\/option>\r\n<option value=\"Yaxkukul\">Yaxkukul<\/option>\r\n<option value=\"Yobain\">Yobain<\/option>');
        }
        else if ($(this).find(":selected").val() == "Zacatecas"){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Selecciona uno</option>'+
                '<option value=\"Apozol\">Apozol<\/option>\r\n<option value=\"Apulco\">Apulco<\/option>\r\n<option value=\"Atolinga\">Atolinga<\/option>\r\n<option value=\"Benito Juarez\">Benito Juarez<\/option>\r\n<option value=\"Calera\">Calera<\/option>\r\n<option value=\"Ca\">Ca<\/option>\r\n<option value=\"Concepcion del Oro\">Concepcion del Oro<\/option>\r\n<option value=\"Cuauhtemoc\">Cuauhtemoc<\/option>\r\n<option value=\"Chalchihuites\">Chalchihuites<\/option>\r\n<option value=\"Fresnillo\">Fresnillo<\/option>\r\n<option value=\"Trinidad Garcia de la Cadena\">Trinidad Garcia de la Cadena<\/option>\r\n<option value=\"Genaro Codina\">Genaro Codina<\/option>\r\n<option value=\"General Enrique Estrada\">General Enrique Estrada<\/option>\r\n<option value=\"General Francisco R. Murguia\">General Francisco R. Murguia<\/option>\r\n<option value=\"El Plateado de Joaquin Amaro\">El Plateado de Joaquin Amaro<\/option>\r\n<option value=\"General Panfilo Natera\">General Panfilo Natera<\/option>\r\n<option value=\"Guadalupe\">Guadalupe<\/option>\r\n<option value=\"Huanusco\">Huanusco<\/option>\r\n<option value=\"Jalpa\">Jalpa<\/option>\r\n<option value=\"Jerez\">Jerez<\/option>\r\n<option value=\"Jimenez del Teul\">Jimenez del Teul<\/option>\r\n<option value=\"Juan Aldama\">Juan Aldama<\/option>\r\n<option value=\"Juchipila\">Juchipila<\/option>\r\n<option value=\"Loreto\">Loreto<\/option>\r\n<option value=\"Luis Moya\">Luis Moya<\/option>\r\n<option value=\"Mazapil\">Mazapil<\/option>\r\n<option value=\"Melchor Ocampo\">Melchor Ocampo<\/option>\r\n<option value=\"Mezquital del Oro\">Mezquital del Oro<\/option>\r\n<option value=\"Miguel Auza\">Miguel Auza<\/option>\r\n<option value=\"Momax\">Momax<\/option>\r\n<option value=\"Monte Escobedo\">Monte Escobedo<\/option>\r\n<option value=\"Morelos\">Morelos<\/option>\r\n<option value=\"Moyahua de Estrada\">Moyahua de Estrada<\/option>\r\n<option value=\"Nochistlan de Mejia\">Nochistlan de Mejia<\/option>\r\n<option value=\"Noria de Angeles\">Noria de Angeles<\/option>\r\n<option value=\"Ojocaliente\">Ojocaliente<\/option>\r\n<option value=\"Panuco\">Panuco<\/option>\r\n<option value=\"Pinos\">Pinos<\/option>\r\n<option value=\"Rio Grande\">Rio Grande<\/option>\r\n<option value=\"Sain Alto\">Sain Alto<\/option>\r\n<option value=\"El Salvador\">El Salvador<\/option>\r\n<option value=\"Sombrerete\">Sombrerete<\/option>\r\n<option value=\"Susticacan\">Susticacan<\/option>\r\n<option value=\"Tabasco\">Tabasco<\/option>\r\n<option value=\"Tepechitlan\">Tepechitlan<\/option>\r\n<option value=\"Tepetongo\">Tepetongo<\/option>\r\n<option value=\"Teul de Gonzalez Ortega\">Teul de Gonzalez Ortega<\/option>\r\n<option value=\"Tlaltenango de Sanchez Roman\">Tlaltenango de Sanchez Roman<\/option>\r\n<option value=\"Valparaiso\">Valparaiso<\/option>\r\n<option value=\"Vetagrande\">Vetagrande<\/option>\r\n<option value=\"Villa de Cos\">Villa de Cos<\/option>\r\n<option value=\"Villa Garcia\">Villa Garcia<\/option>\r\n<option value=\"Villa Gonzalez Ortega\">Villa Gonzalez Ortega<\/option>\r\n<option value=\"Villa Hidalgo\">Villa Hidalgo<\/option>\r\n<option value=\"Villanueva\">Villanueva<\/option>\r\n<option value=\"Zacatecas\">Zacatecas<\/option>\r\n<option value=\"Trancoso\">Trancoso<\/option>\r\n<option value=\"Santa Maria de la Paz\">Santa Maria de la Paz<\/option><option value=\"Apozol\">Apozol<\/option>\r\n<option value=\"Apulco\">Apulco<\/option>\r\n<option value=\"Atolinga\">Atolinga<\/option>\r\n<option value=\"Benito Juarez\">Benito Juarez<\/option>\r\n<option value=\"Calera\">Calera<\/option>\r\n<option value=\"Ca\">Ca<\/option>\r\n<option value=\"Concepcion del Oro\">Concepcion del Oro<\/option>\r\n<option value=\"Cuauhtemoc\">Cuauhtemoc<\/option>\r\n<option value=\"Chalchihuites\">Chalchihuites<\/option>\r\n<option value=\"Fresnillo\">Fresnillo<\/option>\r\n<option value=\"Trinidad Garcia de la Cadena\">Trinidad Garcia de la Cadena<\/option>\r\n<option value=\"Genaro Codina\">Genaro Codina<\/option>\r\n<option value=\"General Enrique Estrada\">General Enrique Estrada<\/option>\r\n<option value=\"General Francisco R. Murguia\">General Francisco R. Murguia<\/option>\r\n<option value=\"El Plateado de Joaquin Amaro\">El Plateado de Joaquin Amaro<\/option>\r\n<option value=\"General Panfilo Natera\">General Panfilo Natera<\/option>\r\n<option value=\"Guadalupe\">Guadalupe<\/option>\r\n<option value=\"Huanusco\">Huanusco<\/option>\r\n<option value=\"Jalpa\">Jalpa<\/option>\r\n<option value=\"Jerez\">Jerez<\/option>\r\n<option value=\"Jimenez del Teul\">Jimenez del Teul<\/option>\r\n<option value=\"Juan Aldama\">Juan Aldama<\/option>\r\n<option value=\"Juchipila\">Juchipila<\/option>\r\n<option value=\"Loreto\">Loreto<\/option>\r\n<option value=\"Luis Moya\">Luis Moya<\/option>\r\n<option value=\"Mazapil\">Mazapil<\/option>\r\n<option value=\"Melchor Ocampo\">Melchor Ocampo<\/option>\r\n<option value=\"Mezquital del Oro\">Mezquital del Oro<\/option>\r\n<option value=\"Miguel Auza\">Miguel Auza<\/option>\r\n<option value=\"Momax\">Momax<\/option>\r\n<option value=\"Monte Escobedo\">Monte Escobedo<\/option>\r\n<option value=\"Morelos\">Morelos<\/option>\r\n<option value=\"Moyahua de Estrada\">Moyahua de Estrada<\/option>\r\n<option value=\"Nochistlan de Mejia\">Nochistlan de Mejia<\/option>\r\n<option value=\"Noria de Angeles\">Noria de Angeles<\/option>\r\n<option value=\"Ojocaliente\">Ojocaliente<\/option>\r\n<option value=\"Panuco\">Panuco<\/option>\r\n<option value=\"Pinos\">Pinos<\/option>\r\n<option value=\"Rio Grande\">Rio Grande<\/option>\r\n<option value=\"Sain Alto\">Sain Alto<\/option>\r\n<option value=\"El Salvador\">El Salvador<\/option>\r\n<option value=\"Sombrerete\">Sombrerete<\/option>\r\n<option value=\"Susticacan\">Susticacan<\/option>\r\n<option value=\"Tabasco\">Tabasco<\/option>\r\n<option value=\"Tepechitlan\">Tepechitlan<\/option>\r\n<option value=\"Tepetongo\">Tepetongo<\/option>\r\n<option value=\"Teul de Gonzalez Ortega\">Teul de Gonzalez Ortega<\/option>\r\n<option value=\"Tlaltenango de Sanchez Roman\">Tlaltenango de Sanchez Roman<\/option>\r\n<option value=\"Valparaiso\">Valparaiso<\/option>\r\n<option value=\"Vetagrande\">Vetagrande<\/option>\r\n<option value=\"Villa de Cos\">Villa de Cos<\/option>\r\n<option value=\"Villa Garcia\">Villa Garcia<\/option>\r\n<option value=\"Villa Gonzalez Ortega\">Villa Gonzalez Ortega<\/option>\r\n<option value=\"Villa Hidalgo\">Villa Hidalgo<\/option>\r\n<option value=\"Villanueva\">Villanueva<\/option>\r\n<option value=\"Zacatecas\">Zacatecas<\/option>\r\n<option value=\"Trancoso\">Trancoso<\/option>\r\n<option value=\"Santa Maria de la Paz\">Santa Maria de la Paz<\/option>');
        }
        else if ($(this).find(":selected").val() == ""){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Primero selecciona un estado</option>');
        }
        else {
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Error reconociendo estado</option>');
        };
    });
    $(".divMainForm").on('change',".direccionSelectDelegacionMunicipio", function() {

        if($(this).find(":selected").val() == ""){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Primero selecciona una delegación o municipio</option>');
            $(this).closest(".form-group-sm").next().next().find("select").html('' +
                '<option value="">Primero selecciona un codigo postal</option>');

            return
        }

        $(this).closest(".form-group-sm").next().find("select").html('' +
            '<option value="">Selecciona uno</option>');
        $(this).closest(".form-group-sm").next().next().find("select").html('' +
            '<option value="">Primero selecciona un codigo postal</option>');


        var element = $(this);

        $.ajax({
            url     : "./Controllers/baseController.php",
            type    : 'POST',
            dataType: 'json',
            async : false,
            data    : {
                action: "codigosPostales_de_Estado_y_DelegacionMunicipio",
                estado: $(this).closest(".form-group-sm").prev().find("select").val(),
                municipio: $(this).find(":selected").val()
            }
        })
            .done(function (data) {


                if (data.success) {
                    $.each(data.codigosPostalesBusqueda, function( key, value ) {
                        element.closest(".form-group-sm").next().find("select").append('' +
                            '<option value="'+value.codigoPostal+'" colonias="'+value.colonia+'">'+value.codigoPostal+'</option>');
                    });

                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);

                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });
    $(".divMainForm").on('change',".direccionSelectCodigoPostal", function() {

        if($(this).find(":selected").val() == ""){
            $(this).closest(".form-group-sm").next().find("select").html('' +
                '<option value="">Primero selecciona un codigo postal</option>');

            return
        }

        var self = $(this);
        var arreglo = $(this).find(":selected").attr("colonias").split(';');

        $(this).closest(".form-group-sm").next().find("select").html('' +
            '<option value="">Selecciona uno</option>');

        $.each(arreglo, function( key, value ) {
            self.closest(".form-group-sm").next().find("select").append('' +
                '<option value="'+value+'">'+value+'</option>');
        });



    });

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab

        actualizatabla($(target).find('table'));

    });

/* ------------------------------------------------------------------------------------------------     Empleados     */

    var theDivEmpleados = $('#divEmpleados');

    theDivEmpleados.find('.mainTableDiv')
        .DataTable({
        "select": true,
        "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
        "columns": [
            { "data": "nombre" },
            { "data": "apPaterno" },
            { "data": "apMaterno" },
            { "data": "fechaDeNacimiento" },
            { "data": "calleNumeroDomicilio" },
            { "data": "delegacionMunicipioDomicilio" },
            { "data": "codigoPostalDomicilio" },
            { "data": "coloniaDomicilio" },
            { "data": "estadoDomicilio" },
            { "data": "email" },
            { "data": "telefonoLocal" },
            { "data": "telefonoMovil" },
            { "data": "curp" },
            { "data": "fechaAlta"},
            { "data": "estadoSistema",
                "render": function ( data, type, full, meta ) {
                    return data==1?"Activo":"Inactivo";
                } },
            { "data": "userName" }
        ]

    });

    theDivEmpleados.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);
        var accion;

        if (element.attr("accion")=="agregar"){
            accion = "empleadoAgregar";
        }
        else if (element.attr("accion")=="editar" && element.find('.idEmpleado').val() != "" ){
            accion = "empleadoEditar";
        }
        else {

            alerta(element,"error","<strong>¡Error!: </strong>Acción desconocida o sin selección para editar");

            return;
        }

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: accion,
                idEmpleado: $(this).find('.idEmpleado').val(),
                nombre: $(this).find('.nombre').val(),
                apPaterno: $(this).find('.apPaterno').val(),
                apMaterno: $(this).find('.apMaterno').val(),
                fechaDeNacimiento: $(this).find('.fechaDeNacimiento').val(),
                estadoDomicilio: $(this).find('.direccionSelectEstado').val(),
                delegacionMunicipioDomicilio: $(this).find('.direccionSelectDelegacionMunicipio').val(),
                codigoPostalDomicilio: $(this).find('.direccionSelectCodigoPostal').val(),
                coloniaDomicilio: $(this).find('.coloniaDomicilio').val(),
                calleNumeroDomicilio: $(this).find('.calleNumeroDomicilio').val(),
                email: $(this).find('.email').val(),
                telefonoLocal: $(this).find('.telefonoLocal').val(),
                telefonoMovil: $(this).find('.telefonoMovil').val(),
                curp: $(this).find('.curp').val(),
                estadoSistema: $(this).find('.estadoSistema').val(),
                userName: $(this).find('.userName').val()
            }
        })
            .done(function (data) {

                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    actualizatabla(theDivEmpleados.find('.mainTableDiv'));
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });
    theDivEmpleados.find('.btn-editar').click(function (evt) {

        var selected = theDivEmpleados.find('.mainTableDiv').DataTable().row( { selected: true } ).data();
        $.each(selected, function( key, value ) {

            theDivEmpleados.find('.divMainForm form').find('.'+key).val(value).trigger('change');

        });

    })


/* ------------------------------------------------------------------------------------------------     Contraseñas   */

    var theDivContraseñas = $('#divContraseñas');

    theDivContraseñas.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "fechaDeNacimiento" },
                { "data": "calleNumeroDomicilio" },
                { "data": "delegacionMunicipioDomicilio" },
                { "data": "codigoPostalDomicilio" },
                { "data": "coloniaDomicilio" },
                { "data": "estadoDomicilio" },
                { "data": "email" },
                { "data": "telefonoLocal" },
                { "data": "telefonoMovil" },
                { "data": "curp" },
                { "data": "fechaAlta"},
                { "data": "estadoSistema",
                    "render": function ( data, type, full, meta ) {
                        return data==1?"Activo":"Inactivo";
                    } },
                { "data": "userName" }
            ]

        });

    theDivContraseñas.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);

        if (element.find('.idEmpleado').val() == "" ){

            alerta(element,"error","<strong>¡Error!: </strong>Sin selección para editar");

            return;
        }

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: "empleadoContraseña",
                idEmpleado: $(this).find('.idEmpleado').val(),
                password: $(this).find('.password').val(),
            }
        })
            .done(function (data) {

                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    actualizatabla(theDivContraseñas.find('.mainTableDiv'));
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });
    theDivContraseñas.find('.btn-editar').click(function (evt) {

        var selected = theDivContraseñas.find('.mainTableDiv').DataTable().row( { selected: true } ).data();

        theDivContraseñas.find('.divMainForm form').find('.idEmpleado').val(selected.idEmpleado);
        theDivContraseñas.find('.divMainForm form').find('.nombre').val(selected.nombre+" "+selected.apPaterno+" "+selected.apMaterno);

    })


/* ------------------------------------------------------------------------------------------------     Clientes      */

    var theDivClientes = $('#divClientes');

    theDivClientes.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "telefonoMovil" },
                { "data": "telefonoLocal" },
                { "data": "email" },
                { "data": "estadoDomicilio" },
                { "data": "delegacionMunicipioDomicilio" },
                { "data": "codigoPostalDomicilio" },
                { "data": "coloniaDomicilio" },
                { "data": "calleNumeroDomicilio" },
                { "data": "fechaDeNacimiento" },
                { "data": "curp" },
                { "data": "fechaAlta"}
            ]

        });

    theDivClientes.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);
        var accion;

        if (element.attr("accion")=="agregar"){
            accion = "clienteAgregar";
        }
        else if (element.attr("accion")=="editar" && element.find('.idCliente').val() != "" ){
            accion = "clienteEditar";
        }
        else {

            alerta(element,"error","<strong>¡Error!: </strong>Acción desconocida o sin selección para editar");

            return;
        }

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: accion,
                idCliente: $(this).find('.idCliente').val(),
                nombre: $(this).find('.nombre').val(),
                apPaterno: $(this).find('.apPaterno').val(),
                apMaterno: $(this).find('.apMaterno').val(),
                telefonoMovil: $(this).find('.telefonoMovil').val(),
                telefonoLocal: $(this).find('.telefonoLocal').val(),
                email: $(this).find('.email').val(),
                estadoDomicilio: $(this).find('.direccionSelectEstado').val(),
                delegacionMunicipioDomicilio: $(this).find('.direccionSelectDelegacionMunicipio').val(),
                codigoPostalDomicilio: $(this).find('.direccionSelectCodigoPostal').val(),
                coloniaDomicilio: $(this).find('.coloniaDomicilio').val(),
                calleNumeroDomicilio: $(this).find('.calleNumeroDomicilio').val(),
                fechaDeNacimiento: $(this).find('.fechaDeNacimiento').val(),
                curp: $(this).find('.curp').val(),
            }
        })
            .done(function (data) {
                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    actualizatabla(theDivClientes.find('.mainTableDiv'));
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });
    theDivClientes.find('.btn-editar').click(function (evt) {

        var selected = theDivClientes.find('.mainTableDiv').DataTable().row( { selected: true } ).data();
        $.each(selected, function( key, value ) {

            theDivClientes.find('.divMainForm form').find('.'+key).val(value).trigger('change');

        });

    })


/* ------------------------------------------------------------------------------------------------     Viajes        */

    var theDivViajes = $('#divViajes');

    theDivViajes.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "idViaje" },
                { "targets": 1,
                    "data": function ( row, type, val, meta ) {
                    return $.format.date(row.fechaAlta, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                } },
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "destinoEstado" },
                { "targets": 7,
                    "data": function ( row, type, val, meta ) {
                        return ((row.destinoLugar=="")?('Sin especificar'):(row.destinoLugar));
                    } },
                { "targets": 8,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.salidaFechaHora, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    }  },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.regresoFechaHora, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "diasNum" },
                { "data": "kilometros" },
                { "data": "temporada" },
                { "targets": 12,
                    "data": function ( row, type, val, meta ) {

                        var fecha = "";
                        var arregloFechas = [];
                        var contador = 1;
                        $.each(row.puntos, function( index, value ) {
                            if(index == 0){
                                fecha = value["fecha"];
                                if(index == (row.puntos.length-1)){
                                    arregloFechas.push(contador);
                                }
                            }else{
                                if(fecha == value["fecha"]){
                                    contador++;
                                    if(index == (row.puntos.length-1)){
                                        arregloFechas.push(contador);
                                    }
                                }else{
                                    arregloFechas.push(contador);
                                    contador=1;
                                }
                                fecha = value["fecha"];
                            }
                        })

                        var diaCount = 1;
                        var recorreArray = 0;
                        var interno = 1;
                        var salida = "<table>";
                        $.each(row.puntos, function( index, value ) {
                            var hora = new Date("1970-01-01 "+value["hora"]);
                            if(index==0){
                                fecha = value["fecha"];
                                salida+=
                                    '<tr>' +
                                        '<td rowspan="'+arregloFechas[recorreArray]+'">'+(diaCount++)+'</td>'+
                                        '<td rowspan="'+arregloFechas[recorreArray]+'">'+value["fecha"]+'</td>'+
                                        '<td>'+((!value["hora"])?'--:--':$.format.date(hora, "HH:mm'h'r's'."))+'</td><td> '+
                                        '<td>'+value["estadoDireccion"]+'</td><td> '+
                                        '<td>'+value["delegacionMunicipioDireccion"]+'</td><td> '+
                                        '<td>'+value["codigoPostalDireccion"]+'</td><td> '+
                                        '<td>'+value["coloniaDireccion"]+'</td><td> '+
                                        '<td>'+value["calleNumeroDireccion"]+'</td><td> '+
                                        '<td>'+value["descripcionDireccion"]+'</td><td> '+
                                        '</tr>';
                                interno++;
                                if(index == (row.puntos.length-1)){
                                    salida += '</table>';
                                }
                            }else{
                                if(interno <= arregloFechas[recorreArray]){
                                    salida += '<tr>' +
                                        '<td>'+((!value["hora"])?'--:--':$.format.date(hora, "HH:mm'h'r's'."))+'</td><td> '+
                                        '<td>'+value["estadoDireccion"]+'</td><td> '+
                                        '<td>'+value["delegacionMunicipioDireccion"]+'</td><td> '+
                                        '<td>'+value["codigoPostalDireccion"]+'</td><td> '+
                                        '<td>'+value["coloniaDireccion"]+'</td><td> '+
                                        '<td>'+value["calleNumeroDireccion"]+'</td><td> '+
                                        '<td>'+value["descripcionDireccion"]+'</td><td> '+
                                        '</tr>';
                                    interno++;
                                    if(index == (row.puntos.length-1)){
                                        salida += '</table>';
                                    }
                                }else {
                                    recorreArray++;
                                    salida+=
                                        '<tr>' +
                                        '<td rowspan="'+arregloFechas[recorreArray]+'">'+(diaCount++)+'</td>'+
                                        '<td rowspan="'+arregloFechas[recorreArray]+'">'+value["fecha"]+'</td>'+
                                        '<td>'+((!value["hora"])?'--:--':$.format.date(hora, "HH:mm'h'r's'."))+'</td><td> '+
                                        '<td>'+value["estadoDireccion"]+'</td><td> '+
                                        '<td>'+value["delegacionMunicipioDireccion"]+'</td><td> '+
                                        '<td>'+value["codigoPostalDireccion"]+'</td><td> '+
                                        '<td>'+value["coloniaDireccion"]+'</td><td> '+
                                        '<td>'+value["calleNumeroDireccion"]+'</td><td> '+
                                        '<td>'+value["descripcionDireccion"]+'</td><td> '+
                                        '</tr>';
                                    interno=2;
                                    if(index == (row.puntos.length-1)){
                                        salida += '</table>';
                                    }
                                }

                            }

                        });
                        salida +=  "</table>";
                        return salida;
                    } }
            ]
        });

    theDivViajes.find('.divMainForm form table')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "telefonoMovil" },
                { "data": "telefonoLocal" },
                { "data": "email" },
                { "data": "estadoDomicilio" },
                { "data": "delegacionMunicipioDomicilio" },
                { "data": "codigoPostalDomicilio" },
                { "data": "coloniaDomicilio" },
                { "data": "calleNumeroDomicilio" },
                { "data": "fechaDeNacimiento" },
                { "data": "curp" },
                { "data": "fechaAlta"}
            ]

        });


    theDivViajes.find('.btn-agregar').click(function (evt) {
        actualizatabla(theDivViajes.find('.divMainForm form table'));
        theDivViajes.find('.divMainForm form').find(".panelNuevo").remove();
    });
    theDivViajes.find('.divMainForm form table').DataTable().on( 'select', function () {
        var selected = theDivViajes.find('.divMainForm form table').DataTable().row( { selected: true } ).data();

        theDivViajes.find('.divMainForm form').find('.idCliente').val(selected.idCliente);
        theDivViajes.find('.divMainForm form').find('.nombre').val(selected.nombre+" "+selected.apPaterno+" "+selected.apMaterno);
    } );

    theDivViajes.on('click', '.agregarPuntoUno', function (){
        $(this).closest(".panel").next(".puntos").prepend(panelNuevo1).hide().show('fast');
    });

    theDivViajes.on('click', '.agregarPunto', function (){
        $(this).closest(".panel").after( panelNuevo1 ).next().hide().show('fast');
    });

    var panelNuevo1 = '<div class="panel panel-default margen-arriba15 panelNuevo">'+
        '<div class="panel-heading">'+
        'Punto de itinerario:'+
        '</div>'+
        '<div class="panel-body">'+
        '<div class="punto">'+
        '<div class="form-group-sm">'+
        '<label class="control-label col-sm-3">Fecha:</label>'+
        '<div class="col-sm-7">'+
        '<input type="date"'+
        'class="form-control fecha"'+
        '>'+
        '</div>'+
        '</div>                                      <!--fecha-->'+
        '<div class="form-group-sm">'+
        '<label class="control-label col-sm-3">Hora:</label>'+
        '<div class="col-sm-7">'+
        '<input type="time"'+
        'class="form-control hora"'+
        'step="300"'+
        '>'+
        '</div>'+
        '</div>                                       <!--hora-->'+
        '<!--Estado, Delegación municipio, codigo postal, colonia deben de estar juntos y en ese orden para funcionar.-->'+
        '<div class="form-group-sm">'+
        '<label class="control-label col-sm-3">Estado:</label>'+
        '<div class="col-sm-7">'+
        '<!–– Dropdown estados de México ––>'+
        '<select class="form-control direccionSelectEstado estadoDireccion">'+
        '<option value="">Selecciona uno</option>'+
        '<option value="Distrito Federal">Distrito Federal</option>'+
        '<option value="Aguascalientes">Aguascalientes</option>'+
        '<option value="Baja California">Baja California</option>'+
        '<option value="Baja California Sur">Baja California Sur</option>'+
        '<option value="Campeche">Campeche</option>'+
        '<option value="Coahuila de Zaragoza">Coahuila de Zaragoza</option>'+
        '<option value="Colima">Colima</option>'+
        '<option value="Chiapas">Chiapas</option>'+
        '<option value="Chihuahua">Chihuahua</option>'+
        '<option value="Durango">Durango</option>'+
        '<option value="Guanajuato">Guanajuato</option>'+
        '<option value="Guerrero">Guerrero</option>'+
        '<option value="Hidalgo">Hidalgo</option>'+
        '<option value="Jalisco">Jalisco</option>'+
        '<option value="México">México</option>'+
        '<option value="Michoacán de Ocampo">Michoacán de Ocampo</option>'+
        '<option value="Morelos">Morelos</option>'+
        '<option value="Nayarit">Nayarit</option>'+
        '<option value="Nuevo León">Nuevo León</option>'+
        '<option value="Oaxaca">Oaxaca</option>'+
        '<option value="Puebla">Puebla</option>'+
        '<option value="Querétaro">Querétaro</option>'+
        '<option value="Quintana Roo">Quintana Roo</option>'+
        '<option value="San Luis Potosí">San Luis Potosí</option>'+
        '<option value="Sinaloa">Sinaloa</option>'+
        '<option value="Sonora">Sonora</option>'+
        '<option value="Tabasco">Tabasco</option>'+
        '<option value="Tamaulipas">Tamaulipas</option>'+
        '<option value="Tlaxcala">Tlaxcala</option>'+
        '<option value="Veracruz de Ignacio de la Llave">Veracruz de Ignacio de la Llave</option>'+
        '<option value="Yucatán">Yucatán</option>'+
        '<option value="Zacatecas">Zacatecas</option>'+
        '</select>'+
        '</div>'+
        '</div>                                            <!--estadoDireccion-->'+
        '<div class="form-group-sm">'+
        '<label class="control-label col-sm-3">Delegación o Municipio:</label>'+
        '<div class="col-sm-7">'+
        '<select class="form-control direccionSelectDelegacionMunicipio delegacionMunicipioDireccion" >'+
        '<option value="">Primero selecciona un estado</option>'+
        '</select>'+
        '</div>'+
        '</div>                               <!--delegacionMunicipioDireccion-->'+
        '<div class="form-group-sm">'+
        '<label class="control-label col-sm-3">Código Postal:</label>'+
        '<div class="col-sm-7">'+
        '<select class="form-control direccionSelectCodigoPostal codigoPostalDireccion">'+
        '<option value="">Primero selecciona una delegación o municipio</option>'+
        '</select>'+
        '</div>'+
        '</div>                                      <!--codigoPostalDireccion-->'+
        '<div class="form-group-sm">'+
        '<label class="control-label col-sm-3">Colonia:</label>'+
        '<div class="col-sm-7">'+
        '<select class="form-control coloniaDireccion">'+
        '<option value="">Primero selecciona un codigo postal</option>'+
        '</select>'+
        '</div>'+
        '</div>                                           <!--coloniaDireccion-->'+
        '<div class="form-group-sm">'+
        '<label class="control-label col-sm-3">Calle y número:</label>'+
        '<div class="col-sm-7">'+
        '<input type="text"'+
        'class="form-control calleNumeroDireccion"'+
        'placeholder="Xxxxx YYY"'+
        'maxlength="70"'+
        'pattern="[a-zA-Z0-9- .,ñáéíóú]{5,70}"'+
        'title="Solo letras,espacios y números (no signos), 5 - 70 caracteres."' +
        '>'+
        '</div>'+
        '</div>                                       <!--calleNumeroDireccion-->'+

        '<div class="form-group-sm">'+
        '<label class="control-label col-sm-3">Referencia:</label>'+
        '<div class="col-sm-7">'+
        '<input type="text"'+
        'class="form-control descripcionDireccion"'+
        'placeholder="Detalles sobre el lugar"'+
        'maxlength="300"'+
        'pattern="{5,70}"'+
        'title=" 5 - 70 caracteres.">'+
        '</div>'+
        '</div>                                       <!--descripcionDireccion-->'+


        '</div>'+
        '</div>'+
        '<div class="panel-footer text-right">'+
        '<button type="button" class="btn btn-default btn-xs margen-izquierda5 repetirPrimero">Repetir primer punto</button>'+
        '<button type="button" class="btn btn-default btn-xs margen-izquierda5 repetirAnterior">Repetir anterior</button>'+
        '<button type="button" class="btn btn-default btn-xs agregarPunto margen-izquierda5">Agregar Punto</button>'+
        '<button type="button" class="btn btn-danger btn-xs eliminarPunto margen-izquierda5">Eliminar</button>'+
        '</div>'+
        '</div>';

    theDivViajes.on('click', '.eliminarPunto', function (){
        $(this).closest(".panel").hide('fast', function(){ $(this).closest(".panel").remove(); });
    });
    theDivViajes.on('click', '.repetirPrimero', function (){
        $(this).closest('.panel').find('.fecha').val($(this).closest('.puntos').first('.panel').find('.fecha').val());
        $(this).closest('.panel').find('.hora').val($(this).closest('.puntos').first('.panel').find('.hora').val());
        $(this).closest('.panel').find('.estadoDireccion').val($(this).closest('.puntos').first('.panel').find('.estadoDireccion').val()).trigger('change');
        $(this).closest('.panel').find('.delegacionMunicipioDireccion').val($(this).closest('.puntos').first('.panel').find('.delegacionMunicipioDireccion').val()).trigger('change');
        $(this).closest('.panel').find('.codigoPostalDireccion').val($(this).closest('.puntos').first('.panel').find('.codigoPostalDireccion').val()).trigger('change');
        $(this).closest('.panel').find('.coloniaDireccion').val($(this).closest('.puntos').first('.panel').find('.coloniaDireccion').val()).trigger('change');
        $(this).closest('.panel').find('.calleNumeroDireccion').val($(this).closest('.puntos').first('.panel').find('.calleNumeroDireccion').val());
        $(this).closest('.panel').find('.descripcionDireccion').val($(this).closest('.puntos').first('.panel').find('.descripcionDireccion').val());
    });
    theDivViajes.on('click', '.repetirAnterior', function (){
        $(this).closest('.panel').find('.fecha').val($(this).closest('.panel').prev('.panel').find('.fecha').val());
        $(this).closest('.panel').find('.hora').val($(this).closest('.panel').prev('.panel').find('.hora').val());
        $(this).closest('.panel').find('.estadoDireccion').val($(this).closest('.panel').prev('.panel').find('.estadoDireccion').val()).trigger('change');
        $(this).closest('.panel').find('.delegacionMunicipioDireccion').val($(this).closest('.panel').prev('.panel').find('.delegacionMunicipioDireccion').val()).trigger('change');
        $(this).closest('.panel').find('.codigoPostalDireccion').val($(this).closest('.panel').prev('.panel').find('.codigoPostalDireccion').val()).trigger('change');
        $(this).closest('.panel').find('.coloniaDireccion').val($(this).closest('.panel').prev('.panel').find('.coloniaDireccion').val()).trigger('change');
        $(this).closest('.panel').find('.calleNumeroDireccion').val($(this).closest('.panel').prev('.panel').find('.calleNumeroDireccion').val());
        $(this).closest('.panel').find('.descripcionDireccion').val($(this).closest('.panel').prev('.panel').find('.descripcionDireccion').val());
    });

    theDivViajes.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);
        var accion;

        if (element.attr("accion")=="agregar"){
            accion = "viajeAgregar";
        }
        else if (element.attr("accion")=="editar" && element.find('.idViaje').val() != "" ){
            accion = "viajeEditar";
        }
        else {

            alerta(element,"error","<strong>¡Error!: </strong>Acción desconocida o sin selección para editar");

            return;
        }

        var puntosVar = [];
        $(this).find(".punto").each( function() {
            var punto= {
                fecha: $(this).find('.fecha').val(),
                hora: $(this).find('.hora').val(),
                estadoDireccion: $(this).find('.estadoDireccion').val(),
                delegacionMunicipioDireccion: $(this).find('.delegacionMunicipioDireccion').val(),
                codigoPostalDireccion: $(this).find('.codigoPostalDireccion').val(),
                coloniaDireccion: $(this).find('.coloniaDireccion').val(),
                calleNumeroDireccion: $(this).find('.calleNumeroDireccion').val(),
                descripcionDireccion: $(this).find('.descripcionDireccion').val()
            }
            puntosVar.push(punto);
        });

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: accion,
                idViaje: $(this).find('.idViaje').val(),
                destinoEstado: $(this).find('.destinoEstado').val(),
                destinoLugar: $(this).find('.destinoLugar').val(),
                salidaFechaHora: $(this).find('.salidaFechaHora').val(),
                regresoFechaHora: $(this).find('.regresoFechaHora').val(),
                diasNum: $(this).find('.diasNum').val(),
                kilometros: $(this).find('.kilometros').val(),
                temporada: $(this).find('.temporada').val(),
                idCliente: $(this).find('.idCliente').val(),
                puntos: puntosVar

            }
        })
            .done(function (data) {
                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    actualizatabla(theDivViajes.find('.mainTableDiv'));
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });

    theDivViajes.find('.btn-editar').click(function (evt) {
        actualizatabla(theDivViajes.find('.divMainForm form table'));
        theDivViajes.find('.divMainForm form').find(".panelNuevo").remove();

        var selected = theDivViajes.find('.mainTableDiv').DataTable().row( { selected: true } ).data();

        theDivViajes.find('.divMainForm form').find('.idViaje').val(selected.idViaje);
        theDivViajes.find('.divMainForm form').find('.destinoEstado').val(selected.destinoEstado);
        theDivViajes.find('.divMainForm form').find('.destinoLugar').val(selected.destinoLugar);
        theDivViajes.find('.divMainForm form').find('.salidaFechaHora').val($.format.date(selected.salidaFechaHora, "yyyy-MM-ddTHH:mm"));
        theDivViajes.find('.divMainForm form').find('.regresoFechaHora').val($.format.date(selected.regresoFechaHora, "yyyy-MM-ddTHH:mm"));
        theDivViajes.find('.divMainForm form').find('.diasNum').val(selected.diasNum);
        theDivViajes.find('.divMainForm form').find('.kilometros').val(selected.kilometros);
        theDivViajes.find('.divMainForm form').find('.temporada').val(selected.temporada);
        theDivViajes.find('.divMainForm form').find('.idCliente').val(selected.idCliente);
        theDivViajes.find('.divMainForm form').find('.nombre').val(selected.nombre+" "+selected.apPaterno+" "+selected.apMaterno);

        var table =  selected.puntos;

        $(table).each(function( key, value ) {
            if(key == 0){

                theDivViajes.find('.divMainForm form').find('.agregarPuntoUno').trigger('click');
            }
            else {

                theDivViajes.find('.divMainForm form .panel').last().find('.agregarPunto').trigger('click');

            }

            theDivViajes.find('.divMainForm form .panelNuevo').last().find('.fecha').val(value.fecha);
            theDivViajes.find('.divMainForm form .panelNuevo').last().find('.hora').val(value.hora);
            theDivViajes.find('.divMainForm form .panelNuevo').last().find('.estadoDireccion').val(value.estadoDireccion).trigger('change');
            theDivViajes.find('.divMainForm form .panelNuevo').last().find('.delegacionMunicipioDireccion').val(value.delegacionMunicipioDireccion).trigger('change');
            theDivViajes.find('.divMainForm form .panelNuevo').last().find('.codigoPostalDireccion').val(value.codigoPostalDireccion).trigger('change');
            theDivViajes.find('.divMainForm form .panelNuevo').last().find('.coloniaDireccion').val(value.coloniaDireccion).trigger('change');
            theDivViajes.find('.divMainForm form .panelNuevo').last().find('.calleNumeroDireccion').val(value.calleNumeroDireccion).trigger('change');
            theDivViajes.find('.divMainForm form .panelNuevo').last().find('.descripcionDireccion').val(value.descripcionDireccion).trigger('change');


        });

    });

    theDivViajes.find('.btn-PDF').click(function (evt) {

        var selected = theDivViajes.find('.mainTableDiv').DataTable().row({selected: true}).data();

        var myForm = $('<form id="hereiamtheone" class="" action="./Controllers/baseReporte.php" target="_blank" method="post"></form>');
        myForm.append('<input type="text" name="action" value="viaje">');

        var data = $('<input type="text" name="viaje">');
        data.val(JSON.stringify(selected));

        myForm.append(data);
        $('body').append(myForm);
        myForm.submit();
        myForm.remove();


    });


    /* --------------------------------------------------------------------------------------     Cotizaciones        */

    var theDivCotizaciones = $('#divCotizaciones');

    theDivCotizaciones.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "idCotizacion" },
                { "targets": 1,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.fechaAlta, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "idViaje" },
                { "data": "destinoEstado" },
                { "targets": 4,
                    "data": function ( row, type, val, meta ) {
                        return ((row.destinoLugar=="")?('Sin especificar'):(row.destinoLugar));
                    } },
                { "data": "diasNum" },
                { "data": "kilometros" },
                { "data": "temporada" },
                { "data": "tipoUnidad" },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.precioCombustible;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.costoCombustible;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.peaje;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.sueldoChofer;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.hospedajeChofer;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.extras;
                    } },
                { "targets": 15,
                    "data": function ( row, type, val, meta ) {
                        total = parseFloat(row.costoCombustible);
                        total += parseFloat(row.peaje);
                        total += parseFloat(row.sueldoChofer);
                        total += parseFloat(row.hospedajeChofer);
                        total += parseFloat(row.extras);
                        return total;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.cotizacion;
                    } },
                { "targets": 17,
                    "data": function ( row, type, val, meta ) {
                        total2 = parseFloat(row.cotizacion) - total;
                        return "$ " + total2;
                    }  },
                { "targets": 18,
                    "data": function ( row, type, val, meta ) {
                        total3 = (total2/parseFloat(row.cotizacion))*100;
                        return total3.toFixed(2);
                    }  }
            ]
        });

    theDivCotizaciones.find('.divMainForm form table.viaje')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "idViaje" },
                { "targets": 1,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.fechaAlta, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "destinoEstado" },
                { "targets": 6,
                    "data": function ( row, type, val, meta ) {
                        return ((row.destinoLugar=="")?('Sin especificar'):(row.destinoLugar));
                    } },
                { "targets": 7,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.salidaFechaHora, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    }  },
                { "targets": 8,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.regresoFechaHora, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "diasNum" },
                { "data": "kilometros" },
                { "data": "temporada" }
            ]
        });

    theDivCotizaciones.find('.divMainForm form table.comparacion')
        .DataTable({
            "select": true,
            "bSort": false,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "idCotizacion" },
                { "targets": 1,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.fechaAlta, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "idViaje" },
                { "data": "destinoEstado" },
                { "targets": 4,
                    "data": function ( row, type, val, meta ) {
                        return ((row.destinoLugar=="")?('Sin especificar'):(row.destinoLugar));
                    } },
                { "data": "diasNum" },
                { "data": "kilometros" },
                { "data": "temporada" },
                { "data": "tipoUnidad" },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.precioCombustible;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.costoCombustible;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.peaje;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.sueldoChofer;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.hospedajeChofer;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.extras;
                    } },
                { "targets": 15,
                    "data": function ( row, type, val, meta ) {
                        total = parseFloat(row.costoCombustible);
                        total += parseFloat(row.peaje);
                        total += parseFloat(row.sueldoChofer);
                        total += parseFloat(row.hospedajeChofer);
                        total += parseFloat(row.extras);
                        return total;
                    } },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.cotizacion;
                    } },
                { "targets": 17,
                    "data": function ( row, type, val, meta ) {
                        total2 = parseFloat(row.cotizacion) - total;
                        return "$ " + total2;
                    }  },
                { "targets": 18,
                    "data": function ( row, type, val, meta ) {
                        total3 = (total2/parseFloat(row.cotizacion))*100;
                        return total3.toFixed(2);
                    }  }
            ]
        });



    theDivCotizaciones.find('.btn-agregar').click(function (evt) {

        var tablas = theDivCotizaciones.find('.divMainForm form table');
        $.each(tablas, function( key, value ) {

            if(key%2==0){
                actualizatabla($(tablas[key,key+1]));
            }

        });
    });
    theDivCotizaciones.find('.divMainForm form table.viaje').DataTable().on( 'select', function () {
        var selected = theDivCotizaciones.find('.divMainForm form table.viaje').DataTable().row( { selected: true } ).data();

        theDivCotizaciones.find('.divMainForm form').find('.idViaje').val(selected.idViaje);

        var tablas = theDivCotizaciones.find('.divMainForm form table.comparacion');
        $.each(tablas, function( key, value ) {

            if(key%2==0){
                actualizatabla($(tablas[key,key+1]));
            }

        });

    } );

    theDivCotizaciones.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);
        var accion;

        if (element.attr("accion")=="agregar"){
            accion = "cotizacionAgregar";
        }
        else if (element.attr("accion")=="editar" && element.find('.idCotizacion').val() != "" ){
            accion = "cotizacionEditar";
        }
        else {

            alerta(element,"error","<strong>¡Error!: </strong>Acción desconocida o sin selección para editar");

            return;
        }

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: accion,
                idCotizacion: $(this).find('.idCotizacion').val(),
                tipoUnidad: $(this).find('.tipoUnidad').val(),
                precioCombustible: $(this).find('.precioCombustible').val(),
                costoCombustible: $(this).find('.costoCombustible').val(),
                peaje: $(this).find('.peaje').val(),
                sueldoChofer: $(this).find('.sueldoChofer').val(),
                hospedajeChofer: $(this).find('.hospedajeChofer').val(),
                extras: $(this).find('.extras').val(),
                cotizacion: $(this).find('.cotizacion').val(),
                idViaje: $(this).find('.idViaje').val()
            }
        })
            .done(function (data) {
                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    var tablas = theDivCotizaciones.find('.mainTableDiv');
                    $.each(tablas, function( key, value ) {

                        if(key%2==0){
                            actualizatabla($(tablas[key,key+1]));
                        }

                    });
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });

    theDivCotizaciones.find('.btn-editar').click(function (evt) {
        var tablas = theDivCotizaciones.find('.divMainForm form table');
        $.each(tablas, function( key, value ) {

            if(key%2==0){
                actualizatabla($(tablas[key,key+1]));
            }

        });

        var selected = theDivCotizaciones.find('.mainTableDiv').DataTable().row( { selected: true } ).data();

        theDivCotizaciones.find('.divMainForm form').find('.idCotizacion').val(selected.idCotizacion);
        theDivCotizaciones.find('.divMainForm form').find('.tipoUnidad').val(selected.tipoUnidad);
        theDivCotizaciones.find('.divMainForm form').find('.precioCombustible').val(selected.precioCombustible);
        theDivCotizaciones.find('.divMainForm form').find('.costoCombustible').val(selected.costoCombustible);
        theDivCotizaciones.find('.divMainForm form').find('.peaje').val(selected.peaje);
        theDivCotizaciones.find('.divMainForm form').find('.sueldoChofer').val(selected.sueldoChofer);
        theDivCotizaciones.find('.divMainForm form').find('.hospedajeChofer').val(selected.hospedajeChofer);
        theDivCotizaciones.find('.divMainForm form').find('.extras').val(selected.extras).trigger("change");
        theDivCotizaciones.find('.divMainForm form').find('.cotizacion').val(selected.cotizacion).trigger("change");
        theDivCotizaciones.find('.divMainForm form').find('.idViaje').val(selected.idViaje);

    });

    theDivCotizaciones.on('change',".suma", function() {

        var suma = parseFloat(theDivCotizaciones.find('.divMainForm form').find('.costoCombustible').val())  || 0;
        suma+= parseFloat(theDivCotizaciones.find('.divMainForm form').find('.peaje').val())  || 0;
        suma+= parseFloat(theDivCotizaciones.find('.divMainForm form').find('.sueldoChofer').val())  || 0;
        suma+= parseFloat(theDivCotizaciones.find('.divMainForm form').find('.hospedajeChofer').val())  || 0;
        suma+= parseFloat(theDivCotizaciones.find('.divMainForm form').find('.extras').val())  || 0;

        theDivCotizaciones.find('.divMainForm form').find('.costosTotal').val(suma).trigger('change');
    });

    theDivCotizaciones.on('change',".cotizacion", function() {

        var ganancia = (parseFloat(theDivCotizaciones.find('.divMainForm form').find('.cotizacion').val())  || 0)-(parseFloat(theDivCotizaciones.find('.divMainForm form').find('.costosTotal').val())  || 0);

        theDivCotizaciones.find('.divMainForm form').find('.utilidad').val(ganancia);
        theDivCotizaciones.find('.divMainForm form').find('.utilidadP').val((ganancia/(parseFloat(theDivCotizaciones.find('.divMainForm form').find('.cotizacion').val())  || 0)*100).toFixed(2));
    });
    theDivCotizaciones.on('change',".utilidadP", function() {

        var costos = parseFloat(theDivCotizaciones.find('.divMainForm form').find('.costosTotal').val())  || 0;
        var cotizacion  = costos/(100-(parseFloat(theDivCotizaciones.find('.divMainForm form').find('.utilidadP').val())  || 0))*100;

        theDivCotizaciones.find('.divMainForm form').find('.cotizacion').val(cotizacion.toFixed(2));
        theDivCotizaciones.find('.divMainForm form').find('.utilidad').val((cotizacion-costos).toFixed(2));
    });

    theDivCotizaciones.on('change',".comparacionForm", function() {

        var tablas = theDivCotizaciones.find('.divMainForm form table.comparacion');

        $.each(tablas, function( key, value ) {

            if(key%2==0){
                actualizatabla($(tablas[key,key+1]));
            }

        });

    });

    theDivCotizaciones.find('.btn-PDF').click(function (evt) {

        var selected = theDivCotizaciones.find('.mainTableDiv').DataTable().row({selected: true}).data();

        var myForm = $('<form id="hereiamtheone" class="" action="./Controllers/baseReporte.php" target="_blank" method="post"></form>');
        myForm.append('<input type="text" name="action" value="cotizacion">');

        var data = $('<input type="text" name="viaje">');
        data.val(JSON.stringify(selected));

        myForm.append(data);
        $('body').append(myForm);
        myForm.submit();
        myForm.remove();


    });


    /* ------------------------------------------------------------------------------------------------     Choferes     */

    var theDivChoferes = $('#divChoferes');

    theDivChoferes.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "fechaDeNacimiento" },
                { "data": "calleNumeroDomicilio" },
                { "data": "delegacionMunicipioDomicilio" },
                { "data": "codigoPostalDomicilio" },
                { "data": "coloniaDomicilio" },
                { "data": "estadoDomicilio" },
                { "data": "email" },
                { "data": "telefonoLocal" },
                { "data": "telefonoMovil" },
                { "data": "curp" },
                { "data": "fechaAlta"}
            ]

        });

    theDivChoferes.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);
        var accion;

        if (element.attr("accion")=="agregar"){
            accion = "choferAgregar";
        }
        else if (element.attr("accion")=="editar" && element.find('.idChofer').val() != "" ){
            accion = "choferEditar";
        }
        else {

            alerta(element,"error","<strong>¡Error!: </strong>Acción desconocida o sin selección para editar");

            return;
        }

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: accion,
                idChofer: $(this).find('.idChofer').val(),
                nombre: $(this).find('.nombre').val(),
                apPaterno: $(this).find('.apPaterno').val(),
                apMaterno: $(this).find('.apMaterno').val(),
                fechaDeNacimiento: $(this).find('.fechaDeNacimiento').val(),
                estadoDomicilio: $(this).find('.direccionSelectEstado').val(),
                delegacionMunicipioDomicilio: $(this).find('.direccionSelectDelegacionMunicipio').val(),
                codigoPostalDomicilio: $(this).find('.direccionSelectCodigoPostal').val(),
                coloniaDomicilio: $(this).find('.coloniaDomicilio').val(),
                calleNumeroDomicilio: $(this).find('.calleNumeroDomicilio').val(),
                email: $(this).find('.email').val(),
                telefonoLocal: $(this).find('.telefonoLocal').val(),
                telefonoMovil: $(this).find('.telefonoMovil').val(),
                curp: $(this).find('.curp').val(),
            }
        })
            .done(function (data) {

                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    actualizatabla(theDivChoferes.find('.mainTableDiv'));
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });
    theDivChoferes.find('.btn-editar').click(function (evt) {

        var selected = theDivChoferes.find('.mainTableDiv').DataTable().row( { selected: true } ).data();
        $.each(selected, function( key, value ) {

            theDivChoferes.find('.divMainForm form').find('.'+key).val(value).trigger('change');

        });

    })



    /* ------------------------------------------------------------------------------------------------     Propietarios     */

    var theDivPropietarios = $('#divPropietarios');

    theDivPropietarios.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "fechaDeNacimiento" },
                { "data": "calleNumeroDomicilio" },
                { "data": "delegacionMunicipioDomicilio" },
                { "data": "codigoPostalDomicilio" },
                { "data": "coloniaDomicilio" },
                { "data": "estadoDomicilio" },
                { "data": "email" },
                { "data": "telefonoLocal" },
                { "data": "telefonoMovil" },
                { "data": "curp" },
                { "data": "fechaAlta"}
            ]

        });

    theDivPropietarios.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);
        var accion;

        if (element.attr("accion")=="agregar"){
            accion = "propietarioAgregar";
        }
        else if (element.attr("accion")=="editar" && element.find('.idPropietario').val() != "" ){
            accion = "propietarioEditar";
        }
        else {

            alerta(element,"error","<strong>¡Error!: </strong>Acción desconocida o sin selección para editar");

            return;
        }

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: accion,
                idPropietario: $(this).find('.idPropietario').val(),
                nombre: $(this).find('.nombre').val(),
                apPaterno: $(this).find('.apPaterno').val(),
                apMaterno: $(this).find('.apMaterno').val(),
                fechaDeNacimiento: $(this).find('.fechaDeNacimiento').val(),
                estadoDomicilio: $(this).find('.direccionSelectEstado').val(),
                delegacionMunicipioDomicilio: $(this).find('.direccionSelectDelegacionMunicipio').val(),
                codigoPostalDomicilio: $(this).find('.direccionSelectCodigoPostal').val(),
                coloniaDomicilio: $(this).find('.coloniaDomicilio').val(),
                calleNumeroDomicilio: $(this).find('.calleNumeroDomicilio').val(),
                email: $(this).find('.email').val(),
                telefonoLocal: $(this).find('.telefonoLocal').val(),
                telefonoMovil: $(this).find('.telefonoMovil').val(),
                curp: $(this).find('.curp').val(),
            }
        })
            .done(function (data) {

                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    actualizatabla(theDivPropietarios.find('.mainTableDiv'));
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });
    theDivPropietarios.find('.btn-editar').click(function (evt) {

        var selected = theDivPropietarios.find('.mainTableDiv').DataTable().row( { selected: true } ).data();
        $.each(selected, function( key, value ) {

            theDivPropietarios.find('.divMainForm form').find('.'+key).val(value).trigger('change');

        });

    })


    /* ------------------------------------------------------------------------------------------------     Unidades        */

    var theDivUnidades = $('#divUnidades');

    theDivUnidades.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "idUnidad" },
                { "targets": 1,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.fechaAlta, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "marca" },
                { "data": "modelo" },
                { "data": "ano" },
                { "data": "personas" },
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
            ]
        });

    theDivUnidades.find('.divMainForm form table')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "telefonoMovil" },
                { "data": "telefonoLocal" },
                { "data": "email" },
                { "data": "estadoDomicilio" },
                { "data": "delegacionMunicipioDomicilio" },
                { "data": "codigoPostalDomicilio" },
                { "data": "coloniaDomicilio" },
                { "data": "calleNumeroDomicilio" },
                { "data": "fechaDeNacimiento" },
                { "data": "curp" },
                { "data": "fechaAlta"}
            ]

        });


    theDivUnidades.find('.btn-agregar').click(function (evt) {
        actualizatabla(theDivUnidades.find('.divMainForm form table'));
    });
    theDivUnidades.find('.divMainForm form table').DataTable().on( 'select', function () {
        var selected = theDivUnidades.find('.divMainForm form table').DataTable().row( { selected: true } ).data();

        theDivUnidades.find('.divMainForm form').find('.idPropietario').val(selected.idPropietario);
        theDivUnidades.find('.divMainForm form').find('.nombre').val(selected.nombre+" "+selected.apPaterno+" "+selected.apMaterno);
    } );

    theDivUnidades.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);
        var accion;

        if (element.attr("accion")=="agregar"){
            accion = "unidadAgregar";
        }
        else if (element.attr("accion")=="editar" && element.find('.idUnidad').val() != "" ){
            accion = "unidadEditar";
        }
        else {

            alerta(element,"error","<strong>¡Error!: </strong>Acción desconocida o sin selección para editar");

            return;
        }

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: accion,
                idUnidad: $(this).find('.idUnidad').val(),
                marca: $(this).find('.marca').val(),
                modelo: $(this).find('.modelo').val(),
                ano: $(this).find('.ano').val(),
                personas: $(this).find('.personas').val(),
                idPropietario: $(this).find('.idPropietario').val(),

            }
        })
            .done(function (data) {
                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    actualizatabla(theDivUnidades.find('.mainTableDiv'));
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });

    theDivUnidades.find('.btn-editar').click(function (evt) {
        actualizatabla(theDivUnidades.find('.divMainForm form table'));

        var selected = theDivUnidades.find('.mainTableDiv').DataTable().row( { selected: true } ).data();

        theDivUnidades.find('.divMainForm form').find('.idUnidad').val(selected.idUnidad);
        theDivUnidades.find('.divMainForm form').find('.marca').val(selected.marca);
        theDivUnidades.find('.divMainForm form').find('.modelo').val(selected.modelo);
        theDivUnidades.find('.divMainForm form').find('.ano').val(selected.ano);
        theDivUnidades.find('.divMainForm form').find('.personas').val(selected.personas);
        theDivUnidades.find('.divMainForm form').find('.idPropietario').val(selected.idPropietario);
        theDivUnidades.find('.divMainForm form').find('.nombre').val(selected.nombre+" "+selected.apPaterno+" "+selected.apMaterno);

    });



    /* ------------------------------------------------------------------------------------------------     Ventas        */

    var theDivVentas = $('#divVentas');

    var pagado = 0;

    theDivVentas.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "idVenta" },
                { "targets": 1,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.fechaAltaVenta, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "destinoEstado" },
                { "targets": 6,
                    "data": function ( row, type, val, meta ) {
                        return ((row.destinoLugar=="")?('Sin especificar'):(row.destinoLugar));
                    } },
                { "targets": 7,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.salidaFechaHora, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    }  },
                { "targets": 8,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.regresoFechaHora, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "diasNum" },
                { "data": "kilometros" },
                { "data": "temporada" },/*
                { "targets": 12,
                    "data": function ( row, type, val, meta ) {

                        var fecha = "";
                        var arregloFechas = [];
                        var contador = 1;
                        $.each(row.puntos, function( index, value ) {
                            if(index == 0){
                                fecha = value["fecha"];
                                if(index == (row.puntos.length-1)){
                                    arregloFechas.push(contador);
                                }
                            }else{
                                if(fecha == value["fecha"]){
                                    contador++;
                                    if(index == (row.puntos.length-1)){
                                        arregloFechas.push(contador);
                                    }
                                }else{
                                    arregloFechas.push(contador);
                                    contador=1;
                                }
                                fecha = value["fecha"];
                            }
                        })

                        var diaCount = 1;
                        var recorreArray = 0;
                        var interno = 1;
                        var salida = "<table>";
                        $.each(row.puntos, function( index, value ) {
                            var hora = new Date("1970-01-01 "+value["hora"]);
                            if(index==0){
                                fecha = value["fecha"];
                                salida+=
                                    '<tr>' +
                                    '<td rowspan="'+arregloFechas[recorreArray]+'">'+(diaCount++)+'</td>'+
                                    '<td rowspan="'+arregloFechas[recorreArray]+'">'+value["fecha"]+'</td>'+
                                    '<td>'+((!value["hora"])?'--:--':$.format.date(hora, "HH:mm'h'r's'."))+'</td><td> '+
                                    '<td>'+value["estadoDireccion"]+'</td><td> '+
                                    '<td>'+value["delegacionMunicipioDireccion"]+'</td><td> '+
                                    '<td>'+value["codigoPostalDireccion"]+'</td><td> '+
                                    '<td>'+value["coloniaDireccion"]+'</td><td> '+
                                    '<td>'+value["calleNumeroDireccion"]+'</td><td> '+
                                    '<td>'+value["descripcionDireccion"]+'</td><td> '+
                                    '</tr>';
                                interno++;
                                if(index == (row.puntos.length-1)){
                                    salida += '</table>';
                                }
                            }else{
                                if(interno <= arregloFechas[recorreArray]){
                                    salida += '<tr>' +
                                        '<td>'+((!value["hora"])?'--:--':$.format.date(hora, "HH:mm'h'r's'."))+'</td><td> '+
                                        '<td>'+value["estadoDireccion"]+'</td><td> '+
                                        '<td>'+value["delegacionMunicipioDireccion"]+'</td><td> '+
                                        '<td>'+value["codigoPostalDireccion"]+'</td><td> '+
                                        '<td>'+value["coloniaDireccion"]+'</td><td> '+
                                        '<td>'+value["calleNumeroDireccion"]+'</td><td> '+
                                        '<td>'+value["descripcionDireccion"]+'</td><td> '+
                                        '</tr>';
                                    interno++;
                                    if(index == (row.puntos.length-1)){
                                        salida += '</table>';
                                    }
                                }else {
                                    recorreArray++;
                                    salida+=
                                        '<tr>' +
                                        '<td rowspan="'+arregloFechas[recorreArray]+'">'+(diaCount++)+'</td>'+
                                        '<td rowspan="'+arregloFechas[recorreArray]+'">'+value["fecha"]+'</td>'+
                                        '<td>'+((!value["hora"])?'--:--':$.format.date(hora, "HH:mm'h'r's'."))+'</td><td> '+
                                        '<td>'+value["estadoDireccion"]+'</td><td> '+
                                        '<td>'+value["delegacionMunicipioDireccion"]+'</td><td> '+
                                        '<td>'+value["codigoPostalDireccion"]+'</td><td> '+
                                        '<td>'+value["coloniaDireccion"]+'</td><td> '+
                                        '<td>'+value["calleNumeroDireccion"]+'</td><td> '+
                                        '<td>'+value["descripcionDireccion"]+'</td><td> '+
                                        '</tr>';
                                    interno=2;
                                    if(index == (row.puntos.length-1)){
                                        salida += '</table>';
                                    }
                                }

                            }

                        });
                        salida +=  "</table>";
                        return salida;
                    } },*/
                { "data": "tipoUnidad" },
                { "targets": 13,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.precioCombustible;
                    } },
                { "targets": 14,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.costoCombustible;
                    } },
                { "targets": 15,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.peaje;
                    } },
                { "targets": 16,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.sueldoChofer;
                    } },
                { "targets": 17,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.hospedajeChofer;
                    } },
                { "targets": 18,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.extras;
                    } },
                { "targets": 19,
                    "data": function ( row, type, val, meta ) {
                        total = parseFloat(row.costoCombustible);
                        total += parseFloat(row.peaje);
                        total += parseFloat(row.sueldoChofer);
                        total += parseFloat(row.hospedajeChofer);
                        total += parseFloat(row.extras);
                        return "$ "+total;
                    } },
                { "targets": 20,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.cotizacion;
                    } },
                { "targets": 21,
                    "data": function ( row, type, val, meta ) {
                        total2 = parseFloat(row.cotizacion) - total;
                        return "$ " + total2;
                    }  },
                { "targets": 22,
                    "data": function ( row, type, val, meta ) {
                        total3 = (total2/parseFloat(row.cotizacion))*100;
                        return total3.toFixed(2);
                    }  },
                { "targets": 23,
                    "data": function ( row, type, val, meta ) {

                        pagado = 0;
                        var salida = "";

                        $.each(row.pagos, function( index, value ) {
                            pagado+= parseFloat(value["monto"])
                            salida+= (index+1)+ " - $ "+value["monto"]+" del "+$.format.date(value["fechaAlta"], "yyyy-MM-dd")+"<br>";
                        })

                        salida+= "Total Pagado: $"+pagado;

                        return salida;
                    } },
                { "targets": 24,
                    "data": function ( row, type, val, meta ) {

                        return "$ "+(parseFloat(row.cotizacion)-pagado);
                    }  },
                { "data": "modelo" },
                { "data": "personas" },
                { "targets": 27,
                    "data": function ( row, type, val, meta ) {

                        return row.nombreCh+" "+row.apPaternoCh;
                    }  }
            ]
        });

    theDivVentas.find('.divMainForm form table.cotizacion')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "idCotizacion" },
                { "targets": 1,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.fechaAlta, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "idViaje" },
                { "data": "destinoEstado" },
                { "targets": 4,
                    "data": function ( row, type, val, meta ) {
                        return ((row.destinoLugar=="")?('Sin especificar'):(row.destinoLugar));
                    } },
                { "data": "diasNum" },
                { "data": "kilometros" },
                { "data": "temporada" },
                { "data": "tipoUnidad" },
                { "targets": 9,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.precioCombustible;
                    } },
                { "targets": 10,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.costoCombustible;
                    } },
                { "targets": 11,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.peaje;
                    } },
                { "targets": 12,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.sueldoChofer;
                    } },
                { "targets": 13,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.hospedajeChofer;
                    } },
                { "targets": 14,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.extras;
                    } },
                { "targets": 15,
                    "data": function ( row, type, val, meta ) {
                        total = parseFloat(row.costoCombustible);
                        total += parseFloat(row.peaje);
                        total += parseFloat(row.sueldoChofer);
                        total += parseFloat(row.hospedajeChofer);
                        total += parseFloat(row.extras);
                        return total;
                    } },
                { "targets": 16,
                    "data": function ( row, type, val, meta ) {
                        return "$ " + row.cotizacion;
                    } },
                { "targets": 17,
                    "data": function ( row, type, val, meta ) {
                        total2 = parseFloat(row.cotizacion) - total;
                        return "$ " + total2;
                    }  },
                { "targets": 18,
                    "data": function ( row, type, val, meta ) {
                        total3 = (total2/parseFloat(row.cotizacion))*100;
                        return total3.toFixed(2);
                    }  }
            ]
        });

    theDivVentas.find('.divMainForm form table.unidad')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "idUnidad" },
                { "targets": 1,
                    "data": function ( row, type, val, meta ) {
                        return $.format.date(row.fechaAlta, "yyyy-MM-dd E '<br>' HH:mm'h'r's'.");
                    } },
                { "data": "marca" },
                { "data": "modelo" },
                { "data": "ano" },
                { "data": "personas" },
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
            ]
        });

    theDivVentas.find('.divMainForm form table.chofer')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "fechaDeNacimiento" },
                { "data": "calleNumeroDomicilio" },
                { "data": "delegacionMunicipioDomicilio" },
                { "data": "codigoPostalDomicilio" },
                { "data": "coloniaDomicilio" },
                { "data": "estadoDomicilio" },
                { "data": "email" },
                { "data": "telefonoLocal" },
                { "data": "telefonoMovil" },
                { "data": "curp" },
                { "data": "fechaAlta"}
            ]

        });



    theDivVentas.find('.btn-agregar').click(function (evt) {
        var tablas = theDivVentas.find('.divMainForm form table');
        $.each(tablas, function( key, value ) {

            if(key%2==0){
                actualizatabla($(tablas[key,key+1]));
            }

        });
        theDivVentas.find('.divMainForm form').find(".panelNuevo").remove();
    });
    theDivVentas.find('.divMainForm form table.cotizacion').DataTable().on( 'select', function () {
        var selected = theDivVentas.find('.divMainForm form table.cotizacion').DataTable().row( { selected: true } ).data();
        theDivVentas.find('.divMainForm form').find('.idCotizacion').val(selected.idCotizacion);
        theDivVentas.find('.divMainForm form').find('.cotizacion').val(selected.cotizacion);

        ventas_suma();

    } );
    theDivVentas.find('.divMainForm form table.unidad').DataTable().on( 'select', function () {
        var selected = theDivVentas.find('.divMainForm form table.unidad').DataTable().row( { selected: true } ).data();
        theDivVentas.find('.divMainForm form').find('.idUnidad').val(selected.idUnidad);
    } );
    theDivVentas.find('.divMainForm form table.chofer').DataTable().on( 'select', function () {
        var selected = theDivVentas.find('.divMainForm form table.chofer').DataTable().row( { selected: true } ).data();
        theDivVentas.find('.divMainForm form').find('.idChofer').val(selected.idChofer);
    } );

    theDivVentas.on('click', '.agregarPagosUno', function (){
        $(this).closest(".panel").next(".pagos").prepend(panelNuevo).hide().show('fast');
    });

    var panelNuevo = '<div class="panel panel-default margen-arriba15 panelNuevo">'+
        '<div class="panel-heading">'+
        'Pago:'+
        '</div>'+
        '<div class="panel-body">'+
        '<div class="pago">'+
        '<div class="form-group-sm collapse">'+
        '<label class="control-label col-sm-3">ID:</label>'+
        '<div class="col-sm-7">'+
        '<input type="text"'+
        'class="form-control idPago"'+
        'placeholder="XX"'+
        'maxlength="35"'+
        'title="Id, no modificable por el usuario."'+
        'disabled'+
        '>'+
        '</div>'+
        '</div>                           <!--idVenta-->'+
        '<div class="form-group-sm">'+
        '<label class="control-label col-sm-3">Monto:</label>'+
        '<div class="col-sm-7">'+
        '<input type="text"'+
        'class="form-control monto"'+
        'placeholder="$$$"'+
        'maxlength="35"'+
        'pattern="[0-9.]{1,70}"'+
        'title="Solo números y punto decimal(no espacios), 1 - 70 caracteres."'+
        'required>'+
        '</div>'+
        '</div>                                      <!--monto-->'+
        '</div>'+
        '</div>'+
        '<div class="panel-footer text-right">'+
        '<button type="button" class="btn btn-danger btn-xs eliminarPago margen-izquierda5">Eliminar</button>'+
        '</div>'+
        '</div>';

    theDivVentas.on('click', '.eliminarPago', function (){
        $(this).closest(".panel").hide('fast', function(){ $(this).closest(".panel").remove(); ventas_suma();});

    });

    theDivVentas.on('change',".monto", function() {

        ventas_suma();

    });

    function ventas_suma() {
        var montos = theDivVentas.find('.divMainForm form').find('.monto');
        var suma = 0;

        $.each(montos, function( key, value ) {

            suma += parseFloat($(montos[key]).val()) || 0;

        });

        theDivVentas.find('.divMainForm form').find('.tPagado').val(suma);

        if(theDivVentas.find('.divMainForm form').find('.cotizacion').val()!=""){

            theDivVentas.find('.divMainForm form').find('.deuda').val(theDivVentas.find('.divMainForm form').find('.cotizacion').val()-suma);

        }else{
            theDivVentas.find('.divMainForm form').find('.deuda').val("");
        }
    }

    theDivVentas.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);
        var accion;

        if (element.attr("accion")=="agregar"){
            accion = "ventaAgregar";
        }
        else if (element.attr("accion")=="editar" && element.find('.idVenta').val() != "" ){
            accion = "ventaEditar";
        }
        else {

            alerta(element,"error","<strong>¡Error!: </strong>Acción desconocida o sin selección para editar");

            return;
        }

        var pagosVar = [];
        $(this).find(".pago").each( function() {
            var pago= {
                idPago: $(this).find('.idPago').val(),
                monto: $(this).find('.monto').val(),
            }
            pagosVar.push(pago);
        });

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: accion,
                idVenta: $(this).find('.idVenta').val(),
                idCotizacion: $(this).find('.idCotizacion').val(),
                idUnidad: $(this).find('.idUnidad').val(),
                idChofer: $(this).find('.idChofer').val(),
                pagos: pagosVar

            }
        })
            .done(function (data) {
                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    var tablas = theDivVentas.find('.mainTableDiv');
                    $.each(tablas, function( key, value ) {

                        if(key%2==0){
                            actualizatabla($(tablas[key,key+1]));
                        }

                    });
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });

    theDivVentas.find('.btn-editar').click(function (evt) {
        var tablas = theDivVentas.find('.divMainForm form table');
        $.each(tablas, function( key, value ) {

            if(key%2==0){
                actualizatabla($(tablas[key,key+1]));
            }

        });
        theDivVentas.find('.divMainForm form').find(".panelNuevo").remove();

        var selected = theDivVentas.find('.mainTableDiv').DataTable().row( { selected: true } ).data();

        theDivVentas.find('.divMainForm form').find('.idVenta').val(selected.idVenta);
        theDivVentas.find('.divMainForm form').find('.idCotizacion').val(selected.idCotizacion);
        theDivVentas.find('.divMainForm form').find('.idUnidad').val(selected.idUnidad);
        theDivVentas.find('.divMainForm form').find('.idChofer').val(selected.idChofer);
        theDivVentas.find('.divMainForm form').find('.cotizacion').val(selected.cotizacion);

        var table =  selected.pagos;



        $(table).each(function( key, value ) {

            theDivVentas.find('.divMainForm form').find('.agregarPagosUno').trigger('click');

            theDivVentas.find('.divMainForm form .panelNuevo').first().find('.idPago').val(value.idPago);
            theDivVentas.find('.divMainForm form .panelNuevo').first().find('.monto').val(value.monto).prop( "disabled", true );
            ventas_suma();

        });

    });

    theDivVentas.find('.btn-PDF').click(function (evt) {

        var selected = theDivVentas.find('.mainTableDiv').DataTable().row({selected: true}).data();

        var myForm = $('<form id="hereiamtheone" class="" action="./Controllers/baseReporte.php" target="_blank" method="post"></form>');
        myForm.append('<input type="text" name="action" value="venta">');

        var data = $('<input type="text" name="viaje">');
        data.val(JSON.stringify(selected));

        myForm.append(data);
        $('body').append(myForm);
        myForm.submit();
        myForm.remove();


    });



    /* ------------------------------------------------------------------------------------------------     Configuracion   */

    var theDivConfiguracion = $('#divConfiguracion');

    theDivConfiguracion.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "nombre" },
                { "data": "apPaterno" },
                { "data": "apMaterno" },
                { "data": "fechaDeNacimiento" },
                { "data": "calleNumeroDomicilio" },
                { "data": "delegacionMunicipioDomicilio" },
                { "data": "codigoPostalDomicilio" },
                { "data": "coloniaDomicilio" },
                { "data": "estadoDomicilio" },
                { "data": "email" },
                { "data": "telefonoLocal" },
                { "data": "telefonoMovil" },
                { "data": "curp" },
                { "data": "fechaAlta"},
                { "data": "estadoSistema",
                    "render": function ( data, type, full, meta ) {
                        return data==1?"Activo":"Inactivo";
                    } },
                { "data": "userName" }
            ]

        });

    theDivConfiguracion.find('.divMainForm form').submit(function (evt) {
        evt.preventDefault();

        var element = $(this);

        if (element.find('.idEmpleado').val() == "" ){

            alerta(element,"error","<strong>¡Error!: </strong>Sin selección para editar");

            return;
        }

        $.ajax({
            url: "./Controllers/baseController.php",
            type: 'POST',
            dataType: 'json',
            data: {
                action: "empleadoModulos",
                idEmpleado: $(this).find('.idEmpleado').val(),
                empleados: $(this).find('.empleados').is(':checked') ? 1 : 0,
                contraseñas: $(this).find('.contraseñas').is(':checked') ? 1 : 0,
                clientes: $(this).find('.clientes').is(':checked') ? 1 : 0,
                viajes: $(this).find('.viajes').is(':checked') ? 1 : 0,
                cotizaciones: $(this).find('.cotizaciones').is(':checked') ? 1 : 0,
                ventas: $(this).find('.ventas').is(':checked') ? 1 : 0,
                unidades: $(this).find('.unidades').is(':checked') ? 1 : 0,
                choferes: $(this).find('.choferes').is(':checked') ? 1 : 0,
                propietarios: $(this).find('.propietarios').is(':checked') ? 1 : 0,
                registros: $(this).find('.registros').is(':checked') ? 1 : 0,
                configuracion: $(this).find('.configuracion').is(':checked') ? 1 : 0,
            }
        })
            .done(function (data) {

                if (data.success) {

                    element.closest(".divMainForm").hide("fast");
                    element.trigger('reset');

                    alerta(element,"success","<strong> Operación Exitosa </strong>");
                    actualizatabla(theDivConfiguracion.find('.mainTableDiv'));
                } else {

                    alerta(element,"error","<strong>¡Error!: </strong>"+data.error);


                }
            })
            .fail(function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Error: " + errorThrown);
            });

    });
    theDivConfiguracion.find('.btn-editar').click(function (evt) {

        theDivConfiguracion.find('.divMainForm form input').attr('checked', false);

        var selected = theDivConfiguracion.find('.mainTableDiv').DataTable().row( { selected: true } ).data();

        theDivConfiguracion.find('.divMainForm form').find('.idEmpleado').val(selected.idEmpleado);
        theDivConfiguracion.find('.divMainForm form').find('.nombre').val(selected.nombre+" "+selected.apPaterno+" "+selected.apMaterno);

        if(selected.modulos.charAt(0)==1){
            theDivConfiguracion.find('.divMainForm form').find('.empleados').attr('checked', true);
        }
        if(selected.modulos.charAt(1)==1){
            theDivConfiguracion.find('.divMainForm form').find('.contraseñas').attr('checked', true);
        }
        if(selected.modulos.charAt(2)==1){
            theDivConfiguracion.find('.divMainForm form').find('.clientes').attr('checked', true);
        }
        if(selected.modulos.charAt(3)==1){
            theDivConfiguracion.find('.divMainForm form').find('.viajes').attr('checked', true);
        }
        if(selected.modulos.charAt(4)==1){
            theDivConfiguracion.find('.divMainForm form').find('.cotizaciones').attr('checked', true);
        }
        if(selected.modulos.charAt(5)==1){
            theDivConfiguracion.find('.divMainForm form').find('.ventas').attr('checked', true);
        }
        if(selected.modulos.charAt(6)==1){
            theDivConfiguracion.find('.divMainForm form').find('.unidades').attr('checked', true);
        }
        if(selected.modulos.charAt(7)==1){
            theDivConfiguracion.find('.divMainForm form').find('.choferes').attr('checked', true);
        }
        if(selected.modulos.charAt(8)==1){
            theDivConfiguracion.find('.divMainForm form').find('.propietarios').attr('checked', true);
        }
        if(selected.modulos.charAt(9)==1){
            theDivConfiguracion.find('.divMainForm form').find('.registros').attr('checked', true);
        }
        if(selected.modulos.charAt(10)==1){
            theDivConfiguracion.find('.divMainForm form').find('.configuracion').attr('checked', true);
        }




    })







   /* ------------------------------------------------------------------------------------------------     Registros   */

    var theDivRegistros = $('#divRegistros');

    theDivRegistros.find('.mainTableDiv')
        .DataTable({
            "select": true,
            "dom": '<"small"<"tableFilter"f><l>>rt<"small"ip>',
            "columns": [
                { "data": "idRegistro" },
                { "data": "fechaAlta" },
                { "data": "idEmpleado" },
                { "data": "descripcion" },
            ]

        });





    /* ---------------------------------------------Esto tiene que ir despues de la inicializacion de todas las datatales */

    $('table.mainTableDiv').DataTable().on( 'select', function () {
        $(this).closest(".divModuloMain").children(".acciones").children(".btn-needStelect")
            .prop('disabled', false);
    } );
    $('table.mainTableDiv').DataTable().on( 'deselect', function () {
        $(this).closest(".divModuloMain").children(".acciones").children(".btn-needStelect")
            .prop('disabled', true);
    } );


});