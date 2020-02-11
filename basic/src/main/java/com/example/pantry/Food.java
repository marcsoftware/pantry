package com.example.pantry;

import javax.persistence.Temporal;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;   

import org.springframework.data.annotation.Id;


public class Food{

	@Id
	public String id;

	public String name;
	public String consumed_calories;
	public String consumed_label;
	public String consumed_unit;

	public String ratio_calories;
	public String ratio_label;
	public String ratio_unit;


	public String date;
	public String time;
	
	public Food() {}

	public Food(String name, 
				String consumed_calories,
				String consumed_label,
				String consumed_unit,

				String ratio_calories,
				String ratio_label,
				String ratio_unit
				 
	) {
		this.name = name;

		this.consumed_calories=consumed_calories;
		this.consumed_label=consumed_label;		
		this.consumed_unit=consumed_unit;

		this.ratio_calories=ratio_calories;
		this.ratio_label=ratio_label;
		this.ratio_unit=ratio_unit;

		//TODO make this a function
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");  
		DateTimeFormatter clock_formater = DateTimeFormatter.ofPattern("HH:mm:ss");  
		LocalDateTime now = LocalDateTime.now();  
		this.date=dtf.format(now);
		this.time=clock_formater.format(now);
	
	}

	public void setDate(){
		//TODO make this a function
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");  
		DateTimeFormatter clock_formater = DateTimeFormatter.ofPattern("HH:mm:ss");  
		LocalDateTime now = LocalDateTime.now();  
		this.date=dtf.format(now);
		this.time=clock_formater.format(now);
	
	}

	@Override
	public String toString() {
		return String.format(
				"Customer[id=%s, name='%s', calories='%s']",
				id, name, consumed_calories);
	}

}

