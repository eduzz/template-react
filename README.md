# Church Web App

Technologies
------------
* React
* RxJs
* Typescript
* React Router
* Validatorjs
* Material UI (UI Framework)

Environments
------------

#### Default Port: 3000  

| NAME                  | DEFAULT                                   | REQUIRED | DESCRIPTION                     |
| --------------------- | ----------------------------------------- | -------- | ------------------------------- |
| REACT_APP_ENV         | production                                | false    | production or development       |
| REACT_APP_API_HOST    | NULL                                      | true     |                                 |
| REACT_APP_API_TIMEOUT | 15 seconds                                | false    | in milliseconds, 0 for infinity |
| REACT_APP_SENTRY_KEY  | NULL                                      | false    | DNS public from sentry.io       |

Development
-----------
```bash
#local
yarn #install deps
yarn start

#docker
docker-compose up
```

Publish
-----------
```bash
sh ./scripts/build.sh [-p] #-p for production
```

