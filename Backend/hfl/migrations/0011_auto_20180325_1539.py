# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-03-25 15:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hfl', '0010_auto_20180325_1340'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='terrastride_src',
            field=models.CharField(blank=True, help_text=b"Paste terrastride linke directly into input. E.G  'https://app.terrastridepro.com/property/34975/map?referer=iframe'", max_length=80, null=True),
        ),
    ]
