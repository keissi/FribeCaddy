<?php
echo <<<END
<header>
		<nav class="navbar navbar-default">
			<div class="container">
				<div class="navbar-header">
					<a class="navbar-brand" href="#/"><img id="logo" border="0" alt="FribeCaddy" src="images/fribecaddylogo.png"></a>
				</div>

				<ul class="nav nav-tabs  navbar-right">
                   
					<li ><a href="#/"><i class="fa fa-home" ></i>Home</a></li>
                    <li ><a href="#/laskuri"><i class="fa fa-home" ></i>Laskuri</a></li>
                    <li ><a href="#/pelaajat"><i class="fa fa-home"></i>Pelaajat</a></a></li>
                    <li ><a href="#/radat"><i class="fa fa-home"></i> Radat</a></li>
                    <li ><a href="#/nupy"><i class="fa fa-home"></i> NuPy?</a></li>
                    <li ><a id=logout href="logout.php"><i class="fa fa-home"></i> Logout</a></li>
                  
				</ul>
			</div>
		</nav>
</header>

END;

?>