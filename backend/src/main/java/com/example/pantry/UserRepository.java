package com.example.pantry;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


import com.example.pantry.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {
    
    List<User> findByName(String name);

     @Query("select DISTINCT u.name from User u where u.userEmail= ?1 ")
    List<String> getDistinctNamesCustomQuery(String userEmail); // 

    /*
INSERT INTO subs
  (subs_name, subs_email, subs_birthday)
VALUES
  (?, ?, ?)
ON DUPLICATE KEY UPDATE
  subs_name     = VALUES(subs_name),
  subs_birthday = VALUES(subs_birthday)
  
    */
    

}
