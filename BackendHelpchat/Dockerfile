# syntax=docker/dockerfile:1
FROM node:18-alpine
ENV NODE_ENV=production HOST=:: MONGODB=mongodb://mongodb-helpchat:27017
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY src ./src
EXPOSE 3002/tcp
ENTRYPOINT ["node", "src/index.js"]