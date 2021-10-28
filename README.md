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

Here are links to the technology we used to implement our application. Be sure to have kubernetes installed before beginning setup.

* **Kubernetes**
 * To run commands against your cluster, make sure you have Kubectl installed for your operating system 
 <a href="https://kubernetes.io/docs/tasks/tools/">Kubectl Installation Guide</a>

* **Helm**
 * Helm charts are a great resource to download interdependent YAML configuration files for complicated setup.
 <a href="https://helm.sh/docs/intro/install/">Helm Installation</a>

* **Fluentd**
 * Fluentd is our log forwarding agent of choice
 <a href="https://github.com/bitnami/charts/tree/master/bitnami/fluentd">Fluentd Chart Installation</a>

* **Elasticsearch**
 * Elasticsearch is what we use for provisioning remote storage
 <a href="https://github.com/elastic/helm-charts/tree/master/elasticsearch">Elasticsearch Chart Installation</a>

* **Prometheus**
 * Prometheus is the standard for metrics pipeline monitoring
<a href="https://prometheus-operator.dev/docs/prologue/quick-start/">Prometheus</a>

 * **Linode LKE** 
 * Linode LKE is the remote storage provider we chose, future support for GKE and EKS is in the works.
<a href="https://www.linode.com/">Linode LKE</a>
## Set Up 
Begin by cloning this repo.

Create an account and provision three worker nodes with at least 8GB of RAM and 160GB of storage.
Upon successful provisioning, download your Kubeconfig yaml file.

From the command line run:
MacOS/Linux:
export KUBECONFIG=/path/to/config.yaml

Windows:
create folder C:\Users\username\.kube
rename cluster-config.yaml to config
put config file in .kube folder

You should now be connected to your remote cluster and able to run kubectl commands against it.

To deploy our sample log generator app to the cluster:
kubectl apply -f logGen-app/logGen-app-depl.yaml

If you have not installed Helm do so now.

Install Elasticsearch:
helm repo add elastic https://Helm.elastic.co
helm install elasticsearch elastic/elasticsearch -f values.yaml

Install Fluentd:
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install fluentd bitnami/fluentd

Apply our log forwarding config file:
kubectl apply -f fluent-update.yaml
kubectl rollout restart daemonset/fluentd

Prometheus:
To deploy prometheus to this cluster, follow the above link's quick start guide sections.

To open ports for app access:
kubectl --n monitoring port-forward svc/prometheus-k8s 9090
kubectl port-forward service/elasticsearch-master 9200

That's it!
Make sure to npm install and for now npm run dev, navigate to localhost:8080 to log in and view cluster info.























## What's Next?

**Kubric is still under the development**, further features and optimizations to be implemented! Stay tuned for more updates! 
Feel free to contact us for any comments, concerns, suggestions!

## Contributers

* Laura Botel : [Github](https://github.com/laurabotel) | [LinkedIn](https://www.linkedin.com/in/laurabotel/)
* Luke Cho : [Github](https://github.com/luke-h-cho) | [LinkedIn](https://www.linkedin.com/in/luke-h-cho/)
* James Cross : [Github](https://github.com/James-P-Cross) | [LinkedIn](https://www.linkedin.com/in/james-cross-9b164ba9/)
* John Haberstroh : [Github](https://github.com/jlhline) | [LinkedIn](https://www.linkedin.com/in/john-haberstroh-9436ab117/)


