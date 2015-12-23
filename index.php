<!DOCTYPE HTML>
    
<?php
session_start();
    if(!isset($_SESSION["logged_in"])){
    header("Location:login.php");
}
?>
    <html lang="en-us" ng-app="fribeCaddy">
    <?php set_include_path('includes/');
        include ("head.php");
    
    ?>
    <body>
    <?php include ("header.php"); ?>
        
        <div class="content" ng-view>
            
            
        </div>
        
        
        
        
        
    <?php include ("footer.php"); ?>
    </body>
    
</html>