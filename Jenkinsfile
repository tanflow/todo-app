pipeline {
    agent any

    environment {
        HOST = "localhost"
        PORT = "2222"
        USER = "raj"
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

        stage('Deploy to Nginx (VM)') {
            steps {
                echo "🚀 Deploying to Nginx..."

                timeout(time: 5, unit: 'MINUTES') {

                    bat """
                    echo ===== TESTING SSH CONNECTION =====
                    ssh -i %SSH_KEY% -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% "echo CONNECTED"

                    echo ===== CLEANING OLD FILES =====
                    ssh -i %SSH_KEY% -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% ^
                    "sudo rm -rf /var/www/html/*"

                    echo ===== COPYING NEW BUILD TO NGINX =====
                    scp -i %SSH_KEY% -o StrictHostKeyChecking=no -P %PORT% -r dist/* %USER%@%HOST%:/tmp/

                    echo ===== MOVING FILES TO NGINX DIRECTORY =====
                    ssh -i %SSH_KEY% -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% ^
                    "sudo mv /tmp/* /var/www/html/ && sudo chown -R www-data:www-data /var/www/html"

                    echo ===== RESTARTING NGINX =====
                    ssh -i %SSH_KEY% -o StrictHostKeyChecking=no -p %PORT% %USER%@%HOST% ^
                    "sudo systemctl restart nginx"

                    echo ===== DEPLOYMENT DONE =====
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Nginx Deployment Successful 🚀"
        }
        failure {
            echo "❌ Deployment Failed"
        }
    }
}