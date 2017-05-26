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

class Body extends Component {
	render() {
		return (
        <p className="App-intro">
          Hello world! 
		  <Switch/>
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
