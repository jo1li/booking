# Generated by Django 2.0.2 on 2018-06-20 01:25

from django.db import migrations, models
import tagulous.models.fields
import tagulous.models.models


class Migration(migrations.Migration):

    dependencies = [
        ('musicians', '0015_musician_state'),
    ]

    operations = [
        migrations.CreateModel(
            name='GenreTag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('slug', models.SlugField()),
                ('count', models.IntegerField(default=0, help_text='Internal counter of how many times this tag is in use')),
                ('protected', models.BooleanField(default=False, help_text='Will not be deleted when the count reaches 0')),
            ],
            options={
                'ordering': ('name',),
                'abstract': False,
            },
            bases=(tagulous.models.models.BaseTagModel, models.Model),
        ),
        migrations.AlterUniqueTogether(
            name='genretag',
            unique_together={('slug',)},
        ),
        migrations.AddField(
            model_name='musician',
            name='genres',
            field=tagulous.models.fields.TagField(_set_tag_meta=True, blank=True, help_text='Enter a comma-separated tag string', initial='African,Alternative,Ambient,Americana,Asian,Avant-Garde,Blues,Caribbean,Christian,Classical,Comedy,Country,Electronic,Folk,Hip Hop,Jazz,Latin,Metal,Pop,R&B,Rock,Spoken Word,World', to='musicians.GenreTag'),
        ),
    ]
