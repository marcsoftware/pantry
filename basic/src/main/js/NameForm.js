import React from 'react';
import ReactDOM from 'react-dom';
import { create, all } from 'mathjs'
import client from './client';

const math = create(all);
class NameForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {value: '',names: []};
  	
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.getFormData = this.getFormData.bind(this);
	
	  this.populateDropdown();
	}
  
	handleChange(event) {
	  //this.setState({value: event.target.value});
	  this.setState({ [event.target.name]: event.target.value });
	  
	}

	checkUndefined(x){
		if(x === "undefined"){
			x="";
			return "";
		}else{
			x=x;
			return x;
		}
	}

	// TODO use data to populate dropdown
	// might need to call on componentDidMount also
	populateDropdown(){
		client({method: 'GET', path: "/demo/list/food"}).done(response => {
			this.setState({names: response.entity});
			
		});
	}

	  // DESCRIPTION : processes form data before sending
	  // do math (algebra and +-/*)
	  // convert to JSON or string so that sendData can use it.
	  //
	  getFormData(){

			//deal with undefined problem
			if(typeof this.state.amount == 'undefined'){
				this.state.amount="";
			}
			if(typeof this.state.calories  == 'undefined'){
				this.state.calories="";
			}
			if(typeof this.state.ratio_amount  == 'undefined'){
				this.state.ratio_amount="";
			}
			if(typeof this.state.ratio_calories  == 'undefined'){
				this.state.ratio_calories="";
			}

			const catchLetters = new RegExp(/[^\d\/\\\+\-\*\.]/g); // \w will catch numbers so have to do it long way
			const catchMath = new RegExp(/[\d\/\\\+\-\*\s\.]/g);
			//
			var form_json=({
				 
				"name": this.state.name,
				"consumed_calories": this.state.calories.replace(catchLetters, ""),
				"consumed_label":this.state.amount.replace(catchMath, ""),//delete math including space
				"consumed_unit":this.state.amount.replace(catchLetters, ""), //delete non-math
				"ratio_calories": this.state.ratio_calories.replace(catchLetters, ""),
				"ratio_label": this.state.ratio_amount.replace(catchMath, ""),
				"ratio_unit": this.state.ratio_amount.replace(catchLetters, "")
			})
			
			return form_json;
	  }
  
	  sendData(form_json) {
	
		//save to database
		fetch('/demo/food', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form_json)
		})

	  }
	 
	handleSubmit(event) {
		// stop form from being clear is name is blank but other fields are not
		if(typeof this.state.name == 'undefined'){
			return;
		}

		var joined = this.state.names.concat(name);
		this.setState({ names: joined })
		this.state.names.push(name); // TODO need to make dropdown re-render
		var form_json=this.processForm();
		
		this.sendData(form_json);
		this.props.myFunc(); // tell parent to update the food-grid componet
		this.clearForm();
		event.preventDefault();
	}

	evaluateArithmeticExpressions(food){

		food.consumed_calories=this.evaluateMath(food.consumed_calories);
		food.consumed_unit=this.evaluateMath(food.consumed_unit);
		food.ratio_calories=this.evaluateMath(food.ratio_calories);
		food.ratio_unit=this.evaluateMath(food.ratio_unit);
	
		return food;
	}

	// accepts a string like "1*5/2"
	// and returns a float
	evaluateMath( expression){
		
		return parseFloat(math.evaluate(expression));
	}

	processForm(){ 
		
		var	food=this.getFormData();
		food=this.evaluateArithmeticExpressions(food);
		food=this.doAlgebra(food);
		return food;
	}

	// 
	doAlgebra(food){

		if(food.ratio_label===food.consumed_label && Number.isNaN(food.consumed_calories)){
			food.consumed_calories=food.ratio_calories*(food.consumed_unit/food.ratio_unit);
		}
		
		return food;
	}
	
	clearForm () { 
		document.getElementById("create-food-form").reset();
	  }

	render() {
	  return (
		<form id="create-food-form">
			<label>
				Name:
				<input type="text" list="suggest" name="name" onChange={this.handleChange} /><br/>
			</label>

			<DropDown names={this.state.names}   />

			<label>
				consumed amount:
				<input type="text" name="amount" onChange={this.handleChange} /><br/>
			</label>
			
			<label>
				consumed calories:
				<input type="text" name="calories" onChange={this.handleChange} /> automatically calculated from ratio<br/>
			</label>

			<label>
				ratio amount:
				<input type="text" name="ratio_amount" onChange={this.handleChange} /><br/>
				ratio calories:
				<input type="text" name="ratio_calories" onChange={this.handleChange} /><br/>
			</label><br/>

		  <input type="button" value="Submit" onClick={this.handleSubmit} />
		   
		</form>
	  );
	}
  }

  
class DropDown extends React.Component{
	
	render() {
		const names = this.props.names.map(name =>
			<option value={name} key={name}/>
			
		);
	
		return (
				
			<datalist id="suggest">
				{names}
			</datalist>
		
		)
	}
}

export default NameForm;