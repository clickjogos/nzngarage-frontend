import React, { Component } from "react";
import "./Button.scss";

export default class Button extends Component {
  render() {
    return (
      <div >
        <button className="button" onClick={() => this.props.callback()}>
          {this.props.title}
        </button>
      </div>
    );
  }
}
