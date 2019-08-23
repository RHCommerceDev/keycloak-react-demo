FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

RUN yarn global add serve

EXPOSE 3000
#CMD [ "npm", "start" ]
CMD serve -s build -l 3000

