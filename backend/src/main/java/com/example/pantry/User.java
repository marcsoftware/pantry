package com.example.pantry;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Column;

@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	public Integer id;

	public String name;

	@Column(unique = true)
	public String userEmail;

 	public String temporaryToken;
 	public String googleToken;
 	public String fitbitToken;
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

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getTemporaryToken() {
		return temporaryToken;
	}

	public void setTemporaryToken(String temporaryToken) {

		this.temporaryToken = temporaryToken;
	}


		//
	public String getGoogleToken() {
		return googleToken;
	}

	public void setGoogleToken(String googleToken) {

		this.googleToken = googleToken;
	}

		//
	public String getFitbitToken() {
		return fitbitToken;
	}

	public void setFitbitToken(String fitbitToken) {

		this.fitbitToken = fitbitToken;
	}


		//
	public String getIdTokenString() {
		return idTokenString;
	}

	public void setIdTokenString(String idTokenString) {

		this.idTokenString = idTokenString;
	}
}
