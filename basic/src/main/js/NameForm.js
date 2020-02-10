import React from 'react';
import ReactDOM from 'react-dom';


class NameForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {value: ''};
  
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);

	}
  
	handleChange(event) {
	  //this.setState({value: event.target.value});
	  this.setState({ [event.target.name]: event.target.value });
	  
	}
  
	  sendData() {
		
		fetch('/demo/json', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				 
				"name": this.state.name,
				"consumed_calories": this.state.calories,
				"consumed_label":this.state.amount.replace(/[0-9\s]/g, ""),
				"consumed_unit":this.state.amount.replace(/\D/g, ""),
				"ratio_calories": this.state.ratio_calories,
				"ratio_label": this.state.ratio_amount.replace(/[0-9\s]/g, ""),
				"ratio_unit": this.state.ratio_amount.replace(/\D/g, "")
			})
		})

	
	
	  }
	 

	handleSubmit(event) {
	  ('form was submitted: ' + this.state.name);
	  this.sendData();
	  this.props.myFunc(); // tell parent to update the food-grid componet
	  
	  event.preventDefault();
	}
  
	render() {
	  return (
		<form >
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