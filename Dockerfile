FROM node:25-alpine3.22

WORKDIR /linkfolio-backend
COPY package.json .

RUN npm install
COPY . .

EXPOSE 3000
CMD ["node", "app.js"]