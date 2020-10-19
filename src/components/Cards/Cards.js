import React, { Component } from "react";
import "./Cards.scss";

export default class Cards extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

    }

    componentDidMount(){
        console.log("")
        let a = 100 * this.props.realPoints
        let b = a / this.props.estimedPoints
        console.log(`${a}/${this.props.estimedPoints} = ${b} `)
        let percentage = parseInt(b)
        console.log(percentage)
        if(percentage >= 100) 
            {
                this.setState({progressBarWidth: {width: '100%'}}) 
                console.log(this.setState.progressBarWidth)
            }
        else { 
            this.setState({progressBarWidth: {width: `${percentage}%`}})   
            console.log(this.setState.progressBarWidth)  
        }  

        
    }

   

    render() {
       
        return ( 
            <div>
                <div className="card">
                    <h4>{this.props.title}</h4>
                    <div className="points">
                        <p>{this.props.realPoints}</p> /
                        <p>{this.props.estimedPoints}</p>
                    </div>
                    <div className="progressBar">
                        <div style={this.state.progressBarWidth} className="percentageItem"></div>
                    </div>
                </div>            
            </div>           
        )
    }
}
