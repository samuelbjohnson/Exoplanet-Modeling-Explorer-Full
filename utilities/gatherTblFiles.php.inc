<?php
require_once("rvParser.php.inc");

$directory = opendir("../data");
$fileCount = 0;
while(($file = readdir($directory)) !== false) {
	if (substr($file, strlen($file) - 3) == "tbl") {
		$fileCount ++;
		echo $fileCount;
		parseRvTblFile("../data/" . $file);
		echo "\n";
	}
	//echo $file . "\n";
}