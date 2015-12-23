<?php require_once("includes/connect.php");
    
if(isset($_POST["botti"])){
    $num = intval($_POST["botti"]);

    if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['password2']) && isset($_POST['email']) && $num==$_SESSION['r3']){
        $clean['username'] = strip_tags($_POST['username']);
        $clean['password'] = strip_tags($_POST['password']);
        $clean['password2'] =strip_tags($_POST['password2']);
        $clean['email'] =strip_tags($_POST['email']);
        
        $sql = $db->prepare('SELECT username, password FROM users WHERE username = ?');
        $sql->bindParam(1, $clean['username'], PDO::PARAM_STR);
    
        $ok = $sql->execute();
        if(!$ok) {
		print_r($sql->errorInfo() );
        }
    
        if($sql->rowCount() > 0){
            $row = $row = $sql->fetch(PDO::FETCH_ASSOC);
            $message = "Username already exists";
            
        
        }
        else if($clean['password'] == $clean['password2']){
                $sql = $db->prepare('INSERT INTO users (username, password, email) VALUES (?, ?, ?)');
                $sql->bindParam(1, $clean['username'], PDO::PARAM_STR);
                $sql->bindParam(2, $clean['password'], PDO::PARAM_STR);
                $sql->bindParam(3, $clean['email'], PDO::PARAM_STR);
                $ok = $sql->execute();
                if(!$ok) {
                    print_r($sql->errorInfo() );
                }
                else {
                $message = "User created";
                unset($_SESSION['r1']);
                unset($_SESSION['r2']);
                }
        }
        else {
            $message = "Passwords did not match";
        }
    }
}
?>
