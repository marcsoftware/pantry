import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NameForm from './NameForm';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

//
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {foods: [],date_offset:0}; 
		this.handleChildFunc = this.handleChildFunc.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.getDate = this.getDate.bind(this);
	}

	getDate(){
		let newDate = new Date();
		newDate.setDate(newDate.getDate() +(this.state.date_offset));
		let day = newDate.getDate();
		let month = newDate.getMonth() + 1;
		let year = newDate.getFullYear();

		if(day <10){
			day="0"+day; // pad with a zero
		}

		if(month <10){
			month="0"+month; // pad with a zero
		}

		return year+'-'+month+'-'+day;
	}

	//get all food items where date is today
	componentDidMount() {
		let today = this.getDate(); //todo today should be target_date
		
	/*	client({method: 'GET', path: "/demo/date/"+today}).done(response => {
			this.setState({foods: response.entity});
			
    });
    */
//https://localhost:5000/demo/food
//https://api.github.com/users/marcsoftware
			fetch('http://localhost:5000/demo/food')
			.then(response => {
				return response.json();
			  })
			.then(json => {
				
				this.setState({foods: json});
				
			});
			
	}

	// when form is submitted update the food-table
	handleChildFunc(){
		
		let today = this.getDate(); //todo today should be target_date
		
		/*		client({method: 'GET', path: "/demo/date/"+today}).done(response => {
					this.setState({foods: response.entity});
					
		});*/
		fetch('http://localhost:5000/demo/date/'+today)
			.then(response => {
				return response.json();
			  })
			.then(json => {
				
				this.setState({foods: json});
				
			});
	}

	//called from child
	//if is -1 it subtacts a day , +1 means add a day
	// if arg==0 means set to today
	handleDateChange(arg){
		
		if(arg==0){
			this.state.date_offset=0;
		}else{
			this.state.date_offset += arg;
		}

		this.handleChildFunc();
	}
	

	render() {
		return (
			<>
				<NameForm myFunc={this.handleChildFunc}  />
				<DateNavigation changeDate={this.handleDateChange} />
				<FoodList foods={this.state.foods}   />
			</>
		)
	}
}


class FoodList extends React.Component{
	
	render() {
		let style = {
			textAlign:'right',
			padding:'3px',
			border: '1px solid black'
			
		};

		const foods = this.props.foods.map(food =>
			<Food key={food.id} food={food}/>
			
		);
		return (
			<table >
				
				<tbody>
					
					<tr style={style}>
						<th style={style}>name</th>
						<th style={style}>amount</th>
						<th style={style}>calories</th>
						<th style={style}>ratio amount</th>
						<th style={style}>ratio calories</th>
						<th style={style}>time</th>
					</tr>
					
					{foods}
				</tbody>
			</table>
		)
	}
}


class Food extends React.Component{
	
	render() {
		return (
			<>
			
			<tr>
				<td>{this.props.food.name}</td>
				<td>{this.props.food.consumed_unit}{this.props.food.consumed_label}</td>
				<td>{this.props.food.consumed_calories}</td>
				<td>{this.props.food.ratio_unit}{this.props.food.ratio_label}</td>
				<td>{this.props.food.ratio_calories}</td>
				<td>{this.props.food.time}</td>

			</tr>
			</>
		)
	}
}

class DateNavigation extends React.Component{
	
	
	handleClick(arg){
		
		this.props.changeDate(arg); 
	}
	render() {
		return (
			<>
				 <input type="button" value="⯇" onClick={() => this.handleClick(-1)} />
				 <input type="button" value="today" onClick={() => this.handleClick(0)} />
				 <input type="button" value="⯈"  onClick={() => this.handleClick(1)} />
			</>
		)
	}
}


export default App;