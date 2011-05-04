
 <?

include("include/session.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Exoplanet Modeling Exporer</title>
<meta name="keywords" content="" />
<meta name="Premium Series" content="" />
<link href="eme.css" rel="stylesheet" type="text/css" media="screen" />

	<link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/dojo/1.6/dojo/resources/dojo.css" />
   <link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/dojo/1.6/dijit/themes/tundra/tundra.css" />
   <link rel="stylesheet" type="text/css" href="js/rvStyles.css" />
	
	<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.6/dojo/dojo.xd.js" djConfig="baseUrl:'./'" type="text/javascript"></script>
	
	<script type="text/javascript">
		dojo.registerModulePath("org.exoplanets.eme.js", "./js");
		dojo.registerModulePath("org.exoplanets.eme.js.science", "./js/science");
		
	</script>
	
	<script src="./js/RvForm.js" type="text/javascript"></script>
	<script src="./js/RvGraph.js" type="text/javascript"></script>
	<script src="./js/StarForm.js" type="text/javascript"></script>
	<script src="./js/RvParameter.js" type="text/javascript"></script>
	<script src="./js/science/Orbels.js" type="text/javascript"></script>
	<script src="./js/RvFormSet.js" type="text/javascript"></script>
	
	<script type="text/javascript">
		
		//dojo.require("org.exoplanets.eme.js.science.Orbels");
		dojo.require("org.exoplanets.eme.js.science.Utils");
		
		dojo.addOnLoad(function() {
			var form, graph, starForm, formSet;
			form = new org.exoplanets.eme.js.RvForm(dojo.byId("rvDataForm"));
			starForm = new org.exoplanets.eme.js.StarForm(dojo.byId("starDataForm"));
			graph = new org.exoplanets.eme.js.RvGraph({graphNode: dojo.byId("rvCurvePlot"), rvForm: form, starForm: starForm});
			
			formSet = new org.exoplanets.eme.js.RvFormSet(dojo.byId("rvFormSet"));
			
		});
	</script>

</head>
<body class="tundra" style="padding-top: -8px;">
<!-- start header -->
<div id="header">
	<div id="logo">
		<a href="#">Exoplanet Modeling Explorer </a>
		
	</div>

</div>

<!-- end header -->

	<div id="page">
	<div id="page-bg">
		<div id="sidebar1" class="sidebar">

<?

if($session->logged_in){
   echo "<h1>Logged In</h1>";
   echo "Welcome <b>$session->username</b>, you are logged in. <br><br>"
       ."[<a href=\"tool.php\">Enter</a>] &nbsp;&nbsp;"
       ."[<a href=\"useredit.php\">Edit Account</a>] &nbsp;&nbsp;";
   if($session->isAdmin()){
      echo "[<a href=\"admin/admin.php\">Admin Center</a>] &nbsp;&nbsp;";
   }
   echo "[<a href=\"process.php\">Logout</a>]";
}
else{
?>

<div class="loginHeader">Login</div>
<?

if($form->num_errors > 0){
   echo "<font size=\"2\" color=\"#ff0000\">".$form->num_errors." error(s) found</font>";
}
?>
<form action="process.php" method="POST">
	<label for="usernameField">Username:</label>
	<input type="text" name="user" size="15" maxlength="30" value="<? echo $form->value("user"); ?>" id="usernameField">
	<? echo $form->error("user"); ?><br />
	<label for="passwordField">Password:</label>
	<input type="password" name="pass" size="15" maxlength="30" value="<? echo $form->value("pass"); ?>" id="passwordField">
	<? echo $form->error("pass"); ?><br />
	<input type="checkbox" name="remember" <? if($form->value("remember") != ""){ echo "checked"; } ?>>
	<font size="2">Remember me next time &nbsp;&nbsp;&nbsp;&nbsp;
	<input type="hidden" name="sublogin" value="1">
	<input type="submit" value="Login">
	<br />
	<font size="2">[<a href="forgotpass.php">Forgot Password?</a>]</font><br />
	Not registered? <a href="register.php">Sign-Up!</a>
</form>

<?
}

?>



		</div>
		<!-- start content -->
		<div id="content">
			<div id="RV">
				<div id="rvCurvePlot">
				
				</div>
				<div class="rvTools">
					<div id="rvFormSet">
					
					</div>
					<form id="rvDataForm" onSubmit="function() {return false;}"
					
					</form>
					<div id="starDataForm">
				
					</div>
				</div>
			</div>
		</div>

		<div style="clear: both;">&nbsp;</div>
	</div
	<!-- end page -->
</div>
</div>

<div id="footer">
	<div id="footer-bg">
	</div>
</div>
</body>
</html>
