import	React,	{	PropTypes,	Component	}	from	'react'

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

export function renderTable (objectType, columns, objectList) {
    if (!objectList || objectList.length === 0)
        return null;
    return(
            <div>
                <h3>List of existing:</h3>
                <table id={"table-"+objectType} className="objectListTable">
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