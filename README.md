# Church Web App

Technologies
------------
* React
* Redux with Thunk
* Typescript
* React Router
* Validatorjs
* Material UI (UI Framework)

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