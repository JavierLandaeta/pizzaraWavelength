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
                echo 'Checking out...'
                //sh 'mkdir -p drawingApp/DrawingApp'
                //sh 'cd drawingApp/DrawingApp'
                // Asegurarse de que el directorio de trabajo esté limpio
                //deleteDir()
                git branch: 'zaragoza', url: 'https://github.com/JavierLandaeta/pizzaraWavelength.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies ...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing ...'
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying ...'
                sh 'fuser -k 3000/tcp  || true'
                sh 'nohup node server.js || true'
            }
        }
    }
}