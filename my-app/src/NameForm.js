import React from 'react';
import ReactDOM from 'react-dom';
import { create, all } from 'mathjs'


//TODO put math functions in a different component

const math = create(all);
class NameForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {value: '',names: [],stats:[],labels:[]};
  	
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.getFormData = this.getFormData.bind(this);
	  this.getStats = this.getStats.bind(this);

	  this.doAlgebra = this.doAlgebra.bind(this);
	
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
		// client
		/*
		client({method: 'GET', path: "/demo/list/food"}).done(response => {
			this.setState({names: response.entity});
			
		});
		

		*/ 
/*
	    fetch('https://localhost:5000/demo/list/food')
      .then(response => response.json())
	  .then(names => this.setState({ names})  );
	  */
	}

	testForLetters(item){
		return item.search(/[a-zA-Z]/i)>-1 && item !== "null";
	}

	 

	filterLabels(list){
		list=list.filter(this.testForLetters);
		list = list.filter(function(item, index){
			return list.indexOf(item) >= index;
		});
		
		return list;
	}


	getStats(){
		if (this.state.name===""){ //if null dont waste time calling database
			return;
		}

		//client
		/*

		client({method: 'GET', path: "/demo/stats/"+this.state.name}).done(response => {
			this.setState({stats: response.entity});
			this.setState({labels:this.filterLabels(response.entity)});
		});

		*/
/*

		fetch('https://localhost:5000"/demo/stats/'+this.state.name)
		.then(response => response.json())
		.then(stats => this.setState({ stats})  )
		.then(labels => this.setState({labels:this.filterLabels(labels)} )  );
*/
	
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

			const catchLetters = new RegExp(/[^\d\/\\\+\-\*\.\ ]/g); // \w will catch numbers so have to do it long way
			const catchMath = new RegExp(/[\d\/\\\+\-\*\s\.\ ]/g);
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
	/*	fetch('/demo/food', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form_json)
		})
*/
	  }
	 
	handleSubmit(event,name) {
		// stop form from being clear is name is blank but other fields are not
		if(typeof this.state.name == 'undefined'){
			return;
		}
		this.getStats();//
		var joined = this.state.names.concat(name);
		this.setState({ names: joined })
		this.state.names.push(name); // TODO need to make dropdown re-render
		var form_json=this.processForm();
		
		this.sendData(form_json);
		this.props.myFunc(); // tell parent to update the food-grid componet
		this.clearForm();
		this.state = {value: '',names: [],stats:[],labels:[]};
		event.preventDefault();
	}

	evaluateArithmeticExpressions(food){

		food.consumed_calories=this.evaluateMath(food.consumed_calories);
		food.consumed_unit=this.evaluateMath(food.consumed_unit);
		food.ratio_calories=this.evaluateMath(food.ratio_calories);
		food.ratio_unit=this.evaluateMath(food.ratio_unit);
	
		return food;
	}

	// accepts a string like "2*5/2"
	// and returns a float like 5.0
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
		if(food.ratio_label === "" && food.consumed_label !== ""){
			//then look up label
			var index = this.state.stats.indexOf(food.consumed_label);
			
			food.ratio_unit=this.state.stats[index+1];
			food.ratio_label=this.state.stats[index+0];
			food.ratio_calories=this.state.stats[index+2];		
		}

		if(food.ratio_label===food.consumed_label && Number.isNaN(food.consumed_calories)){
			food.consumed_calories=food.ratio_calories*(food.consumed_unit/food.ratio_unit);
		}
		
		return food;
	}
	
	clearForm () { 
		document.getElementById("create-food-form").reset();
	  }

	render() {
		
		let style = {
			textAlign:'right',
			border: 'none'
			
		};

		let buttonStyle = {
			backgroundColor: "#4CAF50",
			border: "none",
			color: "white",
			textAlign: "center",
			textDecoration: "none",
			display: "inline-block",
			fontSize: "16px"
			
		};

	  return (
		  <>
		  <table style={style}> 
			  <tr style={style}>
				<th style={style}>
					<form id="create-food-form" style={style}>
						
						<label>
							Name:
							<input type="text" list="suggest" name="name"  
							onBlur={this.getStats}
							onChange={this.handleChange} /><br/>
						</label>

						<DropDown names={this.state.labels}   />

						<label>
							consumed amount:
							<input type="text" name="amount" onChange={this.handleChange} /><br/>
						</label>
				
						<label>
							consumed calories:
							<input type="text" name="calories" onChange={this.handleChange} /> <br/>
						</label>

						<label>
							ratio amount:
							<input type="text" name="ratio_amount" onChange={this.handleChange} /><br/>
							ratio calories:
							<input type="text" name="ratio_calories" onChange={this.handleChange} /><br/>
						</label><br/>

					<input type="button" value="save to database" style={buttonStyle} onClick={this.handleSubmit} />
					
					</form>
				</th>
				<th style={style}>
					<RatioTable stats={this.state.stats} />
				</th>
			</tr>
		</table>
		</>
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

class RatioTable extends React.Component{

	render() {
		const items = []

		for (var x=0;x<this.props.stats.length;x+=3) {
			items.push(<li key={x}>{this.props.stats[x+1]}{this.props.stats[x]} = {this.props.stats[x+2]}calories </li>)
		}
	
		let styles = {
			listStyleType: 'square',
			
		  };

		return (
				
			<div>
				<ol style={styles}>
					{items}
				</ol>
			</div>
		
		)
	}
}

export default NameForm;