

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
		this.state = {employees: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/demo/mongo'}).done(response => {
			this.setState({employees: response.entity});
		});
	}

	render() {
		return (
			<>
			<Home/>
			<EmployeeList employees={this.state.employees}/>
			</>
		)
	}
}
// end::app[]

// tag::employee-list[]
class EmployeeList extends React.Component{
	//<Employee key={employee._links.self.href} employee={employee}/>
	render() {
		const employees = this.props.employees.map(employee =>
			<Employee key={employee.id} employee={employee}/>
			
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
					{employees}
				</tbody>
			</table>
		)
	}
}
// end::employee-list[]

// tag::employee[]
class Employee extends React.Component{
	render() {
		return (
			<>
			
			<tr>
				
				<td>{this.props.employee.name}</td>
				<td>{this.props.employee.consumed_calories}</td>
				<td>{this.props.employee.consumed_unit} {this.props.employee.consumed_label}</td>
				
				<td>{this.props.employee.ratio_calories}</td>
				<td>{this.props.employee.ratio_unit} {this.props.employee.ratio_label}</td>
				<td>{this.props.employee.date}</td>
				
			</tr>
			</>
		)
	}
}
// end::employee[]

// tag::render[]
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