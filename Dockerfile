FROM python:3.6.6

RUN mkdir -p /app/
WORKDIR /app/

# -- Set some default environment variables
ENV LC_ALL C.UTF-8
ENV LANG C.UTF-8
ENV PYTHONUNBUFFERED=1

COPY ./booking/requirements ./booking/requirements
RUN pip install --no-cache-dir -r ./booking/requirements/dev.txt

COPY ./booking/ /app/

EXPOSE 80

CMD /app/scripts/cmd-web.sh
