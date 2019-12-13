from bs4 import BeautifulSoup
import requests
import re


def hasNumbers(inputString):
    return bool(re.search(r'\d', inputString))


def isNumber(inputString):
    if any(c.isalpha() for c in inputString):
        return False
    return hasNumbers(inputString)


def formatDictVals(val):
    if isinstance(val, str):
        if '$' in val:
            sans_char = val.replace("$", "")
            sans_comma = sans_char.replace(",", "")
            return sans_comma
        if isNumber(val) and ',' in val:
            return val.replace(",", "")
    return val


def getListDictNumber(my_list, key, year):
    if isinstance(my_list[0], dict):
        year_keys = [x for x in my_list[0].keys() if 'Year' in x]
        if year_keys:
            # Get value closest to year
            year_obj = [x for x in my_list if x.get(year_keys[0]) == year]
            if year_obj:
                return formatDictVals(
                    str(
                        year_obj[0].get(key, '0')
                    )
                )
            else:
                # If year doesn't exist iterate through list
                for itr in my_list:
                    if itr.get(key):
                        return formatDictVals(
                            str(
                                itr[key]
                            )
                        )
                # If no values exist return 0
                return '0'
        else:
            # Get highest value
            number_values = [0.0]
            values = [formatDictVals(str(x.get(key, '0'))) for x in my_list]
            for val in values:
                try:
                    my_float = float(val)
                    number_values.append(my_float)
                except:
                    pass
            return max(number_values)
    return None


def extractData(dictionary, map, year):
    result = {}
    for key, paths in map.iteritems():
        data_source = dictionary
        # Go down list of keys
        for route in paths:
            if dictionary.get(route):
                data_source = data_source[route]
            else:
                # If arrive at list find number value
                if isinstance(data_source, list):
                    result[key] = getListDictNumber(data_source, route, year)
                # If arrive at string set value
                elif isinstance(data_source, dict):
                    result[key] = data_source.get(route)
    return result


def stripWhiteSpace(string):
    str_arr = string.split(' ')
    clean_arr = list(filter(None, str_arr))
    return " ".join(clean_arr)


class GovernMaxFinder(object):
    """Query Governmax Website for Information about the property in question"""
    governmax_query_url = 'http://sc-charleston-county.governmax.com/svc/tab_summary_report_SC-Char.asp?t_nm=summary&l_cr=1&t_wc=|parcelid={0}+++++++++++++++&sid={1}'
    api_key_url = 'http://sc-charleston-county.governmax.com/svc/'
    data_map = {
        'address': ('overview', 'Parcel Address'),
        'finished_sq_feet': ('improvements', 'Finished Sq. Ft.',),
        'highest_sales_price': ('sales_history', 'Sale Price',),
        'property_value': ('historic_info', 'Market',),
        'property_class_code': ('current_info', 'Property Class Code',),
        'acreage': ('current_info', 'Acreage',),
        'bedrooms': ('improvements', 'Bedrooms',),
        'constructed_year': ('improvements', 'Constructed Year',),
    }

    def __init__(self):
        # Get API Key
        self.getApiKey()

    def getApiKey(self):
        req = requests.get(self.api_key_url).content
        soup = BeautifulSoup(req, 'html.parser')
        frames = soup.find_all('frame')
        frame_src = frames[0]['src']
        api_key = frame_src.split('sid=')[1].split('&agencyid=')[0]
        self.api_key = api_key
        return api_key

    def getSoup(self, property_pin):
        request_url = self.governmax_query_url.format(
            property_pin, self.api_key)
        request = requests.get(request_url).content
        soup = BeautifulSoup(request, 'html.parser')
        return soup

    def getRawData(self, property_pin):
        soup = self.getSoup(property_pin)
        if soup and soup.findAll('table'):
            self.tables = soup.findAll('table')[2].findAll('table')[
                5].findAll('table')
            all_tr = self.tables[0].findAll('tr')
            # If all_tr empty property not found
            if self.tables and all_tr:
                dictionary_info = {
                    'overview': self.getOverview(),
                    'current_info': self.getCurrentParcelInfo(),
                    'historic_info': self.getHistoricInformation(),
                    'sales_history': self.getSalesDisclosure(),
                    'improvements': self.getImprovements()
                }

                return dictionary_info
        return {key: '' for key in self.data_map.keys()}

    def getMappedData(self, property_pin, year):
        dictionary_info = self.getRawData(property_pin)
        # If dict vals all empty return as is
        if all(value == '' for value in dictionary_info.values()):
            return dictionary_info
        # Extract data from massive dict per util definition
        return extractData(dictionary_info, self.data_map, year)

    def getOverview(self):
        """Gets overview table from governmax as dictionary"""
        first_table = self.tables[0]
        all_tr = first_table.findAll('tr')
        first_header = [x.get_text('', strip=True)
                        for x in all_tr[0].findAll('span')]
        first_header_data = [x.get_text('', strip=True)
                             for x in all_tr[1].findAll('span')]
        return dict(zip(first_header, first_header_data))

    def getCurrentParcelInfo(self):
        """Gets data from 'Current Parcel Information' table."""
        'Second Table'
        owner_class_table = self.tables[3]
        owner_values_fields = [stripWhiteSpace(x.get_text(
            '', strip=True)) for x in owner_class_table.findAll('font')]
        owner_dict = dict(zip(*[iter(owner_values_fields)] * 2))
        'Fourth Class'
        property_info_table = self.tables[4]
        property_fields_values = [stripWhiteSpace(x.get_text(
            '', strip=True)) for x in property_info_table.findAll('font')]
        property_class_dict = dict(zip(*[iter(property_fields_values)] * 2))
        # Merge two dicts
        owner_dict.update(property_class_dict)
        return owner_dict

    def getHistoricInformation(self):
        """This gets historic information table as array of dictionaries."""
        historic_info_table = self.tables[7]
        historic_fields = [x.get_text(
            '', strip=True) for x in historic_info_table.findAll("span", class_="datalabel")]
        historic_data = historic_info_table.findAll('tr')[1:]
        historic_info_list = [[stripWhiteSpace(p.get_text('', strip=True)) for p in x.findAll('span')] for x in
                              historic_data]
        if historic_info_list:
            return [dict(zip(historic_fields, x)) for x in historic_info_list]

        return [dict.fromkeys(historic_fields)]

    def getSalesDisclosure(self):
        """This gets sales disclosure table as array of dictionaries."""
        sales_disclosure_table = self.tables[9]
        sales_disclosure_fields = [x.get_text('', strip=True) for x in
                                   sales_disclosure_table.findAll("span", class_="datalabel")]
        sales_disclosure_data = sales_disclosure_table.findAll('tr')[1:]
        sales_disclosure_info_list = [[stripWhiteSpace(p.get_text('', strip=True)) for p in x.findAll('font')] for x in
                                      sales_disclosure_data]
        if sales_disclosure_info_list:
            return [dict(zip(sales_disclosure_fields, x)) for x in sales_disclosure_info_list]
        return [dict.fromkeys(sales_disclosure_fields)]

    def getImprovements(self):
        """Get improvements table as dictionary"""
        improvements_table = self.tables[10]
        improvements_fields = [x.get_text(
            '', strip=True) for x in improvements_table.findAll("span", class_="datalabel")]
        improvements_data = improvements_table.findAll('tr')[2:]
        improvements_values = [[stripWhiteSpace(p.get_text('', strip=True)) for p in x.findAll('font')] for x in
                               improvements_data]
        if (len(improvements_values) > 0):
            return [dict(zip(improvements_fields, x)) for x in improvements_values]
        return [dict.fromkeys(improvements_fields)]
