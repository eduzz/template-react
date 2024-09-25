library 'EcsDeploy'

def buildNumber = env.BUILD_NUMBER as int
if (buildNumber > 1) milestone(buildNumber - 1)
milestone(buildNumber)

node {
  def NAMESPACE = 'project'
  def IMAGE_API = 'project-front'
  def ENVIRONMENT = 'dev'
  def CLUSTER = "eduzz-dev"
  def DEPLOY_BRANCHES = /(develop.*|release.*|master)/

  stage ('Clone Repository') {
    checkout scm
  }

  def COMMIT_MESSAGE = sh (returnStdout: true, script: "git log --format=format:%s -1")
  def COMMIT_EMAIL = sh (returnStdout: true, script: "git --no-pager show -s --format=%ae")
  def COMMIT_ID = sh(returnStdout: true, script: 'git rev-parse HEAD')
  def BUILD_NUMBER = (env.BUILD_NUMBER as int)

  try {
    stage ('Configure Env') {
      if (env.BRANCH_NAME ==~ /(release.*)/) {
        ENVIRONMENT = 'qa'
        CLUSTER = "eduzz-qa"
      }

      if (env.BRANCH_NAME ==~ /(master)/) {
        ENVIRONMENT = 'prod'
        CLUSTER = "eduzz-prod"
      }
    }

    stage ('Set Env') {
      if (env.BRANCH_NAME =~ /(release|hotfix|feature)/) {
          sh "sh ./scripts/set-env-homolog.sh ${env.BRANCH_NAME} ${env.BUILD_NUMBER}"
      }

      if (env.BRANCH_NAME =~ /(master)/) {
        sh "sh ./scripts/set-env.sh '${env.BRANCH_NAME}' ${env.BUILD_NUMBER}"
      }
    }

    stage("Build App") {
        dockerImage = docker.build("${IMAGE_API}:${env.BRANCH_NAME}-${env.BUILD_NUMBER}", "-f docker/prod/Dockerfile .")
    }

    if (env.BRANCH_NAME ==~ DEPLOY_BRANCHES) {
      stage("Push Images") {
        docker.withRegistry("https://${env.ECR_URL}") {
          dockerImage.push("${env.BRANCH_NAME}")
          dockerImage.push("${env.BRANCH_NAME}-${env.BUILD_NUMBER}")
        }
      }

      stage('Deploy App') {
        eksDeploy([
          'service': "project-front",
          'namespace': NAMESPACE,
          'cluster': CLUSTER,
          'values': [
            "base.yaml",
            "${ENVIRONMENT}.yaml"
          ],
          'images': [
            "appTag": "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
          ]
        ])
      }
    }
  }
  catch(err) {
    discordSend(
      title: env.JOB_NAME,
      description: ":x: FAILED / Deu ruim :(",
      footer: "#${BUILD_NUMBER} - ${COMMIT_ID.take(10)} - ${COMMIT_MESSAGE}",
      link: env.BUILD_URL,
      successful: false,
      webhookURL: env.project_DISCORD_WEBHOOK_URL
    )
    throw err
  }

  finally {
    cleanWs()
  }
}
