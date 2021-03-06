# Production Build

# Stage 1: Build react client
FROM 192.168.1.78:31779/ironbanknode12 as client

USER node

# Working directory setup
RUN mkdir -p /home/node/app/frontend && chown -R node:node /home/node/app/frontend
WORKDIR /home/node/app/frontend/

COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy local files to app folder
COPY frontend/ ./

RUN npm run build

# Stage 2 : Build Server

FROM 192.168.1.78:31779/ironbanknode12

USER node

#Working directory setup
RUN mkdir -p /home/node/src/app/ && chown -R node:node /home/node/src/app/
WORKDIR /home/node/src/app/

#Copy built frontend 
COPY --from=client /home/node/app/frontend/build/ ./frontend/build/

#Install backend dependencies
COPY package*.json ./
RUN npm install

#Copy backend and frontend files to working dir
COPY . .

ENV NODE_ENV=development

EXPOSE 4000

CMD ["npm","start"]