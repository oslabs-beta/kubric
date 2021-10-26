const axios = require('axios');
// const client = require('prom-client');
const metricsController = {};

// client.collectDefaultMetrics();

//to predefine and provide current, previous and step to get arrays of values to display data maybe make it customizable?
//current date
const endDate = new Date();
//one hour as initial for start
let startSet = 1;
//an hour before current
const startDate = new Date(endDate.getTime()-startSet*3600000);
//step initial
let step = '5m';

// metricsController.getDefaultMetrics = (req, res, next) => {
//   client.register.getMetricsAsJSON()
//     .then(data => {
//       // console.log('data:', data);
//       //going to be the first middleware in get method chains, so that it creates a blank object that will store each request with an unique property name
//       res.locals.metrics = {};
//       res.locals.metrics.defaultMetrics = data;
//       next();
//     })
//     .catch(err=>next(err));
// };

//top 4 relevant metrics by each node in the cluster

//CPU saturation % by the node
metricsController.getCPUSatByNodes = (req, res, next) => {
  res.locals.nodeMetrics = {};
  axios.get(`http://localhost:9090/api/v1/query_range?query=(sum(node_load15)%20by%20(instance)%20/%20count(node_cpu_seconds_total%7Bmode="system"%7D)%20by%20(instance))*100&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      //array of object; each corresponding to each pod; each is the rate of cpu usage
      res.locals.nodeMetrics.CPUSatValsNodes = data.data.data.result;
      next();
    })
    .catch(err=>next(err));
};

//CPU utilization % by the node
metricsController.getCPUByNodes = (req, res, next) => {
  axios.get(`http://localhost:9090/api/v1/query_range?query=100%20-%20(avg%20by%20(instance)%20(irate(node_cpu_seconds_total{mode=%22idle%22}[60m]))%20*%20100)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      //array of object; each corresponding to each pod; each is the rate of cpu usage
      res.locals.nodeMetrics.CPUNodes = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
};

//Memory utilization % by the node
metricsController.getMemoryByNodes = (req, res, next) => { 
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum((1-(node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes))*100)%20by%20(instance)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      //array of object; each corresponding to each pod; sending memeory in bytes, might have to change the formatting
      res.locals.nodeMetrics.MemoryNodes = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
};

//WriteToDisk rate by the node
metricsController.getWriteToDiskRateByNodes = (req, res, next) => {
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(node_disk_written_bytes_total[60m]))by(instance)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      //array of object; each corresponding to each pod; sending memeory in bytes, might have to change the formatting
      res.locals.nodeMetrics.WriteToDiskNodes = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
}

//pod metrics: node's name will be added as reqeust parameter, it will pull relevent pod metrics inside the node

//cpu usage rate by pod inside one node
metricsController.getCPUByPods = (req, res, next) => {
  res.locals.podMetrics = {};
  const node = req.params.nodeName;
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{node="${node}",pod!=%22POD%22,%20pod!=%22%22}[5m]))%20by%20(pod)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      //array of object; each corresponding to each pod; each is the rate of cpu usage
      res.locals.podMetrics.CPUPods = data.data.data.result;
      next();
    })
    .catch(err=>next(err));
};

//memory usuage by pod inside one node
metricsController.getMemoryByPods = (req, res, next) => {
  const node = req.params.nodeName; 
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum(container_memory_working_set_bytes{node="${node}",pod!=%22POD%22,%20pod!=%22%22})%20by%20(pod)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      //array of object; each corresponding to each pod; sending memeory in bytes, might have to change the formatting
      res.locals.podMetrics.MemoryPods = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
};

//disk write rate by pod inside one node
metricsController.getWriteToDiskRateByPods = (req, res, next) => {
  const node = req.params.nodeName;
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(container_fs_writes_bytes_total{node="${node}",pod!=%22POD%22,%20pod!=%22%22}[5m]))%20by%20(pod)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      //array of object; each corresponding to each pod; sending memeory in bytes, might have to change the formatting
      res.locals.podMetrics.WriteToDiskPods = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
}

//kubelet logs by pod inside one node
metricsController.getLogsByPods = (req, res, next) => {
  const node = req.params.nodeName; 
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum(kubelet_container_log_filesystem_used_bytes{node="${node}",pod!=%22POD%22,%20pod!=%22%22})%20by%20(pod)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      //array of object; each corresponding to each pod; sending memeory in bytes, might have to change the formatting
      res.locals.podMetrics.LogsByPods = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
}


metricsController.getServerAPIMetrics = (req, res, next) => {
  const urls = {
    latency: `http://localhost:9090/api/v1/query_range?query=histogram_quantile(0.50,%20sum(rate(apiserver_request_duration_seconds_bucket{job=%22apiserver%22}[5m]))%20by%20(le))&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`,
    traffic: `http://localhost:9090/api/v1/query_range?query=sum(rate(apiserver_request_total{job=%22apiserver%22,code=~%222..%22}[5m]))&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`,
    error: `http://localhost:9090/api/v1/query_range?query=sum(rate(apiserver_request_total{job=%22apiserver%22,code=~%22[45]..%22}[5m]))&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`,
  }

  const promises = [];

  for(let url in urls){
    promises.push(axios.get(urls[url]));
  };
  
  Promise.all(promises)
    .then(results => {
      const temp = urls;
      temp.latency = results[0].data.data.result;
      temp.traffic = results[1].data.data.result;
      temp.error = results[2].data.data.result;
      res.locals.metrics.serverAPI = temp;
      next();
    })
    .catch(err=>next(err));
};


