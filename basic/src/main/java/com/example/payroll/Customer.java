package com.example.payroll;

import org.springframework.data.annotation.Id;


public class Customer {

	@Id
	public String id;

	public String name;
	public String email;

	public Customer() {}

	public Customer(String name, String email) {
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

