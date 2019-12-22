set -e

GIT_COMMIT=$(git rev-parse --short HEAD)

docker build --pull -t ${PROJECT_NAME}:${GIT_COMMIT} -t ${PROJECT_NAME}:latest .
