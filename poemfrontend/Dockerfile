#!/bin/sh
FROM node:16 AS frontend_build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend_build /app/build /usr/share/nginx/html
COPY conf /etc/nginx
VOLUME /usr/share/nginx/html
VOLUME /etc/nginx

EXPOSE 80
