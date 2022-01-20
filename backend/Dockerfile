FROM node:14-alpine

RUN mkdir -p /usr/src/app
COPY ./ /usr/src/app/websocketbackend
WORKDIR /usr/src/app/websocketbackend
RUN npm i && npm run tsc

EXPOSE 3002

CMD ["npm", "start"]