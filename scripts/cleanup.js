/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

async function init() {
  console.log('CLEANING PROJECT');
  await cleanup();
}

async function cleanup(params) {
  if (!params) {
    params = require('path').join(__dirname, 'init-params.json');
  }

  const replacers = [
    {
      from: '%PROJECT-NAME%',
      to: params.project
    },
    {
      from: 'PROJECT-NAME',
      to: params.project
    },
    {
      from: 'Projeto Base React Eduzz',
      to: params.project
    },
    {
      from: '%PROJECT-SLUG%',
      to: params.slug
    },
    {
      from: 'PROJECT-SLUG',
      to: params.slug
    },
    {
      from: '%PROJECT-REPO%',
      to: params.repository || '%PROJECT-REPO%'
    },
    {
      from: '%DEV-ENDPOINT%',
      to: params.endpointDev || '%DEV-ENDPOINT%'
    },
    {
      from: '%PROD-ENDPOINT%',
      to: params.endpointProd || '%PROD-ENDPOINT%'
    },
    {
      from: '%DOCKER-IMAGE%',
      to: params.dockerImage || '%DOCKER-IMAGE%'
    },
    {
      from: '%DOCKER-CREDENTIALS%',
      to: params.dockerCredentials || '%DOCKER-CREDENTIALS%'
    },
    {
      from: '%SENTRY-DSN%',
      to: params.sentryDsn
    },
    {
      from: `"start": "node ./init.js"`,
      to: `"start": "react-scripts start"`
    }
  ];

  await Promise.all([
    replaceContent('./Jenkinsfile', replacers),
    replaceContent('./package.json', replacers),
    replaceContent('./public/index.html', replacers),
    replaceContent('./README.md', replacers),
    replaceContent('./docker-compose.yml', replacers),
    replaceContent('./.env.development', replacers),
    replaceContent('./.env.production', replacers),
    replaceContent('./.gitignore', [{ from: 'yarn.lock', to: '' }])
  ]);
}

async function replaceContent(file, replacers) {
  let content;

  try {
    content = await new Promise((resolve, reject) =>
      fs.readFile(file, 'utf8', (err, data) => (err ? reject(err) : resolve(data)))
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      return;
    }

    throw err;
  }

  for (let replacer of replacers) {
    content = content.replace(replacer.from, replacer.to);
  }

  await new Promise((resolve, reject) =>
    fs.writeFile(file, content, (err, data) => (err ? reject(err) : resolve(data)))
  );
}

module.exports = cleanup;

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
