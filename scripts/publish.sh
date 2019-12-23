set -e

docker tag ${PROJECT_NAME}:latest ${REPO_URL}/${PROJECT_NAME}:latest
docker tag ${PROJECT_NAME}:latest ${REPO_URL}/${PROJECT_NAME}:${GIT_COMMIT}

docker push ${REPO_URL}/${PROJECT_NAME}:latest
docker push ${REPO_URL}/${PROJECT_NAME}:${GIT_COMMIT}
