from django.core.management.base import BaseCommand, CommandError
from hfl.models import Listing, ListingVideo, AboutPage, ListingImage, Agent, AboutOption
import csv

class Command(BaseCommand):
    def to_csv(self,file_path, dictionary_list):
        keys = dictionary_list[0].keys()
        print keys
        with open(file_path, 'wb') as output_file:
            dict_writer = csv.DictWriter(output_file, keys)
            dict_writer.writeheader()
            dict_writer.writerows(dictionary_list)

    def get_listings():
        listings = Listing.objects.all()
        listings_data = []
        fields = [x.name for x in Listing._meta.get_fields()]
        fields.remove('video')
        fields.remove('images')
        fields.remove('landing_content')
        for item in listings:
            my_dict = {}
            for key in fields:
                try:
                    my_dict[key] = getattr(item, key)
                except:
                    pass
            if item.images.all():
                print item.images.all()
                images = [x.image.url for x in item.images.all()]
                my_dict['images'] = ', '.join(images)
            listings_data.append(my_dict)
        self.to_csv('./exports/listings.csv', listings_data)
    def get_agents(self):
        agents = Agent.objects.all()
        agent_data = []
        fields = [x.name for x in Agent._meta.get_fields()]
        fields.remove('avatar')
        for item in agents:
            my_dict = {}
            for key in fields:
                try:
                    my_dict[key] = getattr(item, key)
                except:
                    pass
            my_dict['avatar'] = item.avatar.url
            my_dict['description'] = my_dict['description'].encode('utf-8')
            agent_data.append(my_dict)

        print agent_data
        self.to_csv('./exports/agents.csv', agent_data)

    def handle(self, *args, **options):
       self.get_agents()