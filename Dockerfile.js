FROM node:8.11.2-alpine

RUN mkdir -p /app/
COPY ./booking/static/js/vue /app/static/js/vue
WORKDIR /app/

RUN npm install --prefix static/js/vue
RUN npm run build --prefix static/js/vue

CMD ["/usr/local/bin/npm run build"]