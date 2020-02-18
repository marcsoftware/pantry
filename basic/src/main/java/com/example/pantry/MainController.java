package com.example.pantry;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Controller;
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
public class MainController {

	@Autowired
	private FoodRepository FoodRepository;

	@Autowired
	MongoTemplate mongoTemplate;

	@GetMapping(path = "/food")
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
			if(!"null".equals(item[2]) && !"null".equals(item[1]) && !"null".equals(item[0])){ //TODO edit query to ignore nulls
				labelList.add(item[0]);
				labelList.add(item[1]);
				labelList.add(item[2]);
			}
		}

		//----------

		return labelList;
	}

	@PostMapping(path= "/food",consumes = "application/json")
	public @ResponseBody String update(@RequestBody Food food) {
		food.setDate();
		FoodRepository.save(food);
		return "yes";
	}
}

