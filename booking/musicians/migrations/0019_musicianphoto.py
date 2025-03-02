# Generated by Django 2.0.2 on 2018-07-14 16:02

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('musicians', '0018_delete_instrument'),
    ]

    operations = [
        migrations.CreateModel(
            name='MusicianPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveIntegerField(db_index=True, editable=False)),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('image', models.ImageField(blank=True, upload_to='media/')),
                ('musician', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photos', to='musicians.Musician')),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
    ]
