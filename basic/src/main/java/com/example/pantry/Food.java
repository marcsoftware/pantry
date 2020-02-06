package com.example.pantry;

import org.springframework.data.annotation.Id;


public class Food{

	@Id
	public String id;

	public String name;
	public String email;

	public Food() {}

	public Food(String name, String email) {
		this.name = name;
		this.email = email;
	}

	@Override
	public String toString() {
		return String.format(
				"Customer[id=%s, name='%s', email='%s']",
				id, name, email);
	}

}

