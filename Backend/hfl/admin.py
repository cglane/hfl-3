from django.contrib import admin
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.conf import settings
from hfl.models import (
    Agent,
    Listing,
    ListingImage,
    ListingVideo,
    LandingContent,
    AboutPage,
    AboutOption,
    PropertyType
)


class PictureInline(admin.StackedInline):
    model = ListingImage
    extra = 0
    fields = ["title", "main_image", "image", 'image_tag', 'weight']
    readonly_fields = ('image_tag', )
    allow_add = True


class AboutOptionInline(admin.TabularInline):
    model = AboutOption
    allow_add = True


class VideoAdmin(admin.TabularInline):
    model = ListingVideo
    allow_add = True



class AboutAdmin(admin.ModelAdmin):
    inlines = [AboutOptionInline, ]


class AgentAdmin(admin.ModelAdmin):
    pass

class PropertyTypeAdmin(admin.ModelAdmin):
    pass
class ListingAdmin(admin.ModelAdmin):
    inlines = [PictureInline, VideoAdmin]
    list_display = ['street_address',
                    'property_name', 'status', 'price', 'price_per_sqft']


class LandingContentAdmin(admin.ModelAdmin):
    list_display = ['heading_one', 'heading_two', 'sort_order','description']


admin.site.register(Agent, AgentAdmin)
admin.site.register(PropertyType, PropertyTypeAdmin)
admin.site.register(Listing, ListingAdmin)
admin.site.register(AboutPage, AboutAdmin)
admin.site.register(LandingContent, LandingContentAdmin)
