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

// podTemplate(label: 'jenkins-build-node', containers: [
//     containerTemplate(name: 'git', image: 'alpine/git', ttyEnabled: true, command: 'cat'),
//     containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
//     containerTemplate(name: 'node', image: 'node:alpine', ttyEnabled: true, command: 'cat'),
//   ],
//   volumes: [
//     hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
//   ]
//   ) {
//   node('jenkins-build-node') {
//     withEnv(['PROJECT_NAME=bucket-archive-files','REPO_URL=romulo2franca']) {
//       stage('Checkout') {
//           sh "git clone -b ${BRANCH_NAME} https://github.com/${REPO_URL}/${PROJECT_NAME}.git"
//           dir(${PROJECT_NAME}) {
//             sh "GIT_COMMIT=\$(git rev-parse --short HEAD)"
//           }
//       }
//       stage('Test') {
//         dir(${PROJECT_NAME}) {
//           container('node') {
//             sh './scripts/test.sh'
//           }
//         }
//       }
//       stage('Build') {
//         if(BRANCH_NAME == 'development' || "master" ||)
//         dir(${PROJECT_NAME}) {
//           container('docker') {
//             sh './scripts/build.sh'
//           }
//         }
//       }
//       stage('Publish') {
//         when {
//           branch 'master' || 'development' || 'production' 
//         }
//         dir(${${PROJECT_NAME}}) {
//           container('docker') {
//             sh './scripts/publish.sh'
//           }
//         }
//       }
//     }
//   }
// }
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
    // stage('Checkout') {
    //   steps{
    //       sh "git clone -b ${BRANCH_NAME} https://github.com/${REPO_URL}/${PROJECT_NAME}.git"
    //       dir("${PROJECT_NAME}") {
    //         sh "GIT_COMMIT=\$(git rev-parse --short HEAD)"
    //       }
    //   }
      // }
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
      // stage('Publish') {
      //   when {
      //     branch 'master' || 'development' || 'production' 
      //   }
      //   dir(${${PROJECT_NAME}}) {
      //     container('docker') {
      //       sh './scripts/publish.sh'
      //     }
      //   }
      // }
    }
  }