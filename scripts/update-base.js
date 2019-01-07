const childProcess = require('child_process');

const repoSeed =
  process.env.npm_package_repository_seed ||
  'git@github.com:eduzz/react-admin-seed.git';

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

  await execCommand('git pull seed master');
}

async function checkDeps() {
  await execCommand('yarn -v').catch(() => {
    throw new Error('Yarn is required')
  });

  await execCommand('git --version').catch(() => {
    throw new Error('Git is required')
  });
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