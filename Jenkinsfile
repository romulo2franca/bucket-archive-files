pipeline {
    agent {
        docker {
            image 'node:alpine'
            args '-p 3000:3000 -p 5000:5000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'myke build'
            }
        }
        stage('Test') {
            steps {
                sh 'myke test'
            }
        }
        stage('Deliver for development') {
            when {
                branch 'development' 
            }
            steps {
                sh 'myke deploy'
            }
        }
        stage('Deploy for production') {
            when {
                branch 'production'  
            }
            steps {
                sh 'myke deploy --env=prod'
            }
        }
    }
}