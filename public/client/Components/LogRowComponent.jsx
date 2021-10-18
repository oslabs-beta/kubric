import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// TODOS: 
// what info/properties will we actually receive in K8S logs?
// should this info be rendered in divs and styled using grid-layout or in some other way

//list out search query results
//it will include
  //data-grid from material UI
    //columns are populated with fields from the particular log type (by indices)
    //rows are the result of the query (probably limited to 30 or 50?)
    //scrollable (not the priority)

    const rows = [  
      {
        id: 1234,
        logType: 'ERROR',
        podName: 'somePodName',
        logMessage: `here\'s a(n) ERROR message from somePodName`
      },
      {
        id: 1235,
        logType: 'APPLICATION',
        podName: 'somePodName',
        logMessage: `here\'s a(n) APPLICATION message from somePodName`
      },
      {
        id: 1236,
        logType: 'ERROR',
        podName: 'someOtherPodName',
        logMessage: `here\'s a(n) ERROR message from someOtherPodName}`
      },
    ]

    const columns = [
      {field: 'id', headerName: 'id', width: 200},
      {field: 'logType', headerName: 'type', width: 200},
      {field: 'podName', headerName: 'pod name', width: 200},
      {field: 'logMessage', headerName: 'message', width: 200}
    ]

function LogRowComponent(props){
  //write a function that will dynamically

  return (
    <div className="logRowComponent" style={{display: 'flex', width: '100%', height: 1000}}>
      <DataGrid rowHeight={120} rows = {rows} columns={columns}/>
    </div>
  );
};

export default LogRowComponent;