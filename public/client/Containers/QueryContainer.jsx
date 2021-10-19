import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/logsActionCreator.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const mapStateToProps = (state) => {
  return {
    appLogFields: state.logsReducer.appLogFields,
    selectedIndex: state.logsReducer.selectedIndex
  }
}

const mapDispatchToProps = (dispatch) => {
 
  return {
    getAppLogFields: () => dispatch(actions.getAppLogFields()),
    getAppLogs: (obj) => dispatch(actions.getAppLogs(obj)),
    selectIndex: (index) => dispatch(actions.selectIndex(index))
  }
}
class QueryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.queryObj = {'all':false,'value':'','field':'','name':this.props.appLogFields[this.props.selectedIndex]}
    this.sendQuery = this.sendQuery.bind(this);
    this.addValue = this.addValue.bind(this);
    this.selectField = this.selectField.bind(this);
    this.selectIndex = this.selectIndex.bind(this);
    this.indices = [];
    this.fields = [];
    this.getFields = this.getFields.bind(this);
  }
  getFields(){
    console.log("hello from query container")
    this.props.getAppLogFields();
    console.log('appLogFields in cdm',this.props.appLogFields);
    if(this.props.appLogFields.length){
      let indexCounter = -1
      this.indices = this.props.appLogFields.map((obj)=>{
        indexCounter++;
        return <option onClick={this.selectIndex} value={indexCounter}>`${obj[indexCounter]}`</option>
      })
      console.log("indices",this.indices)
      let fieldsCounter = -1;
      this.fields = this.props.appLogFields[this.props.selectedIndex].fields.map((obj)=>{
        fieldsCounter++;
        return <option onClick={this.selectField} value={`${obj[fieldsCounter]}`} index={fieldsCounter}>`${obj[fieldsCounter]}`</option>
      })
      console.log("fields",this.fields)
    }
  }
  componentDidMount() {
    //setInterval(this.getFields,1000)
    
    // console.log('props after fetched in Component did mount', this.props);
  }
  sendQuery(){
  if(this.queryObj.value) this.props.getAppLogs();
  else {
    this.queryObj.all = true;
    this.props.getAppLogs(this.queryObj);
  }
  }
  selectIndex(e){
    console.log("index",e.value)
  this.props.selectIndex(e.value);
  }
  selectField(e){
    console.log("field",e.value)
  this.queryObj.field = e.value;
  }
  addValue(e){
    console.log("value",e.value)
  this.queryObj.value = e.value;
  }
  render(){
    
    return (
      <div style={{display: "flex"}}>
        <Autocomplete
          disablePortal
          id="index"
          options={testQueryIndex}
          // {this.indices}
          sx={{width: 300}}
          renderInput={(params) => <TextField {...params} label="Indices"/>}
        />
        <Autocomplete
          disablePortal
          id="field"
          options={testQueryField}
          // {this.fields}
          sx={{width: 300}}
          renderInput={(params) => <TextField {...params} label="Fields"/>}
        />
        <TextField  id="query" label="Query" variant="outlined" />
        <Button variant="contained" onClick={this.sendQuery}>Search</Button>
      </div>
  );
  }
  
};

/*
<label htmlFor="Index">Choose Index Name:</label>
 { <select name="Index" id="Index">
    {this.indices}
   </select> }

  <label htmlFor="Field">Choose Field Name:</label> 
   <select name="Field" id="Field">
    {this.fields}
  </select> 
   <input placeholder="Value"/> 

   //     <input className="query-string-input query-parameter" placeholder="query logs"></input>
      //     <button className="primary-btn" id="submitQuery">Submit Query</button>
      //     <button className="secondary-btn" id="resetQuery">Reset Query</button>
      //     filter menu component           
*/

//store it with property named label;
const testQueryIndex = [
  {label: "loggen-app"},
  {label: "fluent-d1231"}
]

const testQueryField = [
  {label: "type"},
  {label: "podName"}
]


export default connect(mapStateToProps, mapDispatchToProps)(QueryContainer);