set -e

docker build --pull -t ${PROJECT_NAME}:${GIT_COMMIT} -t ${PROJECT_NAME}:latest .
