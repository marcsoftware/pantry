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
	  this.setState({value: event.target.value});
	}
  


	handleSubmit(event) {
	  alert('A name was submitted: ' + this.state.value);
	  event.preventDefault();
	}
  
	render() {
	  return (
		<form onSubmit={this.handleSubmit}>
		  <label>
			Name:
			<input type="text" value={this.state.value} onChange={this.handleChange} /><br/>
		  </label>

		  <label>
		  consumed amount:
		  <input type="text" name="name" /><br/>
		  </label>
		  
		  <label>
		  consumed calories:
		  <input type="text" name="name" /><br/>
		  </label>

		  <label>
		  ratio amount:
		  <input type="text" name="name" /><br/>
		  ratio calories:
		  <input type="text" name="name" /><br/>
		</label><br/>

		  <input type="submit" value="Submit" />
		</form>
	  );
	}
  }

  export default NameForm;