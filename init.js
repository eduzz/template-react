const fs = require('fs');
const inquirer = require('inquirer');
const ora = require('ora');
const lodash = require('lodash');
const rimraf = require('rimraf');
const childProcess = require('child_process');

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

  params.slug = lodash.kebabCase(i).toLowerCase();

  if (!params.confirmed) {
    console.log('---- Responda novamente:')
    return askParams(params);
  }

  return params;
}

async function cleanup(params) {
  const replacers = [{
    from: '%PROJECT-NAME%',
    to: params.project
  }, {
    from: 'Projeto Base React Eduzz',
    to: params.project
  }, {
    from: '%PROJECT-SLUG%',
    to: params.slug
  }, {
    from: '%PROJECT-REPO%',
    to: params.repository || '%PROJECT-REPO%'
  }, {
    from: '%DEV-ENDPOINT%',
    to: params.endpointDev || '%DEV-ENDPOINT%'
  }, {
    from: '%PROD-ENDPOINT%',
    to: params.endpointProd || '%PROD-ENDPOINT%'
  }, {
    from: '%DOCKER-IMAGE%',
    to: params.dockerImage || '%DOCKER-IMAGE%'
  }, {
    from: '%DOCKER-CREDENTIALS%',
    to: params.dockerCredentials || '%DOCKER-CREDENTIALS%'
  }, {
    from: '%SENTRY-DSN%',
    to: params.sentryDsn || '%SENTRY-DSN%'
  }];

  await Promise.all([
    replaceContent('./Jenkinsfile', replacers),
    replaceContent('./package.json', replacers),
    replaceContent('./public/index.html', replacers),
    replaceContent('./README.md', replacers),
    replaceContent('./docker-compose.yml', replacers),
    replaceContent('./.env.development', replacers),
    replaceContent('./.env.production', replacers)
  ]);
}

async function replaceContent(file, replacers) {
  let content = await new Promise((resolve, reject) =>
    fs.readFile(file, 'utf8', (err, data) => err ? reject(err) : resolve(data))
  );

  for (let replacer of replacers) {
    content = content.replace(replacer.from, replacer.to);
  }

  await new Promise((resolve, reject) =>
    fs.writeFile(file, content, (err, data) => err ? reject(err) : resolve(data))
  );
}

async function removePackages() {
  await execCommand(`yarn remove inquirer ora rimraf`);
}

async function resetGit(params) {
  await new Promise((resolve, reject) =>
    rimraf('./.git', err => err ? reject(err) : resolve())
  );

  const originalRepo = await execCommand('git remote get-url origin');
  await execCommand('git remote remove origin');
  await execCommand(`git remote add seed ${originalRepo}`);

  if (params.repository) {
    await execCommand(`git remote add origin ${params.repository}`);
  }

  await execCommand('git add . && git commit -am "initial"')
}

async function selfDestruction() {
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