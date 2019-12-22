#!/usr/bin/env bash

set -e

function revert_env() {
  ln -sf env/stage.env myke.env
}

trap revert_env EXIT

environment=${1}

ln -sf env/${environment}.env myke.env

export GIT_COMMIT=$(git rev-parse --short HEAD)

for line in $(cat myke.env); do
  export ${line}
done

set -e
myke --template gcloud/01-batch-job.yml | kubectl apply -f -
