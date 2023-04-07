#!/bin/sh
FROM node:16 AS frontend_build
ARG api_endpoint
WORKDIR /app
COPY . /app

# Use ENV keywords before compiling
ENV API_ENDPOINT $api_endpoint

RUN npm install
RUN npm run build

FROM nginx
RUN rm -rf /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf /etc/nginx/sites-available/ /etc/nginx/sites-enabled/
COPY --from=frontend_build /app/build /usr/share/nginx/html
COPY conf /etc/nginx
COPY conf/sites-available /etc/nginx/sites-enabled
VOLUME /etc/nginx
VOLUME /usr/share/nginx/html

ENV HTTPS_PROXY https://teamproject-app:8000

EXPOSE 443
