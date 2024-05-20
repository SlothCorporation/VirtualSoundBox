FROM nginx:latest

WORKDIR /var/www/web

ENV TZ=Asia/Tokyo

COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./certs/cert.pem /etc/nginx/cert.pem
COPY ./certs/key.pem /etc/nginx/key.pem