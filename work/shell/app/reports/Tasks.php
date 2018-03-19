<!DOCTYPE html>
<html>
<body>
<head>
<title>Tasks</title>
<link rel="stylesheet" type"text/css" href="reports.css">
</head>
<body>
<?php
function get_string_between($string, $start, $end){
    $string = " ".$string;
     $ini = strpos($string,$start);
     if ($ini == 0) return "";
     $ini += strlen($start);
     $len = strpos($string,$end,$ini) - $ini;
     return substr($string,$ini,$len);
}

$html = '';
require_once('Reporter.php');
$argsIN = array_merge($_POST,$_GET);

if(isset($argsIN['u'])){
	$userid = intval($argsIN['u']);
}

if(isset($argsIN['s'])){
	$tmp = explode('-', $argsIN['s']);
	$startdate = (checkdate($tmp[1], $tmp[2], $tmp[0])) ? $argsIN['s'] : null;
}

if(isset($argsIN['e'])){
	$tmp = explode('-', $argsIN['e']);
	$enddate = (checkdate($tmp[1], $tmp[2], $tmp[0])) ? $argsIN['e'] : null;
}
$params['bind'] = array('userid' => $userid, 'startdate' => $startdate, 'enddate' => $enddate);
$params['ini_file'] = '../../lib/server.ini';
$lclass = New Reporter();

$params['title'] = 'Total';
$params['tooltip'] = 'Total';
$params['sql'] = '
	select
		sum(T.duration) Hours
	from tasks T
		inner join taskProjects P on T.projectID = P.projectID
		inner join taskCategories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	;';
$html .= $lclass->init($params);

$total = get_string_between($html,'<td>','</td>');

$lclass = New Reporter();
$params['title'] = 'Tasks by Project';
$params['sql'] = '
		select
			P.projectCode,
			P.projectName,
			sum(T.duration) as Hours,
			round(round(sum(T.duration)/ ' . $total . ',3)*100,1) Percent
		from tasks T
			inner join taskProjects P on T.projectID = P.projectID
		where
			userID = :userid
			and T.taskDate between :startdate and :enddate
		group by
			P.projectCode,
			P.projectName
		order by
			P.projectCode,
			P.projectName;
	';
$html .= $lclass->init($params);

$lclass = New Reporter();
$params['title'] = 'Tasks by Category';
$params['sql'] = '
	select
		C.categoryName,
		sum(T.duration) as Hours,
		round(round(sum(T.duration)/ ' . $total . ',3)*100,1) Percent
	from tasks T
		inner join taskCategories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	group by
		C.categoryName
	order by
		C.categoryName;
	';
$html .= $lclass->init($params);

$lclass = New Reporter();
$params['title'] = 'Administration Work Breakdown';
$params['sql'] = '
	select
		P.projectCode,
		P.projectName,
		coalesce(T.ticketCode,T.description) as ticketCode,
		sum(T.duration) as Hours,
		round(round(sum(T.duration)/ ' . $total . ',3)*100,1) Percent
	from tasks T
		inner join taskProjects P on T.projectID = P.projectID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
		and P.projectCode like (\'0000-%\')
	group by
		P.projectCode,
		P.projectName,
		coalesce(T.ticketCode,T.description)
	order by
		P.projectCode,
		P.projectName,
		coalesce(T.ticketCode,T.description)
	;';
$html .= $lclass->init($params);

$lclass = New Reporter();
$params['title'] = 'Administration Summary';
$params['sql'] = '
	select
		P.projectCode,
		P.projectName,
		sum(T.duration) as Hours,
		round(round(sum(T.duration)/ ' . $total . ',3)*100,1) Percent
	from tasks T
		inner join taskProjects P on T.projectID = P.projectID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
		and P.projectCode like (\'0000-%\')
	group by
		P.projectCode,
		P.projectName
	order by
		P.projectCode,
		P.projectName
	;';
$html .= $lclass->init($params);

$lclass = New Reporter();
$params['title'] = 'Project Summary';
$params['sql'] = '
	select
		P.projectCode,
		P.projectName,
		sum(T.duration) as Hours,
		round(round(sum(T.duration)/ ' . $total . ',3)*100,1) Percent
	from tasks T
		inner join taskProjects P on T.projectID = P.projectID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
		and P.projectCode not like (\'0000-%\')
	group by
		P.projectCode,
		P.projectName
	order by
		P.projectCode,
		P.projectName
	;';
$html .= $lclass->init($params);


$lclass = New Reporter();
$params['title'] = 'Tasks by Category and Project';
$params['sql'] = '
	select
		C.categoryName,
		P.projectCode,
		P.projectName,
		sum(T.duration) as Hours,
		round(round(sum(T.duration)/ ' . $total . ',3)*100,1) Percent
	from tasks T
		inner join taskProjects P on T.projectID = P.projectID
		inner join taskCategories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	group by
		C.categoryName,
		P.projectCode,
		P.projectName
	order by
		C.categoryName,
		P.projectCode,
		P.projectName;
	';
$html .= $lclass->init($params);

$params['title'] = 'Tasks by Project and Category';
$params['sql'] = '
	select
		P.projectCode,
		P.projectName,
		C.categoryName,
		sum(T.duration) Hours,
		round(round(sum(T.duration)/ ' . $total . ',3)*100,1) Percent
	from tasks T
		inner join taskProjects P on T.projectID = P.projectID
		inner join taskCategories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	group by
		P.projectCode,
		P.projectName,
		C.categoryName
	order by
		P.projectCode,
		P.projectName,
		C.categoryName
	;';
$html .= $lclass->init($params);

$lclass = New Reporter();
$params['title'] = 'Tasks Detail';
$params['sql'] = '
	select
		T.taskDate,
		C.categoryName,
		T.duration,
		P.projectCode,
		P.projectName,
		T.ticketCode,
		T.description,
		T.lastChangeDate
	from tasks T
		inner join taskProjects P on T.projectID = P.projectID
		inner join taskCategories C on T.taskCategoryID = C.categoryID
	where
		userID = :userid
		and T.taskDate between :startdate and :enddate
	order by
		T.taskDate;
	';
$html .= $lclass->init($params);

echo $html;
?>
</body>
</html>
