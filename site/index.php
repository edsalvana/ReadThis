
<?php

	
	/*
		This page displays all the items saved by the entire service
	*/
	
	//include db info and gloval varialbes
	include_once("config.php");
	
	$html  = "";
	
	//construct query and ping database
	$getAllSQL	 	= "SELECT * FROM Links ORDER BY time DESC";  	
	$results	 	= mysql_query($getAllSQL)  or die ("Error in query: $getAllSQL. " . mysql_error());
	$numRows		= mysql_num_rows($results);
	
	//include header
	include("header.php");
	
	//start list
	$html .= '<ul id="posts">';
	
	//create list items by looping through all rows returned
	while($resultRow = mysql_fetch_object($results) ) { 	
		
		//extract info from current row
		$id 	 	= $resultRow->id;										
		$userId  	= $resultRow->user_id;		
		$snippet 	= $resultRow->snippet;
		$url 	 	= $resultRow->url;
		$time 	   	= date("F j, Y, g:i a",strtotime($resultRow->time));
		$permalink 	= $_LINK_URL . $resultRow->permalink;
		
		//construct html list item
		$html .= '
		        <li>
		        <div class="item">
		                <pre>'.$snippet.'</pre>
		                <p class="source"><img src="'.$_IMAGES["clock"].'" /> <a href="'.$permalink.'">'.$time.'</a></p>
		                <p class="source"><img src="'.$_IMAGES["link"].'"  /> <a href="'.$url.'">'.$url.'</a></p>
		           
		        </div>
		        </li>
		';
	}
	
	$html .= '</ul>';
	
	echo $html;
	
	
	include("footer.php");
	
?>


