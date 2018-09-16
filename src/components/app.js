import React, {Component} from 'react';
import Inputsection from "./input-section/input-section"
import Linegraph from "./line-graph/line-graph";

import 'react-dates/initialize';
import {FETCH_STATUS,DATA_URL, DATE_FORMAT} from '../constants';

import moment from 'moment';

import axios from "axios";

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            inputState:{
                from:"NOOSL",
                to:"CNSTG",
                startDate:moment("2018-05-30", "YYYY-MM-DD"),
                endDate:moment("2018-07-01", "YYYY-MM-DD")
            },
            fetchDataStatus:FETCH_STATUS.INITIAL,
            rateData:null
        }
    }

    componentDidMount(){
        this.getGraphData();
    }

    componentDidUpdate(){
        if(this.state.fetchDataStatus === FETCH_STATUS.FETCH){
            this.getGraphData();
        }
    }
    

    getGraphData = ()=>{
        let {from,to,startDate,endDate} = this.state.inputState;
        startDate = startDate.format(DATE_FORMAT);
        endDate = endDate.format(DATE_FORMAT);
        this.setState({fetchDataStatus:FETCH_STATUS.FETCHED});
        axios.get(DATA_URL(from,to,startDate,endDate)).then((res)=>{
            this.setState({rateData:res.data.rates,fetchDataStatus:FETCH_STATUS.FETCHED})
        },()=> this.setState({fetchDataStatus:FETCH_STATUS.REJECTED}))
    }

    updateInputState = (newState) => {
        console.log(newState);
        this.setState({inputState:newState,fetchDataStatus:FETCH_STATUS.FETCH})
    }

    render(){
        return (<div className="container">

            <Inputsection updateInputState={this.updateInputState} defaultState={this.state.inputState}/>   
            {this.state.rateData && 
                <Linegraph startDate={this.state.inputState.startDate} endDate={this.state.inputState.endDate} rateData ={this.state.rateData}/>}
         
         </div>);
    }
}