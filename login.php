<!DOCTYPE html>
    <html>
    <?php
        session_start();
        include ("includes/head.php"); 
        require_once('scripts/validateLogon.php'); ?>
<body>
<?php echo <<<END
<header>
		<nav class="navbar navbar-default">
			<div class="container">
				<div class="navbar-header">
					<a class="navbar-brand" href="#/"><img id="logo" border="0" alt="FribeCaddy" src="images/fribecaddylogo.png"></a>
				</div>

				<ul class="nav nav-tabs navbar-right">
                    
					<li><a href="signup.php"><i class="fa fa-home" ></i>Sign-Up</a></li>
                    
                        
				</ul>
			</div>
		</nav>
</header>
END;
?>
<div class=content>
    <div class=login>
        <form method=POST>
            <label>Username</label><br>
            <input type=text name=username><br>
            <label>Password</label><br>
            <input type=password name=password><br><br>        
            <button type=submit>Login</button>        
        </form>
        
        
    </div>
    <br><br>
    
</div>




<?php include ("includes/footer.php"); ?>
</body>
</html>