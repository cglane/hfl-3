import React from "react";
import PropTypes from "prop-types";
import {mapIndexed} from '../helpers'

const Chips = ({ data }) =>
  !data.length ? (
    <p>No Features</p>
  ) : (
    <ul>
        {
            mapIndexed((x, idx) => {
                return (
                  <li key={idx} className="chip">
                    {x}
                  </li>
                )
              })(data)
        }
    </ul>
  );
Chips.propTypes = {
  data: PropTypes.array.isRequired
};
export default Chips;