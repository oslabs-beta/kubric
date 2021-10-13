const { Router } = require('express');
const metricsController = require('../controllers/metricsController');
const metricsRouter = Router();

//get all initial default metrics; add more controllers that will target one query at a time
metricsRouter.get(
  '/',
  metricsController.getDefaultMetrics,
  metricsController.getCPUByPod,
  metricsController.getMemoryByPod,
  metricsController.getServerAPIMetrics,
  //sending a compiled object with each middleware's data with an unique property name (middleware's name without 'get')
  (req,res)=> res.status(200).json(res.locals.metrics)
);

module.exports = metricsRouter;