import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import {DEFAULT_OPTIONS} from "../../constants";

import PropTypes from 'prop-types';

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
      <AsyncSelect {...this.props} 
        onChange={this.onChange} 
        defaultOptions={DEFAULT_OPTIONS} 
        defaultValue={this.props.defaultValue} 
        loadOptions={this.promiseOptions} />
    );
  }
}

WithPromises.propTypes={
  onChange:PropTypes.func,
  promiseOptions: PropTypes.func
}

WithPromises.defaultProps={
  defaultIndex:0
}