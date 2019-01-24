<?php namespace APP\Models;

use App\Utils\Log;

class Cotizacion extends BaseModel
{

    protected   $_tableName = "Cotizaciones";
    protected   $idCotizacion;
    protected   $tipoUnidad;
    protected   $precioCombustible;
    protected   $costoCombustible;
    protected   $peaje;
    protected   $sueldoChofer;
    protected   $hospedajeChofer;
    protected   $extras;
    protected   $cotizacion;
    protected   $fechaAlta;
    protected   $idViaje;

    public function cotizacionesViajes(){


        $sql = "SELECT *
                    FROM Viajes
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    INNER JOIN Clientes ON Viajes.idCliente = Clientes.idCliente";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/

    public function vendidasCotizacionesViajes(){


        $sql = "SELECT *
                    FROM Viajes V
                    INNER JOIN Cotizaciones K ON V.idViaje = K.idViaje
                    INNER JOIN Ventas Y ON K.idCotizacion = Y.idCotizacion
                    INNER JOIN Clientes C ON V.idCliente = C.idCliente
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/
    public function noVentaCotizacionesViajes(){


        $sql = "SELECT V.*,K.*,C.*
                    FROM Viajes V
                    INNER JOIN Cotizaciones K ON V.idViaje = K.idViaje
                    INNER JOIN Clientes C ON V.idCliente = C.idCliente
                    LEFT JOIN Ventas Y ON K.idCotizacion = Y.idCotizacion
                    WHERE Y.idCotizacion IS NULL
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/


    public function estadoLugarDiasTipoCotizacionesViajes($destinoEstado, $destinoLugar, $diasNum){


        $sql = "SELECT *
                    FROM Viajes
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    WHERE Viajes.destinoEstado LIKE '".$destinoEstado."'
                    AND Viajes.destinoLugar LIKE '%".$destinoLugar."%'
                    AND Viajes.diasNum = ".$diasNum."
                    AND Cotizaciones.tipoUnidad LIKE '%".$this->tipoUnidad."%'
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/
    public function estadoLugarDiasTipoCotizacionesViajes2($destinoEstado, $destinoLugar, $diasNum){


        $sql = "SELECT *
                    FROM Viajes
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    WHERE Viajes.destinoEstado LIKE '".$destinoEstado."'
                    AND Viajes.destinoLugar LIKE '%".$destinoLugar."%'
                    AND Viajes.diasNum != ".$diasNum."
                    AND Cotizaciones.tipoUnidad LIKE '%".$this->tipoUnidad."%'
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/
    public function estadoLugarDiasTipoCotizacionesViajes3($destinoEstado, $destinoLugar, $diasNum){


        $sql = "SELECT *
                    FROM Viajes
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    WHERE Viajes.destinoEstado LIKE '".$destinoEstado."'
                    AND Viajes.destinoLugar NOT LIKE '%".$destinoLugar."%'
                    AND Viajes.diasNum = ".$diasNum."
                    AND Cotizaciones.tipoUnidad LIKE '%".$this->tipoUnidad."%'
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/
    public function estadoLugarDiasTipoCotizacionesViajes4($destinoEstado, $destinoLugar, $diasNum){


        $sql = "SELECT *
                    FROM Viajes
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    WHERE Viajes.destinoEstado LIKE '".$destinoEstado."'
                    AND Viajes.destinoLugar NOT LIKE '%".$destinoLugar."%'
                    AND Viajes.diasNum != ".$diasNum."
                    AND Cotizaciones.tipoUnidad LIKE '%".$this->tipoUnidad."%'
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/


    public function tipoKmTCombustibleTCostosCotizacionesViajes($kilometros, $costosTotal){


        $sql = "SELECT *
                    FROM Viajes
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    WHERE ROUND(Viajes.kilometros/100)*100 = '".round($kilometros/100)*100 ."'
                    AND ROUND(Cotizaciones.costoCombustible/100)*100 = ".round($this->costoCombustible/100)*100 ."
                    AND ROUND((Cotizaciones.costoCombustible + Cotizaciones.peaje + Cotizaciones.sueldoChofer + Cotizaciones.hospedajeChofer + Cotizaciones.extras)/100)*100 = ".round($costosTotal/100)*100 ."
                    AND Cotizaciones.tipoUnidad LIKE '%".$this->tipoUnidad."%'
                    ";



        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/

}

/*
COMENTARIOS GENERALES:

*/

 