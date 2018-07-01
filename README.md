WaProject Api Front 
===================

Utilize o VSCode, já está configurado com sugestão de extensões.

### Tecnologias

* React
* Typescript
* RxJs
* React Router
* Material UI (UI Framework)

### Iniciando um novo projeto

```bash
git clone git@bitbucket.org:waprojectbase/waproject-base-front.git
yarn install # ou npm install

node ./init.js
```

Environments
------------

#### Default Port: 3000  

| NAME                  | DEFAULT    | REQUIRED | DESCRIPTION                     |
|-----------------------|------------|----------|---------------------------------|
| REACT_APP_ENV         | production | false    | production or development       |
| REACT_APP_API_HOST    | NULL       | true     |                                 |
| REACT_APP_API_TIMEOUT | 15 seconds | false    | in milliseconds, 0 for infinity |
| REACT_APP_SENTRY_KEY  | NULL       | false    | DNS public from sentry.io       |

Development
-----------
```bash
#local
yarn #install deps
yarn start

#docker
docker-compose up
```

### Scripts
* update-packages:check = Check if there is a package update
* update-packages:do = Check and change package.json if there is a package update
* webpack-analyze = Run webpack analyzer

Publish
-----------
```bash
sh ./scripts/build.sh [-p] #-p for production
```