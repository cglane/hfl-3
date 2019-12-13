from django.db import models
from django.core.validators import RegexValidator
from hfl.validators import validate_video_extension
from django.utils.translation import ugettext_lazy as _
from multiselectfield import MultiSelectField
from django.contrib.postgres.fields import ArrayField
from money import Money
from django.core.files import File  # you need this somewhere
from django.core.files.base import ContentFile
from django.conf import settings
from django.db.models import F


class AboutPage(models.Model):
    header = models.CharField(max_length=30)
    description = models.TextField()
    background_image = models.ImageField(upload_to="static/images/%Y/%m/%d")


class AboutOption(models.Model):
    header = models.CharField(max_length=30)
    button_text = models.CharField(max_length=50)
    description1 = models.TextField(
        help_text="For the front of the display card")
    description2 = models.TextField(
        help_text="For the back of the display card")
    image = models.ImageField(upload_to="static/images/%Y/%m/%d",)
    about_page = models.ForeignKey(
        AboutPage, related_name='options', on_delete=models.CASCADE)


class Agent(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    office_phone_number = models.CharField(
        max_length=30, blank=True)  # validators should be a list
    mobile_phone_number = models.CharField(
        max_length=30, blank=True)  # validators should be a list
    url_path = models.CharField(
        max_length=50, help_text="The path to be displayed for that agent e.g (charles-g-lane)")
    email = models.EmailField()
    avatar = models.ImageField(upload_to="static/images/%Y/%m/%d",)
    description = models.TextField(max_length=1000)

    def __str__(self):
        return self.first_name + ' ' + self.last_name

class PropertyType(models.Model):
    LISTING_TYPES = (
        ('Land', 'Land'),
        ('Commercial', 'Commercial'),
        ('Residential', 'Residential')
    )
    property_type = models.CharField(
        max_length=20, choices=LISTING_TYPES)
    def __str__(self):
        return self.property_type

class Listing(models.Model):
    STATUS_OPTIONS = (
        ('Available', 'Available'),
        ('Under Contract', 'Under Contract'),
        ('Sold', 'Sold'),
        ('Leased', 'Leased'),
        ('Draft', 'Draft')
    )
    LISTING_TYPES = (
        ('Land', 'Land'),
        ('Commercial', 'Commercial'),
        ('Residential', 'Residential')
    )
    html_title = models.TextField(max_length=200, help_text="To manually edit the meta title field for a listing.", blank=True)
    html_description = models.TextField(max_length=200, help_text="To manually edit the meta description field for a listing.", blank=True)
    display_listing = models.NullBooleanField(default=False, help_text="Determine which listing to profile ")
    property_name = models.CharField(help_text="Property will either be referred by their street address or this field if set",
                                     max_length=50, blank=True)
    youtube_link = models.TextField(max_length=200, help_text="Paste youtube link here that you want shown on listing video.", blank=True)

    listing_features = models.TextField(
        max_length=900,
        help_text='Input the features in as a comma delimted list')
    street_address = models.CharField(max_length=80)
    county = models.CharField(max_length=60)
    zip = models.CharField(max_length=30)
    zoning = models.CharField(max_length=100, blank=True)
    agent = models.ForeignKey('Agent', on_delete=models.CASCADE)
    agents = models.ManyToManyField(Agent, related_name='agents', null=True, blank=True)
    terrastride_src = models.CharField( max_length=80, blank=True, 
    null=True, 
    help_text="Paste terrastride linke directly into input. E.G  'https://app.terrastridepro.com/property/34975/map?referer=iframe'")

    property_type = models.CharField(
        max_length=20, choices=LISTING_TYPES, default='LAND')
    property_type_choices = models.ManyToManyField(PropertyType)
    status = models.CharField(
        max_length=20, choices=STATUS_OPTIONS, default='Available', blank=True)
    price = models.DecimalField(
        max_digits=20, decimal_places=2, blank=True, null=True)
    price_per_sqft = models.DecimalField(
        max_digits=20, decimal_places=2, blank=True, null=True
    )
    property_taxes = models.DecimalField(
        max_digits=20, decimal_places=2, blank=True, null=True)
    description = models.TextField()
    year_built = models.CharField(max_length=40, blank=True)
    tax_map = models.CharField(max_length=30, blank=True)
    directions = models.TextField(blank=True)
    baths_total = models.CharField(max_length=100, blank=True)
    baths_full = models.CharField(max_length=100, blank=True)
    baths_half = models.CharField(max_length=100, blank=True)
    acreage = models.DecimalField(
        max_digits=20, decimal_places=2, blank=True, null=True)
    amenities = models.TextField(blank=True)
    heating = models.CharField(max_length=100, blank=True)
    cooling = models.CharField(max_length=100, blank=True)
    utilities = models.CharField(max_length=100, blank=True)
    stories = models.CharField(max_length=50, blank=True)
    rent_potential = models.DecimalField(
        max_digits=20, decimal_places=2, blank=True, null=True)
    hoa = models.NullBooleanField(blank=True)
    hoa_dues = models.DecimalField(
        max_digits=20, decimal_places=2, blank=True, null=True)
    extras = models.TextField(blank=True)
    garage = models.NullBooleanField(blank=True)
    bedrooms = models.CharField(max_length=50, blank=True)
    square_feet = models.CharField(
        max_length=50, blank=True, null=True)
    appliances = models.CharField(max_length=100, blank=True)
    truck_bays = models.DecimalField(
        max_digits=20, decimal_places=2, blank=True, null=True)
    slab_depth = models.CharField(max_length=20, blank=True, null=True)
    ceiling_height = models.CharField(max_length=20, blank=True, null=True)
    closing_date = models.DateField(blank=True, null=True)
    air_conditioned_space = models.CharField(
        max_length=20, blank=True, null=True)
    lat = models.FloatField(blank=True, null=True)
    lng = models.FloatField(blank=True, null=True)
    def __str__(self):
        return self.street_address


    @property
    def features(self):
        features = self.listing_features
        if features:
            split_features = str(features).split(',')
            return split_features
        return []

    @property
    def price_formatted(self):
        if self.price:
            m = Money(amount=self.price, currency='USD')
            return m.format('en_US')
    
    @property
    def price_sqft_formatted(self):
        if self.price_per_sqft:
            m = Money(amount=self.price_per_sqft, currency='USD')
            return m.format('en_US')
            

class ListingVideo(models.Model):
    name = models.CharField(max_length=50, blank=True)
    file = models.FileField(upload_to="static/videos/%Y/%m/%d",
                            validators=[validate_video_extension])
    listing = models.ForeignKey(
        Listing,related_name='videos',on_delete=models.CASCADE)


    def __unicode__(self):
        return self.name

    @property
    def get_absolute_image_url(self):
        return "{0}{1}".format(getattr(settings, 'STATIC_URL_BASE'), self.file.name)

    class Meta:
        ordering = ['name']
        

class LandingContent(models.Model):
    heading_one = models.CharField(max_length=100)
    heading_two = models.CharField(max_length=100)
    description = models.TextField()
    sort_order = models.PositiveIntegerField(null=True, blank=True)
    listing = models.ForeignKey(Listing,
                                   on_delete=models.CASCADE,
                                   help_text="Need to chose listing for routing purposes",
                                   )
    video = models.ForeignKey(ListingVideo, blank=True, null=True, on_delete='DO_NOTHING')

    class Meta:
        ordering = ['sort_order']

    def __unicode__(self):
        return self.heading_one + self.heading_two




class ListingImage(models.Model):
    listing = models.ForeignKey(
        'Listing',
        related_name='images',
        on_delete=models.CASCADE,
    )
    image = models.ImageField(upload_to="static/images/%Y/%m/%d", null=True)
    title = models.CharField(_("Title"), max_length=255, blank=True)
    main_image = models.NullBooleanField(
        help_text="For the image that will display wide across the page")
    weight = models.PositiveIntegerField(default=1,
                                          help_text="The response will be ordered from highest to lowest")
    def image_tag(self):
        return u'<img style="max-width: 150px"src="%s" />' % self.image.url
    image_tag.short_description = 'Image'
    image_tag.allow_tags = True

    class Meta:
        verbose_name = _("Picture")
        verbose_name_plural = _("Pictures")
        ordering = ['-weight']
    # IS VERY SLOW OTHERWISE TO CALL GCLOUD
    @property
    def get_absolute_image_url(self):
        return "{0}{1}".format(getattr(settings, 'STATIC_URL_BASE'), self.image.name)

    def __str__(self):
        return self.title

    def __unicode__(self):
        return self.title
