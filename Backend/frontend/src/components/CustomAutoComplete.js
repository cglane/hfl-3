import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';


class CustomAutoComplete extends Component {
  render() {
    return (
    <AutoComplete
      className="auto-style"
      floatingLabelText={this.props.searchText}
      filter={AutoComplete.fuzzyFilter}
      dataSource={this.props.filters}
      openOnFocus={false}
      maxSearchResults={5}
      fullWidth={false}
      onNewRequest={this.props.updateFilter}
    />
    )
  }
}


export default CustomAutoComplete;