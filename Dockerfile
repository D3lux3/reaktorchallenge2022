FROM node:14-alpine AS build

COPY ./kpsfrontti ./frontend
WORKDIR /frontend
RUN npm i && npm run build

FROM node:14-alpine

RUN mkdir -p /usr/src/app
COPY ./historybackend /usr/src/app/backend
WORKDIR /usr/src/app/backend
RUN npm i && npm run tsc
COPY --from=build /frontend/build/ /usr/src/app/backend/frontBuild

EXPOSE 3001

CMD ["npm", "start"]