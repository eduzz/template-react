const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const lodash = require('lodash');
const rimraf = require('rimraf');
const childProcess = require('child_process');
const cleanup = require('./scripts/cleanup');

async function init() {
  await awaitWarning();
  await checkDeps();

  const params = await askParams();

  let promise = cleanup(params);
  ora.promise(promise, 'Renomeando projeto...');
  await promise;

  promise = removePackages(params);
  ora.promise(promise, 'Limpando dependencias...');
  await promise;

  promise = selfDestruction(params);
  ora.promise(promise, 'Auto destruição...');
  await promise;

  promise = resetGit(params);
  ora.promise(promise, 'Resetando Git...');
  await promise;
}

async function awaitWarning() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('\nPROJECT GENERATOR\n');
      resolve();
    });
  });
}

async function checkDeps() {
  await execCommand('yarn -v').catch(() => {
    throw new Error('Yarn is required')
  });

  await execCommand('git --version').catch(() => {
    throw new Error('Git is required')
  });
}

async function askParams(answers = {}) {
  const params = await inquirer.prompt([{
    name: 'project',
    default: answers.project,
    message: 'Nome do projeto*',
    validate: i => i.length >= 3 ? true : 'Pelo menos 3 letras'
  }, {
    name: 'repository',
    default: answers.repository,
    message: 'Repositorio'
  }, {
    name: 'endpointDev',
    default: answers.endpointDev || 'http://localhost:3001',
    message: 'Endpoint API(Dev)'
  }, {
    name: 'endpointProd',
    default: answers.endpointProd,
    message: 'Endpoint API(Prod)'
  }, {
    name: 'dockerImage',
    default: answers.dockerImage,
    message: 'Docker Repo (infraeduzz/example)'
  }, {
    name: 'dockerCredentials',
    default: answers.dockerCredentials,
    message: 'Docker Credentials (UUID/GUID)'
  }, {
    name: 'sentryDsn',
    default: answers.sentryDsn,
    message: 'Sentry DSN'
  }, {
    name: 'confirmed',
    type: 'confirm',
    message: 'Confirma as configurações?'
  }]);

  if (!params.confirmed) {
    console.log('---- Responda novamente:')
    return askParams(params);
  }

  params.slug = lodash.kebabCase(params.project).toLowerCase();
  fs.writeFile('./src/init-params.json', JSON.stringify(params, null, 2));

  return params;
}

async function removePackages() {
  await execCommand(`yarn remove inquirer ora`);
}

async function resetGit(params) {
  const originalRepo = await execCommand('git remote get-url origin');
  await execCommand('git remote remove origin');
  await execCommand(`git remote add seed ${originalRepo}`);

  if (params.repository) {
    await execCommand(`git remote add origin ${params.repository}`);
  }

  await execCommand('git add . && git commit -am "initial"')
}

async function selfDestruction(params) {
  await new Promise((resolve, reject) =>
    rimraf('./init.js', err => err ? reject(err) : resolve())
  );
}

async function execCommand(command) {
  return await new Promise((resolve, reject) => {
    childProcess.exec(command, (err, stdout) => {
      err ? reject(err) : resolve((stdout || '').trim());
    });
  });
}

init().then(() => {
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(-1);
});