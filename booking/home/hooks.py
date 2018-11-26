from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from account.conf import settings
from account.compat import reverse
from account.hooks import AccountDefaultHookSet


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


    def send_password_change_email(self, to, ctx):
        pass

