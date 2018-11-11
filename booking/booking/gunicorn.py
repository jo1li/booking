
reload=True
timeout=120
workers=3
loglevel="debug"
capture_output=True
log="-"
accesslog="-"
access_log_format='%({X-Forwarded-For}i)s %(l)s %(u)s %(t)s "%(r)s" %(s)s %(b)s "%(f)s" "%(a)s'
bind="0.0.0.0:80"
