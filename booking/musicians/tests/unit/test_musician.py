from django.test import TransactionTestCase
from django.utils.text import slugify

from home.models import OpusUser
from musicians.models import Musician

class MusicianTest(TransactionTestCase):

    def test_slug_creation(self):

        my_stage_name = "jim stark"
        my_slug = slugify("jim stark")

        u = OpusUser.objects.create()
        m = Musician.objects.create(
            user_id=u.id,
            stage_name=my_stage_name
        )
        m.slug.should.equal(my_slug)

        m.stage_name = "something else"
        m.save()
        m.refresh_from_db()

        m.slug.should.equal(my_slug)


