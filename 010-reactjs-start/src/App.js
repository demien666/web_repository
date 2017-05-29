import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Header extends Component {
	render() {
		return (
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
		  <Clock/>
        </div>
		);
	}
}

class EnterText extends Component {
	constructor(props) {
		super(props);
		this.state={short:'', long:'', select:'1'};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleSubmit(event) {
		console.log("submitted:"+this.state.value);
		event.preventDefault();
	}
		
	handleChange(event) {
		const newVal = event.target.value;
		const name = event.target.name;
		console.log(name+" changed to "+newVal);
		this.setState({[name]:newVal});

	}	
	
	
	render() {
		return (
		   <form onSubmit={this.handleSubmit}>
		     <label>
			   Short text:
			   <input name="short" type="text" value={this.state.short} onChange={this.handleChange}/>
			 </label>
			 <br/>
		     <label>
			   Long text:
			   <textarea name="long" value={this.state.long} onChange={this.handleChange}/>
			 </label>			 
			 <br/>
			 <select name="select" value={this.state.select} onChange={this.handleChange}>
			     <option value="1">One</option>
				 <option value="2">Two</option>
				 <option value="3">Three</option>
			 </select>
		     <input type="submit" value="Submit"/>
		   </form>
		);
	}
	
}

class List extends Component {	
	render() {
		let listItems = this.props.elements.map((element,index)=>
		   <li key={index} >{element}</li>
		);
						
		return (
		  <ul>
		  {listItems}
		  </ul>
		);		
	}	
}

class Switch extends Component {
	
	constructor(props) {
		super(props);
		this.state = {value : true};
		this.toggle = this.toggle.bind(this);
	}
	
    toggle() {
		this.setState(
		   prevState=>{
			   this.setState({value:!prevState.value})
		   }
		);
	}
	
	render() {
		return (
		  <button onClick={this.toggle}> {this.state.value?'ON':'OFF'} </button>
		);
	}
	
}


function Verdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
	this.props.onTemperatureChange(e.target.value);
  }

  render() {
	const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends Component {
	constructor(props) {
		super(props);				
		this.handleCChange = this.handleCChange.bind(this);
		this.handleFChange = this.handleFChange.bind(this);
		this.state={tempC:'', tempF:''};
	}
	
	handleCChange(temperature) {
		const tempF = toFahrenheit(temperature);
		this.setState({tempC:temperature, tempF:tempF});
	}
	
	handleFChange(temperature) {
		const tempC = toCelsius(temperature);
		this.setState({tempC:tempC, tempF:temperature});
	}		
	
	render() {
		
        const celsius = this.state.tempC;
        const fahrenheit = this.state.tempF;
 		
		return(
		   <div>
		      <TemperatureInput scale="c" temperature={celsius}   onTemperatureChange={this.handleCChange}  />
			  <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFChange}  />
			  <Verdict celsius={celsius} />
		   </div>
		);
	}
	
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function Dialog(props) {
	return (
	   <div className="Dialog">
	      <div className="Dialog-title">
		     {props.title}
		  </div>
	      <div className="Dialog-message">
		     {props.message}
		  </div>
	         {props.children}
	   </div>
	);
}

class Body extends Component {
	render() {
		return (
        <p className="App-body">
          Hello world! 
		  <Switch/>
		  <List elements={["one","two","three"]}/>
		  <EnterText/>
		  <Calculator/>
		  <SplitPane left={<Switch/>} right={<Switch/>}/>
		  <Dialog title="Dialog title" message="here should be dialog message">
		      <EnterText/>
			  <EnterText/>
		  </Dialog>
        </p>		
		
		);
	}
}

class Footer extends Component {
	render() {
		return (
        <div className="App-footer">          
          <h2>the end</h2>
        </div>
		);
	}
}

class Clock extends Component {
	constructor(props) {
		super(props);
		this.state = {date:new Date()};
	}
	
	tick() {
		this.setState({date:new Date()});		
	}
	
	componentWillUnmount() {
		clearInterval(this.timerId);
	}
	
	componentDidMount() {
		this.timerId = setInterval( ()=>this.tick(), 1000 );
	}
	
	render() {
		return(
		   <p>Time:{this.state.date.toString()}</p>
		);
	}
}

class App extends Component {
  render() {
    return (	  
      <div className="App">
	    <Header/>
		<Body/>
		<Footer/>
      </div>
    );
  }
}

export default App;
