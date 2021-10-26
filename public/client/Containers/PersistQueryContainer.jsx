import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/logsActionCreator.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const mapStateToProps = (state) => {
  return {
    appLogFields: state.logsReducer.appLogFields,
    appLogIndices: state.logsReducer.appLogIndices,
    selectedIndex: state.logsReducer.selectedIndex,
    selectedFields: state.logsReducer.selectedFields,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAppLogFields: () => dispatch(actions.getAppLogFields()),
    getAppLogs: (obj) => dispatch(actions.getAppLogs(obj)),
    selectIndex: (index) => dispatch(actions.selectIndex(index))
  }
}
const inputStyles = makeStyles({
  input: {
    height: 40
}
})

const PersistQueryContainer = (props) => {
  //depending on the current tab, rendered components will be different
  const classes = inputStyles();
  useEffect(() => {
    props.getAppLogFields()
  }, []);
  const [query, setQuery] = useState({'name':'','field':'','value':'', 'all':true})
  let queryBoolean = false;
  const checkQuery = () =>{
    if(query.name && query.field) queryBoolean = true;
  }
  const handleIndex = (event,value)=>{
  props.selectIndex([...props.appLogIndices].indexOf(value))
  };
  const search = () =>{
    if(queryBoolean) props.getAppLogs(query)
  }

  return (
    <div style={{background:'whitesmoke', width:"100%", height:50, display: "flex", alignItems:"center", borderRadius: 4,}}>
      <Autocomplete
        disablePortal
        id="Index Name"
        options={[...props.appLogIndices]}
        sx={{flexGrow: 1}}
        size="small"
        renderInput={(params) => <TextField size="small" {...params} label="Index Name"/>}
        onChange={(event,value)=>{
        setQuery({...query,name:value,all:true})
        handleIndex(event,value)
        checkQuery();
        }}
      />
      <Autocomplete
        disablePortal
        id="Field"
        size="small"
        options={props.selectedFields}
        sx={{flexGrow: 1,}}
        onChange={(event,value)=>{
          setQuery({...query,field:value,all:true})
          checkQuery();
          }}
        renderInput={(params) => <TextField size="small" {...params} label="Field"/>}
      />
      <TextField  
        sx={{flexGrow: 1,}}
        size="small"
        id="Value" 
        label="Value" 
        margin='8px'
        padding='4px'
        variant="outlined" 
        InputProps={{
          className: classes.input,
        }}
        onChange={(event)=>{
          console.log("string input?",event.target.value);
          setQuery({...query,value:event.target.value,all:false})
          checkQuery();
          }}

      />
      <Button
        sx={{ flexGrow: 1, height:40,margin:'8px',padding:'4px'}} 
        size="normal" 
        variant="outlined" 
        onClick={()=> {
          checkQuery();
          search()}}>
          Search
      </Button>
    </div>
  );
}





export default connect(mapStateToProps, mapDispatchToProps)(PersistQueryContainer);