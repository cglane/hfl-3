from django.core.management.base import BaseCommand, CommandError
from hfl.utils import (
    formatUpload,
    getFeatures
)
from hfl.models import Listing
import csv
import itertools


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
        file_path = './uploads/upload_one.csv'
        with open(file_path) as csv_file:
            listing_data = list(csv.DictReader(csv_file))
        listing_format_data = formatUpload(listing_data, None)
        for local_listing in listing_format_data:
            listing = Listing.objects.filter(
                street_address=local_listing['street_address'])
            if not listing:
                my_listing = Listing(**local_listing)
                my_listing.save()
