import React, { Component } from "react";
import "./Cards.scss";

export default class Cards extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        let a = 100 * this.props.realPoints
        let b = a / this.props.estimedPoints
        let percentage = parseInt(b)

        let divStyle = {
            width: `${percentage}%`
        };
        return (
            <div>
                <div className="card">
                    <h4>{this.props.title}</h4>
                    <div className="points">
                        <p>{this.props.realPoints}</p> /
                        <p>{this.props.estimedPoints}</p>
                    </div>
                    <div className="progressBar">
                        <div style={divStyle} className="percentageItem"></div>
                    </div>
                </div>
            </div>
        )
    }
}
