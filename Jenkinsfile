// pipeline {
//     agent {
//         docker {
//             image 'docker'
//         }
//     }
//     environment {
//         CI = 'true'
//     }
//     stages {
// stage('Test') {
//     steps {
//         sh 'test.sh'
//     }
// }
// stage('Build') {
//     steps {
//         sh 'build.sh'
//     }
// }
//         stage('Deliver for development') {
//             when {
//                 branch 'development' 
//             }
//             steps {
//                 sh 'deploy.sh dev'
//             }
//         }
//         stage('Deploy for production') {
//             when {
//                 branch 'production'  
//             }
//             steps {
//                 sh 'deploy.sh prod'
//             }
//         }
//     }
// }

podTemplate(label: 'jenkins-build-node', containers: [
    containerTemplate(name: 'git', image: 'alpine/git', ttyEnabled: true, command: 'cat'),
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
    containerTemplate(name: 'node', image: 'node:alpine', ttyEnabled: true, command: 'cat'),
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  ]
  ) {
  environment {
      PROJECT_NAME = 'bucket-archive-files'
      REPO_URL = 'romulo2franca'
  }
  node('jenkins-build-node') {
    stage('Checkout') {
        sh "git clone -b ${BRANCH_NAME} https://github.com/${env.REPO_URL}/${env.PROJECT_NAME}.git"
        dir(${env.PROJECT_NAME}) {
          sh "GIT_COMMIT=\$(git rev-parse --short HEAD)"
        }
    }
    stage('Test') {
      dir(${env.PROJECT_NAME}) {
        container('node') {
          sh './scripts/test.sh'
        }
      }
    }
    stage('Build') {
      when {
        branch 'master' || 'development' || 'production' 
      }
      dir(${env.PROJECT_NAME}) {
        container('docker') {
          sh './scripts/build.sh'
        }
      }
    }
    stage('Publish') {
      when {
        branch 'master' || 'development' || 'production' 
      }
      dir(${env.PROJECT_NAME}) {
        container('docker') {
          sh './scripts/publish.sh'
        }
      }
    }
  }
}