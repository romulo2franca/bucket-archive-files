set -e

environment=${1}

export GIT_COMMIT=$(git rev-parse --short HEAD)

for line in $(cat ../env/${1}.env); do
  export ${line}
done

cat ../k8s/01-batch-job.yml | envsubst
