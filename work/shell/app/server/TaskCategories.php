<?php
require_once('../../../DataModel/DataModel.php');
$params = array(
	'baseTable' => 'taskCategories',
	'pk_col' => 'categoryID',
	'allowedOperations' => array('fetch','add','update','remove'),
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
	if(isset($argsIN['categoryID'])) {
		$categoryID = ($argsIN['categoryID'] > 0) ? $argsIN['categoryID'] : NULL;
	}else{
		$categoryID = 'NULL';
	}
	if(isset($argsIN['status'])) {
		$status = ($argsIN['status'] > 0) ? $argsIN['status'] : NULL;
	}else{
		$status = 'NULL';
	}
	$argsIN['sql'] = "SELECT C.* FROM taskCategories C WHERE C.categoryID = coalesce(:id,C.categoryID) and C.status = coalesce($status,C.status) order by C.displayOrder, C.CategoryName";
	// echo '/*' . $argsIN['sql'] . '*/';
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
default:
	$response = array('status' => 0);
	break;
}
echo json_encode($response);
?>
