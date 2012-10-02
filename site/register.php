<?php
        include_once("config.php");
	session_start();
        
        $email          = $_POST["email"];
        $password       = $_POST["password"];
        $firstname      = $_POST["firstname"];
        $lastname       = $_POST["lastname"];

        $status         = 0;
        $message        = "not set";
        
        //check if email exists
        $checkEmailSQL    = "SELECT id FROM Users WHERE email='$email'";
        $checkEmailResult = mysql_query($checkEmailSQL)  or die ("Error in query: $checkEmailSQL. " . mysql_error());
        $returnedRows 	  = mysql_num_rows($checkEmailResult);

        if( $returnedRows == 0 ){
                
                //create account
                $currentTime     = date("Y-m-d H:i:s");
                $password = md5($_POST["password"]);
                $createAccountSQL = "INSERT INTO Users VALUES ('0', '$email', '$password', '$firstname', '$lastname', '$currentTime' )";
                $createAccountSQLResult = mysql_query($createAccountSQL)  or die ("Error in query: $createAccountSQL. " . mysql_error());
                $status         = 1;
                $message        = "NEW USER CREATED" . $firstname;
                
                
        } else {
                
                $status         = -1;
                $message        = "SORRY USER ALREADY EXISTS";
        }
        
     
        echo json_encode(array(
            'status' => $status,
            'message' => $message,
            'username' => $firstname,
            'firstname' => $firstname,
            'lastname' => $lastname
        ));
     

        mysql_close($db_connection);
	
?>