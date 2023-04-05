pipeline {
    agent {
        node {
            label 'zaragoza'
            // Asegurarse de que el directorio de trabajo esté limpio
            deleteDir()
        }
    }

    stages {
        stage('Checkout') {
            steps {
                sh 'mkdir -p drawingApp/DrawingApp'
                git 'https://github.com/JavierLandaeta/pizzaraWavelength/tree/zaragoza.git'
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