import React from "react";
import PropTypes from "prop-types";
import { pluck } from 'ramda'
import {mapIndexed} from '../helpers'
import FlipCardAbout from './FlipCardAbout'
import OtherAgents from './OtherAgents'
import DataProvider from './DataProvider'

const AboutLayout = ({ data }) =>
{
  return !data ? (
    <p>No about data!</p>
  ) :  (
<div className="container-fluid">
        {/* Image */}
        <div className="row background-image">
                <img src={data['background_image']}/>
        </div>
        {/* Bump */}
        <div className="row background-image-padding">
            <div className="col-md-12 text-center">
                <h3 className="listings-header">{data['header']}</h3>
            </div>
        </div>
        <div className="row keyword-block-row">
            <div className="col-md-12 text-center">
                <div className="keyword-block">
                    {
                        mapIndexed((x, idx)=> {
                            return (
                                <li  key={idx} 
                                    className="filter-keys">
                                    {x.header}
                                </li>
                            )
                        })(data['options'])
                    }
                </div>
            </div>
        </div>
       {/* Container for listings cards */}
                    <div className="about-wrapper">
                    {
                        mapIndexed((x, idx) => 
                            <div key={idx}className="row about-row">
                                    <div className="col-12 col-md-6 about-image-wrapper">
                                        <img src={x['image']}/>
                                    </div>
                                    <div className={`col-12 col-md-6 pull-right flip-card-about flip-card-about-${idx}`}>
                                        <FlipCardAbout itr={idx} data={x}/>
                                    </div>
                            </div>
                        )(data['options'])
                    }
                    </div>
                     {/* Other Agents */}
       <div className="col-md-12">
            <DataProvider endpoint="api/agents"
                render={data => {
                    if(!data){
                        return ''
                    }
                    return <OtherAgents data={data}/>
                }
            }/>
       </div>
       </div>
  )
}
  AboutLayout.propTypes = {
  data: PropTypes.object.isRequired
};
export default AboutLayout;