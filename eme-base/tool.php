<?

include("include/session.php");
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Exoplanet Modeling Exporer</title>
<meta name="keywords" content="" />
<meta name="Premium Series" content="" />
<link href="default.css" rel="stylesheet" type="text/css" media="screen" />
</head>
<body>
<!-- start header -->
<div id="header">
	<div id="logo">
		<h1><a href="#">Exoplanet Modeling Explorer </a></h1>
		
	</div>

</div>
<!-- end header -->

	<div id="page">
	<div id="page-bg">
		<div id="sidebar1" class="sidebar">
			<ul>
				<li>
					<h2><?
						echo "Logged in as <b>$session->username</b><br><br>";
						echo "[<a href=\"process.php\">Logout</a>]";
						?></h2>
					<ul>
						
					</ul>
					
				</li>
				
			</ul>
		</div>
		<!-- start content -->
		<div id="content">
			<h1>tool goes here</h1>
		</div>

		<div style="clear: both;">&nbsp;</div>
	</div
	<!-- end page -->
</div>
</div>

<div id="footer">
<div id="footer-bg">
	<p class="copyright">&copy;&nbsp;&nbsp;2009 All Rights Reserved &nbsp;&bull;&nbsp; Design by <a href="http://www.freecsstemplates.org/">Free CSS Templates</a>.</p>
	<p class="link"><a href="#">Privacy Policy</a>&nbsp;&#8226;&nbsp;<a href="#">Terms of Use</a></p>
</div>
</div>
</body>
</html>
