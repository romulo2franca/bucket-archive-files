pipeline {
    agent {
        docker {
            image 'docker'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Test') {
            steps {
                sh 'test.sh'
            }
        }
        stage('Build') {
            steps {
                sh 'build.sh'
            }
        }
        stage('Deliver for development') {
            when {
                branch 'development' 
            }
            steps {
                sh 'deploy.sh dev'
            }
        }
        stage('Deploy for production') {
            when {
                branch 'production'  
            }
            steps {
                sh 'deploy.sh prod'
            }
        }
    }
}