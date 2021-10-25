import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { MailRounded } from '@mui/icons-material';
import { minHeight } from '@mui/system';

// TODOS: 
// what info/properties will we actually receive in K8S logs?
// should this info be rendered in divs and styled using grid-layout or in some other way

//list out search query results
//it will include
  //data-grid from material UI
    //columns are populated with fields from the particular log type (by indices)
    //rows are the result of the query (probably limited to 30 or 50?)
    //scrollable (not the priority)

// const rows = [  
//   {
//     id: 1234,
//     logType: 'ERROR',
//     podName: 'somePodName',
//     logMessage: `here\'s a(n) ERROR message from somePodName`
//   },
//   {
//     id: 1235,
//     logType: 'APPLICATION',
//     podName: 'somePodName',
//     logMessage: `here\'s a(n) APPLICATION message from somePodName`
//   },
//   {
//     id: 1236,
//     logType: 'ERROR',
//     podName: 'someOtherPodName',
//     logMessage: `here\'s a(n) ERROR message from someOtherPodName}`
//   },
// ];

const mapStateToProps = (state) => {
  return {
    appLogs: state.logsReducer.appLogs,
  }
}
const columns = [
  {field: 'timestamp', headerName: 'timestamp', width: 200,},
  {field: 'message', headerName: 'message', width: 200,},
  {field: 'podName', headerName: 'pod name', width: 200,},
  {field: 'host', headerName: 'host', width: 200,},
  {field: 'level', headerName: 'level', width: 50,},
];

const useStyles = makeStyles({
  root:{
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
  },
  '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
  },
  '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
  },
    background: 'rgba(46, 49, 49, 1)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '100%', 
    width: '100%', 
    borderRadius: 10,
    padding: '0 30px',
    minHeight:480,
    overflowY:'auto',
  },
  // cell--textLeft:{
  //   overflowWrap: 'break-word'
  // },
  footerContainer: {
    height: "1px !important",
    background: 'rgba(103, 128, 159, 1)',
  }
})


const LogRowComponent = (props) => {
  const classes = useStyles();
  
  
  return (
    
    <div style={{backgroundColor:"white", display: 'flex', width: '100%', height: '100%'}}>
      <DataGrid 
        classes={{
          root: classes.root, footerContainer: classes.footerContainer
        }} 
        rows = {props.appLogs} 
        // style={{overflowWrap: 'break-word'}}
        columns={columns}
      />
    </div>
  );
};

export default connect(mapStateToProps, null)(LogRowComponent);