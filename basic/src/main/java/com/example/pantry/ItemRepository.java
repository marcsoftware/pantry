package com.example.pantry;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

import com.example.pantry.Item;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ItemRepository extends CrudRepository<Item, Integer> {
    List<Item> findByDate(String date);
    List<Item> findByName(String name);
}
