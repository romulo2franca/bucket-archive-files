pipeline {
  agent {
    kubernetes {
      yaml """
metadata:
  labels:
    jenkins: slave
spec:
  containers:
  - name: git
    image: alpine/git
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: "/var/run/docker.sock"
      name: "volume-0"
      readOnly: false
  - name: docker
    image: docker
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: "/var/run/docker.sock"
      name: "volume-0"
      readOnly: false
  - name: node
    image: node:alpine
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: "/var/run/docker.sock"
      name: "volume-0"
      readOnly: false
  volumes:
  - name: "volume-0"
    hostPath:
      path: "/var/run/docker.sock"
  - name: "workspace-volume"
    emptyDir:
      medium: ""
"""
    }
  }
  environment {
    REPO_URL = 'romulo2franca'
    PROJECT_NAME = 'bucket-archive-files'
  }
  stages{
    stage('Checkout') {
      steps{
          sh "git clone -b ${BRANCH_NAME} https://github.com/${REPO_URL}/${PROJECT_NAME}.git"
          dir("${PROJECT_NAME}") {
            sh "GIT_COMMIT=\$(git rev-parse --short HEAD)"
          }
      }
      }
      stage('Test') {
        steps{
          dir("${PROJECT_NAME}") {
            container('node') {
              sh './scripts/test.sh'
            }
          }
        }
      }
      stage('Build') {
        when {
          branch 'master'
        }
        steps {
          dir("${PROJECT_NAME}") {
            container('docker') {
              sh './scripts/build.sh'
            }
          }
        }
      }
      stage('Publish') {
        when {
          branch 'master' 
        }
        steps{
          dir("${PROJECT_NAME}") {
            container('docker') {
              sh './scripts/publish.sh'
            }
          }
        }
      }
      stage('Test in Dev') {
        when {
          branch 'development' 
        }
        steps{
          dir("${PROJECT_NAME}") {
            container('docker') {
              sh './scripts/deploy.sh dev'
            }
          }
        }
      }
      stage('Deploy in Stage') {
        when {
          branch 'master' 
        }
        steps{
          dir("${PROJECT_NAME}") {
            container('docker') {
              sh './scripts/deploy.sh stage'
            }
          }
        }
      }
      stage('Deploy in Prod') {
        when {
          branch 'production' 
        }
        steps{
          dir("${PROJECT_NAME}") {
            container('docker') {
              sh './scripts/deploy.sh prod'
            }
          }
        }
      }
    }
  }