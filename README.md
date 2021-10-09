# kubric
//BACK END

--install prometheus and kubernetes node.js clients libraries

//ClusterRouter & Controller
--Handles proxy fetched to kubernetes api server
--returns podList, nodeList, serviceList, deploymentList, ingressList

//Metrics Router & Controller
--scrapes metrics from kubernetes client register 

//Logs Router & Controller
--TBD

//Server
Handles above routes, and react router client side routing(ex:/structure renders the structure component)
-switch routes in app.jsx

//YAML Files
--our deployment
--rbac deployment
--possible log deployment?

//FRONT END
--Make use of material/ui library for display(core,themes,icons, etc) rechart, zingchart
--Using REDUX && hooks
--actions
    --actionTypes
    --metricsActionCreator
        - scrape metrics from port 9090 (prometheus server)
    --clusterActionCreator
        - K8s cluster configuration from API server
    --logsActionCreator (TBD)
--reducers
    --deploymentReducer
    --ingressReducer
    --metricsReducer
    --nodesReducer
    --podsReducer
    --servicesReducer
    ---logReducer (TBD)
--store
    --combine our reducers

