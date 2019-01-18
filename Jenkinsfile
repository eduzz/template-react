import java.text.SimpleDateFormat

node {
    def app
    def dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm")
    def date = new Date()

    stage ('Clone Repository') {
        checkout scm
    }

    stage ('Set Environment') {
        if (env.BRANCH_NAME =~ /(release)/) {
            sh "sh ./scripts/set-env-homolog.sh"
        }
        sh "sh ./scripts/set-env.sh"
    }

    stage ('Build container') {
        app = docker.build("infraeduzz/nutror-v3-front-producer", "-f docker/prod/Dockerfile .")
    }

     stage('Publish to DockerHub') {
         if (env.BRANCH_NAME =~ /(master)/) {
             withDockerRegistry([credentialsId: '2efdc2c1-bfcc-4925-b9c2-5c2f8923d04b', url: 'https://registry.hub.docker.com']) {
                 app.push("front-producer-${env.BRANCH_NAME}-${env.BUILD_NUMBER}")
                 app.push("front-producer-${env.BRANCH_NAME}")
             }
         }

         if (env.BRANCH_NAME =~ /(release)/) {
             withDockerRegistry([credentialsId: '2efdc2c1-bfcc-4925-b9c2-5c2f8923d04b', url: 'https://registry.hub.docker.com']) {
                 app.push("${env.BRANCH_NAME}")
             }
         }
     }

}