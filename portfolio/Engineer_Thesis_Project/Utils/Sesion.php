<?php namespace APP\Utils;


class Sesion
{
    public static function checkOnIndex()
    {
        session_start();						                                                    //Manejo de sesiones
        if (isset($_SESSION["timelast"])){
            if($_SESSION['timelast'] + SESSIONTIMEOUT * 60 < time()){
                session_destroy();
            }else{
                echo "<script type='text/javascript'>window.top.location.href = \"./inicio.php\";</script>";
                exit("Redirected to inicio.");
            }
        }

    }

    public static function checkOnInicio()
    {
        session_start();						                                                    //Manejo de sesiones
        if (isset($_SESSION["timelast"])){
            if($_SESSION['timelast'] + SESSIONTIMEOUT * 60 < time()){
                session_destroy();
                echo "<script type='text/javascript'>window.top.location.href = \"./index.php\";</script>";
                exit("Redirected to index.");
            }
        }else{
            echo "<script type='text/javascript'>window.top.location.href = \"./index.php\";</script>";
            exit("Redirected to index.");
        }
        $_SESSION["timelast"] = time();

    }

}