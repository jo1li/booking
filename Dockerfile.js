FROM node:8.11.2-alpine

RUN mkdir -p /app/
COPY ./booking/static/js/vue /app/static/js/vue
WORKDIR /app/static/js/vue

RUN npm install
RUN npm run build

CMD ["/usr/local/bin/npm run build"]
