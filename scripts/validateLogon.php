<?php require_once("includes/connect.php");
    if(isset($_POST['username']) && isset($_POST['password'])){
        $clean['username'] = strip_tags($_POST['username']);
        $clean['password'] = strip_tags($_POST['password']);
        print_r($clean);
        $sql = $db->prepare('SELECT username, password FROM users WHERE username = ? AND password = ? ');
        $sql->bindParam(1, $clean['username'], PDO::PARAM_STR);
        $sql->bindParam(2, $clean['password'], PDO::PARAM_STR);
    
        $ok = $sql->execute();
        if(!$ok) {
		print_r($sql->errorInfo() );
	}
    
    if($sql->rowCount() > 0){
        $row = $row = $sql->fetch(PDO::FETCH_ASSOC);
        $_SESSION["logged_in"] = $row['username'];
        header("Location:index.php");
    
    }
}   
?>
