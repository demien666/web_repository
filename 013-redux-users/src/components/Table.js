import React from 'react'

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/*
    let rowContent = columns.map((column) =>       
        <td key={column.name + "-" + data.id}>{data[column.name]}</td>
    );
    */
const getProperty = (data, propertyName) => {
    let value = data[propertyName];
    if (value === undefined) {
        const getMethodName = "get" + capitalizeFirstLetter(propertyName);
        value = data[getMethodName].apply(data);
    }
    return value;
}

const renderTableRow = (columns, data, onUpdate, onDelete) => {
    const id = getProperty(data, "id");
    let rowContent = [];
    columns.map((column) => {
        const value = getProperty(data, column.name);
        rowContent.push(<td key={column.name + "-" + id}>{value}</td>);
        return null;
    });

    rowContent.push(<td> <button onClick={e => {
        e.preventDefault()
        onUpdate(data)
    }} >Update</button>  </td>);
    rowContent.push(<td> <button>Delete</button>  </td>);

    return (<tr key={data.id}>{rowContent}</tr>);
};


const renderTableHeader = (columns) => {
    let headerContent = [];
    columns.map((column) =>
        headerContent.push(<th key={column.name}>{column.label}</th>)
    );
    headerContent.push(<th>Update</th>);
    headerContent.push(<th>Delete</th>);
    return headerContent;
}
/*
const renderTableHeader = (columns) => (
    columns.map((column) =>
        <th key={column.name}>{column.label}</th>
    )
);
*/
const renderTableRows = (columns, objectList, onUpdate, onDelete) => (
    objectList.map((data) => renderTableRow(columns, data, onUpdate, onDelete))
);

export function renderTable(objectType, columns, objectList, onUpdate, onDelete) {
    if (!objectList || objectList.length === 0)
        return null;
    return (
        <div>
            <h3>List of existing:</h3>
            <table id={"table-" + objectType} className="objectListTable">
                <tbody>
                    <tr>
                        {renderTableHeader(columns)}
                    </tr>
                    {renderTableRows(columns, objectList, onUpdate, onDelete)}
                </tbody>
            </table>
        </div>
    );
};