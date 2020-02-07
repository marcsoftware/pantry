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
  
	getData() {
		// create a new XMLHttpRequest
		var xhr = new XMLHttpRequest()
	
		// get a callback when the server responds
		xhr.addEventListener('load', () => {
		  // update the state of the component with the result here
		  alert(xhr.responseText)
		})
		// open the request with the verb and the url
		xhr.open('GET', '/demo/mongo')
		// send the request
		xhr.send()
	  }

	 

	handleSubmit(event) {
	  ('form was submitted: ' + this.state.name);
	  this.getData();
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