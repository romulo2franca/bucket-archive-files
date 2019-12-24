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
    image: alpine/git:latest
    command:
    - cat
    tty: true
    volumeMounts:
    - mountPath: "/var/run/docker.sock"
      name: "volume-0"
      readOnly: false
  - name: docker
    image: docker:latest
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
  - name: kube
    image: romulo2franca/kubectl
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
    PROJECT_NAME = 'bucket-archive-files' // Nome do projeto. Utilizado tanto no git como no Docker Hub
    DOCKER_REPO_URL = 'romulo2franca' // URL do projeto. como utilizei minha conta no Docker Hub, só precisei informar o nome do usuário.
    DOCKER_REPO_CREDENTIAL = 'dockerhub' // ID da credencial do Docker Hub criada no Jenkins. Necessário para .
    KUBECONFIG = './k8s/config' // ID da credencial do cluster K8S criada no Jenkins. Necessário para autenticar no cluster e executar o deploy.
  }
  stages{
    stage('Git Clone') {
      steps{
          sh "git clone -b ${BRANCH_NAME} https://github.com/${DOCKER_REPO_URL}/${PROJECT_NAME}.git"
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
            script{
              docker.withRegistry('', "${DOCKER_REPO_CREDENTIAL}") {
                sh './scripts/publish.sh'
              }
            }
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
          container('kube') {
            sh './scripts/deploy.sh dev'
          }
        }
      }
    }
    stage('Deploy in Stage') {
      when {
        branch 'release' 
      }
      steps{
        dir("${PROJECT_NAME}") {
          container('kube') {
            sh './scripts/deploy.sh stage'
          }
        }
      }
    }
    stage('Deploy in Prod') {
      when {
        branch 'master' 
      }
      steps{
        dir("${PROJECT_NAME}") {
          container('kube') {
            sh './scripts/deploy.sh prod'
          }
        }
      }
    }
  }
}