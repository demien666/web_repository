import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function getFormValue(form, valueName) {
	 var result;
		for ( var i = 0; i < form.elements.length; i++ ) {
			if (form.elements[i].name===valueName) result=form.elements[i].value;
        }	
	return result;	
}

class DepartmentAdd extends Component {
	
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		var form = event.target;
		this.props.onDepartmentCreate(getFormValue(form, "id"), getFormValue(form, "name"));
	}
	
	render() {
		return (
		 <div>
		 <label>Add new department:</label>
		 <form onSubmit={this.handleSubmit}>
		  <table>
           <tbody> 
		    <tr> 
			    <td> <label>Department ID:</label>  </td>  
				<td> <input name="id" type="text"/>  </td>
			</tr>
		    
		    <tr>
		      <td><label>Department Name: </label> </td>
              <td> <input name="name" type="text"/> </td>
			</tr>  

			<tr>
			 <td>Press to create user</td>
		     <td> <input type="submit" values="Create"/> </td>  
			</tr>			
		   </tbody> 
		   </table>
		 </form>  
		 </div>  
		);
	}	
}

class Departments extends Component {
	
	constructor(props) {
		super(props);
		this.handleDepartmentCreation = this.handleDepartmentCreation.bind(this);
	}
	
    handleDepartmentCreation(id, name) {
		//console.log(id+" "+name);			
        this.props.handleDepartmentCreation(id, name);
	}
		
	render() {		
		let tableContent = null;
		if (this.props.depList.length>0) {
			let tableRows = this.props.depList.map( (element) => 		
		       <tr key={element.id}> <td>{element.id}</td> <td>{element.name}</td> </tr>	
		    );
			tableContent = 

			<table>
			  <th>ID</th> <th>Name</th>
			   <tbody>
			      {tableRows}
			   </tbody>
			</table>
		}
				
		return (
		    <div className="depList">
			   <DepartmentAdd onDepartmentCreate={this.handleDepartmentCreation}/>
			   <br/>
			   {tableContent}
			</div>
		)
		
	}
}

class UserAdd extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		var form = event.target;
		this.props.onUserCreate({id: getFormValue(form, "id"), name: getFormValue(form, "name"), email:getFormValue(form, "email"), department:getFormValue(form, "department") });
	}
	
	render() {
		return (
		 <div>
		 <label>Add new user:</label>
		 <form onSubmit={this.handleSubmit}>
		  <table>
            <tbody>
		    <tr> 
			    <td> <label>User ID:</label>  </td>  
				<td> <input name="id" type="text"/>  </td>
			</tr>
		    
		    <tr>
		      <td><label>User Name: </label> </td>
              <td> <input name="name" type="text"/> </td>
			</tr>  
			
		    <tr>
		      <td><label>Email: </label> </td>
              <td> <input name="email" type="text"/> </td>
			</tr>
			
		    <tr>
		      <td><label>Department: </label> </td>
              <td> <input name="department" type="text"/> </td>
			</tr>			

			<tr>
			 <td>Press to create user</td>
		     <td> <input type="submit" values="Create"/> </td>  
			</tr>			
		   </tbody>
		   </table>
		 </form>  
		 </div> 
      )		 
	}
	
}

class Users extends Component {
	constructor(props) {
		super(props);
		this.handleUserCreation = this.handleUserCreation.bind(this);
	}
	
    handleUserCreation(user) {
        this.props.handleUserCreation(user);
	}	
	
	render() {
		
		let tableContent = null;
		if (this.props.userList.length>0) {
			let tableRows = this.props.userList.map( (element) => 		
		       <tr key={element.id}> 
			      <td>{element.id}</td> 
				  <td>{element.name}</td>
				  <td>{element.email}</td>
				  <td>{element.department}</td>
			   </tr>
		    );
			tableContent = 

			<table>
			  <th>ID</th> <th>Name</th> <th>Email</th> <th>Department</th>
			    <tbody>
			      {tableRows}
			    </tbody>
			</table>
		}		
		
		return(
		 <div className="userList">
		    <UserAdd onUserCreate={this.handleUserCreation}/>
			<br/>
			{tableContent}
		 </div>		   		  
		) 
	}
}

class Body extends Component {
	
	constructor(props) {
		super(props);
		this.handleDepartmentCreation = this.handleDepartmentCreation.bind(this);
		this.handleUserCreation = this.handleUserCreation.bind(this);
		this.state={depList:[], userList:[]};
	}	
	
    handleDepartmentCreation(id, name) {
		console.log(id+" "+name);				
		this.setState(
		   prevState=>{
			   var list = prevState.depList;
			   list.push({id:id, name:name});
			   this.setState({depList:list})
		   }
		);		
	}
	
    handleUserCreation(user) {
		this.setState(
		   prevState=>{
			   var list = prevState.userList;
			   list.push(user);
			   this.setState({userList:list})
		   }
		);		
	}	
	
	render() {
		return (
		  <div>
	         <Departments depList={this.state.depList} handleDepartmentCreation={this.handleDepartmentCreation} />
		     <Users userList={this.state.userList} handleUserCreation={this.handleUserCreation} />
		  </div> 
		);
	}
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
		<Body/>
      </div>
	  
    );
  }
}

export default App;
