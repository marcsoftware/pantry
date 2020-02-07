

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
// end::vars[]
//import React from "react";
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
	}

	componentDidMount() {
		client({method: 'GET', path: '/demo/mongo'}).done(response => {
			this.setState({foods: response.entity});
		});
	}

	render() {
		return (
			<>
			<Home/>
			<FoodList foods={this.state.foods}/>
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
				<td>{this.props.food.consumed_unit} {this.props.food.consumed_label}</td>
				
				<td>{this.props.food.ratio_calories}</td>
				<td>{this.props.food.ratio_unit} {this.props.food.ratio_label}</td>
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
// end::render[]

function Blank(){
	return <h3>blank</h3>
}

function Blank2(){
	return <h3>blank2</h3>
}

function Blank3(){
	return <h3>blank3</h3>
}

function Home() {
	return <Router>
	<div>
	  app
	  <nav>
		<ul>
		  <li>
			<Link to="/">home</Link>
		  </li>
		  <li>
			<Link to="/two">two</Link>
		  </li>
		  <li>
			<Link to="/three">three</Link>
		  </li>
		</ul>
	  </nav>

	  {/* A <Switch> looks through its children <Route>s and
		  renders the first one that matches the current URL. */}
	  <Switch>
	   
		<Route path="/two">
		  <Blank2 />
		</Route>
		<Route path="/three">
		  <Blank3 />
		</Route>
	  </Switch>
	</div>
  </Router>
  }