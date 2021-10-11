const axios = require('axios');
const client = require('prom-client');
const metricsController = {};

client.collectDefaultMetrics();

metricsController.getDefaultMetrics = (req, res, next) => {
  client.register.getMetricsAsJSON()
    .then(data => {
      //going to be the first middleware in get method chains, so that it creates a blank object that will store each request with an unique property name
      res.locals.metrics = {}
      res.locals.metrics.defaultMetrics = data
      next();
    })
    .catch(err=>next(err));
};

metricsController.getCPUNode = (req, res, next) =>{
  axios.get(`http://localhost:9090/api/v1/query?query=100%20-%20(avg%20by%20(instance)%20(rate(node_cpu_seconds_total[1m]))%20*%20100)`)
    .then(data => {
      res.locals.metrics.CPUNode = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
};

module.exports = metricsController;