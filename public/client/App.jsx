import React, { useState, useEffect } from 'react';
import LoginContainer from './Containers/LoginContainer.jsx';
import QueryContainer from './Containers/QueryContainer.jsx';
import LogContainer from './Containers/LogContainer.jsx';
import ConfigContainer from './Containers/ConfigContainer.jsx';
import PodsContainer from './Containers/PodsContainer.jsx';
import MetricsComponent from './Components/MetricsComponent.jsx';
import MetricsContainer from './Containers/MetricsContainer.jsx';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';

const rows = [
  { id: 1, align:"left", col1: 'Hello', col2: 'World' },
  { id: 2, align:"left", col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, align:"left", col1: 'MUI', col2: 'is Amazing' },
  { id: 4, align:"left", col1: 'MrI', col2: 'is mazing' },
]
// const rows =  rowsArr.map((el)=>{
//   console.log("id", el.id)
//   return <GridRowData id={el.id} col1={el.col1} col2={el.col2}/>
// })

const columns = [
  { field: 'col1', align:"left", headerName: 'Column 1', width: 200 },
  { field: 'col2', align:"left", headerName: 'Column 2', width: 200 },
];

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       '& div[data-rowIndex][role="row"]:nth-of-type(5n-4)': {
//         color: "blue",
//         fontSize: 18,
//         //risky
//         minHeight: "60px !important",
//         height: 60,
//         "& div": {
//           minHeight: "60px !important",
//           height: 60,
//           lineHeight: "59px !important"
//         }
//       },
//       "& .MuiDataGrid-renderingZone": {
//         "& .MuiDataGrid-row": {
//           "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
//         }
//       }
//     }
//   })
// );
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 480, 
    width: '100%', 
    borderRadius: 10,
    padding: '0 30px',
  },
    footerContainer: {
    height: "10px !important",
    background: "red",
    // fontSize: 18,
    // //risky
    // minHeight: "60px !important",
    // height: 60,
    // "& div": {
    //   minHeight: "15px !important",
    //   // height: 60,
    //   // lineHeight: "59px !important"
    // },
   
    //min-height: '20px'
  //}
  }
});
// const columns =  columnsArr.map((el)=>{
//   return <getGridColDef field={el.field} headerName={el.headerName} width={el.width}/>
// })

// TODO: Routing or logic to determine which containers to render at what points
// TODO: replace sampleData as property passed to MetricsComponent with a call to fetch default metrics via Prometheus

