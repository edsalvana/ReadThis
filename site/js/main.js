var SITE_URL 	     = SERVER_HTTP_HOST();
var SEARCH_URL       = SITE_URL + "/ReadThis/site/search.php";
var REGISTER_URL     = SITE_URL + "/ReadThis/site/register.php";
var LOGIN_URL  	     = SITE_URL + "/ReadThis/site/login.php";
var LOGOUT_URL  	 = SITE_URL + "/ReadThis/site/logout.php";
var SESSION_URL  	 = SITE_URL + "/ReadThis/site/getSession.php";
var TARGET_EASE;


var currentSearchString = "";
var topBarOpenHeight   = 300;
var topBarClosedHeight = 40;
var signinBox, registrationBox;

//Pseudo MouseEvent class because i'm not familiar with the string event names yet
var MouseEvent = {
    CLICK: "click",
    OVER: "mouseover",
    OUT: "mouseout",
};

//REQUEST STATES
var currentRequest;
var ApplicationRequest = {
    SIGN_IN: "signing in",
    REGISTER: "registering",
    SIGN_OUT: "signing out"
}


//APPLICATION STATES
var currentApplicationState;
var ApplicationState = {
    LOGGED_IN:  "logged in",
    LOGGED_OUT: "logged out"    
}

//DRAWER STATES
var currentDrawerState;
var DrawerState = {
    CLOSED:            "closed",
    OPEN_LOGIN:        "open login",  
    OPEN_REGISTRATION: "open registration"  
  
}



//METHODS START HERE--------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function() {

	
	$(document).keyup( onKeyUp );
	
	//handlers
	$("#register").submit(  function(){ requestState( ApplicationRequest.REGISTER ); return false; } );
	$("#signin").submit(    function(){ requestState( ApplicationRequest.SIGN_IN  ); return false; } );
    $("#logoutLink").on(    MouseEvent.CLICK, function(){ requestState( ApplicationRequest.SIGN_OUT      ) } );
	$("#signinLink").on(    MouseEvent.CLICK, function(){ setDrawerState( DrawerState.OPEN_LOGIN        ) } );
	$("#registerLink").on(  MouseEvent.CLICK, function(){ setDrawerState( DrawerState.OPEN_REGISTRATION ) } );
	
	//why are we even doing this
	signinBox		    = $( "#signInBox" );
	registrationBox = $( "#registrationBox" );
	
	//hide all ui that requires session check
	$("#signinLink").css("display",   "none");
	$("#registerLink").css("display", "none");
	$("#usernameLink").css("display", "none");
	$("#logoutLink").css("display",   "none");
	//$(signinBox).css(      "display", "none");
	//$(registrationBox).css("display", "none");
	$(signinBox).css(      "margin-left", $(window).width());
	getSession();
	
	
	TARGET_EASE = Quad.easeOut;

});


//APPLICATION STATE LOGIC---------------------------------------------------------------------------------------------------------

//handles requesting state change
function requestState( state ){
    
    console.log("REQUESTING STATE " + state)
    
    var targetURL;
    var targetApplicationState;
    var params;
    var email, password, firstname, lastname;
    var successHandler = function( data ){ 
                              setApplicationState( ApplicationState.LOGGED_IN );
                              $("#usernameLink").html( "Hello "+ data.username );
                         };
    
    switch ( state ){
        case ApplicationRequest.SIGN_IN:
            targetURL = LOGIN_URL;
            currentRequest = ApplicationRequest.SIGN_IN;
            email		  = $("#signin [name=email]").val();
        	password 	= $("#signin [name=password]").val();
            params    = {email:email, password:password };
            successHandler = function( data ){ 
                                      setApplicationState( ApplicationState.LOGGED_IN );
                                      $("#usernameLink").html( "Hello "+ data.username );
                                 };
            break;
        
        case ApplicationRequest.REGISTER:
            targetURL = REGISTER_URL;
            currentRequest = ApplicationRequest.REGISTER;
            email		  = $("#register [name=email]").val();
        	password 	= $("#register [name=password]").val();
        	firstname	= $("#register [name=firstname]").val();
        	lastname	= $("#register [name=lastname]").val();
        	params    = { email:email, password:password, firstname:firstname, lastname:lastname };
        	successHandler = function( data ){ 
                                      setApplicationState( ApplicationState.LOGGED_IN );
                                      $("#usernameLink").html( "Hello "+ data.username );
                                 };
            break;

        case ApplicationRequest.SIGN_OUT:
            targetURL = LOGOUT_URL;
            currentRequest = ApplicationRequest.SIGN_OUT;
            successHandler = function(){ setApplicationState( ApplicationState.LOGGED_OUT ); }
            params: {};
            break;
    }
    
    //there might be potential for fuckups here
    $.ajax({
		    type: 	  "POST",
		    url: 	    targetURL,
		    dataType: "json",
		    data:     params,
		    success: function($data) {
      				console.log($data.message);
                    successHandler($data);
		    },
		    error: function(jqXHR, textStatus, errorThrown){
      				console.log(jqXHR);
      				console.log(textStatus);
      				console.log(errorThrown);
			  }
		});
		
  	//false required to prevent default submit behavior
  	return false;
  	
}


