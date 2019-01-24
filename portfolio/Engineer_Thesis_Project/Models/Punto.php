<?php namespace APP\Models;

use App\Utils\Log;

class Punto extends BaseModel
{

    protected   $_tableName = "Puntos";
    protected   $idPunto;
    protected   $fecha;
    protected   $hora;
    protected   $estadoDireccion;
    protected   $delegacionMunicipioDireccion;
    protected   $codigoPostalDireccion;
    protected   $calleNumeroDireccion;
    protected   $descripcionDireccion;
    protected   $idViaje;

    public function puntosViajesCotizaciones(){


        $sql = "SELECT Puntos.*,Cotizaciones.idCotizacion
                    FROM Puntos
                    INNER JOIN Viajes ON Puntos.idViaje = Viajes.idViaje
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/
    public function puntosViajesCotizacionesVentas(){


        $sql = "SELECT Puntos.*,Cotizaciones.idCotizacion
                    FROM Puntos
                    INNER JOIN Viajes ON Puntos.idViaje = Viajes.idViaje
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    INNER JOIN Ventas ON Cotizaciones.idCotizacion = Ventas.idCotizacion";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                  /*mandar la respuesta diractamnete como json*/
    public function puntosViajesCotizacionesNoVentas(){


        $sql = "SELECT Puntos.*,Cotizaciones.idCotizacion
                    FROM Puntos
                    INNER JOIN Viajes ON Puntos.idViaje = Viajes.idViaje
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    LEFT JOIN Ventas ON Cotizaciones.idCotizacion = Ventas.idCotizacion
                    WHERE Ventas.idCotizacion IS NULL";

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

 