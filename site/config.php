<?php

//GLOBAL VARS------------------------------------------------------------------------------------------

//urls
$_HOST		  = "http://" . $_SERVER['HTTP_HOST'];

$_SERVICE_URL     = $_HOST . "/ReadThis/site/";
$_LINK_URL	  = $_SERVICE_URL . "link/";

//html asset images, why the f can't we just do this in one line?
$_IMAGES =  array( "clock" => $_SERVICE_URL . "images/clock.png", 
		   "link"  => $_SERVICE_URL . "images/link.png"	);


//DATABASE INFO----------------------------------------------------------------------------------------

//Database connection Info
$DATABASE_USERNAME = "root"; 
$DATABASE_PASSWORD = "root";
$DATABASE_HOST = "localhost";
$DATABASE_NAME = "ReadThis"; 

//connect to database
$DB_CONNECTION = mysql_connect ($DATABASE_HOST, $DATABASE_USERNAME, $DATABASE_PASSWORD) or die (mysql_error());
$DB_SELECT = mysql_select_db ($DATABASE_NAME, $DB_CONNECTION) or die (mysql_error());

?>