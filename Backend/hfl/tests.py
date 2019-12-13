from django.test import TestCase
from .models import (Listing, ListingVideo, ListingImage)
import csv
from hfl.utils import (
    formatUpload
)


class ModelTestCase(TestCase):
    """This class defines the test suite for the bucketlist model."""

    def setUp(self):
        """Define the test client and other test variables."""
        file_path = './uploads/upload_one.csv'
        with open(file_path) as csv_file:
            self.listing_data = list(csv.DictReader(csv_file))
        self.model_data = formatUpload(self.listing_data, 1)[0]
        for key, val in self.model_data.iteritems():
            print (key, val)
        self.listing = Listing(**self.model_data)
        self.listing.save()

    def test_format_upload(self):

        self.assertEqual(self.model_data['county'], 'Charleston')

    def test_save_model(self):
        self.assertEqual(self.listing['street_address'],
                         self.model_data['street_address'])
