	  
	  
	function FirebaseAuthInit(AuthStateChangedFn,RecaptureContainer) 
	{
	  firebase.auth().onAuthStateChanged(AuthStateChangedFn);
	  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(RecaptureContainer);
	  recaptchaVerifier.render();
	}
	  

	  function AuthLogonAnonymous()
	  { 
	    firebase.auth().signInAnonymously().catch((error) => 
		{ var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode, errorMessage);
		  return(error);
		});
		console.log("anonymous sign-in ok");
		return null;
	  }

	    
	  function AuthSubmitPhone()
	  { const phoneNumber = document.getElementById("PhoneAuthNumber").value;
		  console.log('phoneNum,ber = ' + phoneNumber);
		const appVerifier = window.recaptchaVerifier;
		  console.log('appVerifier = ' + appVerifier);
		firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
			.then((confirmationResult) => {
			// SMS sent. Prompt user to type the code from the message, then sign the
			// user in with confirmationResult.confirm(code).
			console.log("OK so far");
			window.confirmationResult = confirmationResult;
			// ...
		}).catch((error) => {
			alert(error.message);
			console.log("error is " + error);
			// Error; SMS not sent
			// ...
		});
	  }
	  
	  function AuthPhoneVerify()
	  { const code = document.getElementById("PhoneAuthCode").value;
		confirmationResult.confirm(code).then((result) => {
		// User signed in successfully.
			const user = result.user;
			// ...
		}).catch((error) => {
			console.log("error = " + error);
			// User couldn't sign in (bad verification code?)
			// ...
		});	
	  }		
	    
		
		
	  function AuthLogonFacebook()
	  {	var provider = new firebase.auth.FacebookAuthProvider();
	   	// provider.addScope('user_birthday');
	        console.log("Log on to Facebook - created provider");
	   	firebase.auth().useDeviceLanguage();
	        console.log("Log on to Facebook - use device language");
	   	firebase.auth().signInWithPopup(provider).then((result) => {
   		    var credential = result.credential;  /** @type {firebase.auth.OAuthCredential} */
		    var user = result.user;   // The signed-in user info.
    		    var accessToken = credential.accessToken; // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		    var img = document.createElement('img');
		    img.src = user.photoURL;
		    document.getElementById('profile_pic').appendChild(img);
		})
  		.catch((error) => {
 	            console.log("Log on to Facebook - error");
  		    var errorCode = error.code;          // Handle Errors here.
		    var errorMessage = error.message;
 	            console.log("Log on to Facebook - error message = " + errorMessage);
   		    var email = error.email;		// The email of the user's account used.
   		    var credential = error.credential; // The firebase.auth.AuthCredential type that was used.
		});
	  }
	  
	  function AuthLogoff()
	  {	 playerRef.remove();
	         firebase.auth().signOut();
	  }
	  
	  
	  
	  
