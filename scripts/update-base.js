/* eslint-disable @typescript-eslint/no-require-imports */
const childProcess = require('child_process');
const cleanup = require(require('path').join(__dirname, 'cleanup'));
const rimraf = require('rimraf');

const repoSeed = process.env.npm_package_repository_seed || 'git@github.com:eduzz/react-admin-seed.git';

async function init() {
  await checkDeps();

  const repo = await execCommand('git remote get-url seed').catch(() => null);

  if (!repo) {
    await execCommand(`git remote add seed ${repoSeed}`);
  }

  const isDirty = await execCommand('git diff-index HEAD');

  if (isDirty) {
    throw new Error('First commit your changes');
  }

  try {
    console.log(await execCommand('git pull seed master --no-commit --no-ff'));
  } catch (err) {
    console.error(err);
  }

  await cleanup();
  await selfDestruction();
}

async function checkDeps() {
  await execCommand('yarn -v').catch(() => {
    throw new Error('Yarn is required');
  });

  await execCommand('git --version').catch(() => {
    throw new Error('Git is required');
  });
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
