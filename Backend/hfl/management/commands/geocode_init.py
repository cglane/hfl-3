# from django.core.management.base import BaseCommand, CommandError
# from hfl.models import Listing

# class Command(BaseCommand):
#     def handle(self, *args, **options):
#         listings = Listing.objects.all()
#         for listing in listings:
#             lat_lng = get_lat_lng(listing)
#             if lat_lng:
#                 listing.lat = lat_lng['lat']
#                 listing.lng = lat_lng['lng']
#                 listing.save()
#                 print listing.street_address