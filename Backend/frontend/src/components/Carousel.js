
import {mapIndexed} from '../helpers'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import '../jquery'

const updateHeight = ()=> {
    setTimeout(function(){
        let height = $('.slide.selected').find('img').height()
        if (height){
            $('.control-arrow').css('height', `${height}px`)
        }
    }, 10)
}
class CustomCarousel extends Component {
    componentDidMount(){
        updateHeight()
    }
    render() {
        return (
            <Carousel
            showStatus={false}
            showIndicators={false}
            showIndicators={false}
            infiniteLoop={true}
            autoPlay={false}
            showThumbs={false}
            onChange={updateHeight}
            showArrows={true   }
            >
                 {
                    mapIndexed((x, idx) => {
                        return (
                            <div key={idx}>
                                <img alt={x.image} src={x.get_absolute_image_url} />
                            </div>
                        )
                    })(this.props.data)
                }
            </Carousel>
        );
    }
}
export default CustomCarousel
