import React,{Component} from 'react';
import Linechart from "../chart-components/linechart"
import "./style.css";
export default class Linegraph extends Component{

    render(){
        return (<div className="graph-section row">
                
                <Linechart startDate={this.props.startDate} endDate={this.props.endDate} rateData={this.props.rateData}/>
                 {/* <Test /> */}
                </div>);
    }
}