import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import { MailRounded } from '@mui/icons-material';
import { minHeight } from '@mui/system';

const mapStateToProps = (state) => {
  return {
    appLogs: state.logsReducer.appLogs,
  }
}
const columns = [
  {field: 'message', headerName: 'message',minWidth:150, headerAlign:'left', flex:1},
  {field: 'timestamp', headerName: 'timestamp', minWidth:100,headerAlign:'left', flex:1},
  {field: 'podName', headerName: 'pod name', minWidth:150,headerAlign:'left', flex:1},
  {field: 'host', headerName: 'host',headerAlign:'left',minWidth:150,flex:1},
  {field: 'level', headerName: 'level',headerAlign:'left',minWidth:50,flex:.5},
  {field: 'id', headerName: 'id', headerAlign:'left',minWidth:100,flex:1},
];

const useStyles = makeStyles({
  root:{
    '& .MuiDataGrid-renderingZone': {
      maxHeight: 'none !important',
      maxWidth:'100% !important',
      margin: '0px !important',
      padding: '0px !important',
  },
  '& .MuiDataGrid-cell': {
      lineHeight: 'unset !important',
      overflowWrap: 'break-word !important',
      wordWrap: 'break-word !important',
      maxHeight: 'none !important',
      whiteSpace: 'normal',
      margin: '0px 0px 0px 0px!important',
      padding: '0px 8px 0px 8px !important'
  },

'& .MuiDataGrid-columnsContainer': {
  backgroundColor: 'whitesmoke',
  borderRadius: 4,
  margin: '0px 0px 20px 0px !important',
},
  '& .MuiDataGrid-columnHeader': {
    
    alignItems: 'flex-start !important',
    margin: '0px !important',
    padding: '0px !important',
 },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
   alignItems: 'flex-start !important',
   justifyContent: 'flex-start !important',
   color: 'grey !important',
   margin: '0px !important',
   padding: '0px 0px 0px 10px !important',
},
'& .MuiDataGrid-columnHeaderDraggableContainer': {
  alignItems: 'flex-start !important',
  margin: '0px !important',
  padding: '0px !important',
},
  
  '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
      margin: '0px !important',
      padding: '0px !important',
      width:'100% !important',
      
  },
  '& .MuiDataGrid-window': {
   borderRadius: 4,
   margin: '1px 0px 0px 0px !important',
   overflowX: 'hidden !important',
},
'& .MuiDataGrid-viewport': {
  maxWidth: '100% !important',
  minWidth: '100% !important',
  
},
'& .MuiDataGrid-dataContainer': {
  margin: '0px !important',
  padding: '0px !important',
},
    background: 'rgba(69,172,120,0.52)',
    border: 0,
    borderRadius: 4,
    //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '100%', 
    width: '100%', 
    padding: '0 30px',
    minHeight:480,
    overflowY:'auto',
  },
  footerContainer: {
    height: "1px !important",
    borderRadius: 4,
    background: 'rgba(69,172,120,0.52)',
  }
})


const LogRowComponent = (props) => {
  const classes = useStyles();
  
  
  return (
    
    <div style={{backgroundColor:'rgba(69,172,120,0.52)', display: 'flex', width: '100%', height: '100%',borderRadius: 4,}}>
      <DataGrid 
        classes={{
          root: classes.root, footerContainer: classes.footerContainer
        }} 
        rows = {props.appLogs} 
        columns={columns}
      />
    </div>
  );
}

export default connect(mapStateToProps, null)(LogRowComponent);
