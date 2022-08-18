FROM node:16.13-alpine as base_node
ENV PORT=80

FROM base_node as base
WORKDIR /app
COPY . .
RUN yarn

FROM base as build
WORKDIR /app
RUN yarn build
RUN rm /app/build/static/**/*.map

FROM nginx:alpine as prod
RUN apk update; apk add bash
COPY --from=build /app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/templates/default.conf.template
COPY ./docker/entrypoint.sh /
COPY ./createEnvFile.sh /createEnvFile.sh
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

FROM base_node as dev
WORKDIR /app
EXPOSE 3000
CMD yarn; yarn start