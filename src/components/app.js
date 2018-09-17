import React, {Component} from 'react';
import Inputsection from "./input-section/input-section"
import Linechart from "./chart-components/linechart";
import 'react-dates/initialize';
import {FETCH_STATUS,DATA_URL, DATE_FORMAT,DEFAULT_OPTIONS} from '../constants';
import moment from 'moment';
import axios from "axios";


export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            inputState:{
                from:DEFAULT_OPTIONS[0],
                to:DEFAULT_OPTIONS[1],
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
        axios.get(DATA_URL(from.value,to.value,startDate,endDate)).then((res)=>{
            this.setState({rateData:res.data.rates,fetchDataStatus:FETCH_STATUS.FETCHED})
        },()=> this.setState({fetchDataStatus:FETCH_STATUS.REJECTED}))
    }

    updateInputState = (newState) => {
        this.setState({inputState:newState,fetchDataStatus:FETCH_STATUS.FETCH})
    }

    render(){
        return (<div className="container">
                    <Inputsection updateInputState={this.updateInputState} defaultState={this.state.inputState}/>   
                    {this.state.rateData && 
                        <Linechart inputState = {this.state.inputState}
                                    rateData ={this.state.rateData}/>}
                </div>);
    }
}
