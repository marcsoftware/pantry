package com.example.pantry;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

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
	MongoTemplate mongoTemplate;


	@PostMapping(path="/food") 
	public @ResponseBody String addUser(@RequestBody Item item) {
		item.setDate();
		itemRepository.save(item);
		return "Saved mysql";
	}


	
	//
	@GetMapping(path="/food")
	public @ResponseBody Iterable<Item> getAllUsers() {
		// This returns a JSON or XML with the users
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
	// TODO use mysql for stats name
	@GetMapping(path = "/stats/{name}")
	public @ResponseBody List<String> getStats(@PathVariable String name) {
		//------
		return itemRepository.getDistinctNamesCustomQuery();
	}

	

	
}

