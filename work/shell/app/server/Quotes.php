<?php
require_once('../../../DataModel/DataModel.php');
$params = array(
	'baseTable' => 'quotes',
	'pk_col' => 'quoteID',
	'allowedOperations' => array('fetch','add','update','remove','custom'),
	'ini_file' => realpath('../../lib/server.ini')
);
$lclass = New DataModel();
$lclass->init($params);
if($lclass->status != 0){
	$response = array('status' => $lclass->status, 'errorMessage' => $lclass->errorMessage);
	echo json_encode($response);
	exit;
}
$argsIN = array_merge($_POST,$_GET);
$operationType = (isset($argsIN['operationType'])) ? $argsIN['operationType'] : null;
switch($operationType){
case 'fetch':
	$response = $lclass->pdoFetch($argsIN);
	break;
case 'add':
	$response = $lclass->pdoAdd($argsIN);
	break;
case 'update':
	$response = $lclass->pdoUpdate($argsIN);
	break;
case 'remove':
	$response = $lclass->pdoRemove($argsIN);
	break;
case 'custom':
	$argsIN['pkID'] = 1;
	$argsIN['sql'] = "SELECT CONCAT(quote, ' &ndash; ', attribution) AS quote FROM quotes ORDER BY RAND() LIMIT 0,1;";
	$response = $lclass->pdoFetch($argsIN);
	break;
default:
	$response = array('status' => 0);
	break;
}
echo json_encode($response);
?>
