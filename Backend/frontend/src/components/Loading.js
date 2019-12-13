import config from '../config'
import React, {Component} from 'react';


class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
        <div className="container-fluid loading-page text-center">
            <img src={config.brandImg}/>
        </div>
      )
  }
}

export default Loading;


