from model_mommy import mommy
from model_mommy.recipe import Recipe, foreign_key, seq
from musicians.models import Musician

musician_recipe = Recipe(
    Musician,
    slug=seq("slug")
)
