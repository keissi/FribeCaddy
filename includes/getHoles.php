<?php


$hole = "";
$query = 'SELECT vayla_id, vaylat.par FROM vaylat INNER JOIN radat ON vaylat.rata_id = radat.rata_id WHERE radat.nimi = ?';

if(isset($_GET['hole'])){
    $clean['hole'] = strip_tags($_GET['hole']);
    $hole = $clean['hole'];
    
}


include ("connect.php");

$sql = $db->prepare($query);
if($hole !== ""){
$sql->bindParam(1, $hole, PDO::PARAM_STR);
}
$ok = $sql->execute();

if($sql->rowCount() > 0){
    $result = $sql->fetchAll();
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}



?>