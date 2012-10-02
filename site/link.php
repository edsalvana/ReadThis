<?php
        //include header
        include("header.php");
        
	include_once("config.php");
	
	$getItemSQL = "SELECT * FROM Links WHERE permalink='$_GET[id]'";  	
	$getItemResults = mysql_query($getItemSQL)  or die ("Error in query: $getItemSQL. " . mysql_error());
	$numRows	= mysql_num_rows($getItemResults);
	
	echo '<ul id="posts">';
	if( $numRows > 0 ){
		
		while($resultRow = mysql_fetch_object($getItemResults)) { 	
			$id 	 = $resultRow->id;										
			$userId  = $resultRow->user_id;		
			$snippet = $resultRow->snippet;
			$url 	 = $resultRow->url;
			$time 	   	= date("F j, Y, g:i a",strtotime($resultRow->time));
			$permalink = $_SERVICE_URL . $_LINK_URL . $id;
			
			//preserve spaces, then preserve linebreaks
			//$snippet = str_replace(' ', '&nbsp;', $snippet);
			//$snippet = nl2br($snippet);

			echo '<li>'."\n";
			echo '<div class="item">'."\n";
			echo '<pre>'.$snippet.'</pre>';
			echo '<p class="source"><img src="'.$_IMAGES["clock"].'" /> '.$time.'</p>';
			echo '<p class="source"><img src="'.$_IMAGES["link"].'"  /> <a href="'.$url.'">'.$url.'</a></p>';
			echo '</div>';
			echo '</li>'."\n";
		}
	

	} else {
		echo '<li>'."\n";
		echo '<div class="item">'."\n";
		echo '<pre>Sorry, that entry does not exist!</pre>';
		echo '</div>';
		echo '</li>'."\n";
	}
	
	echo '</ul>';
	
	include("footer.php");
	
?>	