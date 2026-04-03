pipeline {
    agent any

    environment {
        HOST = "localhost"
        PORT = "2222"
        REPO = "https://github.com/tanflow/todo-app.git"
    }

    stages {

        stage('Clone Code') {
            steps {
                git "$REPO"
            }
        }

        stage('Deploy to VM') {
            steps {
                sshagent(['vm-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -p $PORT raj@$HOST << 'EOF'

                    set -e   # 🚀 stop on error

                    echo "Connected to VM 🚀"

                    # Clone if not exists
                    if [ ! -d "~/todo-app" ]; then
                        git clone $REPO ~/todo-app
                    fi

                    cd ~/todo-app

                    git pull origin main

                    # Backend setup
                    cd backend
                    npm install

                    # Frontend setup
                    cd ../frontend
                    npm install
                    npm run build

                    # Restart backend
                    pm2 delete backend-app || true

                    cd ../backend
                    pm2 start index.js --name backend-app

                    pm2 save

                    echo "Deployment Done ✅"

                    EOF
                    """
                }
            }
        }
    }
}