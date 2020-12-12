package com.example.pantry;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;
import java.util.logging.Logger;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;


import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.sun.org.apache.xpath.internal.operations.Plus;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/demo") // This means URL's start with /demo (after Application path)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MainController {
	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private UserRepository UserRepository;




    //---------------------------------------------------------
    // save a food item
    //---------------------------------------------------------
	@PostMapping(path="/food")
	public @ResponseBody String testing(@RequestBody FoodContext foodContext) throws GeneralSecurityException, IOException {
		if(authenticateUser(foodContext.user)){

		}else{
			return "not authorized.";
		}
		itemRepository.save(foodContext.item);
		return "item saved.";
	}

	//----------------------------------------------------------------------
	//
	//----------------------------------------------------------------------	
	@GetMapping(path = "/date/{date}")
	public @ResponseBody List<Item> getAllFromToday(@PathVariable String date,@RequestBody User user) throws GeneralSecurityException, IOException {

        if(authenticateUser(user)){ // TODO make this an aspect

        }else{
            user.setUserEmail("hhank1508@gmail.com");
        }

		return itemRepository.testingThis(date,user.userEmail);		
	}


	//----------------------------------------------------------------------
	//
	//----------------------------------------------------------------------	
	@PostMapping(path = "/date/{startDate}/{endDate}")
	public @ResponseBody List<Item> getBetweenDates(@PathVariable String startDate,@PathVariable String endDate,@RequestBody User user) throws GeneralSecurityException, IOException {

        if(authenticateUser(user)){ // TODO make this an aspect

        }else{
            user.setUserEmail("hhank1508@gmail.com");
        }

		return itemRepository.getBetweenDates(startDate,endDate,user.userEmail);		
	}



	//----------------------------------------------------------------------
	//
	//----------------------------------------------------------------------	
	@PostMapping(path = "/date/{date}")
	public @ResponseBody List<Item> getAllFromTodayPost(@PathVariable String date,@RequestBody User user) throws GeneralSecurityException, IOException {

        if(authenticateUser(user)){ // TODO make this an aspect

        }else{
            user.setUserEmail("none");
        }

		return itemRepository.testingThis(date,user.userEmail);		
	}


	//----------------------------------------------------------------------
	//
	//----------------------------------------------------------------------	
  	@GetMapping(path = "/debug/{date}")
	public @ResponseBody List<Item> debug(@PathVariable String date) {

      

		return itemRepository.testingThisDebug(date);
	}



	//----------------------------------------------------------------------
	//
	//----------------------------------------------------------------------				
	@GetMapping(path="/hello")
	public String hello() {
		
		return "Hello from API";
	}

	
	//----------------------------------------------------------------------
	// This returns nutritional states for a foodItem with {name}
	//----------------------------------------------------------------------
	// 
	@PostMapping(path = "/stats/{name}")
	public @ResponseBody List<Item> getStats(@RequestBody User user,@PathVariable String name) {	
		
		return itemRepository.getStatsCustomQuery(name,user.name); //----------------------
        
		
	}

	//----------------------------------------------------------------------
	// this is for ???
	//----------------------------------------------------------------------
	@GetMapping(path = "/name/{name}")
	public @ResponseBody List<Item> getAllFromName(@PathVariable String name) {
		return itemRepository.findByName(name);
	}

	//----------------------------------------------------------------------
	// This returns a distinct-list of names.
	// used to populate the dropdown  on the frontent
	//----------------------------------------------------------------------
	@PostMapping(path = "/list")
	public @ResponseBody List<String> getFromTemplate(@RequestBody User user) {
		//todo : rename user.name to userName in the pojo
		return itemRepository.getDistinctNamesCustomQuery(user.userEmail); 
	}



	//----------------------------------------------------------------------
	// trunscates table
	//---------------------------------------------------------------------- 
	@GetMapping(path = "/clear")
	public @ResponseBody String trauncate() {
		itemRepository.deleteAllWithQuery();
		return "cleared";
	}
	
	//----------------------------------------------------------------------
	// authenticate user using google login
	//---------------------------------------------------------------------- 
	@GetMapping(path="/auth")
	public @ResponseBody boolean authenticateUser(@RequestBody User user) throws GeneralSecurityException, IOException {


		  final JacksonFactory jsonFactory = new JacksonFactory();
		String CLIENT_ID="576524152999-o3rgla4utep5t9dde2hutd1cc6d08989.apps.googleusercontent.com";
		String idTokenString=user.idTokenString;
		String checkEmail=user.userEmail;
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
				// Specify the CLIENT_ID of the app that accesses the backend:
				.setAudience(Collections.singletonList(CLIENT_ID))
				// Or, if multiple clients access the backend:
				//.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
				.build();




		// idTokenString has to be a valid-format token. A random string will cause illegal argument exception.
		GoogleIdToken idToken;
		try {
			 idToken = verifier.verify(idTokenString);
			 
		}catch(Exception  e){
			//return "idToken string was not in the valid format. length should be 101 and no invalid symbols";
			return false;

		}


		if (idToken != null ) {
	
			Payload payload = idToken.getPayload();

			// Print user identifier
			String userId = payload.getSubject();
			System.out.println("User ID: " + userId);

			// Get profile information from payload
			String email = payload.getEmail();
			boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
			//String name = (String) payload.get("name");
			//String pictureUrl = (String) payload.get("picture");
			//String locale = (String) payload.get("locale");
			//String familyName = (String) payload.get("family_name");
			//String givenName = (String) payload.get("given_name");

			// Use or store profile information
			// ...
	
			

			return (email.equals(checkEmail));
		} else {
			return false;
		}



	}




	//----------------------------------------------------------------------
	// authenticate user using google login
	//---------------------------------------------------------------------- 
	@GetMapping(path="/test")
	public @ResponseBody String authenticateUser2(@RequestBody User user) throws GeneralSecurityException, IOException {


		  final JacksonFactory jsonFactory = new JacksonFactory();
		String CLIENT_ID="576524152999-o3rgla4utep5t9dde2hutd1cc6d08989.apps.googleusercontent.com";
		String idTokenString=user.idTokenString;

		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
				// Specify the CLIENT_ID of the app that accesses the backend:
				.setAudience(Collections.singletonList(CLIENT_ID))
				// Or, if multiple clients access the backend:
				//.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
				.build();




		// idTokenString has to be a valid-format token. A random string will cause illegal argument exception.
		GoogleIdToken idToken;
		try {
			 idToken = verifier.verify(idTokenString);
			 
		}catch(Exception  e){
			//return "idToken string was not in the valid format. length should be 101 and no invalid symbols";
			return "invalid";

		}


		if (idToken != null ) {
	/*
			Payload payload = idToken.getPayload();

			// Print user identifier
			String userId = payload.getSubject();
			System.out.println("User ID: " + userId);

			// Get profile information from payload
			String email = payload.getEmail();
			boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
			String name = (String) payload.get("name");
			String pictureUrl = (String) payload.get("picture");
			String locale = (String) payload.get("locale");
			String familyName = (String) payload.get("family_name");
			String givenName = (String) payload.get("given_name");

			// Use or store profile information
			// ...
	*/


			return "true - loggged in";
		} else {
			return "false - wrong GoogleCredential";
		}



	}

	//----------------------------------------------------------------------
	//
	//----------------------------------------------------------------------	
	private boolean check(User user){
		if(user.userEmail.equals("localhost")){
			return true;
		}

		//TODO pass User to authenticateUser()

		return false;
	}
	

	
}


