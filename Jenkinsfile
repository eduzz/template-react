library 'EcsDeploy'

def buildNumber = env.BUILD_NUMBER as int
if (buildNumber > 1) milestone(buildNumber - 1)
milestone(buildNumber)

node {
  def dockerImageApi
  def dockerImageFront
  def finishBackBuild = false;
  def finishFrontBuild = false;

  def APLICATION_NAME = ''
  def DEPLOY_BRANCHES = /(homolog|master)/
  def BUILD_INFO = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"


  def ROLE_ACCOUNT = env.ACCOUNT_STAGING;
  def ROLE_NAME = env.ROLE_STAGING;
  def S3_BUCKET = '' // criar bucket
  def ENVIRONMENT = 'qa'

// if (env.BRANCH_NAME ==~ /^(master)$/) {
//   ROLE_ACCOUNT = env.ACCOUNT_NEWPROD;
//   ROLE_NAME = env.ROLE_NEWPROD;
//   S3_BUCKET = ''
//   ENVIRONMENT = 'prod'
// }

  stage ('Clone Repository') {
    checkout scm
  }

  stage ('Sonar') {
    def nodePath = tool name: 'NodeJS 16', type: 'nodejs'
    def scannerHome = tool 'SonarScanner 4.6.0';
    withSonarQubeEnv {
      withEnv(["PATH+NODE=${nodePath}/bin"]) {
        sh "${scannerHome}/bin/sonar-scanner"
      }
    }
  }

  stage ('Build') {
    docker.build("${APLICATION_NAME}:${BUILD_INFO}", "-f ./Dockerfile --build-arg env=${ENVIRONMENT} .")
  }

  if (env.BRANCH_NAME ==~ DEPLOY_BRANCHES) {
    stage ('Publish Front') {
      sh "rm -rf dist"
      sh "docker cp \$(docker create ${APLICATION_NAME}:${BUILD_INFO}):/app/dist dist"

      withAWS(roleAccount:ROLE_ACCOUNT, role:ROLE_NAME) {
        sh "aws s3 cp dist s3://${S3_BUCKET} --acl public-read --cache-control \"public, max-age=2592000, stale-while-revalidate=60\" --recursive --exclude=\"*.txt\" --exclude=\"*.html\" --exclude=\"remoteEntry.js\" --exclude=\"**/remoteEntry.js\" --exclude=\"remoteEntry.js.map\" --exclude=\"**/remoteEntry.js.map\" --exclude=\"**/root.d.ts\""
        sh "aws s3 cp dist s3://${S3_BUCKET} --acl public-read --cache-control \"public, max-age=60, stale-while-revalidate=10\" --recursive --exclude=\"*\" --include=\"*.html\" --include=\"remoteEntry.js\" --include=\"**/remoteEntry.js\" --include=\"remoteEntry.js.map\" --include=\"**/remoteEntry.js.map\""
      }
    }
  }

  stage('Clean') {
    cleanWs()
  }
}