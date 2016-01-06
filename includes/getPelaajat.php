<?php


$user = "";
$query = 'SELECT username FROM users';

if(isset($_GET['user'])){
    $clean['user'] = strip_tags($_GET['user']);
    $query = $query . " WHERE username LIKE ?";
    $user = $clean['user'] . "%";
    
}


include ("connect.php");

$sql = $db->prepare($query);
if($user !== ""){
$sql->bindParam(1, $user, PDO::PARAM_STR);
}
$ok = $sql->execute();

if($sql->rowCount() > 0){
    $result = $sql->fetchAll();
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}



?>
