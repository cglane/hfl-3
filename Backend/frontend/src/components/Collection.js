import React from "react";
import PropTypes from "prop-types";
import {mapIndexed} from '../helpers'

const Collection = ({ data }) =>
  !data.length ? (
    <p>No Features</p>
  ) : (
    <ul className="collection">
        {
            mapIndexed((x, idx) => {
                return (
                  <a key={idx} className="collection-item">
                    {`${x['title']} : ${x['value']} `}
                  </a>
                )
              })(data)
        }
    </ul>
  );
Collection.propTypes = {
  data: PropTypes.array.isRequired
};
export default Collection;