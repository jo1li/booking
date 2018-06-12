from django.test import TransactionTestCase
from django_webtest import WebTest
from django.conf import settings
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist

from home.models import OpusUser
from musicians.models import Musician

import sure
from sure import expect


class SignupArtistTest(WebTest, TransactionTestCase):

    def test_signup(self):

        email = 'email-that-nevar-evar-exist@sink.sendgrid.net'
        password = 'password'

        signup_page = self.app.get("/account/signup/")
        signup_form = signup_page.forms['signup_form']

        signup_form['email'] = email
        signup_form['password'] = password

        signup_result = signup_form.submit()

        # Ensure the redirection sets a cookie, and redirects to correct place
        signup_result.headers.has_key('Set-Cookie').should.be.equal(True)
        self.assertRedirects(signup_result, settings.ACCOUNT_LOGIN_REDIRECT_URL)

        # Ensure the user object exists
        u = OpusUser.objects.get(email=email)

        # Ensure the new user is marked as a musician
        u.is_musician.should.equal(True)

        # Ensure the Musician object does not yet exist
        with self.assertRaises(ObjectDoesNotExist):
            m = Musician.objects.get(user=u)

