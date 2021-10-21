# webookrepo
Technical assessment for the position of full-stack engineer at Supero Tecnologia.

## Dependencies

In order to build the project, you must have already installed and configured in your workspace:

* [Docker](https://docs.docker.com/engine/install/ubuntu/)
* [Kubernetes](https://kubernetes.io/docs/setup/) stack:
    * [minukube](https://minikube.sigs.k8s.io/docs/start/)
    * [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
    * [skaffold](https://skaffold.dev/docs/install/)
    * [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/#minikube)
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/getting-started)

### First time steps in dev mode

There are some scripts that must be run in order to setup some configurations concerning security and domain mapping.
In the terminal, run the following commands:

```bash
cd scripts/dev
./manage-domain.sh add # Maps the webookrepo.dev domain to the minikube IP
./manage-env.sh add # Create env variables in the k8s cluster, in this case, the JWT secret
```

For removing such settings, just run:
```bash
./manage-domain.sh remove
./manage-env.sh remove
```
### Note about shared library

This project uses a library, that contains implementations of custom errors and middlewares, to be shared between the different microservices.
This approach was considered instead of code sharing via Git's submodule feature. A basic NPM registry for this package was created, and can be
accessed [here](https://www.npmjs.com/package/@webookrepo/commonp).

## Installation

In order to build and run the whole kubernetes cluster via skaffold, just run in the terminal, at the project root:

```bash
skaffold dev
```

## Usage

With all the deployment finished and the pods created, the interface can be accessed via [browser](https://webookrepo.dev/).

To stop the deployment's execution, just press `Ctrl+C`.
