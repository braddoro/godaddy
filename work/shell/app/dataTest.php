<?php
require_once('../../DataModel/DataModel.php');
//require_once('../../DataModel/library.php');
$params = array(
	'baseTable' => 'quotes',
	'pk_col' => 'quoteID',
	'ini_file' => realpath('../lib/server.ini')
);
$lclass = New DataModel();
$lclass->init($params);
$argsIN['operationType'] = 'fetch';
//$argsIN['quoteID'] = 5;
$argsIN['sql'] = 'SELECT quoteID, quote FROM quotes ORDER BY RAND() LIMIT 0,1;';
$response = $lclass->pdoFetch($argsIN);
var_dump($response);
//$html = implode(",", $response);
//echo $html;
?>