const sampleData = JSON.parse('[{"help":"Total user CPU time spent in seconds.","name":"process_cpu_user_seconds_total","type":"counter","values":[{"value":0.154021,"labels":{}}],"aggregator":"sum"},{"help":"Total system CPU time spent in seconds.","name":"process_cpu_system_seconds_total","type":"counter","values":[{"value":0.045244,"labels":{}}],"aggregator":"sum"},{"help":"Total user and system CPU time spent in seconds.","name":"process_cpu_seconds_total","type":"counter","values":[{"value":0.199265,"labels":{}}],"aggregator":"sum"},{"help":"Start time of the process since unix epoch in seconds.","name":"process_start_time_seconds","type":"gauge","values":[{"value":1633816140,"labels":{}}],"aggregator":"omit"},{"help":"Resident memory size in bytes.","name":"process_resident_memory_bytes","type":"gauge","values":[{"value":89731072,"labels":{}}],"aggregator":"sum"},{"help":"Lag of event loop in seconds.","name":"nodejs_eventloop_lag_seconds","type":"gauge","values":[{"value":0,"labels":{}}],"aggregator":"average"},{"help":"The minimum recorded event loop delay.","name":"nodejs_eventloop_lag_min_seconds","type":"gauge","values":[{"value":0.009125888,"labels":{}}],"aggregator":"sum"},{"help":"The maximum recorded event loop delay.","name":"nodejs_eventloop_lag_max_seconds","type":"gauge","values":[{"value":0.059113471,"labels":{}}],"aggregator":"sum"},{"help":"The mean of the recorded event loop delays.","name":"nodejs_eventloop_lag_mean_seconds","type":"gauge","values":[{"value":0.011586596121410992,"labels":{}}],"aggregator":"sum"},{"help":"The standard deviation of the recorded event loop delays.","name":"nodejs_eventloop_lag_stddev_seconds","type":"gauge","values":[{"value":0.0029442740673764124,"labels":{}}],"aggregator":"sum"},{"help":"The 50th percentile of the recorded event loop delays.","name":"nodejs_eventloop_lag_p50_seconds","type":"gauge","values":[{"value":0.011132927,"labels":{}}],"aggregator":"sum"},{"help":"The 90th percentile of the recorded event loop delays.","name":"nodejs_eventloop_lag_p90_seconds","type":"gauge","values":[{"value":0.012689407,"labels":{}}],"aggregator":"sum"},{"help":"The 99th percentile of the recorded event loop delays.","name":"nodejs_eventloop_lag_p99_seconds","type":"gauge","values":[{"value":0.020561919,"labels":{}}],"aggregator":"sum"},{"help":"Number of active libuv handles grouped by handle type. Every handle type is C++ class name.","name":"nodejs_active_handles","type":"gauge","values":[{"value":1,"labels":{"type":"Pipe"}},{"value":4,"labels":{"type":"Socket"}},{"value":1,"labels":{"type":"Server"}}],"aggregator":"sum"},{"help":"Total number of active handles.","name":"nodejs_active_handles_total","type":"gauge","values":[{"value":6,"labels":{}}],"aggregator":"sum"},{"help":"Number of active libuv requests grouped by request type. Every request type is C++ class name.","name":"nodejs_active_requests","type":"gauge","values":[],"aggregator":"sum"},{"help":"Total number of active requests.","name":"nodejs_active_requests_total","type":"gauge","values":[{"value":0,"labels":{}}],"aggregator":"sum"},{"help":"Process heap size from Node.js in bytes.","name":"nodejs_heap_size_total_bytes","type":"gauge","values":[{"value":61960192,"labels":{}}],"aggregator":"sum"},{"help":"Process heap size used from Node.js in bytes.","name":"nodejs_heap_size_used_bytes","type":"gauge","values":[{"value":35500096,"labels":{}}],"aggregator":"sum"},{"help":"Node.js external memory size in bytes.","name":"nodejs_external_memory_bytes","type":"gauge","values":[{"value":7066419,"labels":{}}],"aggregator":"sum"},{"help":"Process heap space size total from Node.js in bytes.","name":"nodejs_heap_space_size_total_bytes","type":"gauge","values":[{"value":151552,"labels":{"space":"read_only"}},{"value":33554432,"labels":{"space":"new"}},{"value":21127168,"labels":{"space":"old"}},{"value":360448,"labels":{"space":"code"}},{"value":1576960,"labels":{"space":"map"}},{"value":5140480,"labels":{"space":"large_object"}},{"value":49152,"labels":{"space":"code_large_object"}},{"value":0,"labels":{"space":"new_large_object"}}],"aggregator":"sum"},{"help":"Process heap space size used from Node.js in bytes.","name":"nodejs_heap_space_size_used_bytes","type":"gauge","values":[{"value":150392,"labels":{"space":"read_only"}},{"value":7572440,"labels":{"space":"new"}},{"value":20986560,"labels":{"space":"old"}},{"value":249344,"labels":{"space":"code"}},{"value":1452528,"labels":{"space":"map"}},{"value":5093896,"labels":{"space":"large_object"}},{"value":2880,"labels":{"space":"code_large_object"}},{"value":0,"labels":{"space":"new_large_object"}}],"aggregator":"sum"},{"help":"Process heap space size available from Node.js in bytes.","name":"nodejs_heap_space_size_available_bytes","type":"gauge","values":[{"value":0,"labels":{"space":"read_only"}},{"value":9186344,"labels":{"space":"new"}},{"value":44176,"labels":{"space":"old"}},{"value":6272,"labels":{"space":"code"}},{"value":0,"labels":{"space":"map"}},{"value":0,"labels":{"space":"large_object"}},{"value":0,"labels":{"space":"code_large_object"}},{"value":16758784,"labels":{"space":"new_large_object"}}],"aggregator":"sum"},{"help":"Node.js version info.","name":"nodejs_version_info","type":"gauge","values":[{"value":1,"labels":{"version":"v14.17.5","major":14,"minor":17,"patch":5}}],"aggregator":"first"},{"name":"nodejs_gc_duration_seconds","help":"Garbage collection duration by kind, one of major, minor, incremental or weakcb.","type":"histogram","values":[],"aggregator":"sum"}]');

