from django.test import TransactionTestCase
from django_webtest import WebTest
from django.conf import settings
from django.urls import reverse
from django.core.exceptions import ObjectDoesNotExist

from home.models import OpusUser
from musicians.models import Musician

import sure
from sure import expect

from musicians.tests.mommy_recipes import musician_recipe

class ArtistExperienceTest(WebTest, TransactionTestCase):

    def test_logo_link(self):

        m = musician_recipe.make()

        url = reverse('musician_dash')
        result = self.app.get(url, user=m.user.username)

        href = result.html.find_all("a", class_='logo')[0].attrs['href']
        href.should.equal(reverse('musician_dash'))

