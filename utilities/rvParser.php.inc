<?php
function parseRvTblFile(/*string*/$fileName) {
	
	require("dbSetup.php.inc");
	
	$fileHandle = fopen($fileName, "r");
	
	if(!$fileHandle) {
		echo "no file";
	} else {
		$inData = false;
		$starName = "";
		$rvUnits = "";
		$references = "";
		$bibcodes = "";
		$obsId = "";
		$obsCount = 0;
		$obsTotal = 0;
		while (!feof($fileHandle)) {
			$line = fgets($fileHandle);
			if($inData && $obsCount < $obsTotal) {
				$obsCount ++;
				
				$observationDate = 0.0 + trim(strtok($line, " "));
				$radialVelocity = 0.0 + trim(strtok(" "));
				$rvUncertainty = 0.0 + trim(strtok(" "));
				$accepted = 0 + trim(strtok(" "));
				
				if($rvUnits == "km/s" || $rvUnits !== "m/s") {
					$radialVelocity = 1000 * $radialVelocity;
				}
				
				$queryStatement = $rvDb -> prepare( "INSERT INTO rv_dataPoints1 (obsId, obsDate, rv, rvUncertainty, accepted) " .
					"VALUES(?, ?, ?, ?, ?)");
				
				$queryStatement -> bindParam(1, $obsId);
				$queryStatement -> bindParam(2, $observationDate);
				$queryStatement -> bindParam(3, $radialVelocity);
				$queryStatement -> bindParam(4, $rvUncertainty);
				$queryStatement -> bindParam(5, $accepted);
				
				if(! $queryStatement -> execute() ) {
					$errors = $queryStatement -> errorInfo();
					$errorString = "SQL Code: " . $errors[0] . "\nDriver Error Code: " . $errors[1] . "\nError: " . $errors[2];
					echo "Error: " . $errorString;
				}
				
				
				$queryStatement -> closeCursor();
				
					
			} else if (substr($line, 1, 8) == "STAR_ID ") {
				$starName = trim(substr($line, strpos($line, "=") + 2));
				$starName = substr($starName, 1, strlen($starName) - 2);
				
			} else if (substr($line, 1, 12) == "Y_AXIS_UNITS") {
				$rvUnits = trim(substr($line, strpos($line, "=") + 2));
				$rvUnits = substr($rvUnits, 1, strlen($rvUnits) - 2);
				
			} else if (preg_match('/\|(\s)*days/', $line)) {
				$inData = true;
			} else if(substr($line, 1, 17) == "NUMBER_OF_POINTS ") {
				$obsTotal = trim(substr($line, strpos($line, "=") + 2));
				$obsTotal = substr($obsTotal, 1, strlen($obsTotal) - 2);
				
			} else if (substr($line, 1, 11) == "REFERENCES ") {
				$references = trim(substr($line, strpos($line, "=") + 2));
				$references = substr($references, 1, strlen($references) - 2);
			} else if (substr($line, 1, 9) == "BIBCODES ") {
				$bibcodes = trim(substr($line, strpos($line, "=") + 2));
				$bibcodes = substr($bibcodes, 1, strlen($bibcodes) - 2);
				$query = $rvDb -> prepare("INSERT INTO rv_observations1 (starName, reference, bibcodes) VALUES(?, ?, ?)");
				$query -> bindParam(1, $starName);
				$query -> bindParam(2, $references);
				$query -> bindParam(3, $bibcodes);
				$query -> execute();
				$obsId = $rvDb -> lastInsertId();
				if ($obsId == "0") {
					$obsQuery = $rvDb -> prepare("SELECT obsId FROM rv_observations1 WHERE starName=? AND reference=? AND bibcodes=?");
					$obsQuery -> bindParam(1, $starName);
					$obsQuery -> bindParam(2, $references);
					$obsQuery -> bindParam(3, $bibcodes);
					$obsQuery -> execute();
					$obsRow = $obsQuery -> fetch();
					$obsId = $obsRow['obsId'];
					$obsQuery -> closeCursor();
				}
				echo "obsId: " . $obsId;
			}
		}		
	}
	
	//require("dbTakedown.php.inc");
}