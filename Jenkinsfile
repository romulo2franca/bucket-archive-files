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
    containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true)
  ],
  volumes: [
    hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  ]
  ) {
  node('jenkins-build-node') {
    stage('Test') {
      dir("scripts") {
        sh 'chmod 777 *'
        sh 'test.sh'
      }
    }
    stage('Build') {
      dir("scripts") {
        sh 'build.sh'
      }
    }
    stage('Check running containers') {
      container('docker') {
        // example to show you can run docker commands when you mount the socket
        sh 'hostname'
        sh 'hostname -i'
        sh 'docker ps'
      }
    }
    stage('Clone repository') {
      container('git') {
        sh 'whoami'
        sh 'hostname -i'
        sh 'git clone -b master https://github.com/lvthillo/hello-world-war.git'
      }
    }
  }
}