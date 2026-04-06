pipeline {
    agent any

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
                        // Bơm trực tiếp 2GB RAM vào môi trường shell ngay trước khi chạy lệnh quét
                        sh """
                        export SONAR_SCANNER_OPTS="-Xmx2048m"
                        
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