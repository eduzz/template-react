FROM node:9-alpine

RUN mkdir /src
ADD . /src

RUN yarn global add serve && (cd /src &&  yarn install --force && yarn cache clean)

WORKDIR /src
EXPOSE 3000

CMD yarn build && (cd build && serve -p 3000)