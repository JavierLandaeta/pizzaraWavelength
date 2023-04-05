pipeline {
    agent {
        node {
            label 'ohio'
        }
    }
    triggers{
         pollSCM '0 1 * * *'
    }
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out...'
                //sh 'mkdir -p drawingApp/DrawingApp'
                //sh 'cd drawingApp/DrawingApp'
                // Asegurarse de que el directorio de trabajo esté limpio
                //deleteDir()
                git branch: 'ohio', url: 'https://github.com/JavierLandaeta/pizzaraWavelength.git'
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
                // sh 'nohup node server.js > /dev/null 2>&1&'
                // sh 'export BUILD_ID=dontKillMe'
                sh 'BUILD_ID=dontKillMe sudo npm run start &'
            }
        }
    }
}