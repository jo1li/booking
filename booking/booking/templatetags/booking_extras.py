from django import template
from django.http import QueryDict

register = template.Library()

@register.filter
def opus_replace(value, args):
    qs = QueryDict(args)

    return str(value).replace(qs.get('search'), qs.get('replace'))
