<?php namespace APP\Models;


class Pago extends BaseModel
{

    protected   $_tableName = "Pagos";
    protected   $idPago;
    protected   $monto;
    protected   $fechaAlta;
    protected   $idVenta;

    public function pagosVentaID(){


        $sql = "SELECT Pagos.*
                    FROM Ventas
                    INNER JOIN Pagos ON Pagos.idVenta = Ventas.idVenta
                    WHERE Pagos.idVenta = ".$this->idVenta."
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

 