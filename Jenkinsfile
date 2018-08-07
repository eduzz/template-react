node {
    def app
    def dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm")
    def date = new Date()

    stage ('Clone Repository') {
         checkout scm
    }

    stage ('Set Env') {
        sh "sh ./scripts/build-set-env.sh"
    }

    stage ('Build container') {
        app = docker.build("infraeduzz/nutror-v3-front-producer", "-f ./prod/Dockerfile .")
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