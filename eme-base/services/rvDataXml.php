<?php
header("Content-Type: text/xml");

$obsId = $_GET['obsId'];
//$obsId = intval("1");
require("../../utilities/dbSetup.php.inc");

$starName = "";
$references = "";
$bibcodes = "";

$obsStatement = $rvDb -> prepare("select * from rv_observations where obsId = ?");
$obsStatement -> bindParam(1, $obsId);

if(! $obsStatement->execute()) {
	$errors = $dataStatement -> errorInfo();
	$errorString = "SQL Code: " . $errors[0] . "\nDriver Error Code: " . $errors[1] . "\nError: " . $errors[2];
	die("could not execute query: " . $errorString);
} else {
	$observation = $obsStatement -> fetch(PDO::FETCH_NUM);
	$starName = $observation[1];
	$references = $observation[2];
	$bibcodes = $observation[3];
}

$dataStatement = $rvDb->prepare("select obsDate, rv, rvUncertainty, accepted from rv_dataPoints1 where obsId=?");
$dataStatement->bindParam(1, $obsId, PDO::PARAM_INT);

if(! $dataStatement->execute()) {
	$errors = $dataStatement -> errorInfo();
	$errorString = "SQL Code: " . $errors[0] . "\nDriver Error Code: " . $errors[1] . "\nError: " . $errors[2];
	die("could not execute query: " . $errorString);
} else {
	$dom = new DOMDocument();
	$starElement = $dom->createElement("star");
	$starElement->setAttribute("name", $starName);
	$starElement->setAttribute("references", $references);
	$starElement->setAttribute("bibcodes", $bibcodes);
	$dom->appendChild($starElement);
	
	while($observation = $dataStatement->fetch(PDO::FETCH_NUM)) {
		$observationElement = $dom->createElement("observation");
		
		$timeElement = $dom->createElement("time");
		$timeElement->nodeValue = $observation[0];
		$observationElement -> appendChild($timeElement);

		$rvElement = $dom->createElement("rv");
		$rvElement->nodeValue = $observation[1];
		$observationElement -> appendChild($rvElement);
		
		$rvUnElement = $dom->createElement("rvUncertainty");
		$rvUnElement->nodeValue = $observation[2];
		$observationElement -> appendChild($rvUnElement);
		
		$acceptedElement = $dom->createElement("accepted");
		$acceptedElement->nodeValue = $observation[3];
		$observationElement -> appendChild($acceptedElement);
		
		$starElement -> appendChild($observationElement);
	}
	$xmlString = $dom->saveXML();
	echo $xmlString;
}

$dataStatement -> closeCursor();