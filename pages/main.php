<?php
session_start();
echo '
<h1>FribeCaddy</h1>
<p>
    Welcome to use FribeCaddy '.$_SESSION["logged_in"].'!<br>
    FribeCaddy is a free tool to use for scorekeeping on the frisbee-golf course!<br>
    Enjoy the game!
</p>
';
?>