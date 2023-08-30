# Setting Up Kubernetes Locally

## Kubernetes Environment

To set up a local Kubernetes environment, you'll need to follow these steps:

1. Install Minikube
   - Official Documentation: [Install Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)

2. Install kubectl
   - Official Documentation: [Install kubectl on Linux](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-linux)

3. Install Helm
   - Official Documentation: [Install Helm](https://helm.sh/docs/intro/install/)

## Commands to Launch the Kubernetes Cluster

Follow these commands to launch the Kubernetes cluster:

1. Update Helm Dependencies
   ```
   helm dependency update
   ```

2. Build Helm Dependencies
   ```
   helm dependency build
   ```

3. Start Minikube
   ```
   minikube start
   ```

4. Change Directory to Helm Charts
   ```
   cd /helm/angova
   ```

5. Install the Application using Helm
   ```
   helm install angova .
   ```

6. Access the Service via Minikube
   ```
   minikube service angova-ingress-nginx-controller
   ```

## Scaling Up and Scaling Down

You can scale your deployments using the following commands:

- Scale up example:
  ```
  kubectl scale --replicas=1 deployment/api-deployment
  ```

## Monitoring Deployments

To monitor your deployments, you can use the following command:

```
kubectl get deployment --watch
```

Feel free to modify and adapt these instructions based on your specific needs and environment.

**Note:** This document assumes you have some familiarity with Kubernetes concepts and the command-line interface.
