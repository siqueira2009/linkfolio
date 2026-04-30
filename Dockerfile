FROM node:25-alpine3.22

WORKDIR /linkfolio-frontend
COPY package.json .

RUN npm install
COPY . .

EXPOSE 3001
CMD ["node", "app.js"]