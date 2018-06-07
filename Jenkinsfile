node {
    def app

    stage ('Clone Repository') {
         checkout scm
    }

    stage ('Build container') {
        sh "docker build -t infraeduzz/nutror-v3-front-producer -f Dockerfile ."
    }

    stage ('Push container') {
        sh "docker push infraeduzz/nutror-v3-front-producer"
    }

}