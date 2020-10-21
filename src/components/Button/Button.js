import React, { Component } from "react";
import "./Button.scss";

export default class Button extends Component {
  render() {
    return (
      <div >
        <button style={this.props.style ? this.props.style : {}} className="button" onClick={(e) => this.props.callback(e)}>
          {this.props.title}
        </button>
      </div>
    );
  }
}
