const { Router } = require('express');
const metricsController = require('../controllers/metricsController');
const metricsRouter = Router();

//get all initial default metrics; add more controllers that will target one query at a time
metricsRouter.get('/cpuNode', metricsController.getCPUNode, (req,res)=> {
  console.log(res.locals.CPUNode);
  res.status(200).json(res.locals.CPUNode)
})

module.exports = metricsRouter;