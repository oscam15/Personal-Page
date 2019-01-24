<?php namespace APP\Models;

use App\Utils\Log;

class Viaje extends BaseModel
{

    protected   $_tableName = "Viajes";
    protected   $idViaje;
    protected   $destinoEstado;
    protected   $destinoLugar;
    protected   $salidaFechaHora;
    protected   $regresoFechaHora;
    protected   $diasNum;
    protected   $kilometros;
    protected   $temporada;
    protected   $fechaAlta;
    protected   $idCliente;

    public function viajesClientes(){


        $sql = "SELECT *
                    FROM Clientes
                    INNER JOIN Viajes ON Clientes.idCliente = Viajes.idCliente";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                                 /*mandar la respuesta diractamnete como json*/
    public function sinCotizarViajesClientes(){


        $sql = "SELECT V.idViaje, V.fechaAlta, C.nombre, C.apPaterno, C.apMaterno, V.destinoEstado, V.destinoLugar, V.salidaFechaHora, V.regresoFechaHora, V.diasNum, V.kilometros, V.temporada
                    FROM Clientes C
                    INNER JOIN Viajes V ON C.idCliente = V.idCliente
                    LEFT JOIN Cotizaciones K ON V.idViaje = K.idViaje
                    WHERE K.idViaje IS NULL";

        $stmt = Conexion::getConnection()->prepare($sql);

        try {
            $stmt->execute();
        } catch (\PDOException $e) {
            Log::error('Error' . $e->getMessage());
        }

        return $stmt->fetchAll(\PDO::FETCH_ASSOC);

    }                       /*mandar la respuesta diractamnete como json*/



}

/*
COMENTARIOS GENERALES:

*/

 