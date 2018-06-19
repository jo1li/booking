# Generated by Django 2.0.2 on 2018-06-19 17:24

from django.db import migrations
import tagulous.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('musicians', '0016_auto_20180619_1646'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='GenreTag',
            new_name='Genres',
        ),
        migrations.AddField(
            model_name='musician',
            name='genres',
            field=tagulous.models.fields.TagField(_set_tag_meta=True, help_text='Enter a comma-separated tag string', initial='African,Alternative,Ambient,Americana,Asian,Avant-garde,Blues,Caribbean,Christian,Classical,Comedy,Country,Electronic,Folk,Hip Hop,Jazz,Latin,Metal,Pop,R&amp;B,Rock,Spoken Word,World', to='musicians.Genres'),
        ),
    ]
