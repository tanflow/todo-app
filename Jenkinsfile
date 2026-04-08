pipeline {
    agent any

    environment {
        IMAGE_NAME = "todo-app"
        CONTAINER_NAME = "todo-container"
        VM_USER = "raj"
        VM_HOST = "localhost"
        VM_PORT = "2222"
        SSH_KEY = "C:\\Windows\\System32\\config\\systemprofile\\.ssh\\id_rsa"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/tanflow/todo-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker Image...'
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Save Image') {
            steps {
                echo '📦 Saving Docker Image...'
                bat 'docker save -o todo-app.tar %IMAGE_NAME%'
            }
        }

        stage('Transfer Image to VM') {
            steps {
                echo '📤 Sending image to VM...'
                bat '''
                scp -i %SSH_KEY% -P %VM_PORT% todo-app.tar %VM_USER%@%VM_HOST%:/tmp/
                '''
            }
        }

        stage('Deploy on VM') {
            steps {
                echo '🚀 Deploying on VM...'
                bat '''
                ssh -i %SSH_KEY% -p %VM_PORT% %VM_USER%@%VM_HOST% "
                docker stop %CONTAINER_NAME% || true &&
                docker rm %CONTAINER_NAME% || true &&
                docker load -i /tmp/todo-app.tar &&
                docker run -d -p 80:80 --name %CONTAINER_NAME% %IMAGE_NAME%
                "
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful on VM!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}