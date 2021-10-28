# Kubric

Kubric aims to provide a clean dashboard that displays important worker node and pod metrics. Kubric provides insight into the master node, the gatekeeper of communication to the cluster and responsible for orchestrating all the heavy lifting to corresponding worker nodes.

Additionally, Kubric persists logs and allows developers to query persisted logs even if a pod has been evicted and replaced. Developers need not worry about logs dying with pods or about log rotation policies because logs are persistently stored and queryable through Kubric.

* **Query Persistent Log Storage by Index Name, Field, Value**

<p align="center">
  <img width="600vw" height="450vw" src="https://github.com/luke-h-cho/kubricDemoSite/blob/7d96f54b68d8405b883a42cc419554df30f7bf53/dist/38f04747aa894f4311c968370c40e999.gif" />
</p>

* **Toggle Visualization to View Relative Performance**

<p align="center">
  <img width="600vw" height="450vw" src="https://github.com/luke-h-cho/kubricDemoSite/blob/7d96f54b68d8405b883a42cc419554df30f7bf53/dist/5ba72ffcc222b6f1b5a29aa6779880a5.gif" />
</p>

* **Tab between Overview, Master and Worker Nodes Views**

<p align="center">
  <img width="600vw" height="450vw" src="https://github.com/luke-h-cho/kubricDemoSite/blob/7d96f54b68d8405b883a42cc419554df30f7bf53/dist/68b4694938ee979031252398cbd96695.gif" />
</p>

## Set Up Prerequisites

**Warning : lots of YAML involved!!!**

Before you can utilize our product for your designated Kubernetes cluster, you **must** have followings already deployed and set up inside your cluster before deploying our app.

* **Prometheus**

  

* **Fluentd & ElasticSearch**
  
  *

## Set Up Kubric


## What's Next?

**Kubric is still under the development**, further features and optimizations to be implemented! Stay tuned for more updates! 
Feel free to contact us for any comments, concerns, suggestions!

## Contributers

* Laura Botel : [Github](https://github.com/laurabotel) | [LinkedIn](https://www.linkedin.com/in/laurabotel/)
* Luke Cho : [Github](https://github.com/luke-h-cho) | [LinkedIn](https://www.linkedin.com/in/luke-h-cho/)
* James Cross : [Github](https://github.com/James-P-Cross) | [LinkedIn](https://www.linkedin.com/in/james-cross-9b164ba9/)
* John Haberstroh : [Github](https://github.com/jlhline) | [LinkedIn](https://www.linkedin.com/in/john-haberstroh-9436ab117/)


