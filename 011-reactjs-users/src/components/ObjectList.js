import React, { Component } from 'react';
import AddObjectForm from './AddObjectForm';

const renderTableRow = (columns, data) => {
    let rowContent = columns.map((column) =>
        <td key={column.name + "-" + data.id}>{data[column.name]}</td>
    );
    return (<tr key={data.id}>{rowContent}</tr>);
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

export default ObjectList;