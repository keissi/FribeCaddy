<?php
try{
    global $db;
	$db = new PDO('mysql:host=localhost;dbname=valtteli', "root", "r00t");
	$db->exec("set names utf8");
}
catch (PDOException $e) { 
	die ("Virhe: ".$e->getMessage() ) ;
}



?>