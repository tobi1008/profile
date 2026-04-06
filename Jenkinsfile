pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/tobi1008/profile.git'
            }
        }

        stage('Download NodeJS (Bypass JVM Heap)') {
            steps {
                // Dùng nháy đơn (''') để chạy lệnh Linux nguyên thủy
                sh '''
                echo "Đang tải Node.js trực tiếp bằng Linux để tránh lỗi sập RAM của Java..."
                if [ ! -d "node-v18.20.4-linux-x64" ]; then
                    curl -sL https://nodejs.org/dist/v18.20.4/node-v18.20.4-linux-x64.tar.gz | tar xz
                fi
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    
                    withSonarQubeEnv('sonarqube-server') {
                        // Dùng nháy kép (""") để Jenkins truyền biến
                        sh """
                        # Gắn đường dẫn thư mục Node.js vừa tải
                        export NODE_EXEC="\$(pwd)/node-v18.20.4-linux-x64/bin/node"
                        
                        ${scannerHome}/bin/sonar-scanner \
                          -Dsonar.projectKey=demo-lab \
                          -Dsonar.projectName="Demo Lab Nodejs" \
                          -Dsonar.sources=. \
                          -Dsonar.exclusions=node_modules/**,test/**,node-v18.20.4-linux-x64/** \
                          -Dsonar.nodejs.executable=\$NODE_EXEC \
                          -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                        """
                    }
                }
            }
        }
    }
}