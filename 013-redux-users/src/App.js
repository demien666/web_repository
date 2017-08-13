import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import	{	connect	}	from	'react-redux'
import {renderTable} from './components/Table'


class App extends Component {
  render() {
    const	user	=	this.props.users[0]
    var userColumns = [{name: "id", label: "Id"}, {name: "name", label: "Name"}, {name: "email", label: "Email"}];
   
    const onUpdateHandler = (obj) => {
      console.log(obj);
    }



    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
           UserName:{user.getName()}
        </p>
        <p>
           {renderTable("User", userColumns, this.props.users, onUpdateHandler)}
        </p>  
      </div>
    );
  }
}

function	mapStateToProps	(state)	{
		return	{
				users:	state.users
		}
}
export	default	connect(mapStateToProps)(App)
