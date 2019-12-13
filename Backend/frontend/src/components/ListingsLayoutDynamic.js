import React, {Component} from 'react';
import {mainImage, mapIndexed, getFilters, filterListings, displayListing} from '../helpers'
import CustomAutoComplete from './CustomAutoComplete'
import ListingCard from './ListingCard'


class ListingsLayoutDynamic extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFlipped: false,
        filteredListings: this.props.data,
        filters: getFilters(this.props.data),
        displayListing: displayListing(this.props.data)
      };
      this.updateFilter = this.updateFilter.bind(this);
      
  }
  updateFilter(activeFilter){
    const filteredListings = filterListings(activeFilter, this.props.data)
    this.setState({
      filteredListings, 
    })
  }
  displayListings(data){
      return (
        <div className="container-fluid">
        {/* Image */}
        <div className="row background-image">
            {
                (data && data.length > 1)?
                <img src={mainImage(this.state.displayListing)}/>
                :
                ''
            }
        </div>
        {/* Bump */}
        <div className="row background-image-padding">
            <div className="col-md-12 text-center">
                <h3 className="listings-header">{this.props.header}</h3>
            </div>
        </div>
        <div className="row keyword-block-row">
            <div className="col-md-12 text-center">
                <div className="keyword-block">
                {
                    (data && data.length > 0)?
                    <CustomAutoComplete
                    filters={this.state.filters}
                    updateFilter={this.updateFilter}
                    searchText="Search location, features, or price"/>
                    :
                    'Nothing to Display'
                }

                </div>
            </div>
        </div>
       {/* Container for listings cards */}
       <div className="row text-center listing-block-wrapper">
            {
            (data && data.length > 0)?
                mapIndexed((x, idx)=> {
                   return  <ListingCard data={x} key={idx} customClass="listing-card-small"/>
                })(data)
                : ''
            }
       </div>
   </div>
      )
  }
  render() {
    return this.displayListings(this.state.filteredListings)
  }
}

export default ListingsLayoutDynamic;


