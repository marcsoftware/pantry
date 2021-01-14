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
    
    List<User> findByUserEmail(String userEmail);



    /*
    INSERT INTO yourTable (userEmail, temporaryToken)
VALUES (?1, ?2)
ON DUPLICATE KEY UPDATE
    temporaryToken=?2



    ON DUPLICATE KEY UPDATE 
     @Query("update Customer c set c.name = :name WHERE c.id = :customerId")
     void setCustomerName(@Param("customerId") Long id, @Param("name") String name);

        INSERT INTO subs
          (subs_name, subs_email, subs_birthday)
        VALUES
          (?, ?, ?)
        ON DUPLICATE KEY UPDATE
          subs_name     = VALUES(subs_name),
          subs_birthday = VALUES(subs_birthday)
  
    */
    

}
