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



	@PostMapping(path="/food") 
	public @ResponseBody String addUser(@RequestBody Item item) {
		
		itemRepository.save(item);
		return "Saved mysql";
	}

	//
	@GetMapping(path="/test")
	public String  test() {
		
		return "Hello from API";
	}

	
	//
	@GetMapping(path="/food")
	public @ResponseBody Iterable<Item> getAllUsers() {
		
		return itemRepository.findAll();
	}

	@GetMapping(path = "/date/{date}")
	public @ResponseBody List<Item> getAllFromToday(@PathVariable String date) {
		return itemRepository.findByDate(date);
	}

	@GetMapping(path = "/name/{name}")
	public @ResponseBody List<Item> getAllFromName(@PathVariable String name) {
		return itemRepository.findByName(name);
	}

	//----------------------------------------------------------------------
	// This returns a distinct-list of names.
	// used to populate the dropdown  on the frontent
	//----------------------------------------------------------------------
	@GetMapping(path = "/list")
	public @ResponseBody List<String> getFromTemplate() {
		return itemRepository.getDistinctNamesCustomQuery();
	}

	//----------------------------------------------------------------------
	// This returns nutritional states for a foodItem with {name}
	//----------------------------------------------------------------------
	// 
	@GetMapping(path = "/stats/{name}")
	public @ResponseBody List<Item> getStats(@PathVariable String name) {	
		
		return itemRepository.getStatsCustomQuery(name);
        
		
	}

	//----------------------------------------------------------------------
	// trunscates table
	//----------------------------------------------------------------------
	// 
	@GetMapping(path = "/clear")
	public @ResponseBody String trauncate() {
		itemRepository.deleteAllWithQuery();
		return "cleared";
	}
	
	//----------------------------------------------------------------------
	// authenticate user using google login
	//----------------------------------------------------------------------
	// 
	@GetMapping(path="/auth")
	public @ResponseBody String authenticateUser(@RequestBody User user) throws GeneralSecurityException, IOException {


		  final JacksonFactory jsonFactory = new JacksonFactory();
		String CLIENT_ID="576524152999-o3rgla4utep5t9dde2hutd1cc6d08989.apps.googleusercontent.com";
		String idTokenString=user.idTokenString;

		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
				// Specify the CLIENT_ID of the app that accesses the backend:
				.setAudience(Collections.singletonList(CLIENT_ID))
				// Or, if multiple clients access the backend:
				//.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
				.build();





		GoogleIdToken idToken = verifier.verify(idTokenString);
		return "here 120";

	}

	

	
}


