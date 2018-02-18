FROM python:3

RUN mkdir -p /app/
WORKDIR /app/

VOLUME /cloudsql

COPY ./booking/requirements ./booking/requirements
RUN pip install --no-cache-dir -r ./booking/requirements/dev.txt

COPY ./booking/ /app/

EXPOSE 8080

CMD /app/scripts/cmd-web.sh
