# Kubric

Kubric a user-friendly web application built to make it easier to maintain and debug Kubernetes cluster by:
- displaying important Kubernetes worker node and pod metrics
- providing insight into the control plane (master node)
- persisting logs beyond pod lifecycle and providing a GUI to query, filter, and sort persisted logs.  


## Table of Contents  
- Application demo
- Pre-requisitis
- Features
- How it works
- Set up
- What's next
- How to contribute
- License

## Demo  

### *Logs*  
Kubric allows users to query and filter persistent log storage by index name, field, and value:

<p align="center">
  <img width="400vw" height="300vw" src="https://github.com/luke-h-cho/kubricDemoSite/blob/7d96f54b68d8405b883a42cc419554df30f7bf53/dist/38f04747aa894f4311c968370c40e999.gif" />
</p>
  
### *Metrics*  
Toggle visualization to view relative performance of particular nodes and pods:
<p align="center">
  <img width="400vw" height="300vw" src="https://github.com/luke-h-cho/kubricDemoSite/blob/7d96f54b68d8405b883a42cc419554df30f7bf53/dist/5ba72ffcc222b6f1b5a29aa6779880a5.gif" />
</p>  

* **Tab between Overview, Master and Worker Nodes Views**
Tab between Overview, Master, and Worker Node Views:
<p align="center">
  <img width="400vw" height="300vw" src="https://github.com/luke-h-cho/kubricDemoSite/blob/7d96f54b68d8405b883a42cc419554df30f7bf53/dist/68b4694938ee979031252398cbd96695.gif" />
</p>

## Set Up Prerequisites

Here are links to the technology we used to implement our application. Be sure to have kubernetes installed before beginning setup

* **Kubernetes**
  * To run commands against your cluster, make sure you have [Kubectl](https://kubernetes.io/docs/tasks/tools/) installed for your operating system 

* **Helm**
  * [Helm charts](https://helm.sh/docs/intro/install/) are a great resource to download interdependent YAML configuration files for complicated setup

* **Fluentd**
  * [Fluentd](https://github.com/bitnami/charts/tree/master/bitnami/fluentd) is our log forwarding agent of choice

* **Elasticsearch**
  * [Elasticsearch](https://github.com/elastic/helm-charts/tree/master/elasticsearch) is what we use for provisioning remote storage

* **Prometheus**
  * [Prometheus](https://prometheus-operator.dev/docs/prologue/quick-start/) is the standard for metrics pipeline monitoring

* **Linode LKE** 
  * [Linode LKE](https://www.linode.com/) is the remote storage provider we chose, future support for GKE and EKS is in the works

## Set Up 

1. Begin by cloning this repo

2. Create an account and provision three worker nodes with at least 8GB of RAM and 160GB of storage 

3. Upon successful provisioning, download your Kubeconfig yaml file

      From the command line run: <br/>
      MacOS/Linux:<br/>
      ```
      export KUBECONFIG=/path/to/config.yaml
      ```

      Windows:
      ```
      create folder C:\Users\username\.kube

      rename cluster-config.yaml to config

      put config file in .kube folder
      ```

      You should now be connected to your remote cluster and able to run kubectl commands against it

4. To deploy our sample log generator app to the cluster:

      ```
      kubectl apply -f logGen-app/logGen-app-depl.yaml
      ```

      If you have not installed Helm do so now

5. Install Elasticsearch:

      ```
      helm repo add elastic https://Helm.elastic.co
      helm install elasticsearch elastic/elasticsearch -f values.yaml
      ```

6. Install Fluentd:
    
      ```
      helm repo add bitnami https://charts.bitnami.com/bitnami
      helm install fluentd bitnami/fluentd
      ```

7. Apply our log forwarding config file:
  
      ```
      kubectl apply -f fluent-update.yaml
      kubectl rollout restart daemonset/fluentd
      ```
  
8. Install Prometheus:
    
      To deploy prometheus to this cluster, follow the above link's quick start guide sections

8. To open ports for app access:
  
      ```
      kubectl --n monitoring port-forward svc/prometheus-k8s 9090
      kubectl port-forward service/elasticsearch-master 9200
      ```
    
<hr/>

That's it!
Make sure to npm install and for now npm run dev, navigate to localhost:8080 to log in and view cluster info.

To add new applications to filter logs from, simply add another match statement to the fluentd config file and follow the syntax provided. Then kubectl rollout the update


## What's Next?

**Kubric is still under the development**, further features and optimizations to be implemented! Stay tuned for more updates! 
Feel free to contact us for any comments, concerns, suggestions!

## Contributers

* Laura Botel : [Github](https://github.com/laurabotel) | [LinkedIn](https://www.linkedin.com/in/laurabotel/)
* Luke Cho : [Github](https://github.com/luke-h-cho) | [LinkedIn](https://www.linkedin.com/in/luke-h-cho/)
* James Cross : [Github](https://github.com/James-P-Cross) | [LinkedIn](https://www.linkedin.com/in/james-cross-9b164ba9/)
* John Haberstroh : [Github](https://github.com/jlhline) | [LinkedIn](https://www.linkedin.com/in/john-haberstroh-9436ab117/)


