from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from account.conf import settings
from account.compat import reverse
from account.hooks import AccountDefaultHookSet

import re

class AccountHookSet(AccountDefaultHookSet):


    def send_confirmation_email(self, to, ctx):

        # TODO: this won't work in temp branch builds
        protocol = getattr(settings, "DEFAULT_HTTP_PROTOCOL", "http")
        ctx['activate_url'] = "{0}://{1}{2}".format(
            protocol,
            settings.SITE_DOMAIN,
            reverse(settings.ACCOUNT_EMAIL_CONFIRMATION_URL, args=[ctx['key']])
        )

        html_content = render_to_string("account/email/email_confirmation_message.html", ctx)

        email = EmailMultiAlternatives(
            'Confirm your Opus account',
            'Confirm your email address',
            'info@opuslive.io',
            [to],
        )
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)


    def send_password_reset_email(self, to, ctx):

        # TODO: this won't work in temp branch builds
        protocol = getattr(settings, "DEFAULT_HTTP_PROTOCOL", "http")
        ctx['password_reset_url'] = "{0}://{1}{2}".format(
            protocol,
            settings.SITE_DOMAIN,
            re.sub('(http|https)://example.com', '', ctx['password_reset_url'])
        )

        html_content = render_to_string("account/email/password_reset.html", ctx)

        email = EmailMultiAlternatives(
            'Change your Opus password',
            "Change your password here: {}".format(ctx['password_reset_url']),
            'info@opuslive.io',
            [to],
        )
        email.attach_alternative(html_content, "text/html")
        email.send(fail_silently=False)


    def send_password_change_email(self, to, ctx):
        pass

