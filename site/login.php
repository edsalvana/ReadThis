<?php

include_once("config.php");
session_start();

$email          = $_POST["email"];
$password       = $_POST["password"];
$status         = 0;
$message        = "not set";
$userId;

//check if email exists
//$query    = "SELECT firstname FROM Users WHERE email='$email'";
$query = "SELECT id,firstname
FROM Users
WHERE email =  '$email'
LIMIT 0 , 30";
$result   = mysql_query($query)  or die ("Error in query: $query. " . mysql_error());
$returnedRows 	  = mysql_num_rows($result);

if( $returnedRows == 0 ){
        
        $status         = -1;
        $message        = "COULD NOT FIND USERNAME";
        
} else {
        
        $row            	= mysql_fetch_row($result);
	$userId			= $row[0];
        $firstname     		= $row[1] ;
 
        $_SESSION[username] = $firstname; 
        setcookie("userId", $userId	, time()+3600);
        $status         	= 1;
        $message        	= "FOUND USERz ". $userId;

}

echo json_encode(array(
    'status' => $status,
    'message' => $message,
	'username'=> $firstname,
	'userId'=> $userId
));

mysql_close($db_connection);


?>