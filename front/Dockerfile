FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn add react-scripts@latest && yarn install

COPY . .

RUN yarn build 

EXPOSE 3000

CMD ["yarn","run","start"]
