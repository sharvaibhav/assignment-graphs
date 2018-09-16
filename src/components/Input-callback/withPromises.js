import React, { Component } from 'react';

import AsyncSelect from 'react-select/lib/Async';

import {DEFAULT_OPTIONS} from "../../constants";

export default class WithPromises extends Component {
  state = { inputValue: '' };


  promiseOptions =  (inputValue)=>{
    if(inputValue.length>2)
      return this.props.promiseOptions(inputValue)
  }

  onChange = (element)=>{
    if(Object.keys(element).length > 0)
      this.props.onChange(element);
  }

  render() {
    return (
      <AsyncSelect {...this.props} onChange={this.onChange} cacheOptions defaultOptions={DEFAULT_OPTIONS} loadOptions={this.promiseOptions} />
    );
  }
}