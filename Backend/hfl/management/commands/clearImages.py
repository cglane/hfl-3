from django.core.management.base import BaseCommand, CommandError
from hfl.models import ListingVideo, AboutPage, ListingImage, Agent, AboutOption


class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def handle(self, *args, **options):
        # for image in ListingImage.objects.all():
        #     image.image = None
        #     image.save()
        for agent in Agent.objects.all():
            print agent.avatar
            agent.avatar = None
            agent.save()
        for video in ListingVideo.objects.all():
            video.file = None
            video.save()
        for about in AboutOption.objects.all():
            about.image = None
            about.save()
        for page in AboutPage.objects.all():
            page.background_image = None
            page.save()
