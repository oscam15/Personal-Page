<?php namespace APP\Models;

use App\Utils\Log;

class Unidad extends BaseModel
{

    protected   $_tableName = "Unidades";
    protected   $idUnidad;
    protected   $marca;
    protected   $modelo;
    protected   $ano;
    protected   $personas;
    protected   $fechaAlta;
    protected   $idPropietario;

    public function unidadesPropietarios(){


        $sql = "SELECT *
                    FROM Propietarios
                    INNER JOIN Unidades ON Propietarios.idPropietario = Unidades.idPropietario";

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

 