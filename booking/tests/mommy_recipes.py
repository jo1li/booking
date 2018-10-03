from model_mommy.recipe import Recipe, foreign_key, seq

from musicians.models import Musician, MusicianVideo
from venues.models import Venue, Event, Slot
from home.models import OpusUser

import random


admin_user_recipe = Recipe(
    OpusUser,
    is_staff=True,
    is_active=True
)

user_musician_recipe = Recipe(
    OpusUser,
    is_musician=True
)

musician_recipe = Recipe(
    Musician,
    user=foreign_key(user_musician_recipe),
    slug=seq("slug")
)

venue_recipe = Recipe(
    Venue
)

event_recipe = Recipe(
    Event,
    venue=foreign_key(venue_recipe)
)

slot_recipe = Recipe(
    Slot,
    event=foreign_key(event_recipe),
    musician=foreign_key(musician_recipe)
)

videos = [
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/d6rxGmvQPLU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/Tt4j5t1YA-E" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/i6sTatKAXt0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/9osn09WPv10" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
]

def random_video():
    return random.choice(videos)

video_recipe = Recipe(
    MusicianVideo,
    musician=foreign_key(musician_recipe),
    code=random_video()
)
