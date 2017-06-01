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
                <select name={column.name}>
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
            {renderEditorForColumn(column, selectors)}
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
                <form onSubmit={submitHandler}>
                  <fieldset>
                    <legend>Create new</legend>
                    {renderAddColumnsList(objectType, columns, selectors)}
                    <br/>
                    <label>Press the button:</label>
                    <input type="submit" values="Submit"/>
                  </fieldset>
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

const renderTableRow = (columns, data) => {
    let rowContent = columns.map((column) =>
        <td key={column.name + "-" + data.id}>{data[column.name]}</td>
    );
    return (
            <tr key={data.id}>
                {rowContent}
            </tr>
            );
};

const renderTableHeader = (columns) => (
            columns.map((column) =>
                <th key={column.name}>{column.label}</th>
            )
            );

const renderTableRows = (columns, objectList) => (
            objectList.map((data) => renderTableRow(columns, data))
            );

const renderTable = (columns, objectList) => {
    if (!objectList || objectList.length === 0)
        return null;
    return(
            <div>
                <h3>List of existing:</h3>
                <table className="objectListTable">
                    <tbody>
                        <tr>
                            {renderTableHeader(columns)}
                        </tr>               
                        {renderTableRows(columns, objectList)}
                    </tbody>        
                </table>
            </div>
            );
};

const renderObjectListForm = (objectType, title, columns, objectList, creationHadler, selectors) => (
            <div className="objectList">
                <h2>{title}</h2>
                    <AddObjectForm onSubmit={creationHadler} columns={columns} selectors={selectors} objectType={objectType}/>
                    <br/>
                    {renderTable(columns, objectList)}
            </div>
            );

class ObjectList extends Component {
    constructor(props) {
        super(props);
        this.handleObjectCreation = this.handleObjectCreation.bind(this);
    }

    handleObjectCreation(obj) {
        this.props.handleObjectCreation(obj);

    }

    render() {
        return renderObjectListForm(this.props.objectType, this.props.title, this.props.columns, this.props.objectList, this.handleObjectCreation, this.props.selectors);
    }

}

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
