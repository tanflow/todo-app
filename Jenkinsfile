pipeline {
    agent any

    environment {
        HOST = "localhost"   // change if needed
        PORT = "2222"
        USER = "raj"
        REPO = "https://github.com/tanflow/todo-app.git"
        APP_DIR = "todo-app"
        NODE_ENV = "production"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "📦 Installing dependencies..."
                    bat 'npm ci --legacy-peer-deps'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "🔨 Building frontend..."
                    bat 'npx tsc -b && npx vite build'
                }
            }
        }

        stage('Deploy to VM') {
            steps {
                script {
                    echo "🚀 Deploying to VM..."
                    bat '''
                        ssh -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% ^
                        "mkdir -p ~/%APP_DIR% && cd ~/%APP_DIR% && rm -rf ./dist || true"

                        echo Copying dist folder to VM...
                        scp -o StrictHostKeyChecking=no -P %PORT% -r dist %USER%@%HOST%:~/%APP_DIR%/

                        ssh -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% ^
                        "cd ~/%APP_DIR% && pm2 restart todo-app || pm2 start 'npx http-server -p 8080 -c-1 ./dist' --name todo-app && pm2 save && echo Deployment Done"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✨ Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
    }
}