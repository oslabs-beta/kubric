import * as actionTypes from '../actions/actionTypes.js'

const sampleData = JSON.parse('[{"help":"Total user CPU time spent in seconds.","name":"process_cpu_user_seconds_total","type":"counter","values":[{"value":0.154021,"labels":{}}],"aggregator":"sum"},{"help":"Total system CPU time spent in seconds.","name":"process_cpu_system_seconds_total","type":"counter","values":[{"value":0.045244,"labels":{}}],"aggregator":"sum"},{"help":"Total user and system CPU time spent in seconds.","name":"process_cpu_seconds_total","type":"counter","values":[{"value":0.199265,"labels":{}}],"aggregator":"sum"},{"help":"Start time of the process since unix epoch in seconds.","name":"process_start_time_seconds","type":"gauge","values":[{"value":1633816140,"labels":{}}],"aggregator":"omit"},{"help":"Resident memory size in bytes.","name":"process_resident_memory_bytes","type":"gauge","values":[{"value":89731072,"labels":{}}],"aggregator":"sum"},{"help":"Lag of event loop in seconds.","name":"nodejs_eventloop_lag_seconds","type":"gauge","values":[{"value":0,"labels":{}}],"aggregator":"average"},{"help":"The minimum recorded event loop delay.","name":"nodejs_eventloop_lag_min_seconds","type":"gauge","values":[{"value":0.009125888,"labels":{}}],"aggregator":"sum"},{"help":"The maximum recorded event loop delay.","name":"nodejs_eventloop_lag_max_seconds","type":"gauge","values":[{"value":0.059113471,"labels":{}}],"aggregator":"sum"},{"help":"The mean of the recorded event loop delays.","name":"nodejs_eventloop_lag_mean_seconds","type":"gauge","values":[{"value":0.011586596121410992,"labels":{}}],"aggregator":"sum"},{"help":"The standard deviation of the recorded event loop delays.","name":"nodejs_eventloop_lag_stddev_seconds","type":"gauge","values":[{"value":0.0029442740673764124,"labels":{}}],"aggregator":"sum"},{"help":"The 50th percentile of the recorded event loop delays.","name":"nodejs_eventloop_lag_p50_seconds","type":"gauge","values":[{"value":0.011132927,"labels":{}}],"aggregator":"sum"},{"help":"The 90th percentile of the recorded event loop delays.","name":"nodejs_eventloop_lag_p90_seconds","type":"gauge","values":[{"value":0.012689407,"labels":{}}],"aggregator":"sum"},{"help":"The 99th percentile of the recorded event loop delays.","name":"nodejs_eventloop_lag_p99_seconds","type":"gauge","values":[{"value":0.020561919,"labels":{}}],"aggregator":"sum"},{"help":"Number of active libuv handles grouped by handle type. Every handle type is C++ class name.","name":"nodejs_active_handles","type":"gauge","values":[{"value":1,"labels":{"type":"Pipe"}},{"value":4,"labels":{"type":"Socket"}},{"value":1,"labels":{"type":"Server"}}],"aggregator":"sum"},{"help":"Total number of active handles.","name":"nodejs_active_handles_total","type":"gauge","values":[{"value":6,"labels":{}}],"aggregator":"sum"},{"help":"Number of active libuv requests grouped by request type. Every request type is C++ class name.","name":"nodejs_active_requests","type":"gauge","values":[],"aggregator":"sum"},{"help":"Total number of active requests.","name":"nodejs_active_requests_total","type":"gauge","values":[{"value":0,"labels":{}}],"aggregator":"sum"},{"help":"Process heap size from Node.js in bytes.","name":"nodejs_heap_size_total_bytes","type":"gauge","values":[{"value":61960192,"labels":{}}],"aggregator":"sum"},{"help":"Process heap size used from Node.js in bytes.","name":"nodejs_heap_size_used_bytes","type":"gauge","values":[{"value":35500096,"labels":{}}],"aggregator":"sum"},{"help":"Node.js external memory size in bytes.","name":"nodejs_external_memory_bytes","type":"gauge","values":[{"value":7066419,"labels":{}}],"aggregator":"sum"},{"help":"Process heap space size total from Node.js in bytes.","name":"nodejs_heap_space_size_total_bytes","type":"gauge","values":[{"value":151552,"labels":{"space":"read_only"}},{"value":33554432,"labels":{"space":"new"}},{"value":21127168,"labels":{"space":"old"}},{"value":360448,"labels":{"space":"code"}},{"value":1576960,"labels":{"space":"map"}},{"value":5140480,"labels":{"space":"large_object"}},{"value":49152,"labels":{"space":"code_large_object"}},{"value":0,"labels":{"space":"new_large_object"}}],"aggregator":"sum"},{"help":"Process heap space size used from Node.js in bytes.","name":"nodejs_heap_space_size_used_bytes","type":"gauge","values":[{"value":150392,"labels":{"space":"read_only"}},{"value":7572440,"labels":{"space":"new"}},{"value":20986560,"labels":{"space":"old"}},{"value":249344,"labels":{"space":"code"}},{"value":1452528,"labels":{"space":"map"}},{"value":5093896,"labels":{"space":"large_object"}},{"value":2880,"labels":{"space":"code_large_object"}},{"value":0,"labels":{"space":"new_large_object"}}],"aggregator":"sum"},{"help":"Process heap space size available from Node.js in bytes.","name":"nodejs_heap_space_size_available_bytes","type":"gauge","values":[{"value":0,"labels":{"space":"read_only"}},{"value":9186344,"labels":{"space":"new"}},{"value":44176,"labels":{"space":"old"}},{"value":6272,"labels":{"space":"code"}},{"value":0,"labels":{"space":"map"}},{"value":0,"labels":{"space":"large_object"}},{"value":0,"labels":{"space":"code_large_object"}},{"value":16758784,"labels":{"space":"new_large_object"}}],"aggregator":"sum"},{"help":"Node.js version info.","name":"nodejs_version_info","type":"gauge","values":[{"value":1,"labels":{"version":"v14.17.5","major":14,"minor":17,"patch":5}}],"aggregator":"first"},{"name":"nodejs_gc_duration_seconds","help":"Garbage collection duration by kind, one of major, minor, incremental or weakcb.","type":"histogram","values":[],"aggregator":"sum"}]');

const initialState = {
  defaultMetrics: [],
  podCpuMetrics: [],
  podMemoryMetrics: [],
  serverApiMetrics: [],
}

//update state now that we can get data from prom

export default function metricsReducer (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    // list and configure cases
    case actionTypes.DEFAULT_METRICS_RECEIVED: {
      let defaultMetrics = payload;
      
      return {
        ...state,
        defaultMetrics,
      }
    }
    case actionTypes.PODS_CPU_METRICS_RECEIVED: {
      let podMemoryMetrics = payload;

      return {
        ...state,
        podCpuMetrics,
      }
    }
    case actionTypes.PODS_MEMORY_METRICS_RECEIVED: {

      return {
        ...state,
        podMemoryMetrics,
      }
    }
    case actionTypes.SERVERAPI_METRICS_RECEIVED: {

      return {
        ...state,
        serverApiMetrics,
      }
    }
    default: 
      return state;
  }
}

