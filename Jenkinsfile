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
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    echo "🔨 Building frontend..."
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to VM') {
            steps {
                script {
                    echo "🚀 Deploying to VM..."
                    sh '''
                        ssh -o StrictHostKeyChecking=no -p $PORT $USER@$HOST << 'EOF'
set -e

echo "🚀 Connected to VM"

# Create app directory if not exists
if [ ! -d ~/$APP_DIR ]; then
    mkdir -p ~/$APP_DIR
fi

# Navigate to app directory
cd ~/$APP_DIR

echo "📂 Clearing old build..."
rm -rf ./dist || true

EOF

                        # Copy dist folder to VM
                        scp -o StrictHostKeyChecking=no -P $PORT -r ./dist $USER@$HOST:~/$APP_DIR/

                        ssh -o StrictHostKeyChecking=no -p $PORT $USER@$HOST << 'EOF'

cd ~/$APP_DIR

echo "📋 Restarting web server..."
# If using nginx
sudo systemctl restart nginx 2>/dev/null || echo "Nginx not configured"

# Or if using pm2 with a simple http server
pm2 restart todo-app || pm2 start "npx http-server -p 8080 -c-1 ./dist" --name todo-app

pm2 save

echo "✅ Deployment Done"

EOF
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