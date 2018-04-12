FROM nginx:alpine

ADD nginx.conf /etc/nginx/conf.d/student.conf

ADD build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]