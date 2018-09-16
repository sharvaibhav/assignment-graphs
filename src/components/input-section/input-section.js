import React,{Component} from 'react';
import WithPromises from '../Input-callback/withPromises'
import axios from 'axios'
import { DateRangePicker } from 'react-dates';
import {PORTS} from '../../constants';
import 'react-dates/lib/css/_datepicker.css';
import './style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Inputsection extends Component{
    
    constructor(props){
        super(props);
        this.state={
            from:{},
            to:{},
            startDate:null,
            endDate:null, 
            focusedInput:null
        }
    }

    componentDidMount(){
        this.setState({...this.props.defaultState});
    }

    promiseOptionsFrom = inputValue => axios.get(PORTS(inputValue)).then(res => {
           if(res.data && res.data.results)
                return res.data.results.map(entry => {
                    return {label: entry.name, value:entry.id}
                });
        });
        
    handleChangeTo =(val =>{
        this.setState({to:val.value},()=>{
            this.props.updateInputState(this.state)
        })
    })

    handleChangeFrom =(val =>{
        this.setState({from:val.value},()=>{
            this.props.updateInputState(this.state)
        })
    })

    updateDates = ({ startDate, endDate }) => {
        this.setState({ startDate, endDate: endDate ? endDate : this.state.endDate },()=>{
            this.props.updateInputState(this.state)
        })
    }
      

    render(){
        return(<div className="input-section">
                <div className="row">
                    <div className="col-md-3 ">
                        <div className="row">
                            <div className=" input-text "> <FontAwesomeIcon icon="plane-departure" size="2x" />  </div> 
                            <div className="input-box"><WithPromises placeholder="Origin" promiseOptions={this.promiseOptionsFrom} onChange={this.handleChangeFrom}/> </div>
                        </div>
                    </div>

                    <div className="col-md-3 ">
                        <div className="row">
                            <div className="input-text"> <FontAwesomeIcon icon="plane-arrival" size="2x" /> </div>
                            <div className="input-box"><WithPromises placeholder="Destination" className="input-box" promiseOptions={this.promiseOptionsFrom} onChange={this.handleChangeTo}/> </div>
                        </div>
                    </div>
                    <div className="col-md-2 "> </div>
                    <div className="col-md-4 ">
                        <div className="row">
                            <div className="input-text"> <FontAwesomeIcon icon="clock" size="2x" /> </div>
                            <div className="input-box-dual">
                                <DateRangePicker
                                    isOutsideRange={() => false}
                                    startDate={this.state.startDate} 
                                    startDateId="your_unique_start_date_id"
                                    endDate={this.state.endDate} 
                                    endDateId="your_unique_end_date_id"
                                    onDatesChange={this.updateDates} 
                                    focusedInput={this.state.focusedInput}
                                    onFocusChange={focusedInput => this.setState({ focusedInput })} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                

                </div>);
    }
}