/* eslint-disable @typescript-eslint/no-require-imports */
const ora = require('ora');
const rimraf = require('rimraf');
const childProcess = require('child_process');
const cleanup = require('./scripts/cleanup');
const askParams = require('./scripts/ask-params');

async function init() {
  await awaitWarning();
  await checkDeps();

  const params = await askParams();

  let promise = cleanup(params);
  ora.promise(promise, 'Renomeando projeto...');
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
    throw new Error('Yarn is required');
  });

  await execCommand('git --version').catch(() => {
    throw new Error('Git is required');
  });
}

async function resetGit(params) {
  const originalRepo = await execCommand('git remote get-url origin');
  await execCommand('git remote remove origin');
  await execCommand(`git remote add seed ${originalRepo}`);

  if (params.repository) {
    await execCommand(`git remote add origin ${params.repository}`);
  }

  await execCommand('git add . && git commit -am "initial"');
}

async function selfDestruction() {
  await new Promise((resolve, reject) => rimraf('./init.js', err => (err ? reject(err) : resolve())));
}

async function execCommand(command) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (err, stdout) => {
      err ? reject(err) : resolve((stdout || '').trim());
    });
  });
}

init()
  .then(() => {
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(-1);
  });
