pipeline {
    agent any

    environment {
        HOST = "localhost"   // change if needed
        PORT = "2222"
        USER = "raj"
        REPO = "https://github.com/tanflow/todo-app.git"
    }

    stages {

        stage('Deploy to VM') {
            steps {
                powershell """
                ssh -o StrictHostKeyChecking=no -p \$env:PORT \$env:USER@\$env:HOST @'
                set -e

                echo "🚀 Connected to VM"

                # Clone if not exists
                if [ ! -d ~/todo-app ]; then
                    git clone \$REPO ~/todo-app
                fi

                cd ~/todo-app

                echo "📥 Pull latest code"
                git pull origin main

                echo "⚙️ Backend setup"
                cd backend
                npm install

                echo "⚙️ Frontend build"
                cd ../frontend
                npm install
                npm run build

                echo "🔄 Restart backend"
                pm2 restart backend-app || pm2 start index.js --name backend-app

                pm2 save

                echo "✅ Deployment Done"
                '@
                """
            }
        }
    }
}