node {
    def app

    stage ('Clone Repository') {
         checkout scm
    }

    stage ('Build container') {
        app = docker.build("infraeduzz/nutror-v3-front-producer", "-f Dockerfile .")
    }

     stage('Publish to DockerHub') {
         if (env.BRANCH_NAME ==~ /(develop|master)/) {
             withDockerRegistry([credentialsId: '2efdc2c1-bfcc-4925-b9c2-5c2f8923d04b', url: 'https://registry.hub.docker.com']) {
                 app.push("front-producer-${env.BRANCH_NAME}-${env.BUILD_NUMBER}")
                 app.push("front-producer-${env.BRANCH_NAME}")
             }
         }
     }
}