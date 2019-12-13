from hfl.governamx import GovernMaxFinder
from hfl.models import Agent
import itertools
from bs4 import BeautifulSoup
import requests
import urllib
import re
headers = requests.utils.default_headers()
headers.update({
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
})

csv_map = {
    'Listing Agent': 'agent',
    'Property Type': 'property_type',
    'List Price': 'price',

}



def getStreetAddress(csv_obj):
    return csv_obj.get('Street #') + ' ' + csv_obj.get('Street Name') + ' ' + csv_obj.get('Street Suffix')


def getFeatures(csv_obj):
    features = []
    features_blob = csv_obj.get('Features')
    first_split = features_blob.split(';')
    for my_split in first_split:
        split2 = my_split.split('|')
        if (len(split2) > 2 and split2[2] == 'Yes'):
            features.append(split2[1])
    return ", ".join(features)


def getUniqueFeatures(csv_obj_list):
    all_features = [getFeatures(x) for x in csv_obj_list]
    joined_features = list(itertools.chain.from_iterable(all_features))
    # Getting unique features
    return set(joined_features)


def getAgent(agent_name):
    first_name = agent_name.split(' ')[0]
    like_agents = Agent.objects.filter(first_name__contains=first_name)
    if like_agents:
        return like_agents[0].id
    return ''


def formatUpload(obj_list, limit=None):
    rtrnList = []
    if limit:
        obj_list = obj_list[0: limit]
    for csv_dict in obj_list:
        rtrnList.append({
            'agent_id': getAgent(csv_dict.get('Listing Agent')),
            'property_type': csv_dict.get('Property Type'),
            'price': csv_dict.get('List Price'),
            'status': 'Available',
            'street_address': getStreetAddress(csv_dict),
            'county': csv_dict.get('County'),
            'zip': csv_dict.get('Zip Code'),
            'acreage': csv_dict.get('Acreage'),
            'year_built': csv_dict.get('Year Built'),
            'square_feet': csv_dict.get('Apx. SqFt'),
            'stories': csv_dict.get('Stories'),
            'bedrooms': csv_dict.get('Bedrooms'),
            'baths_total': csv_dict.get('Baths - Total'),
            'baths_full': csv_dict.get('Baths - Full'),
            'baths_half': csv_dict.get('Baths - Half'),
            'description': csv_dict.get('Public Remarks'),
            'tax_map': csv_dict.get('Tax Map #'),
            'listing_features': getFeatures(csv_dict)
        })
    return rtrnList
