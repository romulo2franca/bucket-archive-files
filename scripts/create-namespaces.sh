#!/usr/bin/env bash

set -e

function create_namespace() {
  if !(kubectl get ns ${1} | grep -q ${1}); then
    echo "Creating ${1}"
    kubectl create ns ${1}
  else
    echo "Skipping create namespace ${1}, already exists"
  fi
}

create_namespace devops
create_namespace stage
create_namespace prod
