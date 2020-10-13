import React, { Component } from "react";
import "./ContainerList.scss";
import InputLabel from "../../components/InputLabel/InputLabel";


export default class ContainerList extends Component {

    render() {
        return (
            <div >
                <div className="main-container">
                <label>{this.props.label}</label>
                <input value={this.props.value} />
                </div>
            </div>
        )
    }
}