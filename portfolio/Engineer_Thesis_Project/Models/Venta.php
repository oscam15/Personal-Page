<?php namespace APP\Models;

use App\Utils\Log;

class Venta extends BaseModel
{

    protected   $_tableName = "Ventas";
    protected   $idVenta;
    protected   $idUnidad;
    protected   $idChofer;
    protected   $fechaAlta;
    protected   $idCotizacion;

    public function ventasViajesClientesCotizaciones(){


        $sql = "SELECT Clientes.*, Viajes.* , Cotizaciones.*, Ventas.*, Unidades.*, Ventas.fechaAlta as fechaAltaVenta, Choferes.nombre as nombreCh, Choferes.apPaterno as apPaternoCh
                    FROM Clientes
                    INNER JOIN Viajes ON Clientes.idCliente = Viajes.idCliente
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    INNER JOIN Ventas ON Cotizaciones.idCotizacion = Ventas.idCotizacion
                    INNER JOIN Choferes ON Ventas.idChofer = Choferes.idChofer
                    INNER JOIN Unidades ON Ventas.idUnidad = Unidades.idUnidad
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                 /*mandar la respuesta diractamnete como json*/
    public function pendientesVentasViajesClientesCotizacionesPagos(){


        $sql = "SELECT Clientes.*, Viajes.* , Cotizaciones.*, Ventas.*, Unidades.*, Ventas.fechaAlta as fechaAltaVenta, Choferes.nombre as nombreCh, Choferes.apPaterno as apPaternoCh
                    FROM Clientes
                    INNER JOIN Viajes ON Clientes.idCliente = Viajes.idCliente
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    INNER JOIN Ventas ON Cotizaciones.idCotizacion = Ventas.idCotizacion
                    INNER JOIN Choferes ON Ventas.idChofer = Choferes.idChofer
                    INNER JOIN Unidades ON Ventas.idUnidad = Unidades.idUnidad
                    INNER JOIN 
                     
                          (SELECT S.idVenta
                              FROM Cotizaciones
                              INNER JOIN 
                              
                                      (SELECT Ventas.idVenta, Ventas.idCotizacion, SUM(Pagos.monto) as pagos
                                            FROM  Ventas
                                            LEFT JOIN Pagos ON Ventas.idVenta = Pagos.idVenta
                                            GROUP BY Ventas.idVenta) S 
                              ON Cotizaciones.idCotizacion = S.idCotizacion
                              WHERE Cotizaciones.cotizacion != S.pagos OR S.pagos IS NULL)   P 
                     
                     ON Ventas.idVenta = P.idVenta
                    
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                 /*mandar la respuesta diractamnete como json*/
    public function ventasViajesPuntos(){


        $sql = "SELECT Puntos.*,Ventas.idVenta
                    FROM Viajes
                    INNER JOIN Cotizaciones ON Viajes.idViaje = Cotizaciones.idViaje
                    INNER JOIN Ventas ON Cotizaciones.idCotizacion = Ventas.idCotizacion
                    INNER JOIN Puntos ON Viajes.idViaje = Puntos.idViaje
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                 /*mandar la respuesta diractamnete como json*/
    public function ventasPagos(){


        $sql = "SELECT Pagos.*,Ventas.idVenta
                    FROM Ventas
                    INNER JOIN Pagos ON Ventas.idVenta = Pagos.idVenta
                    ";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                 /*mandar la respuesta diractamnete como json*/


}

/*
COMENTARIOS GENERALES:

*/

 