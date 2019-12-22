#!/usr/bin/env bash

set -e

kubectl apply -f ./infra/jenkins/01-deployment.yml
kubectl apply -f ./infra/jenkins/02-service.yml
