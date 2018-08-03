FROM node:8.11.3-alpine

RUN mkdir -p /app/
WORKDIR /app/

ADD ./booking/static/js/app /app/

RUN npm install

CMD ["npm", "run", "start"]
