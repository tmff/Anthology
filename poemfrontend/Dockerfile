#!/bin/sh
FROM node:16 AS frontend_build
ARG api_endpoint
WORKDIR /app
COPY . /app

# Use ENV keywords before compiling
ENV API_ENDPOINT $api_endpoint

RUN npm ci
RUN npm run build

FROM nginx
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend_build /app/build /usr/share/nginx/html
COPY conf /etc/nginx
VOLUME /etc/nginx
VOLUME /usr/share/nginx/html

ENV HTTPS_PROXY https://teamproject-app:8000

EXPOSE 443
