const { Router } = require('express');
const metricsController = require('../controllers/metricsController');
const metricsRouter = Router();

//get all initial default metrics; add more controllers that will target one query at a time
metricsRouter.get(
  '/',
  // metricsController.getDefaultMetrics,
  metricsController.getCPUSatByNodes,
  metricsController.getCPUByNodes,
  metricsController.getMemoryByNodes,
  metricsController.getWriteToDiskRateByNodes,
  // metricsController.getMemoryBarData, <-- this could be developed or not
  (req,res)=> res.status(200).json(res.locals.nodeMetrics)
);

metricsRouter.get(
  '/getPodMetrics/:nodeName',
  metricsController.getCPUByPods,
  metricsController.getMemoryByPods,
  metricsController.getWriteToDiskRateByPods,
  metricsController.getLogsByPods,
  (req,res)=> res.status(200).json(res.locals.podMetrics)
);

metricsRouter.get(
  '/getMasterNode',
  metricsController.getMasterNodeMetrics,
  (req,res)=> res.status(200).json(res.locals.masterNode)
);

module.exports = metricsRouter;