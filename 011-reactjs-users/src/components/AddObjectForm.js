import React, { Component } from 'react';

function getFormValue(form, valueName) {
    var result;
    for (var i = 0; i < form.elements.length; i++) {
        if (form.elements[i].name === valueName)
            result = form.elements[i].value;
    }
    return result;
}

const renderLabelForColumn = column => (<label className="formLabel">{column.label}:</label>);

const renderEditorForColumn = (objectType, column, selectors) => {
    if (selectors && selectors[column.name]) {
        var list = selectors[column.name];
        let options = list.map((el) =>
            <option key={el} value={el}>{el}</option>
        );
        return (<select id={"select-"+objectType+"-"+column.name} name={column.name}>{options}</select>);
    } else {
        return (<input id={"input-" + objectType + "-"+column.name} name={column.name} type="text"/>);
    }
};

const renderAddColumnsList = (objectType, columns, selectors) => {
    let rows = columns.map((column) =>
        <div key={objectType + "-" + column.name}> 
            {renderLabelForColumn(column)}
            {renderEditorForColumn(objectType, column, selectors)}
        </div>
    );
    return (<div>{rows}</div>);
};

const renderAddObjectForm = (objectType, columns, selectors, submitHandler) => (
    <div className="addObject">
        <form onSubmit={submitHandler}>
            <fieldset>
                <legend>Create new</legend>
                {renderAddColumnsList(objectType, columns, selectors)}
                <br/>
                <label>Press the button:</label>
                <input id={"submit-"+objectType} type="submit" values="Submit"/>
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

export default AddObjectForm;