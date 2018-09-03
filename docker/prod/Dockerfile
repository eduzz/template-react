FROM node:10-alpine

WORKDIR /app

COPY . /app/

RUN yarn install --prod

RUN yarn build

# Criar o container final mais leve com nginx com apenas projeto compilado
FROM nginx:alpine

COPY --from=0 /app/build /usr/share/nginx/html

COPY --from=0 /app/docker/prod/nginx.conf /etc/nginx/conf.d/default.conf
