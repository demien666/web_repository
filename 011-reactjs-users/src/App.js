import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function getFormValue(form, valueName) {
    var result;
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name === valueName)
            result = form.elements[i].value;
    }
    return result;
}

class AddObjectForm extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var form = event.target;
        var formObject = {};
        this.props.columns.forEach((column) => formObject[column.name] = getFormValue(form, column.name));
        this.props.onSubmit(formObject);
    }

    getLabelForColumn(column) {
        return (
                <td className="formLabel"> 
                    <label>{column.label}</label>  
                </td>
                )
    }

    getEditorForColumn(column) {
        return (
                <td> 
                    <input name={column.name} type="text"/>  
                </td>
                )
    }

    render() {
        let tableRows = this.props.columns.map((column) =>
            <tr key={this.props.objectType + "-" + column.name}> 
                {this.getLabelForColumn(column)}
                {this.getEditorForColumn(column)}
            </tr>
        );

        return (
                <div className="addObject">
                    <h3>Create new:</h3>
                    <form onSubmit={this.handleSubmit}>
                        <table className="addObjectTable">
                            <tbody> 		   		  
                                {tableRows}  
                                <tr>
                                    <td className="formLabel">Press the button:</td>
                                    <td> <input type="submit" values="Submit"/> </td>  
                                </tr>			
                            </tbody> 
                        </table>
                    </form>  
                </div>
                );
    }
}

function TableRow(props) {
    let rowContent = props.columns.map((column) =>
        <td key={column.name + "-" + props.data.id}>{props.data[column.name]}</td>
    );
    return (
            <tr>
                {rowContent}
            </tr>
            )
}

class ObjectList extends Component {
    constructor(props) {
        super(props);
        this.handleObjectCreation = this.handleObjectCreation.bind(this);
    }

    handleObjectCreation(obj) {
        this.props.handleObjectCreation(obj);

    }

    render() {
        let tableContent = null;
        if (this.props.objectList.length > 0) {
            let tableRows = this.props.objectList.map((element) =>
                <TableRow key={element.id} data={element} columns={this.props.columns} />
            );
            let tableHeader = this.props.columns.map((column) =>
                <th key={column.name}>{column.label}</th>
            );

            tableContent =
                    <div>
                        <h3>List of existing:</h3>
                        <table className="objectListTable">			
                            <tbody>
                                <tr>{tableHeader}</tr>
                                {tableRows}
                            </tbody>
                        </table>
                    </div>
        }

        return (
                <div className="objectList">
                    <h2>{this.props.title}</h2>
                    <AddObjectForm onSubmit={this.handleObjectCreation} columns={this.props.columns} objectType={this.props.objectType}/>
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
        this.state = {depList: [], userList: []};
    }	

    handleDepartmentCreation(department) {
        this.setState(
                prevState => {
                    var list = prevState.depList;
                    list.push(department);
                    this.setState({depList: list})
                }
        );
    }

    handleUserCreation(user) {
        this.setState(
                prevState => {
                    var list = prevState.userList;
                    list.push(user);
                    this.setState({userList: list})
                }
        );
    }	

    render() {
        var depColumns = [{name: "id", label: "Id"}, {name: "name", label: "Name"}];
        var userColumns = [{name: "id", label: "Id"}, {name: "name", label: "Name"}, {name: "emal", label: "Email"}, {name: "department", label: "Department"}];
        return (
                <div>
                    <ObjectList objectList={this.state.depList} handleObjectCreation={this.handleDepartmentCreation} columns={depColumns} objectType="departments" title="Departments" />
                    <ObjectList objectList={this.state.userList} handleObjectCreation={this.handleUserCreation} columns={userColumns} objectType="users" title="Users" />
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
