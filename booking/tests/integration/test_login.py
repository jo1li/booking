from django.urls import reverse

from tests.utils import OpusTestCase

import sure
from sure import expect

from tests.mommy_recipes import musician_recipe, user_musician_recipe

class LoginArtistTest(OpusTestCase):

    def test_login(self):

        email = 'jimstark@sink.sendgrid.net'
        password = 'changeme'
        slug = 'jim-stark'

        m = musician_recipe.make(
            user=user_musician_recipe.make(email=email, username=email),
            slug=slug
        )
        m.user.set_password(password)
        m.user.save()

        login_page = self.app.get("/account/login/")
        login_form = login_page.forms['login_form']

        login_form['email'] = email
        login_form['password'] = password

        login_result = login_form.submit()
        self.assertRedirects(
            login_result,
            reverse("musician_profile", kwargs={'slug': m.slug}))

