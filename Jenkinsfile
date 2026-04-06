pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Kéo source code từ Git
                git branch: 'main', url: 'https://github.com/tobi1008/profile.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    
                    withSonarQubeEnv('sonarqube-server') {
                        // Vẫn giữ lại lệnh bơm 1GB RAM để Java làm việc mượt mà (đây là Best Practice, không phải hack)
                        withEnv(["SONAR_SCANNER_OPTS=-Xmx1024m"]) {
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
}