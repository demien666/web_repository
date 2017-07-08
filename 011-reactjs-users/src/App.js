import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ObjectList from './components/ObjectList';


function departmentCreation(department) {
    this.setState(
            prevState => {
                var list = prevState.depList;
                var depSelectors = prevState.selectors;
                var selector = depSelectors.department ? depSelectors.department : [];
                list.push(department);
                selector.push(department.name);
                depSelectors.department = selector;
                this.setState({depList: list});
                this.setState({selectors: depSelectors});

            }
    );
}

function userCreation(user) {
    this.setState(
            prevState => {
                var list = prevState.userList;
                list.push(user);
                this.setState({userList: list});
            }
    );
}

class Body extends Component {

    constructor(props) {
        super(props);
        this.handleDepartmentCreation = departmentCreation.bind(this);
        this.handleUserCreation = userCreation.bind(this);
        this.state = {depList: [], userList: [], selectors: {}};
    }

    render() {
        var depColumns = [{name: "id", label: "Id"}, {name: "name", label: "Name"}];
        var userColumns = [{name: "id", label: "Id"}, {name: "name", label: "Name"}, {name: "email", label: "Email"}, {name: "department", label: "Department"}];
        return (
                <div>
                    <ObjectList objectList={this.state.depList} handleObjectCreation={this.handleDepartmentCreation} columns={depColumns} objectType="departments" title="Departments" />
                    <ObjectList objectList={this.state.userList} selectors={this.state.selectors} handleObjectCreation={this.handleUserCreation} columns={userColumns} objectType="users" title="Users" />
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
