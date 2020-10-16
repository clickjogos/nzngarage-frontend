import React, { Component } from "react";
import "./Back.scss";
const Backbutton = require("../../assets/icons/icon-back-button.svg");

export default class ButtonBack extends Component {
  render() {
    return (
      <button className="back" onClick={() => this.props.callback()} icon={this.icon}>
        <img src={Backbutton} icon={<img src={Backbutton} />} />
        {this.props.title}
      </button>
    );
  }
}
