FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/nutror.conf

COPY build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]