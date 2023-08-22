# Development stage
FROM node:18-alpine AS development

WORKDIR /app

COPY package*.json ./

EXPOSE 3001

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# Production stage
FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["npm", "run", "start"]
