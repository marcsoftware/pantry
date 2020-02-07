



const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');


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
			
			<Form/>
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




  function Form() {

	return <form>
	<label>
	  Name:
	  <input type="text"  name="name" /><br/>
	  consumed amount:
	  <input type="text" name="name" /><br/>
	  consumed calories:
	  <input type="text" name="name" /><br/>
	  ratio amount:
	  <input type="text" name="name" /><br/>
	  ratio calories:
	  <input type="text" name="name" /><br/>
	</label><br/>
	<input type="submit" value="Submit" />
  </form>
  }
