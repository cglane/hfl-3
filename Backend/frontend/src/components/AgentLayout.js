import React from "react";
import PropTypes from "prop-types";
import key from "weak-key";
import FlipCardAgent from "./FlipCardAgent";
import OtherAgents from './OtherAgents'

const AgentLayout = ({ data, agents }) =>
{

  return !data ? (
    <p>No listing data!</p>
  ) :  (
   <div className="container-fluid">
       {/* Container for image and flip card */}
       <div className="row text-center agent-block-wrapper">
            {/* Holds carousel and agent profile */}
            <div className="col-md-6 agent-avatar-wrapper">
                    <img src={data['avatar']}/>
            </div>
            {/* Holds listing information */}
            <div className="col-md-6 agent-info-wrapper">
                <FlipCardAgent data={data}/>
            </div>
       </div>

       {/* Other Listings */}
       <div className="col-md-12">
            <OtherAgents data={agents} />
       </div>
   </div>
  )
}
  AgentLayout.propTypes = {
  data: PropTypes.object.isRequired,
  agents: PropTypes.array.isRequired
};
export default AgentLayout;