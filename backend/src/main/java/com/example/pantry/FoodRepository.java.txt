package com.example.pantry;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface FoodRepository extends MongoRepository<Food, String> {

    List<Food> findByDate(String date);
    List<Food> findByName(String name);
    
}
