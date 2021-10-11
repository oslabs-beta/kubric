const { Router } = require('express');
const clusterController = require('../controllers/clusterController');
const clusterRouter = Router();

clusterRouter.get(
  '/getLists',
  clusterController.getPods, 
  clusterController.getServices, 
  clusterController.getDeployments, 
  //clusterController.getIngresses, (having an issue with this line idk why; getting HTTP error)
  clusterController.getNodes,
  //sending a compiled object with each middleware's data with an unique property name in a format of {component}List
  (req, res)=> res.status(200).json(res.locals.list)
);

module.exports = clusterRouter;