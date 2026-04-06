pipeline {
    agent any

    environment {
        HOST = "localhost"
        PORT = "2222"
        USER = "raj"
        APP_DIR = "todo-app"
        SSH_KEY = "C:\\Windows\\System32\\config\\systemprofile\\.ssh\\id_rsa"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies..."
                bat 'npm ci --legacy-peer-deps'
            }
        }

        stage('Build') {
            steps {
                echo "🔨 Building frontend..."
                bat 'npm run build'
            }
        }

        stage('Deploy to VM') {
            steps {
                echo "🚀 Deploying to VM..."

                timeout(time: 3, unit: 'MINUTES') {

                    bat """
                    echo ===== TESTING SSH CONNECTION =====
                    ssh -T -i %SSH_KEY% -o StrictHostKeyChecking=no -o ConnectTimeout=10 -p %PORT% %USER%@%HOST% "echo CONNECTED"

                    echo ===== CREATING APP DIRECTORY =====
                    ssh -T -i %SSH_KEY% -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% "mkdir -p ~/%APP_DIR%"

                    echo ===== REMOVING OLD BUILD =====
                    ssh -T -i %SSH_KEY% -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% "rm -rf ~/%APP_DIR%/dist"

                    echo ===== COPYING NEW BUILD =====
                    scp -i %SSH_KEY% -o StrictHostKeyChecking=no -P %PORT% -r dist %USER%@%HOST%:~/%APP_DIR%/

                    echo ===== RESTARTING APP WITH PM2 =====
                    ssh -T -i %SSH_KEY% -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% ^
                    "pm2 delete todo-app || true && \
                     pm2 start 'npx http-server -p 8080 -c-1 ~/todo-app/dist' --name todo-app && \
                     pm2 save"
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful 🚀"
        }
        failure {
            echo "❌ Deployment Failed"
        }
    }
}