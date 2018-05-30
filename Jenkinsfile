node {
    def app

    stage ('Clone Repository') {
         checkout scm
    }

    stage ('Build container') {
        sh "docker build -t infraeduzz/nutror-producer -f Dockerfile ."
    }

    stage ('Push container') {
        sh "docker push infraeduzz/nutror-producer"
    }

}