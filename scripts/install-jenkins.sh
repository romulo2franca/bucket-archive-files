#!/usr/bin/env bash

set -e

kubectl apply -f ./infra/jenkins/jenkins-pv.yml
helm install jenkins stable/jenkins -f infra/jenkins/helm-values.yml  --namespace devops