<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

	<link rel="stylesheet" type="text/css" href="../css/main.css">
	<link href='https://fonts.googleapis.com/css?family=Poiret+One' rel='stylesheet' type='text/css'>
	<title>OCU - Applications</title>
</head>
<body>

	<div class="container-fluid">
		<div class="row background-black white">
			
			<div class="col-md-1 col-sm-1 col-xs-2 text-right vcenter">
				<div class="btn-group">
				  <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
				    <span class="icon-bar"></span>
				    <span class="icon-bar"></span>
				    <span class="icon-bar"></span>
				  </button>
				  <ul class="dropdown-menu" role="menu">
				    <li><a href="../index.html">Home</a></li>
				    <li class="divider"></li>
				    <li><a href="../index.html#personal">Personal</a></li>
				    <li class="divider"></li>
				    <li><a href="../index.html#professional">Professional</a></li>
				    <li><a href="../curriculumvitae.html">Curriculum Vitae repository</a></li>
				    <li class="divider"></li>
				    <li><a href="../index.html#contact">Contact</a></li>
				    <li class="divider"></li>
				    <li><a href="index.php">Applications</a></li>
				  </ul>
				</div>
			</div>

			<div class="col-md-11 col-xs-10 col-md-offset-0 col-sm-offset-0 col-xs-offset-0">
				<h1 class="font-poriet-one fontBigHead">Oscar Camacho Urriolagoitia</h1>
			</div>
		</div>
	</div>

	<div class="container-fluid">
		<div class="row">
			<div class="col-md-offset-1 col-sm-offset-1 col-md-5 col-sm-10 col-xs-12 font-poriet-one">
				<h2>Applications:</h2>
				<ul class="listClean">

					<?php
                    $dirlist = getFileList("./");
                    foreach ($dirlist as $file) {
                        if (preg_match("/^.\/index*/", $file['name']) || preg_match("/^.\/error*/", $file['name']))
                            continue;
                        echo '<li style="text-align: left;" >' . '<a href=' . $file['name'] . ' target="blank">' . $file['name'] . '</a></li>';
                        //echo $file['type'] . "<br>";
                        //echo $file['size'] . "<br>";
                        //echo date('r', $file['lastmod']) . "<br><br>";
                    }
                    ?>

				</ul>
			</div>
		</div>
	</div>

	<footer class="footer font-poriet-one">
		<div class="container-fluid">
			<div class="row background-black white footerIn">
				<div class="">
					<h6 class="applications2 text-muted">Last Update, November 3, 2015.</h6>
					<h6 class="applications">
						<a href="index.php">Applications</a>
					</h6>
				</div>
			</div>
		</div>
	</footer>

	<!-- Bootstrap core JavaScript================================= -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
 	 <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>

</body>
</html>

<?PHP

// Original PHP code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.

function getFileList($dir) {
    // array to hold return value
    $retval = array();

    // add trailing slash if missing
    if (substr($dir, -1) != "/")
        $dir .= "/";

    // open pointer to directory and read list of files
    $d = @dir($dir) or die("getFileList: Failed opening directory $dir for reading");
    while (false !== ($entry = $d->read())) {
        // skip hidden files
        if ($entry[0] == ".")
            continue;
        if (is_dir("$dir$entry")) {
            $retval[] = array(
                "name" => "$dir$entry/",
                "type" => filetype("$dir$entry"),
                "size" => 0,
                "lastmod" => filemtime("$dir$entry")
            );
        } elseif (is_readable("$dir$entry")) {
            $retval[] = array(
                "name" => "$dir$entry"
            );
        }
    }
    $d->close();

    return $retval;
}
?>