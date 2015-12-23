<?php
session_start();
$_SESSION['logged_in'] = NULL;
session_write_close();
header("Location:index.php");

?>