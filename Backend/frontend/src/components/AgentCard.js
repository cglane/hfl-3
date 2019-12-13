import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import {agentPath} from '../helpers'
import {Card,CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CustomModal from './CustomModal'
import config from '../config'

const AgentCard = ({ data, customClass, streetAddress }) =>
  !data ? (
    <p>No Data</p>
  ) : (
    <div className={`listing-card ${customClass}`}>
        <Card>
          <Link to={agentPath(data)}>
          <CardMedia
            overlay={
            <CardTitle className="hover-hide-background agent-card-name"
                        title={`${data['first_name']} ${data['last_name']}`} 
                         />}
          >
          {
            <img 
              src={data['avatar']}
              alt="" /> 
          }
            
          </CardMedia>
          </Link>
              <div className="small-description">
              {/* <CardTitle title={data['price_formatted'] || `${data['price_sqft_formatted']} sqft`} /> */}
              <CardText>
              {/* {data['description'].slice(0, config['longText']) + '.......'} */}
                <ul className="agent-contact-links-card text-center">
                  <li key={1}>
                    <a href={`tel:+1${data['mobile_phone_number']}`}>
                      <i className="material-icons">
                          phone
                      </i>
                    </a>
                </li>
                <li key={2}>
                  <CustomModal agent={data} streetAddress={streetAddress}></CustomModal>
                </li>
                <li key={3}>
                  <a href={`mailto:${data['email']}?Subject=Real%20Estate`} target="_top">
                    <i className="material-icons">
                      email
                    </i>
                  </a>
                </li>
              </ul>
              </CardText>
            </div>            
        </Card>
  </div>
  );
  AgentCard.propTypes = {
  data: PropTypes.object.isRequired,
  customClass: PropTypes.string
};
export default AgentCard;