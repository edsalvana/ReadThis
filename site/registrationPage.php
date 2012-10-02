<?php

	
	/*
		This page displays all the items saved by the entire service
	*/
	
	//include db info and gloval varialbes
	include_once("config.php");
	//include header
	include("header.php");
	
?>
        <form id="register">
                <input type="text"      name="email"        class="textInput" placeholder="Email" />
                <input type="password"  name="password"     class="textInput" placeholder="Password" />
                <input type="text"      name="firstname"    class="textInput" placeholder="First Name" />
                <input type="text"      name="lastname"     class="textInput" placeholder="Last Name" />
                <input type="submit"    name="submit" />
        </form>
<?php
	
	//include header
	include("footer.php");

?>