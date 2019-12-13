from django.core.management.base import BaseCommand, CommandError
from hfl.utils import (
    formatUpload
)
import requests
from hfl.models import Listing, ListingImage
import csv
import itertools
from bs4 import BeautifulSoup

import tempfile
import httplib
from django.core import files

import urllib


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
        file_path = './exports/images.html'
        street_name = 'Jehossee Road'
        listings = Listing.objects.filter(street_address__contains=street_name)
        if listings:
            my_listing = listings[0]
            with open(file_path) as html_file:
                data = html_file.read().replace('\n', '')

            soup = BeautifulSoup(data)
            anchors = soup.find_all('a', href=True)
            jpg_images = [x['href']
                          for x in anchors if 'jpg' in x['href']][0:2]
            print jpg_images[0]
            # urllib.urlretrieve(jpg_images[0], "local-filename.jpg")
