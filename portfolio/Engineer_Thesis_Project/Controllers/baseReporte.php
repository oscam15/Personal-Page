<?php

require_once __DIR__."/../Config/Constantes.php";                     //Inclusión de las constantes y funciones globales
require_once __DIR__."/../Autoload.php";                              //Inclusión de archivo para Autoload de las clases

\APP\Autoload::run();

$_GET   = filter_input_array(INPUT_GET, FILTER_UNSAFE_RAW);                                        //Limpia entrada
$_POST  = filter_input_array(INPUT_POST, FILTER_UNSAFE_RAW);

file_put_contents('php://stderr', print_r($_POST, TRUE));

$action = $_POST["action"];
$viaje = json_decode($_POST["viaje"], true);
unset($_POST["action"]);

if ($action == "venta"){

    // Include the main TCPDF library (search for installation path).
        require_once( __DIR__."/../Views/Reports/TCPDF-master/tcpdf.php");

    class MYPDF extends TCPDF {
        public function Header() {
            $headerData = $this->getHeaderData();
            $this->SetFont('helvetica', 'B', 10);
            $this->writeHTML($headerData['string']);
        }
    }



    $pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // create new PDF document
        $pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor(APPNAME);
        $pdf->SetTitle('Reporte de Venta, ID: '.$viaje['idVenta']);
        $pdf->SetSubject('Reporte');
        $pdf->SetKeywords(APPNAME.', PDF, reporte, venta');

    // set default header data
    $pdf->setHeaderData($ln='', $lw=0, $ht='', $hs='
                   <div>
                    <table cellspacing="0" cellpadding="1" style="border-bottom:1pt solid black;">
                        <tr>
                            <td width="100"><img src="../Views/Reports/TCPDF-master/examples/images/my_bus.jpg"/></td>
                            <td width=""><h3 style="text-align:right;">'.APPNAME.'</h3><span style="text-align:right;">Trabajo Terminal <br> ERP Para la gestión de operaciones de renta de transporte turistico.</span></td>
                        </tr>
                    </table>             
                  </div>', $tc=array(0,0,0), $lc=array(0,0,0));
    //$pdf->setHeaderData(PDF_HEADER_LOGO, 25, $ht='', $hs='<h2 style="text-align:right;">'.APPNAME.'</h2> Trabajo Terminal: ERP Para la gestión de operaciones de renta de transporte turistico. \n\n Reporte de Viaje, ID: ".$_POST[\'viaje\']["idViaje"]', $tc=array(0,0,0), $lc=array(0,0,0));
        //$pdf->SetHeaderData(PDF_HEADER_LOGO, 25, APPNAME, "Trabajo Terminal: ERP Para la gestión de operaciones de renta de transporte turistico. \n\n Reporte de Viaje, ID: ".$_POST['viaje']["idViaje"], array(0,0,0), array(0,0,0));
        $pdf->setFooterData(array(0,0,0), array(0,0,0));

    // set header and footer fonts
        $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

    // set default monospaced font
        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // set margins
        $pdf->SetMargins(PDF_MARGIN_LEFT, 28, PDF_MARGIN_RIGHT);
        $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

    // set auto page breaks
        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

    // set image scale factor
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

    // set some language-dependent strings (optional)
        if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
            require_once(dirname(__FILE__).'/lang/eng.php');
            $pdf->setLanguageArray($l);
        }

    // ---------------------------------------------------------

    // set default font subsetting mode
        $pdf->setFontSubsetting(true);

    // Set font
    // dejavusans is a UTF-8 Unicode font, if you only need to
    // print standard ASCII chars, you can use core fonts like
    // helvetica or times to reduce file size.
        $pdf->SetFont('helvetica', '', 12, '', true);

    // Add a page
    // This method has several options, check the source code documentation for more information.
        $pdf->AddPage();

    // set text shadow effect
        //$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

    // Set some content to print
        $html = '
    <div>
        <table cellspacing="0" cellpadding="1">
            <tr>
                <td><font size="18"><b>Reporte de Venta</b></font><br></td>
                <td><font size="8" style="text-align:right;">['.date("F j, Y").']</font></td>
            </tr>
            <tr>
                <td><font size="11"><u><b>Cliente</b></u></font></td>
                <td><font size="9" style="text-align:right;"><b>ID Cliente: </b>'.$viaje['idCliente'].'</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"><b>Nombre: </b></font></td>
                <td width="567"><font size="9">'.$viaje['nombre'].' '.$viaje['apPaterno'].' '.$viaje['apMaterno'].'</font></td>
            </tr>
            <tr>
                <td width="90"><font size="9"><b>Teléfono móvil: </b></font></td>
                <td width="532"><font size="9">'.$viaje['telefonoMovil'].'</font></td>
            </tr>
            <tr>
                <td width="90"><font size="9"><b>Teléfono  local: </b></font></td>
                <td width="221"><font size="9"> '.$viaje['telefonoLocal'].'</font></td>
                <td width="55"><font size="9"><b>E-mail: </b></font></td>
                <td width="256"><font size="9"> '.$viaje['telefonoLocal'].'</font><br><br></td>
            </tr>
            <tr>
                <td width="311"><font size="11"><u><b>Viaje</b></u></font></td>
                <td width="311"><font size="9" style="text-align:right;"><b>ID Viaje: </b>'.$viaje['idViaje'].'</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"><b>Destino: </b></font></td>
                <td width="567"><font size="9">'.$viaje['destinoEstado'].(($viaje['destinoLugar']!="")?(",".$viaje['destinoLugar']):"").'.</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"><b>Salida: </b></font></td>
                <td width="256"><font size="9"> '.substr($viaje['salidaFechaHora'],0,-9).' a las '.substr($viaje['salidaFechaHora'],11,-3).'hrs.</font></td>
                <td width="55"><font size="9"><b>Regreso: </b></font></td>
                <td width="256"><font size="9"> '.substr($viaje['regresoFechaHora'],0,-9).' a las '.substr($viaje['regresoFechaHora'],11,-3).'hrs.</font></td>
            </tr>
            ';

    if($viaje['puntos']){
        /*$html.='
            <tr>
                <td width="622"><font size="9"><br><b>Itinerario: </b></font></td>
            </tr>
        </table>             
    </div>\'
    '.print_r($_POST['viaje'], TRUE);*/

        $salida = '<tr>
                <td width="622"><font size="9"><br><b>Itinerario: </b><br></font></td>
            </tr>
        <table><tr>
        <td width="63"><font size="9"><b>Fecha</b></font></td>
        <td width="55"><font size="9"><b>Hora</b></font></td>
        <td width="80"><font size="9"><b>Estado</b></font></td>
        <td width="80"><font size="9"><b>Delegación</b></font></td>
        <td width="40"><font size="9"><b>C.P.</b></font></td>
        <td width="70"><font size="9"><b>Colonia</b></font></td>
        <td width="70"><font size="9"><b>Calle</b></font></td>
        <td width="164"><font size="9"><b>Descripción</b></font></td>
        </tr>';

        foreach($viaje['puntos'] as $index => $value ) {

            $salida.=
                '<tr >'.
                '<td><font size="9">'.$value["fecha"].'</font></td>'.
                '<td><font size="9">'.substr($value["hora"],0,-3).'hrs.</font></td>'.
                '<td><font size="9">'.$value["estadoDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["delegacionMunicipioDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["codigoPostalDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["coloniaDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["calleNumeroDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["descripcionDireccion"].'</font></td>'.
                '</tr>';

                }


        $html.= $salida.'</table>';

    }
        $html.='
            <tr>
                <td width="622"><font size="11"><br></font></td>
            </tr>
            <tr>
                <td width="311"><font size="13"><u><b>Cotizacion</b></u></font></td>
                <td width="311"><font size="9" style="text-align:right;"><b>ID Cotización: </b>'.$viaje['idCotizacion'].'</font></td>
            </tr>
            <tr>
                <td width="90"><font size="9"><b>Tipo de Unidad:</b></font></td>
                <td width="532"><font size="9">'.$viaje['tipoUnidad'].'</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"></font></td>
                <td width="256"><font size="9"></font></td>
                <td width="90"><font size="12"><u><b>Cotización: </b></u></font></td>
                <td width="221"><font size="12"><u> $ '.$viaje['cotizacion'].' pesos</u></font></td>
            </tr>
            <tr>
                <td width="622"><font size="11"><br></font></td>
            </tr>
            <tr>
                <td width="311"><font size="13"><u><b>Venta</b></u></font></td>
                <td width="311"><font size="9" style="text-align:right;"><b>ID Venta: </b>'.$viaje['idVenta'].'</font></td>
            </tr>';


    $pagado=0;

    if($viaje['pagos']){
        /*$html.='
            <tr>
                <td width="622"><font size="9"><br><b>Itinerario: </b></font></td>
            </tr>
        </table>
    </div>\'
    '.print_r($_POST['viaje'], TRUE);*/

        $salida = '<tr>
                <td width="622"><font size="9"><br><b>Pagos: </b><br></font></td>
            </tr>
        <table><tr>
        <td width="70"><font size="9"><b>Fecha</b></font></td>
        <td width="10"><font size="9"><b></b></font></td>
        <td width="70"><font size="9"><b>Monto</b></font></td>
        <td width="70"><font size="9"><b></b></font></td>
        </tr>';

        foreach($viaje['pagos'] as $index => $value ) {
            $pagado+=$value["monto"];
            $salida.=
                '<tr >'.
                '<td><font size="9">'.substr($value["fechaAlta"],0,-9).'</font></td>'.
                '<td><font size="9">$</font></td>'.
                '<td><font size="9" style="text-align:right;">'.$value["monto"].'</font></td>'.
                '<td><font size="9" > pesos</font></td>'.
                '</tr>';

        }

        $salida.=
            '<tr >'.
            '<td width="70"><font size="9" style="text-align:right;"><b>Total: </b></font></td>'.
            '<td><font size="9">$</font></td>'.
            '<td><font size="9" style="text-align:right;">'.$pagado.'</font></td>'.
            '<td><font size="9" > pesos</font></td>'.
            '</tr>';

        $html.= $salida.'</table>';

    }











    $html.='
             <tr>
                <td width="55"><font size="9"></font></td>
                <td width="256"><font size="9"></font></td>
                <td width="90"><font size="12"><u><b>Por pagar: </b></u></font></td>
                <td width="221"><font size="12"><u> $ '.($viaje['cotizacion']-$pagado).' pesos</u></font></td>
            </tr>                   
        </table>             
    </div>';


    // Print text using writeHTMLCell()
        $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

    // ---------------------------------------------------------

    // Close and output PDF document
    // This method has several options, check the source code documentation for more information.
        $pdf->Output('example_001.pdf', 'I');

    //============================================================+
    // END OF FILE
    //============================================================+
    }
if ($action == "cotizacion"){

    // Include the main TCPDF library (search for installation path).
        require_once( __DIR__."/../Views/Reports/TCPDF-master/tcpdf.php");

    class MYPDF extends TCPDF {
        public function Header() {
            $headerData = $this->getHeaderData();
            $this->SetFont('helvetica', 'B', 10);
            $this->writeHTML($headerData['string']);
        }
    }



    $pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // create new PDF document
        $pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor(APPNAME);
        $pdf->SetTitle('Reporte de Cotizacion, ID: '.$viaje['idCotizacion']);
        $pdf->SetSubject('Reporte');
        $pdf->SetKeywords(APPNAME.', PDF, reporte, viaje');

    // set default header data
    $pdf->setHeaderData($ln='', $lw=0, $ht='', $hs='
                   <div>
                    <table cellspacing="0" cellpadding="1" style="border-bottom:1pt solid black;">
                        <tr>
                            <td width="100"><img src="../Views/Reports/TCPDF-master/examples/images/my_bus.jpg"/></td>
                            <td width=""><h3 style="text-align:right;">'.APPNAME.'</h3><span style="text-align:right;">Trabajo Terminal <br> ERP Para la gestión de operaciones de renta de transporte turistico.</span></td>
                        </tr>
                    </table>             
                  </div>', $tc=array(0,0,0), $lc=array(0,0,0));
    //$pdf->setHeaderData(PDF_HEADER_LOGO, 25, $ht='', $hs='<h2 style="text-align:right;">'.APPNAME.'</h2> Trabajo Terminal: ERP Para la gestión de operaciones de renta de transporte turistico. \n\n Reporte de Viaje, ID: ".$_POST[\'viaje\']["idViaje"]', $tc=array(0,0,0), $lc=array(0,0,0));
        //$pdf->SetHeaderData(PDF_HEADER_LOGO, 25, APPNAME, "Trabajo Terminal: ERP Para la gestión de operaciones de renta de transporte turistico. \n\n Reporte de Viaje, ID: ".$_POST['viaje']["idViaje"], array(0,0,0), array(0,0,0));
        $pdf->setFooterData(array(0,0,0), array(0,0,0));

    // set header and footer fonts
        $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

    // set default monospaced font
        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // set margins
        $pdf->SetMargins(PDF_MARGIN_LEFT, 28, PDF_MARGIN_RIGHT);
        $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

    // set auto page breaks
        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

    // set image scale factor
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

    // set some language-dependent strings (optional)
        if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
            require_once(dirname(__FILE__).'/lang/eng.php');
            $pdf->setLanguageArray($l);
        }

    // ---------------------------------------------------------

    // set default font subsetting mode
        $pdf->setFontSubsetting(true);

    // Set font
    // dejavusans is a UTF-8 Unicode font, if you only need to
    // print standard ASCII chars, you can use core fonts like
    // helvetica or times to reduce file size.
        $pdf->SetFont('helvetica', '', 12, '', true);

    // Add a page
    // This method has several options, check the source code documentation for more information.
        $pdf->AddPage();

    // set text shadow effect
        //$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

    // Set some content to print
        $html = '
    <div>
        <table cellspacing="0" cellpadding="1">
            <tr>
                <td><font size="18"><b>Reporte de Viaje</b></font><br></td>
                <td><font size="8" style="text-align:right;">['.date("F j, Y").']</font></td>
            </tr>
            <tr>
                <td><font size="11"><b>Info. Cliente</b></font></td>
                <td><font size="9" style="text-align:right;"><b>ID Cliente: </b>'.$viaje['idCliente'].'</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"><b>Nombre: </b></font></td>
                <td width="567"><font size="9">'.$viaje['nombre'].' '.$viaje['apPaterno'].' '.$viaje['apMaterno'].'</font></td>
            </tr>
            <tr>
                <td width="90"><font size="9"><b>Teléfono móvil: </b></font></td>
                <td width="532"><font size="9">'.$viaje['telefonoMovil'].'</font></td>
            </tr>
            <tr>
                <td width="90"><font size="9"><b>Teléfono  local: </b></font></td>
                <td width="221"><font size="9"> '.$viaje['telefonoLocal'].'</font></td>
                <td width="55"><font size="9"><b>E-mail: </b></font></td>
                <td width="256"><font size="9"> '.$viaje['telefonoLocal'].'</font><br><br></td>
            </tr>
            <tr>
                <td width="311"><font size="11"><b>Info. Viaje</b></font></td>
                <td width="311"><font size="9" style="text-align:right;"><b>ID Viaje: </b>'.$viaje['idViaje'].'</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"><b>Destino: </b></font></td>
                <td width="567"><font size="9">'.$viaje['destinoEstado'].(($viaje['destinoLugar']!="")?(",".$viaje['destinoLugar']):"").'.</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"><b>Salida: </b></font></td>
                <td width="256"><font size="9"> '.substr($viaje['salidaFechaHora'],0,-9).' a las '.substr($viaje['salidaFechaHora'],11,-3).'hrs.</font></td>
                <td width="55"><font size="9"><b>Regreso: </b></font></td>
                <td width="256"><font size="9"> '.substr($viaje['regresoFechaHora'],0,-9).' a las '.substr($viaje['regresoFechaHora'],11,-3).'hrs.</font></td>
            </tr>
            ';

    if($viaje['puntos']){
        /*$html.='
            <tr>
                <td width="622"><font size="9"><br><b>Itinerario: </b></font></td>
            </tr>
        </table>
    </div>\'
    '.print_r($_POST['viaje'], TRUE);*/

        $salida = '<tr>
                <td width="622"><font size="9"><br><b>Itinerario: </b><br></font></td>
            </tr>
        <table><tr>
        <td width="63"><font size="9"><b>Fecha</b></font></td>
        <td width="55"><font size="9"><b>Hora</b></font></td>
        <td width="80"><font size="9"><b>Estado</b></font></td>
        <td width="80"><font size="9"><b>Delegación</b></font></td>
        <td width="40"><font size="9"><b>C.P.</b></font></td>
        <td width="70"><font size="9"><b>Colonia</b></font></td>
        <td width="70"><font size="9"><b>Calle</b></font></td>
        <td width="164"><font size="9"><b>Descripción</b></font></td>
        </tr>';

        foreach($viaje['puntos'] as $index => $value ) {

            $salida.=
                '<tr >'.
                '<td><font size="9">'.$value["fecha"].'</font></td>'.
                '<td><font size="9">'.substr($value["hora"],0,-3).'hrs.</font></td>'.
                '<td><font size="9">'.$value["estadoDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["delegacionMunicipioDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["codigoPostalDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["coloniaDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["calleNumeroDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["descripcionDireccion"].'</font></td>'.
                '</tr>';

                }


        $html.= $salida.'</table>';

    }
        $html.='
            <tr>
                <td width="622"><font size="11"><br></font></td>
            </tr>
            <tr>
                <td width="311"><font size="13"><b>Info. Cotizacion</b></font></td>
                <td width="311"><font size="9" style="text-align:right;"><b>ID Cotización: </b>'.$viaje['idCotizacion'].'</font></td>
            </tr>
            <tr>
                <td width="90"><font size="9"><b>Tipo de Unidad:</b></font></td>
                <td width="532"><font size="9">'.$viaje['tipoUnidad'].'</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"></font></td>
                <td width="256"><font size="9"></font></td>
                <td width="90"><font size="12"><b>Cotización: </b></font></td>
                <td width="221"><font size="11"> $'.$viaje['cotizacion'].' pesos</font></td>
            </tr>
        </table>             
    </div>';


    // Print text using writeHTMLCell()
        $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

    // ---------------------------------------------------------

    // Close and output PDF document
    // This method has several options, check the source code documentation for more information.
        $pdf->Output('example_001.pdf', 'I');

    //============================================================+
    // END OF FILE
    //============================================================+
    }
if ($action == "viaje"){

    // Include the main TCPDF library (search for installation path).
        require_once( __DIR__."/../Views/Reports/TCPDF-master/tcpdf.php");

    class MYPDF extends TCPDF {
        public function Header() {
            $headerData = $this->getHeaderData();
            $this->SetFont('helvetica', 'B', 10);
            $this->writeHTML($headerData['string']);
        }
    }



    $pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // create new PDF document
        $pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

    // set document information
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor(APPNAME);
        $pdf->SetTitle('Reporte de Viaje, ID: '.$viaje['idViaje']);
        $pdf->SetSubject('Reporte');
        $pdf->SetKeywords(APPNAME.', PDF, reporte, viaje');

    // set default header data
    $pdf->setHeaderData($ln='', $lw=0, $ht='', $hs='
                   <div>
                    <table cellspacing="0" cellpadding="1" style="border-bottom:1pt solid black;">
                        <tr>
                            <td width="100"><img src="../Views/Reports/TCPDF-master/examples/images/my_bus.jpg"/></td>
                            <td width=""><h3 style="text-align:right;">'.APPNAME.'</h3><span style="text-align:right;">Trabajo Terminal <br> ERP Para la gestión de operaciones de renta de transporte turistico.</span></td>
                        </tr>
                    </table>             
                  </div>', $tc=array(0,0,0), $lc=array(0,0,0));
    //$pdf->setHeaderData(PDF_HEADER_LOGO, 25, $ht='', $hs='<h2 style="text-align:right;">'.APPNAME.'</h2> Trabajo Terminal: ERP Para la gestión de operaciones de renta de transporte turistico. \n\n Reporte de Viaje, ID: ".$_POST[\'viaje\']["idViaje"]', $tc=array(0,0,0), $lc=array(0,0,0));
        //$pdf->SetHeaderData(PDF_HEADER_LOGO, 25, APPNAME, "Trabajo Terminal: ERP Para la gestión de operaciones de renta de transporte turistico. \n\n Reporte de Viaje, ID: ".$_POST['viaje']["idViaje"], array(0,0,0), array(0,0,0));
        $pdf->setFooterData(array(0,0,0), array(0,0,0));

    // set header and footer fonts
        $pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        $pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

    // set default monospaced font
        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

    // set margins
        $pdf->SetMargins(PDF_MARGIN_LEFT, 28, PDF_MARGIN_RIGHT);
        $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

    // set auto page breaks
        $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

    // set image scale factor
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

    // set some language-dependent strings (optional)
        if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
            require_once(dirname(__FILE__).'/lang/eng.php');
            $pdf->setLanguageArray($l);
        }

    // ---------------------------------------------------------

    // set default font subsetting mode
        $pdf->setFontSubsetting(true);

    // Set font
    // dejavusans is a UTF-8 Unicode font, if you only need to
    // print standard ASCII chars, you can use core fonts like
    // helvetica or times to reduce file size.
        $pdf->SetFont('helvetica', '', 12, '', true);

    // Add a page
    // This method has several options, check the source code documentation for more information.
        $pdf->AddPage();

    // set text shadow effect
        //$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));

    // Set some content to print
        $html = '
    <div>
        <table cellspacing="0" cellpadding="1">
            <tr>
                <td><font size="18"><b>Reporte de Viaje</b></font><br></td>
                <td><font size="8" style="text-align:right;">['.date("F j, Y").']</font></td>
            </tr>
            <tr>
                <td><font size="11"><b>Info. Cliente</b></font></td>
                <td><font size="9" style="text-align:right;"><b>ID Cliente: </b>'.$viaje['idCliente'].'</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"><b>Nombre: </b></font></td>
                <td width="567"><font size="9">'.$viaje['nombre'].' '.$viaje['apPaterno'].' '.$viaje['apMaterno'].'</font></td>
            </tr>
            <tr>
                <td width="90"><font size="9"><b>Teléfono móvil: </b></font></td>
                <td width="532"><font size="9">'.$viaje['telefonoMovil'].'</font></td>
            </tr>
            <tr>
                <td width="90"><font size="9"><b>Teléfono  local: </b></font></td>
                <td width="221"><font size="9"> '.$viaje['telefonoLocal'].'</font></td>
                <td width="55"><font size="9"><b>E-mail: </b></font></td>
                <td width="256"><font size="9"> '.$viaje['telefonoLocal'].'</font><br><br></td>
            </tr>
            <tr>
                <td width="311"><font size="11"><b>Info. Viaje</b></font></td>
                <td width="311"><font size="9" style="text-align:right;"><b>ID Viaje: </b>'.$viaje['idViaje'].'</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"><b>Destino: </b></font></td>
                <td width="567"><font size="9">'.$viaje['destinoEstado'].(($viaje['destinoLugar']!="")?(",".$viaje['destinoLugar']):"").'.</font></td>
            </tr>
            <tr>
                <td width="55"><font size="9"><b>Salida: </b></font></td>
                <td width="256"><font size="9"> '.substr($viaje['salidaFechaHora'],0,-9).' a las '.substr($viaje['salidaFechaHora'],11,-3).'hrs.</font></td>
                <td width="55"><font size="9"><b>Regreso: </b></font></td>
                <td width="256"><font size="9"> '.substr($viaje['regresoFechaHora'],0,-9).' a las '.substr($viaje['regresoFechaHora'],11,-3).'hrs.</font></td>
            </tr>
            ';

    if($viaje['puntos']){
        /*$html.='
            <tr>
                <td width="622"><font size="9"><br><b>Itinerario: </b></font></td>
            </tr>
        </table>
    </div>\'
    '.print_r($_POST['viaje'], TRUE);*/

        $salida = '<tr>
                <td width="622"><font size="9"><br><b>Itinerario: </b><br></font></td>
            </tr>
        <table><tr>
        <td width="63"><font size="9"><b>Fecha</b></font></td>
        <td width="55"><font size="9"><b>Hora</b></font></td>
        <td width="80"><font size="9"><b>Estado</b></font></td>
        <td width="80"><font size="9"><b>Delegación</b></font></td>
        <td width="40"><font size="9"><b>C.P.</b></font></td>
        <td width="70"><font size="9"><b>Colonia</b></font></td>
        <td width="70"><font size="9"><b>Calle</b></font></td>
        <td width="164"><font size="9"><b>Descripción</b></font></td>
        </tr>';

        foreach($viaje['puntos'] as $index => $value ) {

            $salida.=
                '<tr >'.
                '<td><font size="9">'.$value["fecha"].'</font></td>'.
                '<td><font size="9">'.substr($value["hora"],0,-3).'hrs.</font></td>'.
                '<td><font size="9">'.$value["estadoDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["delegacionMunicipioDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["codigoPostalDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["coloniaDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["calleNumeroDireccion"].'</font></td>'.
                '<td><font size="9">'.$value["descripcionDireccion"].'</font></td>'.
                '</tr>';

                }


        $html.= $salida.'</table>             
    </div>';



    }else{
        $html.='</table>
        </table>             
    </div>';
    }

    // Print text using writeHTMLCell()
        $pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);

    // ---------------------------------------------------------

    // Close and output PDF document
    // This method has several options, check the source code documentation for more information.
        $pdf->Output('example_001.pdf', 'I');

    //============================================================+
    // END OF FILE
    //============================================================+
    }
else{

    $salida = array();
    $salida["success"] = false;
    $salida["error"] = "Controlador desconocido.";

    echo json_encode($salida);
}


