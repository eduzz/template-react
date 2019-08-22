/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const lodash = require('lodash');
const inquirer = require('inquirer');
const path = require('path');

async function init() {
  console.log('PROJECT PARAMS');
  await askParams();
}

async function askParams(answers) {
  if (!answers) {
    try {
      answers = require(path.join(__dirname, 'init-params.json'));
    } catch (err) {
      answers = {};
    }
  }

  const params = await inquirer.prompt([
    {
      name: 'project',
      default: answers.project,
      message: 'Nome do projeto*',
      validate: i => (i.length >= 3 ? true : 'Pelo menos 3 letras')
    },
    {
      name: 'repository',
      default: answers.repository,
      message: 'Repositorio'
    },
    {
      name: 'endpointDev',
      default: answers.endpointDev || 'http://localhost:3001',
      message: 'Endpoint API(Dev)'
    },
    {
      name: 'endpointProd',
      default: answers.endpointProd,
      message: 'Endpoint API(Prod)'
    },
    {
      name: 'dockerImage',
      default: a => answers.dockerImage || `infraeduzz/${lodash.kebabCase(a.project).toLowerCase()}`,
      message: 'Docker Repo (infraeduzz/example)'
    },
    {
      name: 'dockerCredentials',
      default: answers.dockerCredentials,
      message: 'Docker Credentials (UUID/GUID)'
    },
    {
      name: 'sentryDsn',
      default: answers.sentryDsn,
      message: 'Sentry DSN'
    },
    {
      name: 'confirmed',
      type: 'confirm',
      message: 'Confirma as configurações?'
    }
  ]);

  if (!params.confirmed) {
    console.log('---- Responda novamente:');
    return askParams(params);
  }

  params.slug = lodash.kebabCase(params.project).toLowerCase();
  fs.writeFileSync(path.join(__dirname, 'init-params.json'), JSON.stringify(params, null, 2));

  return params;
}

module.exports = askParams;

if (require.main === module) {
  init()
    .then(() => {
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(-1);
    });
}
