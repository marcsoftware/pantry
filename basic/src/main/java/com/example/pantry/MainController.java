package com.example.pantry;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoAction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mongodb.client.DistinctIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Controller // This means that this class is a Controller
@RequestMapping(path = "/demo") // This means URL's start with /demo (after Application path)
public class MainController {

	@Autowired
	private FoodRepository FoodRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	@GetMapping(path = "/mongo")
	public @ResponseBody List<Food> getAllMongo() {
		return FoodRepository.findAll();
	}

	@GetMapping(path = "/date/{date}")
	public @ResponseBody List<Food> getAllFromToday(@PathVariable String date) {
		return FoodRepository.findByDate(date);
	}

	@GetMapping(path = "/name/{name}")
	public @ResponseBody List<Food> getAllFromName(@PathVariable String name) {
		return FoodRepository.findByName(name);
	}

	@GetMapping(path = "/z/{name}")
	public @ResponseBody List<String> getFromTemplate(@PathVariable String name) {
		List<String> categoryList = new ArrayList<>();
		DistinctIterable distinctIterable = mongoTemplate.getCollection("food").distinct("name",String.class);
		MongoCursor cursor = distinctIterable.iterator();
		while (cursor.hasNext()) {
			String category = (String)cursor.next();
			categoryList.add(category);
		}
		return categoryList;
	}


	@PostMapping(path= "/json",consumes = "application/json")
	public @ResponseBody String update(@RequestBody Food food) {
		food.setDate();
		FoodRepository.save(food);
		return "yes";
	}
}

