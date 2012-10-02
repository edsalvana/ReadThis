var saveContainer;
var signInContainer;
var isOverlaysCreated = false;
var selectedText;

$(document).ready(function() {
  chrome.extension.onRequest.addListener( onExtensionRequest );
});

//handles all message passing from the background.js
function onExtensionRequest( request, sender, callback ){
	console.log("woot " + request.action )

	switch( request.action ){
		
		case "save":
			saveText( getSelectedText() );
			break;
			
		case "saveSuccess":
			showSaveUI( true );
			break;
		
		//save the selected text when we try signing in	
		case "signIn":
			selectedText = getSelectedText();
			showSignIn( true);
			break;
			
		case "signInSuccess":
			showSignIn( false );
			saveText( selectedText );
			break;
		//save the selected text when we try signing in				
		case "register":
			selectedText = getSelectedText();
			break;
		
	}
}

//returns selected text to page.js which handles saving
function saveText( txt ){
  var urlText = document.URL;
  chrome.extension.sendRequest( { type:"save", snippet: txt, url:urlText }, function(response) {   });
  
}

function getSelectedText(){
	
  var txt = "";

  if(window.getSelection){
      txt = window.getSelection();
  } else if( document.getSelection){
      txt = document.getSelection();
  } else if( document.selection){
      txt = document.selection.createRange().text;
  } else return;

  return txt.toString();
}


function constructUI(){

		//create save ui
        saveContainer        = document.createElement("div");
        var notification     = document.createElement("p");
        var notificationText = document.createTextNode("note saved! link copied to clipboard");
        notification.appendChild(notificationText);
        saveContainer.appendChild(notification);
        saveContainer.setAttribute("class", "popOver");
        document.body.appendChild(saveContainer);   
    
		//create logged in ui
        signInContainer      = document.createElement("div");
        notification     = document.createElement("p");
        notificationText = document.createTextNode("Sign In Here Betch");
        notification.appendChild(notificationText);
        signInContainer.appendChild(notification);
        $(signInContainer).html('<form id="signin"><input type="text" name="email" class="textInput" placeholder="Email" /><input type="password" name="password" class="textInput" placeholder="Password" /> <input type="submit"    name="submit" /></form>');
        signInContainer.setAttribute("class", "signIn");
        document.body.appendChild(signInContainer);
        $("#signin").submit(  function(){ 
                                  console.log("submit betch");
                                  var email		= $("#signin [name=email]").val();
        		                  var password 	= $("#signin [name=password]").val();
                                  chrome.extension.sendRequest( { type:"login", email: email, password:password }, function(response){ console.log("RESSSSPONSE ", response) });
                                  return false; 
                              });
                              
        isOverlaysCreated = true;    

}


function showSaveUI( isTrue ){
	
	if(!isOverlaysCreated) constructUI();
    
    if(isTrue == true){      
        $(saveContainer).animate({top:0}, 500 );
        setTimeout(function(){showSaveUI(false) },3000);
    } else {
        $(saveContainer).animate({top:-51}, 500 );
    }
}



function showSignIn( isTrue ){
    
	if(!isOverlaysCreated) constructUI();
    
    if(isTrue){      
        $(signInContainer).animate({top:0}, 500 );
        
    } else {
        $(signInContainer).animate({top:-101}, 500 );
    }
      
}


