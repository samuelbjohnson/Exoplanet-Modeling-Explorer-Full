
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
	
	<script type="text/javascript">
		var djConfig = {
			parseOnLoad: true,
			baseUrl: './'
		};
	</script>
	
	<script src="http://ajax.googleapis.com/ajax/libs/dojo/1.6/dojo/dojo.xd.js" type="text/javascript"></script>
	
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
		dojo.require("dojo.parser");
		dojo.require("dijit.Dialog");
		dojo.require("dijit.form.Button");
		//dojo.require("org.exoplanets.eme.js.science.Orbels");
		dojo.require("org.exoplanets.eme.js.science.Utils");
		
		dojo.addOnLoad(function() {
			var form, graph, starForm, formSet, userBox;
			form = new org.exoplanets.eme.js.RvForm(dojo.byId("rvDataForm"));
			starForm = new org.exoplanets.eme.js.StarForm(dojo.byId("starDataForm"));
			graph = new org.exoplanets.eme.js.RvGraph({graphNode: dojo.byId("rvCurvePlot"), rvForm: form, starForm: starForm});
			
			//formSet = new org.exoplanets.eme.js.RvFormSet(dojo.byId("rvFormSet"));
			
			if (dojo.byId("userManagementForm")) {
				/* User is logged in--set up buttons */
				(function() {
					var editButton, adminButton, logoutButton;
					
					editButton = new dijit.form.Button({
						label: "Edit Account",
						onClick: function() {
							location.replace("useredit.php");
						}
					}, "editAccountButton");
					
					logoutButton = new dijit.form.Button({
						label: "Log Out",
						onClick: function() {
							location.replace("process.php");
						}
					}, "logoutButton");
					
					if (dojo.byId("administerAccountButton")) {
						adminButton = new dijit.form.Button({
							label: "Admin Center",
							onClick: function() {
								location.replace("admin/admin.php");
							}
						}, "administerAccountButton");
					}	
				}());
			} else {
				/* User is not logged in--dialog must be rendered */
				(function() {
					var dialog, loginButton;
					
					dialog = dijit.byId("loginDialog");
					
					loginButton = new dijit.form.Button({
						label: "Log In",
						onClick: function() {
							dialog.show();
						}
					}, "openLoginDialogButton");
					
				}());
			}
			
		});
	</script>

</head>
<body class="tundra">
<!-- start header -->
<div id="header">
	<div id="logo">
		<a href="#">Exoplanet Modeling Explorer </a>	
	</div>
	
	<div id="accountInfo">
		<?
		if($session->logged_in){ ?>
			<form id="userManagementForm">
				Welcome <? echo $session->username ?>, you are logged in.
				<button id="editAccountButton" type="button"></button> <?
				if($session->isAdmin()){ ?>
					<button id="administerAccountButton" type="button"></button> <?
				} ?>
				<button id="logoutButton"></button> 
			</form> <?
		}
		else{
			?>
			<button id="openLoginDialogButton" type="button"></button>
			<div id="loginDialog" dojoType="dijit.Dialog" title="Login" style="display: none">
				<?
				
				if($form->num_errors > 0){
					echo "<font size=\"2\" color=\"#ff0000\">".$form->num_errors." error(s) found</font>";
				}
				?>
				<form action="process.php" method="POST">
					<span class="formRow">
						<label for="usernameField" class="leftSide">Username:</label>
						<input type="text" name="user" size="15" maxlength="30" value="<? echo $form->value("user"); ?>" id="usernameField" class="rightSide">
						<? echo $form->error("user"); ?>
					</span>
					<span class="formRow">
						<label for="passwordField" class="leftSide">Password:</label>
						<input type="password" name="pass" size="15" maxlength="30" value="<? echo $form->value("pass"); ?>" id="passwordField" class="rightSide">
						<? echo $form->error("pass"); ?>
					</span>
					<span class="formRow">
						<span class="leftSide">
							<input type="checkbox" name="remember" <? if($form->value("remember") != ""){ echo "checked"; } ?>>
							Remember me next time
						</span>
						<input type="hidden" name="sublogin" value="1">
						<input type="submit" value="Login" class="rightSide">
					</span>
					<span class="formRow">
						<span class="leftSide">
							<a href="forgotpass.php">Forgot your password?</a>
						</span>
					</span>
					<span class="formRow">
						<span class="leftSide">
							Not registered? <a href="register.php">Sign-Up!</a>
						</span>
					</span>
				</form>
			</div><!--end loginDialog-->
			<?
		}
		?>	
	</div>
</div>
<!-- end header -->

<div id="page">
	<!-- start content -->
	<div id="content">
		<div id="RV" class="RV">
			<div id="rvCurvePlot" class="rvCurvePlot">
			
			</div>
			<div class="rvTools">
				<div id="starDataForm" class="starDataForm">
			
				</div>
				<div id="rvDataForm" class="rvDataForm">
				
				</div>
			</div>
		</div>
	</div>
</div>
<!-- end page -->

<div id="footer">
	<div id="footer-bg">
	</div>
</div>
</body>
</html>
