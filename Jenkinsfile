pipeline {
    agent any

    environment {
        IMAGE_NAME = "todo-app"
        CONTAINER_NAME = "todo-container"
        PORT = "3001"
    }

    stages {

        stage('Checkout') {
            steps {
                // ✅ Explicitly use main branch
                git branch: 'main', url: 'https://github.com/tanflow/todo-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker Image...'
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Stop Old Container') {
            steps {
                echo '🛑 Removing old container...'
                bat '''
                docker stop %CONTAINER_NAME% || exit 0
                docker rm %CONTAINER_NAME% || exit 0
                '''
            }
        }

        stage('Run New Container') {
            steps {
                echo '🚀 Starting new container...'
                bat 'docker run -d -p %PORT%:80 --name %CONTAINER_NAME% %IMAGE_NAME%'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
            echo '🌐 App URL: http://localhost:3001'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}