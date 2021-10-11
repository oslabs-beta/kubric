const axios = require('axios');
const metricsController = {};

metricsController.getCPUNode= (req, res, next) =>{
  axios.get(`http://localhost:9090/api/v1/query?query=100%20-%20(avg%20by%20(instance)%20(rate(node_cpu_seconds_total[1m]))%20*%20100)`)
    .then(data => {
      res.locals.CPUNode = data.data.data.result;
      next();  
    })
    .catch(err=>next(err));
}

module.exports = metricsController;