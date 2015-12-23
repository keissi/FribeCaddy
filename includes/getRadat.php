<?php




$rata = "";
$query = 'SELECT * FROM radat';

if(isset($_GET['rata'])){
    $clean['rata'] = strip_tags($_GET['rata']);
    $query = $query . " WHERE nimi LIKE ?";
    $rata = $clean['rata'] . "%";
    
}


include ("connect.php");

$sql = $db->prepare($query);
if($rata !== ""){
$sql->bindParam(1, $rata, PDO::PARAM_STR);
}
$ok = $sql->execute();
if($sql->rowCount() > 0){
    $result = $sql->fetchAll();
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}



?>










