import React, { Component } from "react";
import "./Back.scss";

export default class ButtonBack extends Component {
  render() {
    return (
        <button className="back" onClick={() => this.props.callback() } icon={this.icon}>
          
          {this.props.title}
        </button>
    );
  }
}
