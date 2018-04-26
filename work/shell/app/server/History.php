<?php
require_once('../../../DataModel/DataModel.php');
$params = array(
	'baseTable' => 'tasks',
	'pk_col' => 'taskID',
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
	if(isset($argsIN['userID'])) {
		$userID = ($argsIN['userID'] > 0) ? $argsIN['userID'] : NULL;
	}else{
		$userID = 'NULL';
	}
	if(isset($argsIN['taskDate'])) {
		$taskDate = $argsIN['taskDate'];
	}else{
		$taskDate = 'NULL';
	}
	$argsIN['sql'] = "
	select * from tasks t where
		t.taskID = coalesce(:id, t.taskID)
		and t.userID = coalesce($userID, t.userID)
		and t.taskDate = coalesce('$taskDate', t.taskDate);";
	$response = $lclass->pdoFetch($argsIN);
	break;
case 'add':
	if(!isset($argsIN['taskDate'])){
		$argsIN['taskDate'] = date_create()->format('Y-m-d');
	}
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
