import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import {mainImage, listingPath} from '../helpers'
import {Card,CardMedia, CardTitle, CardText} from 'material-ui/Card';

import config from '../config'

const ListingCard = ({ data, customClass }) =>
  !data ? (
    <p>No Data</p>
  ) : (
    <div className={`listing-card ${customClass}`}>
        <Card>
          <a href={listingPath(data)}>
          <CardMedia
            overlay={
            <CardTitle className="hover-hide-background listing-card-main-title"
                        title={data['property_name'] || data['street_address'] }
                        subtitle={data['status']} />}
          >
          {
            <img 
              src={mainImage(data)}
              alt="" /> 
          }
            
          </CardMedia>
          </a>
            <div className="small-description">
            <CardTitle className="listing-card-price neoretrofill-text" title={data['price_formatted'] || `${data['price_sqft_formatted']} sqft`} />
            <CardText className="listing-description-text garamond-text">
            {data['description'].slice(0, config['shortText']) + '.......'}
                </CardText>
            </div>            
        </Card>
  </div>
  );
  ListingCard.propTypes = {
  data: PropTypes.object.isRequired,
  customClass: PropTypes.string
};
export default ListingCard;