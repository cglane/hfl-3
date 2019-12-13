import React from 'react';
const config = {
    // CHANGE DOMAIN FOR PRODUCTION
    'domain': 'https://hflcharleston.com',
//    'domain': 'http://staging.yp8hg5fd3q.us-east-1.elasticbeanstalk.com',
//    'domain': 'http://localhost:8000',
    'agentsPath': 'agents',
    'shortText': 120,
    'longText': 200,
    'brandImg': 'https://s3.amazonaws.com/www.hflcharleston.com/hfl-logo.jpg',
    'socialMedia': {
        'instagram': 'https://www.instagram.com/holcombefairlane/',
        'facebook': 'https://www.facebook.com/HFLCharleston',
        'googlePlus': 'https://www.youtube.com/channel/UCEZ5xDIq0Tr4dfO0WhnDz6A',
        'linkedIn': 'https://www.linkedin.com/company/8509331/',
        'youtube': 'https://www.youtube.com/channel/UCEZ5xDIq0Tr4dfO0WhnDz6A',
        
    },
    'price_range': ['$0-$100,000',  '$100,000-$500,000', '$500,000-$1,000,000', '$1,000,000-$10,000,000'],
    'copyright': '© 2019 Holcombe Fair & Lane, LLC',
    'youtubeIcon': 'https://s3.amazonaws.com/www.hflcharleston.com/youtube.png',
    'instagamIcon': 'https://s3.amazonaws.com/www.hflcharleston.com/instagram.png',
    'pages': [

        {
            'name': 'Sold',
            'path': '/sold-listings'
        },
        {
            'name': 'Residential',
            'path': '/residential-listings'
        },
        {
            'name': 'Commercial',
            'path': '/commercial-property'
        },
        {
            'name': 'Land',
            'path': '/land-listings'
        },
        {
            'name': 'About',
            'path': '/about'
        },
       
    ],
    'contactFields': [
        {
            'title': 'Address',
            'content': '1071 Morrison Drive Charleston, SC 29403'
        },
        {
            'title': 'Telephone',
            'content': (<a href={`tel:+1843-722-2642`}>843-722-2642</a>),
        },
        {
            'title': 'Email',
            'content': (
                <a href={`mailto:INFO@HFLCHARLESTON.COM?Subject=Real%20Estate`} target="_top">
                  INFO@HFLCHARLESTON.COM
                  </a>)
        }
    ],
}
export default config