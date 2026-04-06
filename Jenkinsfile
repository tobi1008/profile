pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/tobi1008/profile.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    
                    withSonarQubeEnv('sonarqube-server') {
                        // Truyền biến môi trường chuẩn của Jenkins, cấp tối đa 1GB cho bộ quét
                        withEnv(["SONAR_SCANNER_OPTS=-Xmx1024m"]) {
                            sh """
                            ${scannerHome}/bin/sonar-scanner \
                              -Dsonar.projectKey=demo-lab \
                              -Dsonar.projectName="Demo Lab Nodejs" \
                              -Dsonar.sources=. \
                              -Dsonar.exclusions=node_modules/**,test/** \
                              -Dsonar.javascript.node.maxspace=512 \
                              -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                            """
                        }
                    }
                }
            }
        }
    }
}