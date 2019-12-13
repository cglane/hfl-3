
from django.conf.urls import url, include
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from hfl.views import (
    LandingContentViewSet,
    AgentListingViewSet,
AboutPageViewSet,
    ListingImagesContentViewSet,
    ListView,
    ListingDetailView,
    ListMapView,
    OtherListingsView,
    email_view
)
from rest_framework import routers, serializers, viewsets
from rest_framework.routers import DefaultRouter
from django.views.generic.base import TemplateView

router = DefaultRouter()
router.register(r'landing-content',  LandingContentViewSet)
router.register(r'agents', AgentListingViewSet)
router.register(r'about', AboutPageViewSet)
router.register(r'images', ListingImagesContentViewSet)

admin.site.site_header = 'HFL Administration'

urlpatterns = [
    url(r'^jet/', include('jet.urls', 'jet')),  # Django JET URLS
    url(r'^admin/', admin.site.urls),
    url(r'^email', email_view),
    url(r'^api/', include(router.urls)),
    url(r'api/listings-all/', ListMapView.as_view()),
    url(r'api/other_listingss/(?P<property_type>.+)/(?P<property_name>.+)/$', OtherListingsView.as_view()),
    url(r'api/listings/(?P<property_type>.+)/$', ListView.as_view()),
    url(r'api/listing_detail/(?P<name>.+)/$', ListingDetailView.as_view()),
    url(r'^landing', include('frontend.urls')),  # Default to frontend urls
    url(r'^estate_property', include('frontend.urls')),  # Default to frontend urls
    url(r'^agents', include('frontend.urls')),  # Default to frontend urls
    url(r'^land-listings', include('frontend.urls')),  # Default to frontend urls
    url(r'^residential-listings', include('frontend.urls')),  # Default to frontend urls
    url(r'^commercial-property', include('frontend.urls')),  # Default to frontend urls
    url(r'^sold-listings', include('frontend.urls')),  # Default to frontend urls
    url(r'^about', include('frontend.urls')),  # Default to frontend urls
    url(r'^$', include('frontend.urls')),
    url(r'^googlec4a20743e05aaec0.html', TemplateView.as_view(template_name='googlec4a20743e05aaec0.html'), name="home"),
    url(r'^robots.txt', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    url(r'^sitemap.xml', TemplateView.as_view(template_name='sitemap.xml', content_type='text/xml')),
    # Default to frontend urls

]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
