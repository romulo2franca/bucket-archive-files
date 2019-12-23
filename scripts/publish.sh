set -e

docker tag ${PROJECT_NAME}:latest ${DOCKER_REPO_URL}/${PROJECT_NAME}:latest
docker tag ${PROJECT_NAME}:latest ${DOCKER_REPO_URL}/${PROJECT_NAME}:${GIT_COMMIT}

docker push ${DOCKER_REPO_URL}/${PROJECT_NAME}:latest
docker push ${DOCKER_REPO_URL}/${PROJECT_NAME}:${GIT_COMMIT}
