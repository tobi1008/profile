pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Thay URL này bằng link Git chứa source code Node.js lab của bạn
                git branch: 'main', url: 'https://github.com/tobi1008/profile.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Gọi đúng cái tên Tool bạn vừa cấu hình trong Manage Jenkins -> Tools
                    def scannerHome = tool 'sonar-scanner'
                    
                    // Gọi đúng cái tên Server bạn vừa cấu hình trong Manage Jenkins -> System
                    withSonarQubeEnv('sonarqube-server') {
                        // Chạy lệnh quét code
                        sh """
                        ${scannerHome}/bin/sonar-scanner \
                          -Dsonar.projectKey=demo-lab \
                          -Dsonar.projectName="Demo Lab Nodejs" \
                          -Dsonar.sources=. \
                          -Dsonar.exclusions=node_modules/**,test/** \
                          -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
            }
        }
    }
}