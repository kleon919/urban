# use node:lts-alpine3.12
FROM node:lts as deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production

FROM node:lts as app
WORKDIR /usr/src/app
COPY . .
COPY --from=deps /usr/src/app/node_modules /usr/src/app/node_modules/
EXPOSE 5000
CMD [ "node", "index.js" ]