package com.example.pantry;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


import com.example.pantry.Item;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ItemRepository extends CrudRepository<Item, Integer> {
    List<Item> findByDate(String date);
    List<Item> findByName(String name);
    
    @Query("select DISTINCT u.name from Item u")
    List<String> getDistinctNamesCustomQuery();

    //label unit calories
    //"select u.ratio_label,u.ratio_unit, u.ratio_calories from Item u where u.name= ?1"
    @Query("select distinct u.ratio_label,u.ratio_unit, u.ratio_calories from Item u where u.name= ?1 and u.ratio_label != 'null' and u.ratio_calories != 'null' ")
    List<Item> getStatsCustomQuery(String name);    

    @Modifying
    @Transactional
    @Query("delete from Item m") 
    void deleteAllWithQuery();

}
