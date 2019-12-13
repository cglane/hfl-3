import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip';
import $ from 'jquery'
import {detailsData} from '../helpers'
import Collection from './Collection'

class FlipCardAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFlipped: false,
      };
      this.handleClick = this.handleClick.bind(this);
  }
   componentDidMount() {
    const frontPageHeight = $('.react-card-front').height()
    const backPageHeight = $('.react-card-back').height()
    if(frontPageHeight > backPageHeight){
        $('.agent-info-wrapper').css({'min-height': `${frontPageHeight}px`})
    }else{
            $('.agent-info-wrapper').css({'min-height': `${backPageHeight}px`})
    }
  }
  handleClick(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  }


  displayCard(data) {
    if (data) {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <div className="front-page-wrapper" key="front">
            <h1>{`${data['first_name']} ${data['last_name']} `}</h1>
            <div> 
                <p className="left-align agent-flip-description"> {data['description']}</p>
                  <div onClick={this.handleClick} className="front-card-explore text-center">
                    <span>
                            Contact
                    </span>
                  </div>
            </div>
          </div>
            <div  key="back">
                 <div className="left-align"> 
                    <div className="agent-contact-links">
                            <ul>
                                <li key={1}>
                                    <i className="material-icons">
                                        phone
                                    </i>
                                    <a href={`tel:+1${data['mobile_phone_number']}`}>{data['mobile_phone_number']}</a>
                                </li>
                                <li key={2}>
                                    <i className="material-icons">
                                    work
                                    </i>
                                    <a href={`tel:+1${data['office_phone_number']}`}>{data['office_phone_number']}</a>
                                </li>
                                <li key={3}>
                                    <i className="material-icons">
                                    email
                                    </i>
                                    <a href={`mailto:${data['email']}?Subject=Real%20Estate`} target="_top">
                  {data['email']}
                  </a>
                                </li>
                                <div onClick={this.handleClick} className="front-card-explore text-center">
                                    <span>
                                            Back
                                    </span>
                              </div>

                            </ul>
                </div>
                 </div>
            </div>
         </ReactCardFlip>
      )
    }
  }
  render() {
    return this.displayCard(this.props.data)
  }
}

export default FlipCardAgent;


