<?php
header("Content-Type: text/xml");

$starName = $_GET['starName'];
//$starName = "HD 142";
require("../../utilities/dbSetup.php.inc");

$obsStatement = $rvDb -> prepare("select * from rv_observations where starName = ?");
$obsStatement -> bindParam(1, $starName);

if(! $obsStatement->execute()) {
	$errors = $dataStatement -> errorInfo();
	$errorString = "SQL Code: " . $errors[0] . "\nDriver Error Code: " . $errors[1] . "\nError: " . $errors[2];
	die("could not execute query: " . $errorString);
} else {
	echo "{\"star\":\"$starName\",";
	echo "\"observations\":[";
	while($observation = $obsStatement -> fetch(PDO::FETCH_NUM)) {
		$obsId = $observation[0];
		$starName = $observation[1];
		$references = $observation[2];
		$bibcodes = $observation[3];
		
		echo "{\"obsId\":$obsId, \"starName\":\"$starName\", \"references\":\"$references\", \"bibcodes\":\"$bibcodes\"},";
		
	}
	echo "]}";
}