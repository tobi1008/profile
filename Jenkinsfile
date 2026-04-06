pipeline {
    agent any

    // Bơm thêm 1GB RAM cho Sonar Scanner để quá trình giải nén Node.js không bị crash
    environment {
        SONAR_SCANNER_OPTS = "-Xmx1024m" 
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Kéo source code từ repo Git của bạn
                git branch: 'main', url: 'https://github.com/tobi1008/profile.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Gọi Tool Scanner đã cấu hình trong Jenkins
                    def scannerHome = tool 'sonar-scanner'
                    
                    // Gọi Server SonarQube đã cấu hình trong Jenkins
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