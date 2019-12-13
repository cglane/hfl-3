import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip';
import $ from 'jquery'
import {detailsData} from '../helpers'
import Collection from './Collection'
class FlipCardListing extends Component {
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
        $('.property-info-wrapper').css({'min-height': `${frontPageHeight}px`})
    }else{
            $('.property-info-wrapper').css({'min-height': `${backPageHeight}px`})
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
            <h1 className="hide-on-small-only"  >{data.street_address}</h1>
            <div> 
                <h4>{data.status}</h4>
                <p className="left-align garamond-text"> {data.description}</p>
                  <a onClick={this.handleClick} className="waves-effect waves-light btn-large blue-background">
                    Explore
                  </a>
                  {
                    (data.terrastride_src)?
                    <a className="waves-effect waves-light btn-large blue-background"
                    target="_blank"
                    href={data.terrastride_src}>
                                        Map
                    </a>
                    :
                    ''
                  }
                  {
                    (data.youtube_link)?
                    <a className="waves-effect waves-light btn-large blue-background"
                    target="_blank"
                    href={data.youtube_link}>
                                        Video
                    </a>
                    :
                    ''
                  }
 
            </div>
          </div>
            <div onClick={this.handleClick} key="back">
              <Collection data={detailsData(data)}/>
            </div>
      </ReactCardFlip>
      )
    }
  }
  render() {
    return this.displayCard(this.props.data)
  }
}

export default FlipCardListing;


