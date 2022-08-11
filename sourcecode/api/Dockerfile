FROM node:16 as base
WORKDIR /app

FROM base as prod
COPY . .
RUN yarn install
RUN yarn build
EXPOSE ${PORT}
CMD [ "node", "dist/api.js" ]

FROM base as dev
RUN yarn global add nodemon
CMD yarn; yarn migrate; yarn start:dev