//control plane (master node's component such as server api, etcd, etc)
  //can follow the resources i have to get metrics to graph for each parts, 
  //but not quite sure if all of them would be necessary or not
//pod level metrics
  //getCPUByPod
  //getMemoryByPod
  //...possibly more to come...
//maybe cluster as a whole?
  //dont know what to look for...



//Filtering by a group-level inside the cluster

/* note for our actual ux design for metrics

clicking the metrics tab will grab node metrics initially
  by clicking individual node
    will fetch for data and displays all pods' metrics inside the node
      include some metrics per each pod

*/

//new notes 10/21:
  //node's cpu and memory capacity: kube_node_status_allocatable or _capacity
  //requested limit resource by a container: kube_pod_container_resource_limits
  //kube_pod_container_resource_limits vs container_cpu_usage_time sort by pod give me different number.... oops?
  //to get number of volumes inside each node => sum(volume_manager_total_volumes{state="actual_state_of_world"}) by (node)
  //to get number of pods inside each node => kubelet_running_pods
  //to get number of pods inside each node => kubelet_running_containers{container_state="running"}
  //node new metric: disk utilization %:
    //query: 100-(node_filesystem_avail_bytes{mountpoint="/", fstype!="rootfs"}/node_filesystem_size_bytes{mountpoint="/", fstype!="rootfs"})*100



//By namespace?
//By Node?
  //cpu utilization ratio
    //http://localhost:9090/api/v1/query_range?query=100%20-%20(avg%20by%20(instance)%20(irate(node_cpu_seconds_total{mode=%22idle%22}[5m]))%20*%20100)&start=2021-10-13T01:02:10.127Z&end=2021-10-14T01:02:10.127Z&step=5m
  //memory utilization ratio
    //http://localhost:9090/api/v1/query_range?query=sum((1-(node_memory_MemFree_bytes/node_memory_MemTotal_bytes))*100)%20by%20(instance)&start=2021-10-13T01:02:10.127Z&end=2021-10-14T01:02:10.127Z&step=5m


//By Pod
  //number of pods
   //sum(kube_pod_info) by (pod)
  //cpu usage (by pods, but also for total usage / total available for each node)
    //sum(rate(container_cpu_usage_seconds_total{pod!="POD", pod!=""}[5m])) by (pod)
    //http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{pod!=%22POD%22,%20pod!=%22%22}[5m]))%20by%20(pod)&start=2021-10-11T20:49:44.434Z&end=2021-10-12T20:49:44.433Z&step=5m
  //memory usage
    //sum(container_memory_usage_bytes{pod!="POD", pod!=""}) by (pod)
    
    //http://localhost:9090/api/v1/query_range?query=sum(container_memory_usage_bytes{pod!=%22POD%22,%20pod!=%22%22})%20by%20(pod)&start=2021-10-11T20:49:44.434Z&end=2021-10-12T20:49:44.433Z&step=5m

//Gauge
  //summed up cpu usage / sum(machine_cpu_cores)
  //summed up memory usuage / sum(machine_memory_bytes)


//By more components? (APIserver, etcd, scheduler, etc)
  //API Server
    //latency: 50 percentile of sum of the rate of how long the request takes to be proccessed
      //histogram_quantile(0.50, sum(rate(apiserver_request_duration_seconds_bucket{job="apiserver"}[5m])) by (le))
      //http://localhost:9090/api/v1/query_range?query=histogram_quantile(0.50,%20sum(rate(apiserver_request_duration_seconds_bucket{job=%22apiserver%22}[5m]))%20by%20(le))&start=2021-10-11T20:49:44.434Z&end=2021-10-12T20:49:44.433Z&step=5m 
    
    //request rate: request rate of successful responses
      //sum(rate(apiserver_request_total{job="apiserver",code=~"2.."}[5m]))
      //http://localhost:9090/api/v1/query_range?query=sum(rate(apiserver_request_total{job=%22apiserver%22,code=~%222..%22}[5m]))&start=2021-10-11T20:49:44.434Z&end=2021-10-12T20:49:44.433Z&step=5m
    
    //errors: request rate of error responses (currently have not noticed any error in the past)
      //sum(rate(apiserver_request_total{job="kubernetes-apiservers",code=~"[45].."}[5m]))
      //http://localhost:9090/api/v1/query_range?query=sum(rate(apiserver_request_total{job=%22kubernetes-apiservers%22,code=~%22[45]..%22}[5m]))&start=2021-10-11T20:49:44.434Z&end=2021-10-12T20:49:44.433Z&step=5m
    
    //saturation
      

module.exports = metricsController;