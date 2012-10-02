//THIS IS NOT PRODUCTION CODE!
//TODO: oAuth2
var loggedIn   = false;
var userId 	   = null;
var sessionSet = false;

var SITE_URL 	  = "http://labs.visualgratis";
var SAVE_URL    = SITE_URL + "/ReadThis/site/store.php";
var LOGIN_URL   = SITE_URL + "/ReadThis/site/login.php";
var COOKIE_URL  = SITE_URL + "/ReadThis/site/";

//unimplemented
var CurrentRequest; 
var ExtensionRequest = {
    SIGN_IN:  "signing in",
    SAVE:     "registering"
}

//copy to clipboard, used for response text
Clipboard = {}; 
Clipboard.utilities = {}; 


//on extension clicked or right click select
chrome.browserAction.onClicked.addListener( onExtensionClicked );
chrome.extension.onRequest.addListener(		onExtensionRequest );


function onExtensionClicked( tab ){
	
	var action, data;
	
	if( loggedIn == true ){
		action = "save";
		data = {};
	} else {
		action = "signIn";
		data = {};
	}
	
	//send message to page.js
	chrome.tabs.sendRequest(tab.id, { 'action': action, 'data'  : data });
}

function onExtensionRequest (request, sender, sendResponse) {
    
    var xhr =  new XMLHttpRequest();
 	var params, responseData, url;
    
    //do session check?
    //check cookie
    //oAuth?
	
	switch( request.type ){
		
		//SAVE----------------------------------------------------------------------------------------------
		case "save":
		
			console.log("SAVING SNIPPET...");
			url = SAVE_URL;
	      	params 	 = "snippet="+request.snippet+"&url="+request.url+"&userId="+userId;
	        xhr.onreadystatechange = function() {

		            //4: request finished and response is ready + 200: "OK"
		            if (xhr.readyState == 4 && xhr.status==200 ) { 
		                responseData = JSON.parse( xhr.responseText );
		                Clipboard.copy(responseData.permalink );
						//selects the current tab
						chrome.tabs.getSelected(null, function(tab) {
				    		chrome.tabs.sendRequest(tab.id, { "action": "saveSuccess", "data"  : {} });
				        });    
		            }
	        }
			break;
		
		//LOGIN----------------------------------------------------------------------------------------------	
		case "login":
		
       		console.log("LOGGING IN...");
			url = LOGIN_URL;
	        params = "email="+request.email+"&password="+request.password;
	        xhr.onreadystatechange = function() {

		          //4: request finished and response is ready + 200: "OK"
		          if (xhr.readyState == 4 && xhr.status==200 ) { 

			            responseData = JSON.parse( xhr.responseText ); 
						userId = responseData.userId;
						loggedIn = true;
			            //figure out what is success and fail and put below in success
 
						//selects the current tab
						chrome.tabs.getSelected(null, function(tab) {
				    		chrome.tabs.sendRequest(tab.id, { "action": "signInSuccess", "data"  : {} });
				        });
		          };
	        };
			break;
	}
	
   xhr.open("POST", url, true);
   xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   xhr.send( params );
   
};


function checkCookie(){
	//this get the cookie, needs to be the full url, not just domain (not sure if it needs to be the root)
  	chrome.cookies.get( { url:COOKIE_URL, name:"userId" }, 
					  	  function ( results ){ userId = results.value; } 
					  );
}


Clipboard.utilities.createTextArea = function(value) { 
    var txt = document.createElement('textarea'); 
    txt.style.position = "absolute"; 
    txt.style.left = "-100%"; 

    if (value != null) 
        txt.value = value; 

    document.body.appendChild(txt); 
    return txt; 
}; 

Clipboard.copy = function(data) { 
    if (data == null) return; 

    var txt = Clipboard.utilities.createTextArea(data); 
    txt.select(); 
    document.execCommand('Copy'); 
    document.body.removeChild(txt); 
};


//CONTEXT MENU-----------------------------------------------------------------
chrome.contextMenus.create({
    "title": "Save to Read This",
    "contexts": ["page", "selection", "image", "link"],
    "onclick" : function(tab) {
      chrome.tabs.executeScript(null, 
        {code:"getSelectedText()"});
    }
});
