package com.example.pantry;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller	// This means that this class is a Controller
@RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
public class MainController {

	

	@Autowired
	private FoodRepository FoodRepository;

	@PostMapping(path="/add") // Map ONLY POST Requests
	public @ResponseBody String addNewUser (@RequestParam String name
			, @RequestParam String email) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

	  Food c = new Food(name,email,"X","X","X","X","X");
	
	
	  FoodRepository.save(c);

	
		return "Saved";
	}



	@GetMapping(path="/mongo")
	public @ResponseBody List<Food> getAllMongo() {
		return FoodRepository.findAll();
	}


	@GetMapping(path="/date/{date}")
	public @ResponseBody List<Food> getAllFromToday(@PathVariable String date) {
		return FoodRepository.findByDate(date);
	}

	@GetMapping(path="/name/{name}")
	public @ResponseBody List<Food> getAllFromName(@PathVariable String name) {
		return FoodRepository.findByName(name);
	}


	@PostMapping(path= "/json",consumes = "application/json")
	public @ResponseBody String update(@RequestBody Food food) {
		food.setDate();
		FoodRepository.save(food);
		return "yes";
	}
}

