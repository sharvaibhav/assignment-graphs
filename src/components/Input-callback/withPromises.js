import React, { Component } from 'react';

import AsyncSelect from 'react-select/lib/Async';



export default class WithPromises extends Component {
  state = { inputValue: '' };

  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    return (
      <AsyncSelect onChange={this.props.onChange} cacheOptions defaultOptions loadOptions={this.props.promiseOptions} />
    );
  }
}