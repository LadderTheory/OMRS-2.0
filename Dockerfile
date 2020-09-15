# Production Build

# Stage 1: Build react client
FROM node:12-alpine as client

# Working directory be app
WORKDIR /usr/app/DemoApp/

ARG NPM_TOKEN 
COPY .npmrc .npmrc
COPY DemoApp/package*.json ./

# Install dependencies
RUN npm get registry

RUN npm install
RUN rm -f .npmrc

# copy local files to app folder
COPY DemoApp/ ./

RUN npm run build

# Stage 2 : Build Server

FROM node:12-alpine

WORKDIR /usr/src/app/
COPY --from=client /usr/app/DemoApp/build/ ./DemoApp/build/

WORKDIR /usr/src/app/

ARG NPM_TOKEN 
COPY .npmrc .npmrc
COPY package*.json ./
RUN npm get registry
RUN npm install
RUN rm -f .npmrc
COPY . .

EXPOSE 4000

CMD ["npm", "start"]