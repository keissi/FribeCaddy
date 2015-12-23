<!DOCTYPE html>
    <html>
    <?php
        session_start();
        include ("includes/head.php");
        include ('scripts/validateUserCreation.php');
         ?>
<body>
<?php echo <<<END

<header>
		<nav class="navbar navbar-default">
			<div class="container">
				<div class="navbar-header">
					<a class="navbar-brand" href="#/"><img id="logo" border="0" alt="FribeCaddy" src="images/fribecaddylogo.png"></a>
				</div>

				<ul class="nav nav-tabs navbar-right">
                    
					<li ><a href="login.php"><i class="fa fa-home" ></i>Go to login</a></li>
                    
                        
				</ul>
			</div>
		</nav>
</header>
END;
if(!isset($_SESSION["r1"])){
        $_SESSION["r1"]=rand(0,9);
        $_SESSION["r2"]=rand(0,9);
    }
    $_SESSION["r3"]=$_SESSION["r1"] + $_SESSION["r2"] + 2;
    $array = ["yksi", "kaksi", "kolme", "neljä", "viisi", "kuusi", "seitsemän", "kahdeksan", "yhdeksän", "kymmenen"];

?>    
        <div class=content>
            <div class=login>
                <form method=POST>
                    <label>Enter username</label><br>
                    <input type=text name=username><br>
                    <label>Enter password</label><br>
                    <input type=password name=password><br>
                    <label>Validate password</label><br>
                    <input type=password name=password2><br>
                    <label>Enter you email</label><br>
                    <input type=email name=email><br>
                    <label><?php echo'Oletko botti? Paljonko on '. $array[$_SESSION["r1"]] ."+" . $array[$_SESSION["r2"]]."?";?></label><br>
                    <input type="number" name="botti"><br><br>
                    
                    <button type=submit>Create</button>        
                </form>
            </div>
                <?php if(isset($message)){
                        echo "<p>$message</p>";
                        }   
                ?>
        </div>
        
        

        
        
</body>
</html>
        
   