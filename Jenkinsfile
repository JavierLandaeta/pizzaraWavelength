pipeline {
    agent {
        node {
            label 'zaragoza'
        }
    }
    triggers{
        pollSCM '*/5 * * * *'
    }
    stages {
        stage('Checkout') {
            steps {
                sh 'mkdir -p drawingApp/DrawingApp'
                sh 'cd drawingApp/DrawingApp'
                // Asegurarse de que el directorio de trabajo esté limpio
                deleteDir()
                git 'https://github.com/JavierLandaeta/pizzaraWavelength/zaragoza.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'nohup node server.js'
            }
        }
    }
}