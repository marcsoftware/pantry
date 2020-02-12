import React from 'react';
import ReactDOM from 'react-dom';


class NameForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {value: ''};
  
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.getFormData = this.getFormData.bind(this);

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

			//
			var form_json=JSON.stringify({
				 
				"name": this.state.name,
				"consumed_calories":parseInt( this.state.calories),
				"consumed_label":this.state.amount.replace(/[\d\/\\\+\-\*\s]/g, ""),//delete math including space
				"consumed_unit":parseInt(this.state.amount.replace(/[^\d\/\\\+\-\*\.]/g, "")), //delete non-math
				"ratio_calories": parseInt(this.state.ratio_calories),
				"ratio_label": this.state.ratio_amount.replace(/[\d\/\\\+\-\*\s]/g, ""),
				"ratio_unit": parseInt(this.state.ratio_amount.replace(/[^\d\/\\\+\-\*\.]/g, ""))
			})

			return form_json;
	  }
  
	  sendData(form_json) {
	
		//save to database
		fetch('/demo/json', {
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
		var	form_json=	this.getFormData();
		form_json=this.processForm(form_json);
		this.sendData(form_json);
		this.props.myFunc(); // tell parent to update the food-grid componet
		this.clearForm();
		event.preventDefault();
	}

	processForm(food){
		food=this.doAlgebra(food);
		return food;
	}
	// 
	doAlgebra(food){
		food=JSON.parse(food);
		
		if(food.ratio_label===food.consumed_label && food.consumed_calories===null){
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
			<input type="text" name="name" onChange={this.handleChange} /><br/>
		  </label>

		  <label>
		  consumed amount:
		  <input type="text" name="amount" onChange={this.handleChange} /><br/>
		  </label>
		  
		  <label>
		  consumed calories:
		  <input type="text" name="calories" onChange={this.handleChange} /><br/>
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

  export default NameForm;