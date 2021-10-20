import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import LogRowComponent from '../Components/LogRowComponent.jsx'
import * as actions from '../actions/logsActionCreator.js';
import QueryContainer from './QueryContainer.jsx';
import Button from '@mui/material/Button'


// TODO: edit the buildLogRows helper function to pass in appropriate properties
const mapStateToProps = (state) => {
  return {
    appLogs: state.logsReducer.appLogs,
  }
}

//dummy data
//data for persisted logs
const testIndex = [
  {label: "loggen-app"},
  {label: "fluent-d1231"}
]

const testFieldsQuery = [
  {label: "id"},
  {label: "type"},
  {label: "podName"},
  {label: "message"}
];
const testFieldsLogRow = [
  {field: 'id', headerName: 'id', width: 200},
  {field: 'logType', headerName: 'type', width: 200},
  {field: 'podName', headerName: 'pod name', width: 200},
  {field: 'logMessage', headerName: 'message', width: 200}
];

const logs = [  
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

//data for live feed

const testPod = [
  {label: "podName 1231"},
  {label: "podName 124124"}
]

const testFields2Query = [
  {label: "id1"},
  {label: "type1"},
  {label: "podName2"},
  {label: "message2"},
];

const testFields2LogsRow = [
  {field: 'id', headerName: 'id', width: 200},
  {field: 'logType', headerName: 'type', width: 200},
  {field: 'podName', headerName: 'pod name', width: 200},
  {field: 'logMessage', headerName: 'message', width: 200}
];

const logs2 = [  
  {
    id: 1234,
    logType: 'ERROR1',
    podName: 'x',
    logMessage: `here\'s a(n) ERROR message from x`
  },
  {
    id: 1235,
    logType: 'APPLICATION1',
    podName: 'sy',
    logMessage: `here\'s a(n) APPLICATION message from y`
  },
  {
    id: 1236,
    logType: 'ERROR1',
    podName: 'z',
    logMessage: `here\'s a(n) ERROR message from z`
  },
];





const LogContainer = (props) => {
  
    // const logsElement = [];

  // // ASSUMPTION: logs will be an array of objects and be accessed through props???
  //   const logs = [
  //   {
  //     logDate: 1234,
  //     logType: 'ERROR',
  //     podName: 'somePodName',
  //     logMessage: `here\'s a(n) ERROR message from somePodName`
  //   },
  //   {
  //     logDate: 1235,
  //     logType: 'APPLICATION',
  //     podName: 'somePodName',
  //     logMessage: `here\'s a(n) APPLICATION message from somePodName`
  //   },
  //   {
  //     logDate: 1236,
  //     logType: 'ERROR',
  //     podName: 'someOtherPodName',
  //     logMessage: `here\'s a(n) ERROR message from someOtherPodName}`
  //   },
  // ]
  
  // // iterate through an array logs from DB and build an out an array of LogRowComponents to render them:
  // logs.forEach((log => {
  //   // deconstruct necessary properties from each log 
  //   const { logDate, logType, podName, logMessage } = log;

  //   // generate a logRow component with properties specific to that log
  //   logsElement.push(<LogRowComponent key={logDate} logDate={logDate} logType={logType} podName={podName} logMessage={logMessage}/>)
  // }))

  //Luke's
  //to use the state within this level and set the default to persist page, use hook
  const [isPersist, setIsPersist] = useState(true);

  //declare the empty array to store react components
  const queryPieces = {};
  const contentQueryContainer = {queryPieces};
  const contentLogRowComponent = {};

  //upon the status of which tab we are in, request different info and save it in the array;
  //it will always be at persist tab initially;  
  useEffect(()=>{
    console.log('before', contentLogRowComponent)
    if(isPersist){
      //for persisted tab
      //get and add data inside contentQueryContainer obj to pass down info needed to render stuff in queryContainer
      queryPieces["fields"] = testFieldsQuery;
      queryPieces["indices"] = testIndex;
      //get and add data inside contentLogRowComponent obj to pass down info needed to render stuff in logRowComponent
      contentLogRowComponent["logs"] = logs;
      contentLogRowComponent["fields"] = testFieldsLogRow;
    } else {
      //for live feed tab
      //get and add data inside contentQueryContainer obj to pass down info needed to render stuff in queryContainer
      queryPieces["fields"] = testFields2Query;
      queryPieces["pods"] = testPod
      //get and add data inside contentLogRowContainer obj to pass down info needed to render stuff in logRowContainer
      contentLogRowComponent["logs"] = logs2;
      contentLogRowComponent["fields"] = testFields2LogsRow;
    }
    console.log('after', contentLogRowComponent)
  },[])
  

  return(
    <div id="log-container" style={{backgroundColor: "white", width: "100%"}}>
      <div id="log-navbar" style={{display:"flex"}}>
        {/*persist or remote?*/}
        <div id="persist">
          <Button disabled={isPersist} onClick={()=>setIsPersist(true)}>Persist</Button>
        </div>
        <div id="live">
          <Button disabled={!isPersist} onClick={()=>setIsPersist(false)}>Live Feed</Button>
        </div>
      </div>
      <QueryContainer isPersist={isPersist} data={contentQueryContainer}/>
      <LogRowComponent logs={contentLogRowComponent.logs} fields={contentLogRowComponent.fields}/>
    </div>
  )

};

export default connect(mapStateToProps, null)(LogContainer);