<?php
$title = 'Task Report';
?>
<!DOCTYPE html>
<html>
<body>
<head>
	<title><?php echo $title; ?></title>
	<link rel="stylesheet" type="text/css"href="reports.css">
</head>
<span class="title"><?php echo $title; ?></span>
<?php
function prettyColumn($baseName){
	$base = $baseName;
	$fmt = '';
	for($x=0;$x<strlen($base);$x++){
		if(ctype_upper(substr($base,$x,1))){
			if(!ctype_upper(substr($base,$x-1,1))){
				$fmt .= ' ';
			}
		}
		$fmt .= substr($base,$x,1);
	}
	return ucfirst($fmt);
}

try {
	$server_array  = parse_ini_file('../lib/server.ini',true);
	$dbhost = $server_array['database']['hostname'];
	$dbuser = $server_array['database']['username'];
	$dbpass = $server_array['database']['password'];
	$schema = $server_array['database']['dbname'];
	try {
		$sql = '
		select
			P.projectName,
			P.projectCode,
			C.taskType,
			sum(T.duration) as Hours
		from tasks T
			inner join taskProjects P on T.projectID = P.projectID
			inner join taskTypes C on T.taskCategoryID = C.taskTypeID
		where
			userID = :userid
		group by
			P.projectName,
			P.projectCode,
			C.taskType
		order by
			P.projectName,
			P.projectCode,
			C.taskType
		;';
		$bind['userid'] = 1;
		// $bind['taskStart'] = date_create()->format('Y-m-d');
		// 	and taskDate > :taskStart
		// array('id' => $id)
		$opt = [
			PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES   => false
		];
		$conn = new PDO("mysql:host={$dbhost};dbname={$schema}", $dbuser, $dbpass, $opt);
		$stmt = $conn->prepare($sql);
		$stmt->execute($bind);
		$loop = 0;
		echo "<table class='odd'>" . PHP_EOL;
		while($row = $stmt->fetch()) {
			if($loop === 0){
				echo "\t<tr>" . PHP_EOL;
				foreach($row as $col => $val){
					echo "\t\t<th>" . prettyColumn($col) . "</th>" . PHP_EOL;
				}
				echo "\t</tr>" . PHP_EOL;
			}
			echo "\t<tr>" . PHP_EOL;
			foreach($row as $col => $val){
				echo "\t\t<td>" . $val . "</td>" . PHP_EOL;
			}
			echo "\t</tr>" . PHP_EOL;
			$loop++;
		}
		echo "</table>" . PHP_EOL;
		echo "<span class='label'>{$loop}</span>" . PHP_EOL;
	} catch(PDOException $e) {
		echo 'ERROR: ' . $e->getMessage();
	}

	// echo "<table class='odd'>" . PHP_EOL;
	// echo "\t<tr>" . PHP_EOL;
	// foreach ($finfo as $val) {
	// 	$base = $val->name;
	// 	$fmt = '';
	// 	for($x=0;$x<strlen($base);$x++){
	// 		if(ctype_upper(substr($base,$x,1))){
	// 			if(!ctype_upper(substr($base,$x-1,1))){
	// 				$fmt .= ' ';
	// 			}
	// 		}
	// 		$fmt .= substr($base,$x,1);
	// 	}
	// 	echo "\t\t<th>" . ucfirst($fmt) . "</th>" . PHP_EOL;
	// }
	// echo "\t<tr>" . PHP_EOL;
	// $loop=0;
	// while ($row = $result->fetch_object()) {
	// 	$style = ($loop % 2 == 0) ? 'even' : 'odd';
	// 	echo "\t<tr class='$style'>" . PHP_EOL;
	// 	foreach($row as $field){
	// 		echo "\t\t<td>" . $field . "</td>" . PHP_EOL;
	// 	}
	// 	echo "\t</tr>" . PHP_EOL;
	// 	$loop++;
	// }
	// echo "</table>" . PHP_EOL;
	// echo "<span class='label'>$loop</span>" . PHP_EOL;
	// $result->free();
	// $mysqli->close();

} catch (Exception $e) {
	echo "Caught exception: ",  $e->getMessage(), "\n";
}
?>
</body>
</html>
