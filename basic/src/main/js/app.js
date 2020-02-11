



import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import client from './client';

import NameForm from './NameForm';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";



// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {foods: [0]};
		
		

		this.handleChildFunc = this.handleChildFunc.bind(this);
		this.test = this.test.bind(this);
		
	}

	/*
	//this function needs babel inorder to work
	incrementCount = () => {
		
	  }
*/

test(){
	alert(this.state.foods);
}

	getDate(){
		let newDate = new Date()
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

	componentDidMount() {
		let today = this.getDate();
		this.test();
		client({method: 'GET', path: "/demo/date/"+today}).done(response => {
			this.setState({foods: response.entity});
			
		});
	}

	// when form is submitted update the food-table
	handleChildFunc(){
		
		client({method: 'GET', path: '/demo/mongo'}).done(response => {
			this.setState({foods: response.entity});
			
		});
	}

	//called from child
	handleDateChange(arg){
		alert('handledatechange: '+arg);
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
// end::app[]


class FoodList extends React.Component{
	


	render() {
		const foods = this.props.foods.map(food =>
			<Food key={food.id} food={food}/>
			
		);
		return (
			<table>
				app
				<tbody>
					
					<tr>
						
						<th>name</th>
						<th>calories</th>
						<th>amount</th>
						<th>ratio cals</th>
						<th>ratio amount</th>
						<th>time</th>
						
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
				<td>{this.props.food.consumed_calories}</td>
				<td>{this.props.food.consumed_unit}{this.props.food.consumed_label}</td>
				<td>{this.props.food.ratio_calories}</td>
				<td>{this.props.food.ratio_unit}{this.props.food.ratio_label}</td>
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
				 <input type="button" value="<-" onClick={() => this.handleClick(-1)} />
				 <input type="button" value="today" onClick={() => this.handleClick(0)} />
				 <input type="button" value="->"  onClick={() => this.handleClick(1)} />
			<p>prev X next</p>
			</>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)





