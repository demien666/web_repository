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

const renderLabelForColumn = column => (
            <label className="formLabel">{column.label}:</label>
            );

const renderEditorForColumn = (column, selectors) => {
    if (selectors && selectors[column.name]) {
        var list = selectors[column.name];
        let options = list.map((el) =>
            <option key={el} value={el}>
                {el}
            </option>
        );
        return (
                <select>
                    {options}
                </select>
                );
    } else {
        return (
                <input name={column.name} type="text"/>
                );
    }
};

const renderAddColumnsList = (objectType, columns, selectors) => {
    let rows = columns.map((column) =>
        <div key={objectType + "-" + column.name}> 
            {renderLabelForColumn(column)}
            <br/>
            {renderEditorForColumn(column, selectors)}
            <br/>
        </div>
    );
    return (
            <div>
                {rows}
            </div>
            );
};

const renderAddObjectForm = (objectType, columns, selectors, submitHandler) => (
            <div className="addObject">
                <h3>Create new:</h3>
                <form onSubmit={submitHandler}>
                    {renderAddColumnsList(objectType, columns, selectors)}
                    <br/>
                    <label>Press the button:</label>
                    <input type="submit" values="Submit"/>                
                </form>  
            </div>
            );

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

    render() {
        return renderAddObjectForm(this.props.objectType, this.props.columns, this.props.selectors, this.handleSubmit);
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
            );
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
                    <AddObjectForm onSubmit={this.handleObjectCreation} columns={this.props.columns} selectors={this.props.selectors} objectType={this.props.objectType}/>
                    <br/>
                    {tableContent}
                </div>
                );

    }

}

class Body extends Component {

    constructor(props) {
        super(props);
        this.handleDepartmentCreation = this.handleDepartmentCreation.bind(this);
        this.handleUserCreation = this.handleUserCreation.bind(this);
        this.state = {depList: [], userList: [], selectors: {}};
    }

    handleDepartmentCreation(department) {
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
