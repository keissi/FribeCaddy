<?php
//insert kierros
    include("ChromePhp.php");
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $course_id = $request->course->id;
    $players = $request->scoreCards;
    include("connect.php");
    $query = "INSERT INTO kierros(rata_id) VALUES ($course_id)";
    $sql = $db->prepare($query);
    $sql->execute();
//get kierrosID
    $query2 = "SELECT MAX(kierros_id) as max FROM kierros";
    $sql2 = $db->prepare($query2);
    $sql2->execute();
    $result;
    if($sql2->rowCount() > 0){
        $result = $sql2->fetch(PDO::FETCH_ASSOC);
    }
    
    $roundId = $result["max"];
    
    
    
    
    
//insert Course Scores
    foreach($players as $player){
        $playername = $player->name;
        $max = sizeof($player->scoreCard);
        ChromePhp::log($playername);
        ChromePhp::log($roundId);
        ChromePhp::log($max);
        for($i = 0; $i < $max; $i++){
            $k = $i+1;
            $throws = $player->scoreCard[$i];
            $query3 =  "INSERT INTO vaylatulos(kierros_id, player_id, vayla_id, heitot) VALUES($roundId, (SELECT user_id FROM users WHERE username='$playername'),
            (SELECT vayla_id FROM vaylat WHERE rata_id=$course_id AND vayla_nro=$k), $throws)";
            ChromePhp::log($query3);
            $sql3 = $db->prepare($query3);
            $sql3->execute();
        }
    }
    

    
?>