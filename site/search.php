<?php

	include_once("config.php");
	
	$html  = "";
	$query = $_POST["query"];
	
	//this is a bit of a hack, reset query to select all if query string == 0
	if( strlen($query) > 0 )
		$querySQL = "SELECT * FROM Links WHERE snippet LIKE '%".$query."%' ORDER BY time DESC";
	else
		$querySQL = "SELECT * FROM Links ORDER BY time DESC";  	
		
	$results  = mysql_query($querySQL) or die ("Error in query: $querySQL. " . minysql_error());
	$numRows  = mysql_num_rows($results);

	
	mysql_close($db_connection);
	
	if( $numRows > 0 ){
	        
        	//create list items by looping through all rows returned
        	while($resultRow = mysql_fetch_object($results) ) {
	        
	        	//extract info from current row
        		$id 	 	= $resultRow->id;										
        		$userId  	= $resultRow->user_id;		
        		$snippet 	= $resultRow->snippet;
        		$url 	 	= $resultRow->url;
        		$time 	   	= date("F j, Y, g:i a",strtotime($resultRow->time));
        		$permalink 	= $_SERVICE_URL . $_LINK_URL . $id;
		
        		//dont highlight the query string if results = 0'
			//case insensitive regex and $1 is use the original matched text irregardless of case
			if( strlen($query) > 0 )
       	        	        $snippet = preg_replace(  "/(".$query.")/i", "<span class='highlight'>$1</span>", $snippet );
	                
	
        		//JSON
        		$html .= '
        		        <li>
        		        <div class="item">
        		                <pre>'.$snippet.'</pre>
        		                <p class="source"><img src="'.$_IMAGES["clock"].'" /> <a href="'.$permalink.'">'.$time.'</a></p>
        		                <p class="source"><img src="'.$_IMAGES["link"].'"  /> <a href="'.$url.'">'.$url.'</a></p>
        		                <!--<p class="source"><img src="'.$_IMAGES["link"].'"  /> <a href="'.$url.'">Delete</a></p>-->
        		        </div>
        		        </li>
        		';
                
        	}
	
        } else {
	        $html .= '
		<li>
    		        <div class="item">
    		Sorry there are no posts matching '.$query.' :(
    		</div>
    		</li>';
	}
	
	echo json_encode(array(
            'html' => $html,
            'numResults' => $numRows
        ));
        
?>

