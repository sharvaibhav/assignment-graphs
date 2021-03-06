import React,{Component} from 'react';
import * as d3 from "d3";
import "./style.css";

export default class Linechart extends Component{
    constructor(props){
        super(props);
        this.updateScales();
        this.chartRef = React.createRef();
        
    }

    /**
     * Line Drawinf function.
     */
    line = d3.line().x(d=>this.scalex(new Date(d[0]))).y(d=> this.scaleY(d[1]));

    /**
     * Updates the scales on new values
     */
    updateScales = ()=>{
        let min =  d3.min(this.props.rateData.map(e=>e[1])) -this.props.padding;
        let max = d3.max(this.props.rateData.map(e=>e[1])) + this.props.padding;

        this.scalex = d3.scaleTime().domain([this.props.inputState.startDate._d, this.props.inputState.endDate._d]).rangeRound([this.props.internalPadding, this.props.width-this.props.sidePadding ]);
        this.scaleY = d3.scaleLinear().domain([min, max]).range([this.props.height, this.props.padding])
        this.xAxis = d3.axisBottom(this.scalex);
        this.yAxis = d3.axisLeft(this.scaleY);
    }

    /**
     * Redrawing the chart on updates.
     */
    componentDidUpdate(){
        this.updateScales();
        let svg = d3.select(this.chartRef.current);
        svg.transition();
        svg.select(".line").transition().duration(800).attr("d", this.line(this.props.rateData));
        svg.select(".x.axis").transition().duration(800).call(this.xAxis);
        svg.select(".y.axis").transition().duration(800).call(this.yAxis);
    }

    /**
     * Function to make x grid lines
     */
    makeXGridLines = () => {		
        return d3.axisBottom(this.scalex)
            .ticks(this.props.tics)
    }

    /**
     * function to make y grid lines
     */
    makeYGridLines = () => {		
        return d3.axisLeft(this.scaleY)
            .ticks(this.props.tics)
    }

    /**
     * Creates the line chart
     */
    makeLine = ()=>{
        this.svg.append("path")
            .attr("class", "line")
            .datum(this.props.rateData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 3)
            .attr("d", this.line);
    }
    /**
     *Creates the Axis
     */
    makeAxis = ()=>{
        this.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.props.height + ")")
            .call(this.xAxis)
            .append("text")
            .attr("y", -10)
            .attr("x", this.props.width-160)
            .attr("fill", "#5D6971")
            .text("(Time)");
        this.svg.append("g")
            .attr("class", "y axis")
            .call(this.yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 16)
            .attr("x", -30)
            .style("text-anchor", "end")
            .attr("fill", "#5D6971")
            .text("(Rates)");
    }
    /**
     * Create the Grid Lines
     */
    makeGridLine = ()=>{
        this.svg.append("g")
        .attr("class", "grid x-axis")
        .attr("transform", "translate(0," + this.props.height + ")")
        .call(this.makeXGridLines().tickSize(-(this.props.height-this.props.padding)).tickFormat(""))

        this.svg.append("g")			
            .attr("class", "grid y-axis")
            .call(this.makeYGridLines().tickSize(-(this.props.width-this.props.sidePadding)).tickFormat(""));
    }
    /**
     * First creation of the Line chart
     */
    componentDidMount(){
        this.svg = d3.select(this.chartRef.current);
        this.makeLine();
        this.makeAxis();
        this.makeGridLine();
    }

    render(){
        return(<div className="graph-section row">
                <div className="heading"><strong>{this.props.inputState.from.label}</strong> to <strong> {this.props.inputState.to.label} </strong> Rates from <i>{this.props.inputState.startDate.format("MMM/YYYY")}</i> to <i> {this.props.inputState.endDate.format("MMM/YYYY")} </i></div>
                <svg ref={this.chartRef} width={this.props.width } height={this.props.height + this.props.sidePadding} className="line-graph">

                </svg>
            </div>)
    }
}

Linechart.defaultProps = {
    width: 1100,
    height:500,
    padding:50,
    sidePadding:140,
    internalPadding:0,
    tics: 8
}

