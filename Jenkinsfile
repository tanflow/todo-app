pipeline {
    agent any

    environment {
        HOST = "localhost"          // Change to your VM IP (e.g., 13.x.x.x)
        PORT = "2222"               // SSH port
        USER = "raj"                // VM username
        REPO = "https://github.com/tanflow/todo-app.git"
    }

    stages {

        stage('Deploy to VM') {
            steps {
                sshagent(['vm-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -p $PORT $USER@$HOST << 'EOF'

                    set -e

                    echo "🚀 Connected to VM"

                    # Clone repo if not exists
                    if [ ! -d ~/todo-app ]; then
                        git clone $REPO ~/todo-app
                    fi

                    cd ~/todo-app

                    echo "📥 Pulling latest code"
                    git pull origin main

                    echo "⚙️ Installing backend dependencies"
                    cd backend
                    npm install

                    echo "⚙️ Installing frontend dependencies & building"
                    cd ../frontend
                    npm install
                    npm run build

                    echo "🔄 Restarting backend with PM2"
                    pm2 delete backend-app || true

                    cd ../backend
                    pm2 start index.js --name backend-app

                    pm2 save

                    echo "✅ Deployment Successful"

                    EOF
                    """
                }
            }
        }
    }
}