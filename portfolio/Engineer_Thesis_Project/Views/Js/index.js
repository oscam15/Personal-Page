$(document).ready(function () {

    $("#loginDiv").fadeIn(1000);

    $("#loginForm").submit(function (evt) {                                                       /*Accion Boton Login*/
        evt.preventDefault();

        $("#loadingLogin").removeClass('out');
        $("#loadingLogin").addClass('in');

        $.ajax({                                                                       /*Se envia peticion*/
            url     : "./Controllers/baseController.php",
            type    : 'POST',
            dataType: 'json',
            data    : {
                action: "empleadoLogin",
                userName: $("#loginFormUserName").val(),
                password: $("#loginFormPassword").val()
            }
        }).done(function (data) {            /*Se recibe respuesta*/

/*
            console.log(data);
*/
            if (data.success) {

                $("#loginDiv").fadeOut(500, function(){ window.top.location.href = "./inicio.php"; });


            } else {						                                        //En caso de error, mensaje de error

                $("#loadingLogin").removeClass('in');
                $("#loadingLogin").addClass('out');

                $("#errorLoginMensaje").html(data.error);
                $("#errorLogin").removeClass('out');
                $("#errorLogin").addClass('in');
            }
        });
        return false;
    });

    $(".fadeDadOut").click( function (evt) {

        $(this).parent().removeClass('in');
        $(this).parent().addClass('out');

    });

});