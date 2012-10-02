<?php
        
	include_once("config.php");
	
	$snippet = $_POST["snippet"];
	$url     = $_POST["url"];
	$userId  = $_POST["userId"];
	
	$status         = 0;
        $message        = "not set";
	
	//echo "SNIPPET ".$snippet;
	//echo "URL: ".$url;
        //may want to add page title
	$createEntry = "INSERT INTO Links VALUES ( '0', '$userId', '$snippet', '$url', 'NULL', NOW())";
	mysql_query($createEntry) or die ("Error in query: $createEntry. " . mysql_error());	
        
        //can insert hash using last inserted id?
        //$compressed = hash('adler32','Compress me',false);
        $createdId = mysql_insert_id();
        $permalink = hash('adler32', $createdId,false);
	$insertedEntry = "UPDATE Links SET permalink='$permalink' WHERE id='$createdId'";
	$insertedResult = mysql_query($insertedEntry)  or die ("Error in query: $insertedEntry. " . mysql_error());
	$row = mysql_fetch_row($insertedResult);

	//return this as a response to bookmarklet
	
	
	echo json_encode(array(
            'status' => $status,
            'message' => $message,
            'permalink' => "http://labs.visualgratis/ReadThis/site/link/".$permalink
        ));
        
	//echo "http://labs.visualgratis/ReadThis/site/link/".$permalink;
	mysql_close($db_connection);
	
?>