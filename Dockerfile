FROM node:9-slim

WORKDIR /src

COPY . /src/

RUN yarn install --force && yarn cache clean && yarn build

FROM nginx:alpine

COPY --from=0 /src/build /usr/share/nginx/html

COPY --from=0 /src/nginx.conf /etc/nginx/conf.d/default.conf