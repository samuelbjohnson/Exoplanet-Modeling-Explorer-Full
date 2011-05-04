
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


				</li>
				
			</ul>
		</div>
		<!-- start content -->
		<div id="content">
							
<?
/**
 * Forgot Password form has been submitted and no errors
 * were found with the form (the username is in the database)
 */
if(isset($_SESSION['forgotpass'])){
   /**
    * New password was generated for user and sent to user's
    * email address.
    */
   if($_SESSION['forgotpass']){
      echo "<h1>New Password Generated</h1>";
      echo "<p>Your new password has been generated "
          ."and sent to the email <br>associated with your account. "
          ."<a href=\"main.php\">Main</a>.</p>";
   }
   /**
    * Email could not be sent, therefore password was not
    * edited in the database.
    */
   else{
      echo "<h1>New Password Failure</h1>";
      echo "<p>There was an error sending you the "
          ."email with the new password,<br> so your password has not been changed. "
          ."<a href=\"main.php\">Main</a>.</p>";
   }
       
   unset($_SESSION['forgotpass']);
}
else{

/**
 * Forgot password form is displayed, if error found
 * it is displayed.
 */
?>

<h1>Forgot Password</h1>
A new password will be generated for you and sent to the email address<br>
associated with your account, all you have to do is enter your
username.<br><br>
<? echo $form->error("user"); ?>
<form action="process.php" method="POST">
<b>Username:</b> <input type="text" name="user" maxlength="30" value="<? echo $form->value("user"); ?>">
<input type="hidden" name="subforgot" value="1">
<input type="submit" value="Get New Password">
</form>

	<?
	}
	?>
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
