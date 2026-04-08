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

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/tanflow/todo-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Save Docker Image') {
            steps {
                bat "docker save %IMAGE_NAME% -o todo.tar"
            }
        }

        stage('Transfer Image to VM') {
            steps {
                bat """
                scp -P %VM_PORT% -i %SSH_KEY% todo.tar %VM_USER%@%VM_HOST%:/home/%VM_USER%/
                """
            }
        }

        stage('Deploy on Ubuntu VM') {
            steps {
                bat """
                ssh -p %VM_PORT% -i %SSH_KEY% %VM_USER%@%VM_HOST% ^
                "docker stop %CONTAINER_NAME% || true && ^
                 docker rm %CONTAINER_NAME% || true && ^
                 docker load -i todo.tar && ^
                 docker run -d -p 4000:80 --name %CONTAINER_NAME% %IMAGE_NAME%"
                """
            }
        }
    }
}