import React, { Component } from "react";
import "./Button.scss";

export default class Button extends Component {
  render() {
    return (
      <div >
        <button disabled={this.props.disabled} style={this.props.style ? this.props.style : {}} className="defaultButton" onClick={(e) => this.props.callback(e)}>
          {this.props.title}
        </button>
      </div>
    );
  }
}
