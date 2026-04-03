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
                \$script = \"set -e`necho `\"🚀 Connected to VM`\"`n# Clone if not exists`nif [ ! -d ~/todo-app ]; then`n    git clone \$env:REPO ~/todo-app`nfi`ncd ~/todo-app`necho `\"📥 Pull latest code`\"`ngit pull origin main`necho `\"⚙️ Backend setup`\"`ncd backend`nnpm install`necho `\"⚙️ Frontend build`\"`ncd ../frontend`nnpm install`nnpm run build`necho `\"🔄 Restart backend`\"`npm2 restart backend-app || pm2 start index.js --name backend-app`npm2 save`necho `\"✅ Deployment Done`\"`n\"
                ssh -o StrictHostKeyChecking=no -p \$env:PORT \$env:USER@\$env:HOST \$script
                """
            }
        }
    }
}