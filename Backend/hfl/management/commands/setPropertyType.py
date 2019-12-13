from django.core.management.base import BaseCommand, CommandError
from hfl.utils import (
    formatUpload,
    getFeatures
)
from hfl.models import Listing, PropertyType


class Command(BaseCommand):
    """Convert multiselect field to manytomany"""
    def handle(self, *args, **options):
        ## PropertyType property_type
        ## Listing property_type
        listings = Listing.objects.all()
        for listing in listings:
            if listing.property_type:
                print (listing.property_type, 'type')
                matching_listing_type = PropertyType.objects.get(property_type=listing.property_type)
                print (matching_listing_type, 'matching property type')
                listing.property_type_choices.add(matching_listing_type)
                listing.save()