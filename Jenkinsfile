pipeline {
    agent any

    environment {
        HOST = "localhost"
        PORT = "2222"
        USER = "raj"
        APP_DIR = "todo-app"
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

                bat """
                echo Creating app directory on VM...
                ssh -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% "mkdir -p ~/%APP_DIR%"

                echo Removing old build...
                ssh -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% "rm -rf ~/%APP_DIR%/dist"

                echo Copying new build...
                scp -o StrictHostKeyChecking=no -P %PORT% -r dist %USER%@%HOST%:~/%APP_DIR%/

                echo Restarting app with PM2...
                ssh -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% ^
                "pm2 delete todo-app || true && \
                 pm2 start 'npx http-server -p 8080 -c-1 ~/todo-app/dist' --name todo-app && \
                 pm2 save"
                """
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