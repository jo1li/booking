FROM node:8.11.3-alpine

RUN mkdir -p /code/booking/static/js/app
WORKDIR /code/booking/static/js/app

ADD ./booking/static/js/app /code/

RUN npm install

CMD ["npm", "run", "start"]
