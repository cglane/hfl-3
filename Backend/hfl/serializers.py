from django.conf.urls import url, include
from hfl.models import (LandingContent,
                        ListingVideo,
                        Listing,
                        Agent,
                        ListingImage,
                        AboutPage,
                        PropertyType,
                        AboutOption)
from rest_framework import routers, serializers, viewsets
from collections import OrderedDict
from rest_framework.fields import SkipField

from operator import itemgetter

# Serializers define the API representation.


class AboutOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutOption
        fields = ('header', 'button_text', 'description1',
                  'description2', 'image',)

class PropertyTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyType
        fields = ('property_type', )

class AboutPageSerializer(serializers.ModelSerializer):
    options = AboutOptionSerializer(many=True)

    class Meta:
        model = AboutPage
        fields = ('header', 'background_image', 'options', 'description')


class ImageListingField(serializers.RelatedField):
    def to_native(self, value):
        return value.title


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ListingImage
        fields = ('title', 'get_absolute_image_url', 'main_image', 'weight')


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ('url_path', 'first_name', 'last_name', 'mobile_phone_number',
                  'office_phone_number', 'email', 'avatar', 'description')


class ListingVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingVideo
        fields = ('get_absolute_image_url', 'name')
        depth = 3


class ListingDetailSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    agent = AgentSerializer(read_only=True)

    class Meta:
        model = Listing
        fields = ('__all__')
        extra_fields = ['features']
        removed_fields = ['listing_features', 'id', 'display_listing']

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(ListingDetailSerializer,
                                self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            expanded_fields = expanded_fields + self.Meta.extra_fields
        if getattr(self.Meta, 'removed_fields', None):
            expanded_fields = [
                x for x in expanded_fields if x not in self.Meta.removed_fields]

        return expanded_fields

    def to_representation(self, instance):
        """
        Object instance -> Dict of primitive datatypes.
        """
        ret = OrderedDict()
        fields = [field for field in self.fields.values()
                  if not field.write_only]

        for field in fields:
            try:
                attribute = field.get_attribute(instance)
            except SkipField:
                continue
            if attribute is not None and attribute:
                represenation = field.to_representation(attribute)
                if represenation is None:
                    # Do not seralize empty objects
                    continue
                if isinstance(represenation, list) and not represenation:
                    # Do not serialize empty lists
                    continue

                ret[field.field_name] = represenation
        return ret


class ListingSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    property_type_choices = PropertyTypeSerializer(many=True)

    class Meta:
        model = Listing
        fields = ('description', 'images', 'price', 'price_formatted', 'property_name','price_sqft_formatted', 'terrastride_src',
                  'features', 'street_address', 'display_listing', 'lat', 'lng', 'status','property_type_choices', 'closing_date')

class ListingMapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('street_address', 'lat', 'lng', 'property_name')
        
class LandingContentSerializer(serializers.ModelSerializer):
    listing = ListingSerializer(read_only=True, many=False)
    video = ListingVideoSerializer()
    class Meta:
        model = LandingContent
        fields = ( 'heading_one', 'heading_two',
                  'description', 'listing', 'video')
        depth = 3
