package com.example.pantry;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Item {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;

	public String name;
	public String consumed_calories;
	public String consumed_label;
	public String consumed_unit;

	public String ratio_calories;
	public String ratio_label;
	public String ratio_unit;

	public String date;
	public String time;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


}
