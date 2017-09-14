<?php
// http://www.mustbebuilt.co.uk/php/insert-update-and-delete-with-pdo/
// https://phpdelusions.net/pdo
require_once('Server.php');
require_once('library.php');
class DataModel extends Server {
	private $conn = '';
	private $table = '';
	private $pk_col = '';
	private $metaData = array();
	private $fieldList = array();
	private $nullList = array();
	public $allowedOperations = array();
	public $status = false;
	public $errorMessage = '';
	function __construct($params = NULL) {
		try {
			$this->allowedOperations = array('fetch');
			if(isset($params['allowedOperations'])){
				$this->allowedOperations = $params['allowedOperations'];
			}
			if(!isset($params['baseTable'])){
				$this->status = -112;
				$this->errorMessage = 'A necessary setup value for this view is missing: baseTable. ';
				return $this;
			}
			$baseTable = $params['baseTable'];

			$params['ini_file'] = (isset($params['ini_file'])) ? $params['ini_file'] : NULL;
			$serv = New Server($params);
			$this->conn = $serv->connect();

			// Get table meta data to use later.
			$params['baseTable'] = $baseTable;
			$this->metadata = $this->pdoGetMetaData($params);
			$this->table = "`".str_replace("`","``",$baseTable)."`";

			if(!isset($this->pk_col)){
				$this->status = -112;
				$this->errorMessage = 'A necessary setup value for this view is missing: pk_col.';
				return $this;
			}
			if(!count($this->fieldList)){
				$this->status = -112;
				$this->errorMessage = 'A necessary setup value for this view is missing: field list.';
				return $this;
			}
		}
		catch(PDOException $e){
			$response['response'] = array(
				'status' => -111,
				'errorMessage' => parseArray($e)
				);
			return $response;
		}
	}
	function __destruct() {
		$this->conn = NULL;
		unset($this->conn);
	}
	public function pdoGetMetaData($args = NULL) {
		try{
 			$return = array();
 		 	$binding[":baseTable"] = $args['baseTable'];
			$sql = 'select COLUMN_NAME, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, COLUMN_KEY from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = :baseTable';
			$args['operationType'] = 'fetch';
			$args['validate_fields'] = false;
			$result = $this->pdoExecute($sql, $binding, $args['operationType']);
			$return = $result;
			$pri = '';
			$fieldList = array();
			$nullList = array();
			$curr_col = '';
			foreach($result as $row) {
				foreach($row as $col => $value) {
					// echo("\n /* row: |" . "$col:$value" . "| */ <br/>");
					if($col == 'COLUMN_NAME'){
						$curr_col = $value;
						$fieldList[] = $value;
					}
					if($col == 'COLUMN_KEY' && $value == 'PRI'){
						$pri = $curr_col;
					}
					if($col == 'IS_NULLABLE' && $value == 'PRI'){
						$nullList[] = $curr_col;
					}
				}
			}
			$this->fieldList = $fieldList;
			$this->pk_col = $pri;
			unset($result);
			$return['status'] = -110;
			$return['errorMessage'] = parseArray($this->fieldList);
		}
		catch(PDOException $e){
			echo(" /* PDOException */ \n");
			$return['status'] = -110;
			$return['errorMessage'] = parseArray($e);
			return $return;
		}
		return $return;
	}
	public function pdoFetch($args = NULL) {
		if(!array_keys($this->allowedOperations, $args['operationType'])){
			return array('status' => -4, 'errorMessage' => "This view does not allow {$args['operationType']} operations.");
		}
 		try{
 			$return = array();
			$pkID = (isset($args["{$this->pk_col}"])) ? intval($args["{$this->pk_col}"]) : NULL;
			$binding[":id"] = $pkID;
			$wheres = '';
			foreach ($args as $key => $value){
				if(in_array($key, $this->fieldList) || (isset($args['validate_fields']) && $args['validate_fields'] === false)){
					$wheres .= " and {$key} = :{$key} ";
					//$value = ($value == 'null') ? NULL : $value;
					$newValue = $value;
					if(!is_numeric($value)){
						$string = $this->conn->quote($value);
						$newValue = " {$string}, ";
					}
					$binding[":{$key}"] = $newValue;
				}
			}
			$sql = "select * from {$this->table} where {$this->pk_col} = coalesce(:id,{$this->pk_col}) $wheres;";
			if(isset($args['sql'])){
				$sql = $args['sql'];
			}
			$rows = $this->pdoExecute($sql, $binding, $args['operationType'], $pkID);
		}
		catch(PDOException $e){
			$return['status'] = -110;
			$return['errorMessage'] = parseArray($e);
			return $return;
		}
		return $rows;
	}
	public function pdoAdd($args = NULL) {
		$return = array();
		$setFields = array();
		$setValues = array();
		$fields = $args;
		if(!array_keys($this->allowedOperations, $args['operationType'])){
			return array('status' => -4, 'errorMessage' => "This view does not allow {$args['operationType']} operations.");
		}
		try{
			unset($fields['operationType']);
			foreach($fields as $key => $value){
				$setFields[] = "{$key}, ";
				$newValue = "{$value}, ";
				if(!is_numeric($value)){
					$string = $this->conn->quote($value);
					$newValue = "{$string}, ";
				}
				$setValues[] = $newValue;
			}
			$sql = "INSERT INTO {$this->table} (";
			$sql .= implode($setFields) . 'lastChangeDate) ';
			$sql .= 'VALUES (' . implode($setValues) . ' NOW());';
			$rows = $this->pdoExecute($sql, NULL, $args['operationType'], NULL);
		}
		catch(PDOException $e){
			$return['status'] = -110;
			$return['errorMessage'] = parseArray($e);
			return $return;
		}
		return $rows;
	}
	public function pdoUpdate($args = NULL) {
		$return = array();
		$setFields = array();
		$binding = array();
		if(!array_keys($this->allowedOperations, $args['operationType'])){
			return array('status' => -4, 'errorMessage' => "This view does not allow {$args['operationType']} operations.");
		}
		try{
			$pkID = (isset($args["{$this->pk_col}"])) ? intval($args["{$this->pk_col}"]) : 0;
			$fields = $args;
			unset($fields['operationType']);
			unset($fields["{$this->pk_col}"]);
			foreach ($fields as $key => $value){
				$setFields[] = "{$key} = :{$key}";
				//$nullList
				$value = ($value == 'null') ? NULL : $value;
				$binding[":{$key}"] = $value;
			}
			$sql = "UPDATE {$this->table} SET ".implode(', ', $setFields).", lastChangeDate = NOW() WHERE {$this->pk_col} = {$pkID}";
			$rows = $this->pdoExecute($sql, $binding, $args['operationType'], $pkID);
		}
		catch(PDOException $e){
			$return['status'] = -110;
			$return['errorMessage'] = parseArray($e);
			return $return;
		}
		return $rows;
	}
	public function pdoRemove($args = NULL) {
		$return = array();
		if(!array_keys($this->allowedOperations, $args['operationType'])){
			return array('status' => -4, 'errorMessage' => "This view does not allow {$args['operationType']} operations.");
		}
		try{
			$pkID = (isset($args["{$this->pk_col}"])) ? intval($args["{$this->pk_col}"]) : 0;
			$binding[":id"] = $pkID;
			$sql = "DELETE FROM {$this->table} WHERE {$this->pk_col} = :id";
			$rows = $this->pdoExecute($sql, $binding, $args['operationType'], $pkID);
		}
		catch(PDOException $e){
			$return['status'] = -110;
			$return['errorMessage'] = parseArray($e);
			return $return;
		}
		return $rows;
	}
	public function pdoProc($args = NULL) {
		$return = array();
		if(!array_keys($this->allowedOperations, $args['operationType'])){
			return array('status' => -4, 'errorMessage' => "This view does not allow {$args['operationType']} operations.");
		}
		try{
			$proc = $args['procedure'];
			$stmt = $this->conn->query("CALL {$proc}");
			$return = $stmt->fetchAll();
		}
		catch(PDOException $e){
			$return['status'] = -110;
			$return['errorMessage'] = parseArray($e);
			return $return;
		}
		return $return;
	}
	function pdoExecute($sql, $binding, $operationType, $pkID = NULL){
		$return = NULL;
		// echo("/* " . 'pdoExecute' . " */ \n");
		// echo("\n /* " . $sql . " */ \n");
		try{
			$stmt = $this->conn->prepare($sql);
			if(!$stmt){
				$return['status'] = $stmt->errorCode();
				$return['errorMessage'] = $stmt->errorInfo() . $sql;
				return $return;
			}
			$stmt->execute($binding);
			if(!$stmt){
				$return['status'] = $stmt->errorCode();
				$return['errorMessage'] = $stmt->errorInfo();
				return $return;
			}
			switch($operationType){
				case 'fetch':
					$result = $stmt->fetchAll();
					$rows = array();
					foreach($result as $row) {
						$line = array();
						foreach($row as $key => $value) {
							$line[$key] = $value;
						}
						$rows[] = $line;
					}
					unset($result);
					$return = $rows;
					break;
				case 'add':
					$pkID = $this->conn->lastInsertId();
					$fetchArgs["{$this->pk_col}"] = $pkID;
					$fetchArgs['operationType'] = 'fetch';
					$return = $this->pdoFetch($fetchArgs);
					break;
				case 'update':
					$fetchArgs["{$this->pk_col}"] = $pkID;
					$fetchArgs['operationType'] = 'fetch';
					$fetchArgs['retOT'] = $operationType;
					$return = $this->pdoFetch($fetchArgs);
					break;
				case 'remove':
					$return = $stmt->rowCount();
					if($return > 0){
						$fetchArgs["{$this->pk_col}"] = $pkID;
						$fetchArgs['operationType'] = 'fetch';
						$return = $this->pdoFetch($fetchArgs);
					}
					break;
				default:
					echo("/* " . "pdoExecute:default Unexpected operation type: $operationType" . " */ \n");
				break;
			}
			if($stmt){
				$stmt->closeCursor();
				$stmt = NULL;
				unset($stmt);
			}
		}
		catch(PDOException $e){
			echo("/* return: " . "pdoExecute:PDOException" . " */ \n");
			echo("/* sql: " . $sql . " */ \n");
			echo("/* parseArray: " . parseArray($binding) . " */ \n");
			$return['status'] = -110;
			$return['errorMessage'] = parseArray($e);
			return $return;
		}
		return $return;
	}
}
?>
