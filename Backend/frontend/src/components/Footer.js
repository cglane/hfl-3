import React from "react";
import PropTypes from "prop-types";
import config from "../config.js";
import { mapIndexed } from "../helpers.js";
import {
    FacebookIcon,
    TwitterIcon,
    FacebookShareButton,
    TwitterShareButton,
  
    LinkedinIcon,
    LinkedinShareButton,
  
  } from 'react-share';
const Footer = () =>
   (location.pathname === '/')? (
    ""
  ) : (
    <footer className="page-footer">
    <div className="container">
      <div className="row">

        <div className="col l6 s12 links-footer-block">
            <ul>
                {
                mapIndexed((x, idx)=> {
                    return (
                    <li key={idx}>
                        <span className="contact-label">{x.title}: </span>
                        <span className="contact-content">
                        {
                            x.content
                        }
                        </span>
                    </li>
                    )
                })(config.contactFields)
                }
            </ul>
        </div>

        <div className="col l4 offset-l2 s12">
          <ul className="footer-links text-center">
              {
                  mapIndexed(
                    (x, idx) => {
                      return (
                          <li key={idx}><a href={`${x.path}`}>{x.name}</a></li>
                        )
                    }
                  )(config.pages)
              }
          </ul>
          <div className="button-share text-center">
              <div className="custom-share-icon">
                <a href={config.socialMedia.facebook} target="_blank">
                  <FacebookIcon
                    size={32}
                    round />
                    </a>
              </div>
              <div className="custom-share-icon">
                <a href={config.socialMedia.linkedIn} target="_blank">
                  <LinkedinIcon
                    size={32}
                    round />
                    </a>
              </div>
              <div className="custom-share-icon">
                <a href={config.socialMedia.youtube} target="_blank">
                    <img src={config.youtubeIcon}/>
                </a>
              </div>
              <div className="custom-share-icon">
                <a href={config.socialMedia.instagram} target="_blank">
                    <img src={config.instagamIcon}/>
                </a>
              </div>
            </div>
              <div className="row copyright-block text-center">
                <p>             
                  {config.copyright}
                </p>
            </div>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
    </div>
  </footer>

  );

export default Footer;