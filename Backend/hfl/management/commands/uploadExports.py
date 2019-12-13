from django.core.management.base import BaseCommand, CommandError
from hfl.models import Listing, ListingVideo, AboutPage, ListingImage, Agent, AboutOption
import urllib
from urlparse import urlparse
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
import csv

class Command(BaseCommand):
    def read_dict(self, filename):
        with open(filename, 'r') as file:
            reader = csv.DictReader(file)
            return list(reader)
    def upload_agents(self):
        list_dict = self.read_dict('./exports/agents.csv')
        for agent in list_dict:
            my_agent = Agent.objects.filter(first_name=agent['first_name'])
            if not my_agent:
                my_agent =  Agent(**agent)
            else:
                my_agent = my_agent[0]
                avatar = agent.pop('avatar')
                name = urlparse(avatar).path.split('/')[-1]
                content = urllib.urlretrieve(avatar)
                my_agent.avatar.save(name, File(open(content[0])), save=True)
            my_agent.save()
    def upload_listings(self):
        list_dict = self.read_dict('./exports/listings.csv')
        for listing in list_dict:
            listing = {x: listing[x] for x in listing if listing[x]}
            images = listing.pop('images')
            agent_name = listing.pop('agent')
            my_listing = Listing.objects.filter(street_address=listing['street_address'])
            if not my_listing:
                my_listing = Listing(**listing)
            else:
                my_listing = my_listing[0]
            agent = Agent.objects.get(first_name=agent_name.split(' ')[0])
            if agent:
                my_listing.agent = agent
            my_listing.save()
            for image in images.split(','):
                listing_image = ListingImage(listing=my_listing)

                name = urlparse(image).path.split('/')[-1]
                content = urllib.urlretrieve(image)
                listing_image.image.save(name, File(open(content[0])), save=True)

                listing_image.save()
    def handle(self, *args, **options):
        self.upload_agents()
        self.upload_listings()        