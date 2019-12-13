import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip';
import $ from 'jquery'
import {detailsData} from '../helpers'
import Collection from './Collection'

class FlipCardAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFlipped: false,
      };
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ isFlipped: !this.state.isFlipped });
  }
  componentDidMount() {
     const frontElement = this.frontElement.clientHeight;
     const backElement = this.backElement.clientHeight;
     if (frontElement > backElement){
          $(`.flip-card-about-${this.props.itr}`).css({'height': `${frontElement + 10}px`})
     }else {
          $(`.flip-card-about-${this.props.itr}`).css({'height': `${backElement + 10 }px`})
     }
  }

  displayCard(data) {
    if (data) {
      return (
        <ReactCardFlip isFlipped={this.state.isFlipped}>
          <div ref={ (frontElement) => this.frontElement = frontElement}
                className="front-page-wrapper" key="front">
            <h1 className="hide-on-small-only">{data['header']}</h1>
            <div> 
                <p className="left-align about-description"> {data['description1']}</p>
                  <div onClick={this.handleClick} className="front-card-explore text-center">
                    <span>
                            {data['button_text']}
                    </span>
                  </div>
            </div>
          </div>
            <div ref={ (backElement) => this.backElement = backElement}
            onClick={this.handleClick} key="back">
                 <p className="left-align about-description"> {data['description2']}</p>
            </div>
         </ReactCardFlip>
      )
    }
  }
  render() {
    return this.displayCard(this.props.data)
  }
}

export default FlipCardAbout;


