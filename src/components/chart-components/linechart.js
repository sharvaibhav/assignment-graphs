import React,{Component} from 'react';
import * as d3 from "d3";
import "./style.css";

export default class Linechart extends Component{
    constructor(props){
        super(props);
        this.updateScales();
        this.chartRef = React.createRef();
    }

    line = d3.line().x(d=>this.scalex(new Date(d[0]))).y(d=> this.scaleY(d[1]));

    updateScales = ()=>{
        let min =  d3.min(this.props.rateData.map(e=>e[1])) -this.props.padding;
        let max = d3.max(this.props.rateData.map(e=>e[1])) + this.props.padding;

        this.scalex = d3.scaleTime().domain([this.props.startDate._d, this.props.endDate._d]).rangeRound([this.props.internalPadding, this.props.width-this.props.sidePadding ]);
        this.scaleY = d3.scaleLinear().domain([min, max]).range([this.props.height, this.props.padding])
        this.xAxis = d3.axisBottom(this.scalex);
        this.yAxis = d3.axisLeft(this.scaleY);
    }

    componentDidUpdate(){
        this.updateScales();
        let svg = d3.select(this.chartRef.current);
        svg.transition();
        svg.select(".line").transition().duration(800).attr("d", this.line(this.props.rateData));
        svg.select(".x.axis").transition().duration(800).call(this.xAxis);
        svg.select(".y.axis").transition().duration(800).call(this.yAxis);
    }

    make_x_gridlines() {		
        return d3.axisBottom(this.scalex)
            .ticks(this.props.tics)
    }

    make_y_gridlines() {		
        return d3.axisLeft(this.scaleY)
            .ticks(this.props.tics)
    }

    componentDidMount(){
        let svg = d3.select(this.chartRef.current);
        svg.append("path")
            .attr("class", "line")
            .datum(this.props.rateData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", this.line);

        svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + this.props.height + ")")
        .call(this.xAxis);

        svg.append("g")
        .attr("class", "y axis")
        .call(this.yAxis);

        svg.append("g")
        .attr("class", "grid x-axis")
        .attr("transform", "translate(0," + this.props.height + ")")
        .call(this.make_x_gridlines().tickSize(-(this.props.height-this.props.padding)).tickFormat(""))

        svg.append("g")			
            .attr("class", "grid y-axis")
            .call(this.make_y_gridlines()
                .tickSize(-(this.props.width-this.props.sidePadding))
                .tickFormat("")
            )
    }

    render(){
        return(<svg ref={this.chartRef} width={this.props.width } height={this.props.height + this.props.sidePadding} className="line-graph">

            </svg>)
    }
}

Linechart.defaultProps = {
    width: 1000,
    height:500,
    padding:50,
    sidePadding:140,
    internalPadding:0,
    tics: 8
}

