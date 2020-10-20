# Production Build

# Stage 1: Build react client
FROM 192.168.1.78:31779/ironbanknode12 as client

USER node

# Working directory be app
RUN mkdir -p /home/node/app/frontend && chown -R node:node /home/node/app/frontend
WORKDIR /home/node/app/frontend/

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

FROM 192.168.1.78:31779/ironbanknode12

USER node

RUN mkdir -p /home/node/src/app/ && chown -R node:node /home/node/src/app/
WORKDIR /home/node/src/app/

COPY --from=client /home/node/app/frontend/build/ ./frontend/build/

COPY .npmrc .npmrc
COPY package*.json ./
RUN npm get registry
RUN npm install
RUN rm -f .npmrc
COPY . .

EXPOSE 4000

CMD ["npm", "start"]