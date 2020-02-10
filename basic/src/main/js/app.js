



const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

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
		this.state = {foods: []};
		this.handleChildFunc = this.handleChildFunc.bind(this);
		
	}

	

	componentDidMount() {
		
		client({method: 'GET', path: '/demo/mongo'}).done(response => {
			this.setState({foods: response.entity});
			
		});
	}

	// when form is submitted update the food-table
	handleChildFunc(){
		
		client({method: 'GET', path: '/demo/mongo'}).done(response => {
			this.setState({foods: response.entity});
			
		});
	}

	

	render() {
		return (
			<>
				<NameForm myFunc={this.handleChildFunc}  />
				<FoodList foods={this.state.foods}   
						  
		        />
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
						<th>date</th>
						
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
				<td>{this.props.food.date}</td>

			</tr>
			</>
		)
	}
}



ReactDOM.render(
	<App />,
	document.getElementById('react')
)





