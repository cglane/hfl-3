import React, { Component, ReactDOM } from "react";
import PropTypes from "prop-types";
import config from '../config'
import Loading from './Loading';

class DataProvider extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    render: PropTypes.func.isRequired,
    firstparam: PropTypes.string,
    secondparam:PropTypes.string
  };

  state = {
    data: [],
    loaded: false,
    placeholder:<Loading/>
  };

  componentDidMount() {
    let path = ''
    if (this.props.firstparam && this.props.secondparam){
      let first = encodeURI(this.props.firstparam)
      let second = encodeURI(this.props.secondparam)
      first = encodeURI(first.replace(/-/g, ' '))
      second = encodeURI(first.replace(/-/g, ' '))
      path = `${config.domain}/${this.props.endpoint}/${first}/${second}`
    } else if(this.props.firstparam){
      let otherParam = encodeURI(this.props.firstparam)
      otherParam = encodeURI(otherParam.replace(/-/g, ' '))
      path = `${config.domain}/${this.props.endpoint}/${otherParam}`
    }else{
      path = `${config.domain}/${this.props.endpoint}`
    }
    fetch(path)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong..." });
        }
        return response.json()
      })
      .then(data => { this.setState({ data: data, loaded: true })})
      .catch(err => console.log(err, 'err'))


  }
  componentDidUpdate() {
    window.scrollTo(0, 0)
}

  render() {
    const { data, loaded, placeholder } = this.state;
    return loaded ? this.props.render(data) : placeholder;
  }
}

export default DataProvider;