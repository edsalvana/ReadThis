<?php
	include_once("config.php");
        if (isset($_COOKIE["userId"])){
                echo "user id betch ". $_COOKIE["userId"];
        } else {
                echo "F U";
        }
	session_start();
?>
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

	<title>Read This</title>
	
	<link rel="stylesheet" type="text/css" href="<?php echo $_SERVICE_URL?>css/reset.css" >
	<link rel="stylesheet" type="text/css" href="<?php echo $_SERVICE_URL?>css/style.css" >
	<script type="text/javascript" src="http://use.typekit.com/syh4siz.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
	<script type="text/javascript" src="<?php echo $_SERVICE_URL?>js/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<?php echo $_SERVICE_URL?>js/main.js"></script>
	<script type="text/javascript" src="<?php echo $_SERVICE_URL?>js/TweenMax.js"></script>
	<script type="text/javascript" src="<?php echo $_SERVICE_URL?>js/easing/EasePack.js"></script>
	<script type="text/javascript" src="<?php echo $_SERVICE_URL?>js/plugins/CSSPlugin.js"></script>

     
</head>
<body>

	<div id="topBar">
	        <div id="logo">
        	        <a href="<?php echo $_SERVICE_URL?>"><img src="<?php echo $_SERVICE_URL?>logo.png" /> </a> 
        	</div>
	        <ul>    
	                <li><input type="text" id="searchField" name="field" class="textInput" placeholder="Search Posts" /></li>
	                <li id="resultCount">Showing <?php echo $numRows; ?> posts</li>
	        </ul>

		<ul id="links"> 
  	                <li><a href="#" id="registerLink">Register</a></li>
	                <li><a href="#" id="signinLink">Sign In</a></li>
			<li><a href="#" id="usernameLink">Hello</a></li>
			<li><a href="#" id="logoutLink">Logout</a></li>
		</ul>
			<div id="registrationBox">
                    <form id="register">
                            <input type="text"      name="email"        class="textInput" placeholder="Email" />
                            <input type="password"  name="password"     class="textInput" placeholder="Password" />
                            <input type="text"      name="firstname"    class="textInput" placeholder="First Name" />
                            <input type="text"      name="lastname"     class="textInput" placeholder="Last Name" />
                            <input type="submit"    name="submit" />
                    </form>
            </div>

            <div id="signInBox">
                    <form id="signin">
                            <input type="text"      name="email"        class="textInput" placeholder="Email" />
                            <input type="password"  name="password"     class="textInput" placeholder="Password" />
                            <input type="submit"    name="submit" />
                    </form>
            </div>


	        
	</div>
	
