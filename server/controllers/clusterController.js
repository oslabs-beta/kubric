const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi2 = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
const k8sApi3 = kc.makeApiClient(k8s.AppsV1Api);
const clusterController = {};


clusterController.getPods = (req, res, next) =>{
  console.log('getpods')
  k8sApi.listNamespacedPod('default')
    .then(data=>{
      res.locals.list = {};
      res.locals.list.podList = data.body;
      next();
    })
    .catch(err => next(err));
}

clusterController.getServices = (req, res, next) =>{
  console.log('getService')
  k8sApi.listNamespacedService('default')
    .then(data=>{
      res.locals.list.serviceList = data.body;
      next();
    })
    .catch(err => next(err));
}

clusterController.getDeployments = (req, res, next) =>{
    console.log('getDeployment')
  k8sApi3.listNamespacedDeployment('default')
    .then(data=>{
      res.locals.list.deploymentList = data.body;
      next();
    })
    .catch(err => next(err));
}

clusterController.getIngresses = (req, res, next) =>{
  console.log('getIngre')
  k8sApi2.listNamespacedIngress('default')
    .then(data=>{
      res.locals.list.ingressList = data.body;
      next();
    })
    .catch(err => next(err));
}

clusterController.getNodes = (req, res, next) =>{
    console.log('getnodes')
    k8sApi.listNode('default')
      .then(data=>{
        res.locals.list.nodeList = data.body;
        next();
      })
      .catch(err => next(err));
  }

module.exports = clusterController;