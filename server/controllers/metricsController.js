const axios = require('axios');
const metricsController = {};

//to predefine and provide current, previous and step to get arrays of values to display data maybe make it customizable?
//current date
const endDate = new Date();
//one hour as initial for start
let startSet = 1;
//an hour before current
const startDate = new Date(endDate.getTime()-startSet*3600000);
//step initial
let step = '1m';


//top 4 relevant metrics by each node in the cluster
//CPU saturation % by the node
metricsController.getCPUSatByNodes = (req, res, next) => {
  res.locals.nodeMetrics = {};
  axios.get(`http://localhost:9090/api/v1/query_range?query=(sum(node_load15)%20by%20(instance)%20/%20count(node_cpu_seconds_total%7Bmode="system"%7D)%20by%20(instance))*100&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      res.locals.nodeMetrics.CPUSatValsNodes = data.data.data.result;
      next();
    })
    .catch(err=>next(err));
};

//CPU utilization % by the node
metricsController.getCPUByNodes = (req, res, next) => {
  axios.get(`http://localhost:9090/api/v1/query_range?query=100%20-%20(avg%20by%20(instance)%20(irate(node_cpu_seconds_total{mode=%22idle%22}[60m]))%20*%20100)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      res.locals.nodeMetrics.CPUNodes = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
};

//Memory utilization % by the node
metricsController.getMemoryByNodes = (req, res, next) => { 
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum((1-(node_memory_MemAvailable_bytes/node_memory_MemTotal_bytes))*100)%20by%20(instance)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      res.locals.nodeMetrics.MemoryNodes = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
};

//WriteToDisk rate by the node
metricsController.getWriteToDiskRateByNodes = (req, res, next) => {
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(node_disk_written_bytes_total[60m]))by(instance)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
      res.locals.nodeMetrics.WriteToDiskNodes = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
}

//For Horizontal memory bar graph (to be developed) to present the memory allocation/availablity in the cluster
metricsController.getMemoryBarData = (req, res, next) => {
  axios.get(`http://localhost:9090/api/v1/query?query=sum(cluster:namespace:pod_memory:active:kube_pod_container_resource_limits) by (node) / sum(machine_memory_bytes) by (node)`)
    .then(data => {
      res.locals.nodeMetrics.MemoryBarGraph = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
}

//pod metrics: node's name will be added as reqeust parameter, it will pull relevent pod metrics inside the node

//cpu usage rate by pod inside one node
metricsController.getCPUByPods = (req, res, next) => {
  res.locals.podMetrics = {};
  const node = req.params.nodeName;
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total{node="${node}",pod!=%22POD%22,%20pod!=%22%22}[60m]))%20by%20(pod)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
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
      res.locals.podMetrics.MemoryPods = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
};

//disk write rate by pod inside one node
metricsController.getWriteToDiskRateByPods = (req, res, next) => {
  const node = req.params.nodeName;
  axios.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(container_fs_writes_bytes_total{node="${node}",pod!=%22POD%22,%20pod!=%22%22}[60m]))%20by%20(pod)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`)
    .then(data => {
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
      res.locals.podMetrics.LogsByPods = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
}

//use promise all to resolve multiple axios requests to pull relevant control plane/master node components
metricsController.getMasterNodeMetrics = (req, res, next) => {
  const urls = {
    serverAPILatency: `http://localhost:9090/api/v1/query_range?query=sum(cluster_quantile:apiserver_request_duration_seconds:histogram_quantile{resource!="",quantile="0.9"}) by (resource)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`,
    serverAPIsuccessReq: `http://localhost:9090/api/v1/query_range?query=sum(rate(apiserver_request_total{job="apiserver",code=~"2..",group!=""}[60m])) by (group)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`,
    controllerAddCounter: `http://localhost:9090/api/v1/query_range?query=rate(workqueue_adds_total[60m])&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`,
    etcdRequestRate: `http://localhost:9090/api/v1/query_range?query=sum(rate(etcd_request_duration_seconds_sum[60m]))by(operation)&start=${startDate.toISOString()}&end=${endDate.toISOString()}&step=${step}`,
  }

  const promises = [];

  for(let url in urls){
    promises.push(axios.get(urls[url]));
  };
  
  Promise.all(promises)
    .then(results => {
      let index = 0;
      for(let url in urls){
        urls[url] = results[index].data.data.result;
        index++;
      }
      res.locals.masterNode = urls;
      next();
    })
    .catch(err=>next(err));
};

module.exports = metricsController;