function App () {
  //const [user, setUser] = useState('')
  const classes = useStyles();

  return (
    <div>
      Kubric
      {/* <div>
        Login Container:
        <LoginContainer/>
      </div>
      <div>
        Configuration Container:
        <ConfigContainer/>
      </div> */}
        <div style={{height: 480, width: '100%', borderRadius:10}}> 
      <DataGrid classes={{
        footerContainer : classes.footerContainer,
        root: classes.root
      }}rowHeight={60}  rows={rows} columns={columns} />
     </div> 
      <div>
        Pods
        <PodsContainer/>
      </div>
      <div>
        Pod Metrics
        <MetricsContainer/>
      </div>
      {/* <div>
        Query Logs
        <QueryContainer/>
      </div> */}
      <div>
        <LogContainer/>
      </div>
      
      
    </div>
  )
};

// "start": "nodemon server/server.js",
// "build": "NODE_ENV=production webpack & NODE_ENV=production npm run start",
// "dev": "NODE_ENV=development webpack serve --open & NODE_ENV=development npm run start",

export default App;
//DEFAULT_GRID_COL_TYPE_KEY, DataGrid, GRID_ACTIONS_COL_DEF, GRID_BOOLEAN_COL_DEF, GRID_CHECKBOX_SELECTION_COL_DEF, GRID_DATETIME_COL_DEF, GRID_DATE_COL_DEF, GRID_DEFAULT_LOCALE_TEXT, GRID_EXPERIMENTAL_ENABLED, GRID_NUMERIC_COL_DEF, GRID_SINGLE_SELECT_COL_DEF, GRID_STRING_COL_DEF, GridActionsCell, GridActionsCellItem, GridAddIcon, GridApiContext, GridArrowDownwardIcon, GridArrowUpwardIcon, GridAutoSizer, GridBody, GridCell, GridCellCheckboxForwardRef, GridCellCheckboxRenderer, GridCellModes, GridCheckCircleIcon, GridCheckIcon, GridCloseIcon, GridColumnHeaderItem, GridColumnHeaderMenu, GridColumnHeaderSeparator, GridColumnHeaderSortIcon, GridColumnHeaderTitle, GridColumnHeadersItemCollection, GridColumnIcon, GridColumnMenu, GridColumnMenuContainer, GridColumnsContainer, GridColumnsHeader, GridColumnsMenuItem, GridColumnsPanel, GridDataContainer, GridDensityTypes, GridDragIcon, GridEditInputCell, GridEditModes, GridEditSingleSelectCell, GridEmptyCell, GridErrorHandler, GridEvents, GridFeatureModeConstant, GridFilterAltIcon, GridFilterForm, GridFilterInputValue, GridFilterListIcon, GridFilterMenuItem, GridFilterPanel, GridFooter, GridFooterContainer, GridFooterPlaceholder, GridHeader, GridHeaderCheckbox, GridHeaderPlaceholder, GridLinkOperator, GridLoadIcon, GridLoadingOverlay, GridMenu, GridMenuIcon, GridMoreVertIcon, GridNoRowsOverlay, GridOverlay, GridOverlays, GridPagination, GridPanel, GridPanelContent, GridPanelFooter, GridPanelHeader, GridPanelWrapper, GridPreferencePanelsValue, GridPreferencesPanel, GridRenderingZone, GridRoot, GridRow, GridRowCount, GridRowModes, GridSaveAltIcon, GridScrollArea, GridSearchIcon, GridSelectedRowCount, GridSeparatorIcon, GridSignature, GridStickyContainer, GridTableRowsIcon, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridTripleDotsVerticalIcon, GridViewHeadlineIcon, GridViewStreamIcon, GridViewport, GridWindow, HideGridColMenuItem, MAX_PAGE_SIZE, SUBMIT_FILTER_STROKE_TIME, SortGridMenuItems, activeGridFilterItemsSelector, allGridColumnsFieldsSelector, allGridColumnsSelector, arSD, bgBG, checkGridRowIdIsValid, csCZ, deDE, elGR, enUS, esES, faIR, filterGridColumnLookupSelector, filterGridItemsCounterSelector, filterableGridColumnsIdsSelector, filterableGridColumnsSelector, frFR, getDataGridUtilityClass, getDefaultGridFilterModel, getGridBooleanOperators, getGridColDef, getGridDateOperators, getGridDefaultColumnTypes, getGridNumericColumnOperators, getGridSingleSelectOperators, getGridStringOperators, gridClasses, gridColumnLookupSelector, gridColumnMenuSelector, gridColumnReorderDragColSelector, gridColumnReorderSelector, gridColumnResizeSelector, gridColumnsMetaSelector, gridColumnsSelector, gridColumnsTotalWidthSelector, gridDateFormatter, gridDateTimeFormatter, gridDensityHeaderHeightSelector, gridDensityRowHeightSelector, gridDensitySelector, gridDensityValueSelector, gridEditRowsStateSelector, gridFilterModelSelector, gridFilterStateSelector, gridFocusCellSelector, gridFocusColumnHeaderSelector, gridFocusStateSelector, gridPageSelector, gridPageSizeSelector, gridPaginatedVisibleSortedGridRowIdsSelector, gridPaginationSelector, gridPanelClasses, gridPreferencePanelStateSelector, gridRenderingSelector, gridResizingColumnFieldSelector, gridRowCountSelector, gridRowsLookupSelector, gridRowsStateSelector, gridScrollSelector, gridScrollbarStateSelector, gridSelectionStateSelector, gridSortColumnLookupSelector, gridSortModelSelector, gridTabIndexCellSelector, gridTabIndexColumnHeaderSelector, gridTabIndexStateSelector, gridViewportSizeStateSelector, gridVisibleRowsLookupSelector, itIT, jaJP, koKR, nlNL, plPL, ptBR, renderActionsCell, renderEditInputCell, renderEditSingleSelectCell, ruRU, selectedGridRowsCountSelector, selectedGridRowsSelector, selectedIdsLookupSelector, skSK, sortedGridRowIdsSelector, sortedGridRowsSelector, trTR, ukUA, unorderedGridRowIdsSelector, unorderedGridRowModelsSelector, useDataGridComponent, useGridApi, useGridApiContext, useGridApiEventHandler, useGridApiMethod, useGridApiOptionHandler, useGridApiRef, useGridLogger, useGridNativeEventListener, useGridProcessedProps, useGridRootProps, useGridScrollFn, useGridSelector, useGridSlotComponentProps, useGridState, viVN, visibleGridColumnsLengthSelector, visibleGridColumnsSelector, visibleGridRowCountSelector, visibleSortedGridRowIdsSelector, visibleSortedGridRowsAsArraySelector, visibleSortedGridRowsSelector, zhCN)
//[0]  @ ./src/index.jsx 4:0-43 10:36-39
