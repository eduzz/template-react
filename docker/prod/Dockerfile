FROM node:22-alpine

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install
COPY ./ /app/

RUN yarn build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/build
COPY --from=0 /app/dist /usr/share/nginx/html

COPY docker/prod/nginx.conf /root/

COPY docker/prod/start.sh /root/
RUN set -x && chmod +x /root/start.sh

CMD /root/start.sh