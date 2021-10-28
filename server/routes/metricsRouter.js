const { Router } = require('express');
const metricsController = require('../controllers/metricsController');
const metricsRouter = Router();

metricsRouter.get(
  '/',
  metricsController.getCPUSatByNodes,
  metricsController.getCPUByNodes,
  metricsController.getMemoryByNodes,
  metricsController.getWriteToDiskRateByNodes,
  // metricsController.getMemoryBarData, <-- this could be developed
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