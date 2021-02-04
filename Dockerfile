FROM node:8.14.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ADD ./dist ./

ENV DB_URL test.cgwkeoscbkx1.ap-southeast-1.rds.amazonaws.com
ENV DEFAULT_USER user 
ENV DEFAULT_PASS user

EXPOSE 31313
CMD ["node", "index.js"]