//sets the application state
function setApplicationState( state ){
    console.log("Setting APPLICATION STATE to: " + state );
    switch ( state ){
      
      case ApplicationState.LOGGED_IN:
          currentApplicationState = ApplicationState.LOGGED_IN;
          $("#signinLink").css("display",   "none");
        	$("#registerLink").css("display", "none");
        	$("#usernameLink").css("display", "inline");
        	$("#logoutLink").css("display",   "inline");
        	setDrawerState( DrawerState.CLOSED );
          break;
          
      case ApplicationState.LOGGED_OUT:
          currentApplicationState = ApplicationState.LOGGED_OUT;
          $("#signinLink").css("display",   "inline");
        	$("#registerLink").css("display", "inline");
        	$("#usernameLink").css("display", "none");
        	$("#logoutLink").css("display",   "none");
        	//TweenMax.to( $("body"),       1, { scrollTop:1 , ease:TARGET_EASE,  overwrite:2 } );
        	setDrawerState( DrawerState.CLOSED );
          break;
          
      default:
          console.log("APPLICATION STATE: " + state + " is invalid");
          break;
    }
    
}



    
//sets the drawer state state
function setDrawerState( state ){
  
    console.log("Setting DRAWER STATE to: " + state );
    var topBar     = $("#topBar");
  	var time       = .5;
  	
  	
    switch ( state ){
      
      //close explicitly or if the link used to open the drawer is clicked again
      //strangely enough, when we use a string value for "state", we can't do case DrawerState.CLOSED || currentDrawerState:
      case ( DrawerState.CLOSED  ):
          currentDrawerState = DrawerState.CLOSED;
          TweenMax.to( topBar, time, { css: { height:topBarClosedHeight }, ease:TARGET_EASE,  overwrite:2 } );
          break;

      case ( currentDrawerState ):
          currentDrawerState = DrawerState.CLOSED;
          TweenMax.to( topBar, time, { css: { height:topBarClosedHeight }, ease:TARGET_EASE,  overwrite:2 } );
          break;

      case DrawerState.OPEN_REGISTRATION:
          currentDrawerState = DrawerState.OPEN_REGISTRATION;
          //$(registrationBox).css("display", "block");
      		//$(signinBox).css("display", "none");
          TweenMax.delayedCall( time/3, function(){ $("#register [name=email]").focus(); } );
          TweenMax.to( topBar,          time, { css: { height:$(window).height()     }, ease:TARGET_EASE,  overwrite:2 } );  //this and the one in the next case are duplciates, worth rolling up?
          TweenMax.to( registrationBox, time, { css: { marginLeft:0                 }, ease:TARGET_EASE,  overwrite:2 } );
          TweenMax.to( signinBox,       time, { css: { marginLeft:$(window).width() }, ease:TARGET_EASE,  overwrite:2 } );
          break;

      case DrawerState.OPEN_LOGIN:
          currentDrawerState = DrawerState.OPEN_LOGIN;
          //$(signinBox).css("display", "block");
      		//$(registrationBox).css("display", "none");
      		TweenMax.delayedCall( time/3, function(){ $("#signin [name=email]").focus(); } );
      	  TweenMax.to( topBar,          time, { css: { height:$(window).height() }, ease:TARGET_EASE,  overwrite:2 } );
      	  TweenMax.to( registrationBox, time, { css: { marginLeft:-1*$(window).width() }, ease:TARGET_EASE,  overwrite:2 } );
          TweenMax.to( signinBox,       time, { css: { marginLeft:0 }, ease:TARGET_EASE,  overwrite:2 } );
          break;
                        
      default:
          console.log("Setting the DRAWER STATE to invalid option: " + state );
          break;
    }
    
}



//LIVE SEARCH-------------------------------------------------------------------------------------

//handles key up
function onKeyUp( e ){
  
  //get value of  key up
	var searchFieldValue = $("#searchField").val();
	
	//if the value of the query has changed
	if( currentSearchString != searchFieldValue ){
	  
	  //save it, then use that to perform the search
		currentSearchString = searchFieldValue;
		search( currentSearchString );
	}
}



//performs a search on the query
function search( query ){

	//USE jquery AJAX
	$.ajax({
	    type: 	  "POST",
	    url: 	    SEARCH_URL,
	    dataType: "json",
	    data:     "query="+query,
	    success: function($data) {
          	        var html = $data.html;
          	        var numResults = $data.numResults;
          			    $("#posts").html(html);
          			    $("#resultCount").html("Showing " + numResults +" posts");
	             }
	});
}

//called on load to check if there is an ongoing session
function getSession(){
  
  //.get is shorthand for an ajax call
  $.ajaxSetup({cache: false});
  
  $.get(SESSION_URL, function (data) {
      var session = data;
      
      //if username is set, set the application state to logged in
      if( session.hasOwnProperty("username") ){
          setApplicationState( ApplicationState.LOGGED_IN  );
          $("#usernameLink").append( " "+session.username )
          
      //otherwise set it to logged out    
      } else {
          setApplicationState( ApplicationState.LOGGED_OUT );
      }
  }, "json");
}

function getCookie(){
	
}


//finds host based on browser url
function SERVER_HTTP_HOST(){
	var url = window.location.href;
	url = url.replace("http://", ""); 
	
	var urlExplode = url.split("/");
	var serverName = urlExplode[0];
	
	serverName = "http://"+serverName;
	return serverName;
}