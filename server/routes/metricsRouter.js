const { Router } = require('express');
const metricsController = require('../controllers/metricsController');
const metricsRouter = Router();

//get all initial default metrics; add more controllers that will target one query at a time
metricsRouter.get(
  '/',
  // metricsController.getDefaultMetrics,
  metricsController.getCPUByNodes,
  metricsController.getMemoryByNodes,
  (req,res)=> res.status(200).json(res.locals.nodeMetrics)
);

metricsRouter.get(
  '/getPodMetrics/:nodeName',
  metricsController.getCPUByPods,
  metricsController.getMemoryByPods,
  (req,res)=> res.status(200).json(res.locals.podMetrics)
);

metricsRouter.get(
  '/getMasterNode',
  metricsController.getServerAPIMetrics,
  (req,res)=> res.status(200).json(res.locals.masterNode)
);

module.exports = metricsRouter;