package com.example.pantry;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Integer id;

	public String name;

	public String userEmail;

 	public String idTokenString;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getIdTokenString() {
		return idTokenString;
	}

	public void setIdTokenString(String idTokenString) {

		this.idTokenString = idTokenString;
	}
}
