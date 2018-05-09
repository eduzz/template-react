FROM node:9-alpine

WORKDIR /src
EXPOSE 3000
EXPOSE 35729

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

CMD yarn && yarn start