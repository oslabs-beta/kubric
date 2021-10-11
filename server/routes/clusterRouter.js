const { Router } = require('express');
const clusterController = require('../controllers/clusterController');
const clusterRouter = Router();

clusterRouter.get(
  '/getLists',
  clusterController.getPods, 
  clusterController.getServices, 
  clusterController.getDeployments, 
//   clusterController.getIngresses,
  clusterController.getNodes,
  //send the res.locals.list; inside the object, there will be properties corresponding to each middleware named {componentname}List
  (req, res)=> res.status(200).json(res.locals.list)
);

module.exports = clusterRouter;