import React, {useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

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
];

const columns = [
  {field: 'id', headerName: 'id', width: 200},
  {field: 'logType', headerName: 'type', width: 200},
  {field: 'podName', headerName: 'pod name', width: 200},
  {field: 'logMessage', headerName: 'message', width: 200}
];

const useStyles = makeStyles({
  root:{
    background: 'rgba(46, 49, 49, 1)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 480, 
    width: '100%', 
    // borderRadius: 10,
    padding: '0 30px'
  },
  footerContainer: {
    height: "1px !important",
    background: 'rgba(103, 128, 159, 1)',
  }
})


const LogRowComponent = ({logs, fields}) => {
  console.log('from log', logs, fields)
  const classes = useStyles();
  //write a function that will dynamically
  const row = logs;
  const column = fields;

  return (
    /*className="logRowComponent"*/
    <div style={{backgroundColor:"white", display: 'flex', width: '100%', height: '100%'}}>
      <DataGrid 
        classes={{
          root: classes.root, footerContainer: classes.footerContainer
        }} 
        rowHeight={100} 
        rows = {rows} 
        columns={columns}
      />
    </div>
  );
}

export default LogRowComponent;


/////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react';

// // TODOS: 
// // what info/properties will we actually receive in K8S logs?
// // should this info be rendered in divs and styled using grid-layout or in some other way

// function LogRowComponent(props){
//   return (
//     <div className="logRowComponent">
//       <div className="logDate">{props.logDate}</div>
//       <div className="logType">{props.logType}</div>
//       <div className="podName">{props.podName}</div>
//       <div className="logMessage">{props.logMessage}</div>
//     </div>
//   );
// };

// export default LogRowComponent;