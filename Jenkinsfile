pipeline {
    agent any

    environment {
        HOST = "localhost"
        PORT = "2222"
    }

    stages {

        stage('Clone Code') {
            steps {
                git 'https://github.com/tanflow/todo-app.git'
            }
        }

        stage('Deploy to VM') {
            steps {
                sshagent(['vm-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no -p $PORT raj@$HOST << 'EOF'

                    echo "Connected to VM 🚀"

                    cd ~/todo-app || git clone https://github.com/tanflow/todo-app.git

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