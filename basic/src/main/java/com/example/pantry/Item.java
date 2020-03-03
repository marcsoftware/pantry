package com.example.pantry;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;   

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

	public void setDate(){
		//
		String[] both=createTimestamp();
		this.date=(both[0]);
		this.time=(both[1]);
	
	}

	// returns an array that holds the calendar-date AND clock-time
	private static String[] createTimestamp(){
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");  
		DateTimeFormatter clock_formater = DateTimeFormatter.ofPattern("HH:mm:ss");  
		LocalDateTime now = LocalDateTime.now();  
		String calendarDate=dtf.format(now);
		String clockTime=clock_formater.format(now);
		return new String[] { calendarDate, clockTime };
	}

}
