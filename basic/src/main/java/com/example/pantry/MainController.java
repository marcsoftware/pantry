package com.example.pantry;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.ResponseBody;



import com.mongodb.client.DistinctIterable;
import com.mongodb.client.MongoCursor;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/demo") // This means URL's start with /demo (after Application path)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class MainController {
	@Autowired
	private ItemRepository itemRepository;

	@Autowired
	private FoodRepository FoodRepository;

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


	// TODO use mysql for list name
	@GetMapping(path = "/list/{name}")
	public @ResponseBody List<String> getFromTemplate(@PathVariable String name) {
		List<String> categoryList = new ArrayList<>();
		
		DistinctIterable<String> distinctIterable = 
					mongoTemplate.getCollection("food").distinct("name",String.class);
		
		MongoCursor<String> cursor = distinctIterable.iterator();
		while (cursor.hasNext()) {
			String category = (String)cursor.next();
			categoryList.add(category);
		}
		return categoryList;
	}

	// TODO use mysql for stats name
	@GetMapping(path = "/stats/{name}")
	public @ResponseBody List<String> getStats(@PathVariable String name) {
		//------
		List<String> labelList = new ArrayList<>();
		Query query6 = new Query();
		query6.addCriteria(Criteria.where("name").regex(name, "i").and("ratio_calories").ne(null));

		List<Food> userTest6 = mongoTemplate.find(query6, Food.class);
		System.out.println("query6 - " + query6.toString());

		for (Food food : userTest6) {
			System.out.println("userTest6 - " + food);
			String[] item = food.toString().split(",");
			if(!food.toString().contains("null") && !labelList.contains(item[0])){
				labelList.add(item[0]);
				labelList.add(item[1]);
				labelList.add(item[2]);
			}
		}

		//----------

		return labelList;
	}

	

	
}

