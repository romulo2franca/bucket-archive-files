set -e

environment=${1}

for line in $(cat ../env/${1}.env); do
  export ${line}
done

cat ../k8s/01-batch-job.yml | envsubst
